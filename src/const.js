const Status = {
  WANT: 'want',
  READING: 'reading',
  DONE: 'done',
  TRASH: 'trash'
};

const StatusLabel = {
  [Status.WANT]: 'Хочу',
  [Status.READING]: 'Читаю',
  [Status.DONE]: 'Завершено',
  [Status.TRASH]: 'Корзина'
};

export { Status, StatusLabel };
