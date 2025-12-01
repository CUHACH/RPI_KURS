import HeaderComponent from "./view/HeaderComponent.js";
import UploadBookForm from "./view/UploadBookForm.js";
import UploadPresenter from "./presenter/upload-presenter.js";
import BooksModel from "./model/book-model.js";
import { render } from "./framework/render.js";

// Контейнеры
const headerRoot = document.querySelector(".header");
const mainRoot = document.querySelector(".main");

// Модель и презентер
const model = new BooksModel();
const presenter = new UploadPresenter({ model });

// Рендер шапки
render(new HeaderComponent(), headerRoot);

// Рендер формы
const form = new UploadBookForm(file => presenter.upload(file));
render(form, mainRoot);

// Вызов bind/afterRender
form.afterRender();
