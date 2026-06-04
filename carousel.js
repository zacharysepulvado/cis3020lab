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
  "images/graduation-33.jpg",

    "images/headshot.jpg",
  "images/headshot-1.jpg",
  "images/headshot-2.jpg",
  "images/headshot-3.jpg",

  "images/event.jpg",
  "images/event-1.jpg",
  "images/event-2.jpg",
  "images/event-3.jpg",
  "images/event-4.jpg",
  "images/event-5.jpg",
  "images/event-6.jpg",
  "images/event-7.jpg",
  "images/event-8.jpg",
  "images/event-9.jpg",
  "images/event-10.jpg",
  "images/event-11.jpg",
  "images/event-12.jpg",
  "images/event-13.jpg",
  "images/event-14.jpg",
  "images/event-15.jpg",
  "images/event-16.jpg",
  "images/event-17.jpg",
  "images/event-18.jpg",
  "images/event-19.jpg",
  "images/event-20.jpg",
  "images/event-21.jpg",
  "images/event-22.jpg",
  "images/event-23.jpg",
  "images/event-24.jpg",
  "images/event-25.jpg",
  "images/event-26.jpg",
  "images/event-27.jpg",
  "images/event-28.jpg",
  "images/event-29.jpg",
  "images/event-30.jpg",
  "images/event-31.jpg",
  "images/event-32.jpg",
  "images/event-33.jpg",
  "images/event-34.jpg",
  "images/event-35.jpg",
  "images/event-36.jpg",
  "images/event-37.jpg",
  "images/event-38.jpg"
];

const carouselImage = document.getElementById("carousel-image");
const carouselCaption = document.getElementById("carousel-caption");
const carouselOverlay = document.getElementById("carousel-overlay");
const dotsContainer = document.getElementById("carousel-dots");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentIndex = 0;
let shuffledImages = [...portfolioImages];

function getCaption(imagePath) {
  if (imagePath.includes("creative-portrait")) {
    return "Creative Portraits";
  }

  if (imagePath.includes("couple-engagement")) {
    return "Couples / Engagement";
  }

  if (imagePath.includes("graduation")) {
    return "Graduation Sessions";
  }

  if (imagePath.includes("headshot")) {
    return "Headshots";
  }

  if (imagePath.includes("event")) {
    return "Event Photography";
  }

  return "Featured Work";
}

function getHashtag(imagePath) {
  if (imagePath.includes("creative-portrait")) {
    return "#CreativePortraits";
  }

  if (imagePath.includes("couple-engagement")) {
    return "#CouplesPhotography";
  }

  if (imagePath.includes("graduation")) {
    return "#GraduationSessions";
  }

  if (imagePath.includes("headshot")) {
    return "#Headshots";
  }

  if (imagePath.includes("event")) {
    return "#EventPhotography";
  }

  return "#FeaturedWork";
}

function shuffleImages() {
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[randomIndex]] = [shuffledImages[randomIndex], shuffledImages[i]];
  }
}

function updateCarousel() {
  const currentImage = shuffledImages[currentIndex];

  carouselImage.src = currentImage;
  carouselImage.alt = getCaption(currentImage);
  carouselCaption.textContent = getCaption(currentImage);
  carouselOverlay.textContent = getHashtag(currentImage);

  updateDots();
}

function updateDots() {
  dotsContainer.innerHTML = "";

  const totalDots = 7;
  const centerDot = 3;

  let startIndex = currentIndex - centerDot;

  if (startIndex < 0) {
    startIndex = 0;
  }

  if (startIndex > shuffledImages.length - totalDots) {
    startIndex = shuffledImages.length - totalDots;
  }

  if (startIndex < 0) {
    startIndex = 0;
  }

  const endIndex = Math.min(startIndex + totalDots, shuffledImages.length);

  for (let i = startIndex; i < endIndex; i++) {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to photo ${i + 1}`);

    if (i === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  }
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % shuffledImages.length;
  updateCarousel();
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + shuffledImages.length) % shuffledImages.length;
  updateCarousel();
}

if (carouselImage && carouselCaption && carouselOverlay && dotsContainer && prevButton && nextButton) {
  shuffleImages();
  updateCarousel();

  nextButton.addEventListener("click", showNextImage);
  prevButton.addEventListener("click", showPreviousImage);

  let touchStartX = 0;
  let touchEndX = 0;

  carouselImage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  carouselImage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
      showPreviousImage();
    }

    if (swipeDistance < -50) {
      showNextImage();
    }
  }
}
