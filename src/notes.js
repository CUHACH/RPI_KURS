import HeaderComponent from "./view/HeaderComponent.js";
import BooksModel from "./model/book-model.js";
import NotesList from "./view/NotesList.js";
import { render } from "./framework/render.js";

// Контейнеры
const headerRoot = document.querySelector(".header");
const mainRoot = document.querySelector(".notes-page");

// Модель
const model = new BooksModel();

// Рендер шапки
render(new HeaderComponent(), headerRoot);

// Рендер заметок
const notesList = new NotesList(model.all);
render(notesList, mainRoot);
notesList.renderNotes();
