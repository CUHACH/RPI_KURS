import { AbstractComponent } from "../framework/AbstractComponent.js";

export default class NotesList extends AbstractComponent {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `<section class="notes-list"></section>`;
  }

  renderNotes() {
    this.element.innerHTML = "";
    this.model.books.forEach(book => {
      const noteItem = document.createElement("article");
      noteItem.className = "note-item";
      noteItem.innerHTML = `
        <div class="book-info">
          <div class="book-cover-placeholder">
            <img src="${book.cover}" alt="${book.title}">
          </div>
          <div class="details-text">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
          </div>
        </div>
        <textarea class="note-textarea" placeholder="Ваши заметки">${book.notes || ""}</textarea>
      `;

      const textarea = noteItem.querySelector("textarea");


      textarea.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
          evt.preventDefault();
          this.model.updateNotes(book.id, evt.target.value);
        }
      });

      this.element.append(noteItem);
    });
  }
}
