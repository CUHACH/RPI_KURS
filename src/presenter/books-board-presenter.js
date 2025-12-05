import BookCard from "../view/BookCard.js";
import ListControlComponent from "../view/ListControlComponent.js";

export default class BooksBoardPresenter {
  constructor({ container, model }) {
    this.container = container;
    this.model = model;
    this.currentFilter = "all";

    this.listControls = new ListControlComponent({
      onFilterChange: this.handleFilterChange
    });

    this.model.addObserver(() => this.render());
  }

  init() {
    this.container.prepend(this.listControls.element);
    this.bookListContainer = document.createElement("section");
    this.bookListContainer.className = "book-cards-grid";
    this.container.append(this.bookListContainer);

    this.render();
  }

  handleFilterChange = (status) => {
    this.currentFilter = status;
    this.render();
  }

  handleStatusChange = (book) => {
    this.model.updateBook(book);
  }

  handleRatingChange = (id, rating) => {
    this.model.updateRating(id, rating);
  }

  render() {
    if (!this.bookListContainer) return;

    this.bookListContainer.innerHTML = "";

    const books = this.currentFilter === "all"
      ? this.model.books
      : this.model.books.filter(b => b.status === this.currentFilter);

    books.forEach(book => {
      const card = new BookCard(book, this.handleStatusChange, this.handleRatingChange);
      this.bookListContainer.append(card.element);
    });

    const countEl = this.listControls.element.querySelector(".count");
    if (countEl) countEl.textContent = books.length;
  }
}
