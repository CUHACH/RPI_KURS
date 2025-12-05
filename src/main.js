import HeaderComponent from "./view/HeaderComponent.js";
import BooksBoardPresenter from "./presenter/books-board-presenter.js";
import UploadPresenter from "./presenter/upload-presenter.js";
import UploadBookForm from "./view/UploadBookForm.js";
import NotesList from "./view/NotesList.js";
import BooksModel from "./model/book-model.js";
import { render } from "./framework/render.js";

const API_URL = "https://69039ac7d0f10a340b250ea3.mockapi.io/books";

const headerRoot = document.querySelector(".header");
const booksPage = document.querySelector(".books-page");
const addBookPage = document.querySelector(".add-book-page");
const notesPage = document.querySelector(".notes-page");

const booksModel = new BooksModel(API_URL);

const booksPresenter = new BooksBoardPresenter({ container: booksPage, model: booksModel });
const uploadPresenter = new UploadPresenter({ model: booksModel });

const header = new HeaderComponent();
render(header, headerRoot);

booksPresenter.init();

const uploadForm = new UploadBookForm(file => uploadPresenter.upload(file));
render(uploadForm, addBookPage);

const notesList = new NotesList(booksModel);
render(notesList, notesPage);


booksModel.addObserver(() => {
  booksPresenter.render();
  notesList.renderNotes();
});


booksModel.load().then(() => showPage("books")).catch(() => showPage("books"));

function showPage(page) {
  booksPage.style.display = page === "books" ? "block" : "none";
  addBookPage.style.display = page === "add-book" ? "block" : "none";
  notesPage.style.display = page === "notes" ? "block" : "none";

  if (page === "notes") notesList.renderNotes();
}

header.element.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (evt) => {
    evt.preventDefault();
    showPage(link.dataset.page);
  });
});
