const portfolioImages = [
  "images/creative-portrait.jpg",
  "images/creative-portrait-2.jpg",
  "images/creative-portrait-3.jpg",
  "images/creative-portrait-4.jpg",
  "images/creative-portrait-5.jpg",
  "images/creative-portrait-6.jpg",
  "images/creative-portrait-7.jpg",
  "images/creative-portrait-8.jpg",
  "images/creative-portrait-9.jpg",
  "images/creative-portrait-10.jpg",
  "images/creative-portrait-11.jpg",
  "images/creative-portrait-12.jpg",
  "images/creative-portrait-13.jpg",
  "images/creative-portrait-14.jpg",

  "images/couple-engagement.jpg",
  "images/couple-engagement-2.jpg",
  "images/couple-engagement-3.jpg",
  "images/couple-engagement-4.jpg",
  "images/couple-engagement-5.jpg",
  "images/couple-engagement-6.jpg",
  "images/couple-engagement-7.jpg",
  "images/couple-engagement-8.jpg",
  "images/couple-engagement-09.jpg",
  "images/couple-engagement-10.jpg",

  "images/headshot.jpg",
  "images/event.jpg",

  "images/graduation-02.jpg",
  "images/graduation-03.jpg",
  "images/graduation-04.jpg",
  "images/graduation-05.jpg",
  "images/graduation-06.jpg",
  "images/graduation-07.jpg",
  "images/graduation-08.jpg",
  "images/graduation-09.jpg",
  "images/graduation-10.jpg",
  "images/graduation-11.jpg",
  "images/graduation-12.jpg",
  "images/graduation-13.jpg",
  "images/graduation-14.jpg",
  "images/graduation-15.jpg",
  "images/graduation-16.jpg",
  "images/graduation-17.jpg",
  "images/graduation-18.jpg",
  "images/graduation-19.jpg",
  "images/graduation-20.jpg",
  "images/graduation-21.jpg",
  "images/graduation-22.jpg",
  "images/graduation-23.jpg",
  "images/graduation-24.jpg",
  "images/graduation-25.jpg",
  "images/graduation-26.jpg",
  "images/graduation-27.jpg",
  "images/graduation-28.jpg",
  "images/graduation-29.jpg",
  "images/graduation-30.jpg",
  "images/graduation-31.jpg",
  "images/graduation-32.jpg",
  "images/graduation-33.jpg"
];

const carouselImage = document.getElementById("carousel-image");
const carouselCaption = document.getElementById("carousel-caption");
const dotsContainer = document.getElementById("carousel-dots");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentIndex = 0;
let shuffledImages = [...portfolioImages];

function shuffleImages() {
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[randomIndex]] = [shuffledImages[randomIndex], shuffledImages[i]];
  }
}

function createDots() {
  dotsContainer.innerHTML = "";

  shuffledImages.forEach((image, index) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to photo ${index + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  const currentImage = shuffledImages[currentIndex];

  carouselImage.src = currentImage.src;
  carouselImage.alt = currentImage.alt;
  carouselCaption.textContent = currentImage.caption;

  const dots = document.querySelectorAll(".carousel-dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % shuffledImages.length;
  updateCarousel();
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + shuffledImages.length) % shuffledImages.length;
  updateCarousel();
}

if (carouselImage && carouselCaption && dotsContainer && prevButton && nextButton) {
  shuffleImages();
  createDots();
  updateCarousel();

  nextButton.addEventListener("click", showNextImage);
  prevButton.addEventListener("click", showPreviousImage);
}