import { AbstractComponent } from "../framework/AbstractComponent.js";

function template() {
    return `<section class="book-cards-grid"></section>`;
}

export default class BookList extends AbstractComponent {
    get template() { return template(); }
}
