export default class BooksModel {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.books = [];
    this.observers = [];
  }

  async load() {
    try {
      const res = await fetch(this.apiUrl);
      if (!res.ok) throw new Error(res.status);
      this.books = await res.json();
      this._notify();
      return this.books;
    } catch (err) {
      console.error("Failed to load books:", err);
      return [];
    }
  }

  addObserver(callback) {
    this.observers.push(callback);
  }

  _notify() {
    this.observers.forEach(cb => cb(this.books));
  }

  async addBook(book) {
    try {
      const res = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      });
      const newBook = await res.json();
      this.books.push(newBook);
      this._notify();
      return newBook;
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  }

  async updateBook(book) {
    try {
      const res = await fetch(`${this.apiUrl}/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      });
      const updated = await res.json();
      const index = this.books.findIndex(b => b.id === book.id);
      if (index !== -1) this.books[index] = updated;
      this._notify();
      return updated;
    } catch (err) {
      console.error("Failed to update book:", err);
    }
  }

  // Метод для рейтинга
  async updateRating(id, rating) {
    const book = this.books.find(b => b.id == id);
    if (!book) return;
    book.rating = rating;
    return this.updateBook(book);
  }

  // Метод для заметок
  async updateNotes(id, notes) {
    const book = this.books.find(b => b.id == id);
    if (!book) return;
    book.notes = notes;
    return this.updateBook(book);
  }
}
