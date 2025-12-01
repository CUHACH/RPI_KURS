import { AbstractComponent } from "../framework/AbstractComponent.js";
import { Status } from "../const.js";

function createListControlsTemplate() {
  return `
    <section class="list-controls">
      <h2 class="list-title">Мой список <span class="count">0</span></h2>
      <nav class="filter-nav">
        <ul class="filter-list">
          <li><button data-status="all" class="filter-button active">Все</button></li>
          <li><button data-status="${Status.WANT}" class="filter-button">Хочу</button></li>
          <li><button data-status="${Status.READING}" class="filter-button">Читаю</button></li>
          <li><button data-status="${Status.DONE}" class="filter-button">Завершено</button></li>
          <li><button data-status="${Status.TRASH}" class="filter-button">Корзина</button></li>
        </ul>
      </nav>
    </section>
  `;
}

export default class ListControlsComponent extends AbstractComponent {
  #onFilterChange = null;

  constructor({ onFilterChange } = {}) {
    super();
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener("click", this.#clickHandler);
  }

  get template() {
    return createListControlsTemplate();
  }

  #clickHandler = (evt) => {
    const btn = evt.target.closest(".filter-button");
    if (!btn) return;
    evt.preventDefault();

    this.element.querySelectorAll(".filter-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const status = btn.dataset.status;
    if (this.#onFilterChange) this.#onFilterChange(status);
  };
}
