export default class UploadPresenter {
    constructor({ model }) {
        this.model = model;
    }

    upload(file) {
        const reader = new FileReader();

        reader.onload = () => {
            const text = reader.result;
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "application/xml");

            // Название книги
            const titleEl = xml.querySelector("book-title");
            const title = titleEl ? titleEl.textContent : "Без названия";

            // Автор
            const authorEl = xml.querySelector("author");
            let author = "Неизвестно";
            if (authorEl) {
                const first = authorEl.querySelector("first-name")?.textContent || "";
                const last = authorEl.querySelector("last-name")?.textContent || "";
                author = (first + " " + last).trim() || "Неизвестно";
            }

            // Обложка
            let cover = "mock/images/default-cover.jpg";
            const imageEl = xml.querySelector("coverpage image");
            if (imageEl) {
                let href = imageEl.getAttributeNS("http://www.w3.org/1999/xlink", "href");
                if (!href) href = imageEl.getAttribute("href");

                if (href && href.startsWith("#")) {
                    const binaryId = href.slice(1);
                    const binaryEl = xml.querySelector(`binary[id="${binaryId}"]`);
                    if (binaryEl) {
                        const contentType = binaryEl.getAttribute("content-type") || "image/jpeg";
                        const base64 = binaryEl.textContent.replace(/\s+/g, "");
                        cover = `data:${contentType};base64,${base64}`;
                    }
                }
            }

            this.model.addBook({ title, author, cover, status: "want" });
            alert(`Книга "${title}" добавлена`);
        };

        reader.readAsText(file);
    }
}
