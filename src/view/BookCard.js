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
          <div class="rating-container" data-id="${book.id}">
            ${[1,2,3,4,5].map(i => 
              `<span class="star ${book.rating >= i ? 'active' : ''}" data-value="${i}">★</span>`
            ).join('')}
          </div>
          <label>
            Статус:
            <select class="book-status" data-id="${book.id}">
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
  constructor(book, onStatusChange, onRatingChange) {
    super();
    this.book = book;
    this.onStatusChange = onStatusChange;
    this.onRatingChange = onRatingChange;

    this.element.addEventListener('change', this.statusHandler);
    this.element.addEventListener('click', this.ratingHandler);
  }

  get template() {
    return template(this.book);
  }

  statusHandler = (evt) => {
    const select = evt.target.closest('.book-status');
    if (!select) return;
    this.book.status = select.value;
    if (this.onStatusChange) this.onStatusChange(this.book);
  }

  ratingHandler = (evt) => {
    const star = evt.target.closest('.star');
    if (!star) return;

    const rating = Number(star.dataset.value);
    this.book.rating = rating;

    if (this.onRatingChange) this.onRatingChange(this.book.id, rating);


    const container = this.element.querySelector('.rating-container');
    container.querySelectorAll('.star').forEach((s, i) => {
      s.classList.toggle('active', i < rating);
    });
  }
}
