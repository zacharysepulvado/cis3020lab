const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(imageSrc, imageAlt) {
  lightboxImage.src = imageSrc;
  lightboxImage.alt = imageAlt || "Expanded photo";
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
}

if (lightbox && lightboxImage && lightboxClose) {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("click", () => {
      openLightbox(image.src, image.alt);
    });

    image.style.cursor = "pointer";
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}