import BookCard from "../view/BookCard.js";
import ListControlsComponent from "../view/ListControlComponent.js";

export default class BooksBoardPresenter {
  constructor({ container, model }) {
    this.container = container;
    this.model = model;
    this.currentFilter = "all";

    this.listControls = new ListControlsComponent({
      onFilterChange: this.handleFilterChange
    });

    // Слушатель изменений модели
    this.model.addObserver(() => {
      if (this.bookListContainer) this.render();
    });
  }

  init() {
    // Рендер фильтров
    this.container.prepend(this.listControls.element);

    // Контейнер карточек книг
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
    this.render();
  }

  render() {
    if (!this.bookListContainer) return;

    this.bookListContainer.innerHTML = "";

    const books = this.currentFilter === "all"
      ? this.model.all
      : this.model.all.filter(book => book.status === this.currentFilter);

    books.forEach(book => {
      const card = new BookCard(book, this.handleStatusChange);
      this.bookListContainer.append(card.element);
    });

    // Обновляем счётчик
    const countEl = this.listControls.element.querySelector(".count");
    if (countEl) countEl.textContent = books.length;
  }
}
