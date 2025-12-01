import { books } from "../../mock/books.js";

export default class BooksModel {
  #books = books;
  #observers = [];

  get all() {
    return this.#books;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  _notify() {
    this.#observers.forEach(obs => obs());
  }

  updateBook(book) {
    const index = this.#books.findIndex(b => b.id === book.id);
    if (index !== -1) {
      this.#books[index] = book;
      this._notify();
    }
  }

  addBook(book) {
    book.id = Date.now();
    this.#books.push(book);
    this._notify();
  }
}
