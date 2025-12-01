import { AbstractComponent } from "../framework/AbstractComponent.js";

function tpl() {
    return `
        <div class="upload-container">
            <h2>Добавить книгу</h2>
            <input id="fileInput" type="file" accept=".fb2">
            <button id="uploadBtn">Загрузить</button>
        </div>
    `;
}

export default class UploadBookForm extends AbstractComponent {
    constructor(onUpload) {
        super();
        this.onUpload = onUpload;
        console.log("Upload called")
    }

    get template() { return tpl(); }

    bind() {
        this.element.querySelector("#uploadBtn")
            .addEventListener("click", () => {
                const file = this.element.querySelector("#fileInput").files[0];
                if (file) this.onUpload(file);
            });
    }

    afterRender() {
        this.bind();
    }
}
