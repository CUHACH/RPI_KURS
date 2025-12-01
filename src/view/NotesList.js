import { AbstractComponent } from "../framework/AbstractComponent.js";
import NoteItem from "./NoteItem.js";

export default class NotesList extends AbstractComponent {
    constructor(books) {
        super();
        this.books = books;
    }

    get template() {
        return `<section class="notes-list"></section>`;
    }

    renderNotes() {
        const container = this.element;
        container.innerHTML = "";
        this.books.forEach(book => {
            const note = new NoteItem(book);
            container.append(note.element);
        });
    }
}
