import { AbstractComponent } from "../framework/AbstractComponent.js";

function createHeaderTemplate() {
  return `<header class="page-header">
    <div class="header-content">
      <h1 class="site-title">Reading list</h1>

      <nav class="main-nav">
        <ul class="nav-list">
          <li><a href="#" data-page="books" class="nav-link">Мои книги</a></li>
          <li><a href="#" data-page="add-book" class="nav-link">Добавить книгу</a></li>
          <li><a href="#" data-page="notes" class="nav-link">Заметки</a></li>
        </ul>
      </nav>

      <a href="#" class="profile-link" aria-label="Профиль пользователя">
        <span class="profile-icon">👤</span>
      </a>
    </div>
  </header>`;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderTemplate();
  }
}
