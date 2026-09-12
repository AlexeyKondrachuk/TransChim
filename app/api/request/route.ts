import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RequestPayload, validateRequest } from '@/lib/request-validation';

export const runtime = 'nodejs'; // nodemailer не работает на edge

// ---- Транспорт создаётся один раз на инстанс ----
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ---- Анти-спам: honeypot ----
// Скрытое поле "company" на форме. Человек его не видит и не заполняет,
// боты заполняют всё подряд → тихо отклоняем
function isSpam(body: Record<string, unknown>): boolean {
  return typeof body.company === 'string' && body.company.length > 0;
}

// ---- Письмо ----
const KIND_LABELS: Record<string, string> = {
  price: 'Запрос цены',
  order: 'Заказ',
  callback: 'Обратный звонок',
  request: 'Заявка с сайта',
};

function buildHtml(data: RequestPayload): string {
  const rows: Array<[string, string | undefined]> = [
    ['Тип заявки', KIND_LABELS[data.kind] ?? data.kind],
    ['Продукт', data.productTitle],
    ['Имя', data.name],
    ['Телефон', data.phone],
    ['Email', data.email],
    ['Адрес доставки', data.address],
    ['Комментарий', data.comment],
    ['Страница продукта', data.productSlug ? `/products/${data.productSlug}` : undefined],
  ];

  const table = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}:</td><td style="padding:4px 0"><strong>${escapeHtml(v!)}</strong></td></tr>`
    )
    .join('');

  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${table}</table>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  if (isSpam(body as Record<string, unknown>)) {
    // Боту — «успех», чтобы не обучать
    return NextResponse.json({ ok: true });
  }

  const result = validateRequest(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.errors.join('; ') }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      from: `"Сайт ТрансХим" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO, // info@transchim.ru
      replyTo: result.data.email || result.data.phone || undefined, // ответ клиенту — одним кликом
      subject: `[Сайт] ${KIND_LABELS[result.data.kind]}${
        result.data.productTitle ? ` — ${result.data.productTitle}` : ''
      }`,
      text: JSON.stringify(result.data, null, 2), // запасной текстовый вид
      html: buildHtml(result.data),
    });
  } catch (err) {
    console.error('Ошибка отправки письма:', err);
    // Клиенту — общий текст, детали в логи
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Позвоните нам, пожалуйста.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}