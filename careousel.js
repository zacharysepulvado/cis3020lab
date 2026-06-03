const portfolioImages = [
  {
    src: "images/creative-portrait.jpg",
    caption: "Creative Portraits",
    alt: "Creative portrait photography example"
  },
  {
    src: "images/creative-portrait-4.jpg",
    caption: "Creative Portraits",
    alt: "Creative portrait photography example"
  },
  {
    src: "images/couple-engagement.jpg",
    caption: "Couples / Engagement",
    alt: "Couples photography example"
  },
  {
    src: "images/couple-engagement-5.jpg",
    caption: "Couples / Engagement",
    alt: "Couples photography example"
  },
  {
    src: "images/graduation-02.jpg",
    caption: "Graduation Sessions",
    alt: "Graduation photography example"
  },
  {
    src: "images/graduation-05.jpg",
    caption: "Graduation Sessions",
    alt: "Graduation photography example"
  },
  {
    src: "images/graduation-18.jpg",
    caption: "Graduation Sessions",
    alt: "Graduation photography example"
  }
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