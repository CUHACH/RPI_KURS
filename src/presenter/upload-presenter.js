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

      const title = xml.querySelector("book-title")?.textContent || "Без названия";
      const authorEl = xml.querySelector("author");
      let author = "Неизвестно";
      if (authorEl) {
        const first = authorEl.querySelector("first-name")?.textContent || "";
        const last = authorEl.querySelector("last-name")?.textContent || "";
        author = (first + " " + last).trim() || "Неизвестно";
      }

      let cover = "mock/images/default-cover.jpg";
      const imageEl = xml.querySelector("coverpage image");
      if (imageEl) {
        let href = imageEl.getAttributeNS("http://www.w3.org/1999/xlink", "href") || imageEl.getAttribute("href");
        if (href && href.startsWith("#")) {
          const binaryEl = xml.querySelector(`binary[id="${href.slice(1)}"]`);
          if (binaryEl) {
            const contentType = binaryEl.getAttribute("content-type") || "image/jpeg";
            cover = `data:${contentType};base64,${binaryEl.textContent.replace(/\s+/g, "")}`;
          }
        }
      }

      this.model.addBook({ title, author, cover, status: "want", rating: 0, notes: "" });
    };

    reader.readAsText(file);
  }
}
