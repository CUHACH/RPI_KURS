import HeaderComponent from "./view/HeaderComponent.js";
import BooksBoardPresenter from "./presenter/books-board-presenter.js";
import UploadPresenter from "./presenter/upload-presenter.js";
import UploadBookForm from "./view/UploadBookForm.js";
import NotesList from "./view/NotesList.js";
import BooksModel from "./model/book-model.js";
import { render } from "./framework/render.js";

// Контейнеры страниц
const headerRoot = document.querySelector(".header");
const booksPage = document.querySelector(".books-page");
const addBookPage = document.querySelector(".add-book-page");
const notesPage = document.querySelector(".notes-page");

// Общая модель книг
const model = new BooksModel();

// Презентеры
const booksPresenter = new BooksBoardPresenter({ container: booksPage, model });
const uploadPresenter = new UploadPresenter({ model });

// Рендер шапки
const header = new HeaderComponent();
render(header, headerRoot);

// Рендер "Мои книги"
booksPresenter.init();

// Рендер формы "Добавить книгу"
const uploadForm = new UploadBookForm(file => uploadPresenter.upload(file));
render(uploadForm, addBookPage); // afterRender автоматически вызовется из render.js

// Рендер заметок
const notesList = new NotesList(model.all);
render(notesList, notesPage);
notesList.renderNotes();

// Функция переключения страниц
function showPage(page) {
    booksPage.style.display = page === "books" ? "block" : "none";
    addBookPage.style.display = page === "add-book" ? "block" : "none";
    notesPage.style.display = page === "notes" ? "block" : "none";

    if (page === "notes") notesList.renderNotes();
}

// Навигация через шапку
header.element.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", evt => {
        evt.preventDefault();
        const page = link.dataset.page;
        showPage(page);
    });
});

// Показываем по умолчанию "Мои книги"
showPage("books");

// Подписка на модель, чтобы обновлять книги и заметки при добавлении новой книги
model.addObserver(() => {
    booksPresenter.render();
    notesList.renderNotes();
});
