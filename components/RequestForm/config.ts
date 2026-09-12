export type RequestKind = 'price' | 'order' | 'callback' | 'request';

export const REQUEST_CONFIG: Record<
  RequestKind,
  { title: string; submitLabel: string; commentLabel: string; commentPlaceholder: string }
> = {
  price: {
    title: 'Запросить цену',
    submitLabel: 'Отправить запрос',
    commentLabel: 'Комментарий',
    commentPlaceholder: 'Объём, сроки. Доставка жидких газов — в любой регион России',
  },
  order: {
    title: 'Оформить заказ',
    submitLabel: 'Отправить заказ',
    commentLabel: 'Комментарий к заказу',
    commentPlaceholder: 'Количество баллонов, адрес доставки…',
  },
  callback: {
    title: 'Заказать звонок',
    submitLabel: 'Перезвоните мне',
    commentLabel: 'Удобное время',
    commentPlaceholder: 'Например: завтра до 12:00',
  },
  request: {
  title: 'Оставить заявку',
  submitLabel: 'Отправить заявку',
  commentLabel: 'Комментарий',
  commentPlaceholder: 'Что вас интересует?',
},
  
};