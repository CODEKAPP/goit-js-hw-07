import { galleryItems } from "./gallery-items.js";

let modalInstance = null;

const galleryList = document.querySelector(".gallery");

const galleryMarkup = galleryItems
    .map(
        ({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `
    )
    .join("");

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

galleryList.addEventListener("click", handleGalleryClick);

function handleGalleryClick(event) {
    event.preventDefault();

    if (event.target.tagName !== "IMG") {
        return;
    }

    const largeImageUrl = event.target.dataset.source;
    modalInstance = basicLightbox.create(`
    <img src="${largeImageUrl}" width="800" height="600">
  `);

    modalInstance.show();

    document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
    if (event.code === "Escape") {
        modalInstance.close();
        document.removeEventListener("keydown", handleKeyPress);
    }
}
