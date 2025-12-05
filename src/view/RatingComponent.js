import { AbstractComponent } from "../framework/AbstractComponent.js";

export default class RatingComponent extends AbstractComponent {
    constructor(book, onRate) {
        super();
        this.book = book;
        this.onRate = onRate;
    }

    get template() {
        const stars = [1,2,3,4,5]
            .map(num => `
                <span class="star ${num <= this.book.rating ? "active" : ""}" data-value="${num}">
                    ★
                </span>
            `)
            .join("");

        return `
            <div class="rating">
                ${stars}
            </div>
        `;
    }

    afterRender() {
        this.element.querySelectorAll(".star").forEach(star => {
            star.addEventListener("mouseover", () => {
                const val = star.dataset.value;
                this.highlight(val);
            });

            star.addEventListener("mouseout", () => {
                this.highlight(this.book.rating);
            });

            star.addEventListener("click", () => {
                const value = Number(star.dataset.value);
                this.book.rating = value;
                this.onRate(value);
                this.highlight(value);
            });
        });
    }

    highlight(value) {
        this.element.querySelectorAll(".star").forEach(star => {
            star.classList.toggle("active", Number(star.dataset.value) <= value);
        });
    }
}
