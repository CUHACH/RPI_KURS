import { AbstractComponent } from "../framework/AbstractComponent.js";
import { StatusLabel } from "../const.js";

function template(book) {
  return `
    <article class="book-card">
      <div class="book-cover-placeholder">
        <img src="${book.cover}" alt="${book.title}">
      </div>
      <div class="book-details">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="book-meta">
          <span class="book-rating">Рейтинг (⭐)</span>
          <label>
            Статус:
            <select class="book-status-select">
              ${Object.entries(StatusLabel).map(([key, label]) =>
                `<option value="${key}" ${book.status === key ? 'selected' : ''}>${label}</option>`
              ).join('')}
            </select>
          </label>
        </div>
      </div>
    </article>
  `;
}

export default class BookCard extends AbstractComponent {
  constructor(book, onStatusChange) {
    super();
    this.book = book;
    this.onStatusChange = onStatusChange;
    this.element.addEventListener('change', this.#statusHandler);
  }

  get template() {
    return template(this.book);
  }

  #statusHandler = (evt) => {
    const select = evt.target.closest('.book-status-select');
    if (!select) return;
    this.book.status = select.value;
    if (this.onStatusChange) this.onStatusChange(this.book);
  }
}
