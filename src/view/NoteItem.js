import { AbstractComponent } from "../framework/AbstractComponent.js";

function template(book) {
    return `
        <article class="note-item">
            <div class="book-info">
                <div class="book-cover-placeholder">
                    <img src="${book.cover}" alt="${book.title}" class="images">
                </div>
                <div class="details-text">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </div>
            </div>
            <textarea class="note-textarea" placeholder="Ваши заметки по этой книге..."></textarea>
        </article>
    `;
}

export default class NoteItem extends AbstractComponent {
    constructor(book) {
        super();
        this.book = book;
    }

    get template() {
        return template(this.book);
    }
}
