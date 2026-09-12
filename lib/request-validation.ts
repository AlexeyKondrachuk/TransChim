import type { RequestKind } from '@/components/RequestForm/config';

// Общий список типов — единственный источник для клиента и сервера
export const REQUEST_KINDS: RequestKind[] = ['price', 'order', 'callback', 'request'];

export type RequestPayload = {
  kind: RequestKind;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  comment?: string;
  productTitle?: string;
  productSlug?: string;
  consent: boolean;
};

export type ValidationResult =
  | { ok: true; data: RequestPayload }
  | { ok: false; errors: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{10,20}$/;

// Серверная матрица — зеркалит required-поля формы.
// required-атрибуты клиента НЕ являются защитой
export function validateRequest(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: ['Некорректный запрос'] };
  }

  const b = body as Record<string, unknown>;

  const str = (v: unknown) =>
    typeof v === 'string' ? v.trim().slice(0, 1000) : undefined; // лимит длины от ботов

  const kind = str(b.kind) as RequestKind;
  if (!REQUEST_KINDS.includes(kind)) {
    return { ok: false, errors: ['Неизвестный тип заявки'] };
  }

  const name = str(b.name);
  const email = str(b.email);
  const phone = str(b.phone);
  const address = str(b.address);
  const comment = str(b.comment);
  const productTitle = str(b.productTitle);
  const productSlug = str(b.productSlug);
  const consent = b.consent === true || b.consent === 'on';

  // Согласие на обработку ПДн — обязательно всегда
  if (!consent) errors.push('Требуется согласие на обработку персональных данных');

  // Контакт: телефон или email — хотя бы один
  const hasEmail = Boolean(email);
  const hasPhone = Boolean(phone);
  if (!hasEmail && !hasPhone) {
    errors.push('Укажите телефон или email');
  }
  if (hasEmail && !EMAIL_RE.test(email!)) errors.push('Некорректный email');
  if (hasPhone && !PHONE_RE.test(phone!)) errors.push('Некорректный телефон');

  // Матрица полей (зеркало RequestForm)
  if (kind === 'callback' && !hasPhone) errors.push('Для обратного звонка нужен телефон');
  if ((kind === 'order' || kind === 'price') && !hasEmail) {
    errors.push('Для этой заявки нужен email');
  }
  if (kind === 'order' && !address) errors.push('Укажите адрес доставки');

  // Имя: не пустое там, где форма его требует
  if (kind !== 'callback' && !name) errors.push('Укажите имя');

  return {
    ok: errors.length === 0,
    data: {
      kind,
      name,
      email,
      phone,
      address,
      comment,
      productTitle,
      productSlug,
      consent,
    },
    ...(errors.length ? { errors } : {}),
  } as ValidationResult;
}