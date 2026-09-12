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

  "images/graduation.jpg",
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
  "images/graduation-27.jpg",
  "images/graduation-30.jpg",
  "images/graduation-33.jpg",
  "images/graduation-34.jpg",
  "images/graduation-35.jpg",
  "images/graduation-36.jpg",
  "images/graduation-37.jpg",
  "images/graduation-38.jpg",
  "images/graduation-39.jpg",
  "images/graduation-40.jpg",
  "images/graduation-41.jpg",
  "images/graduation-42.jpg",
  "images/graduation-43.jpg",
  "images/graduation-44.jpg",
  "images/graduation-45.jpg",
  "images/graduation-46.jpg",
  "images/graduation-47.jpg",
  "images/graduation-48.jpg",
  "images/graduation-49.jpg",
  "images/graduation-50.jpg",
  "images/graduation-51.jpg",
  "images/graduation-52.jpg",
  "images/graduation-53.jpg",
  "images/graduation-54.jpg",
  "images/graduation-55.jpg",
  "images/graduation-56.jpg",
  "images/graduation-57.jpg",

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
  "images/event-13.jpg",
  "images/event-15.jpg",
  "images/event-17.jpg",
  "images/event-18.jpg",
  "images/event-19.jpg",
  "images/event-20.jpg",
  "images/event-21.jpg",
  "images/event-22.jpg",
  "images/event-23.jpg",
  "images/event-24.jpg",
  "images/event-29.jpg",
  "images/event-31.jpg",
  "images/event-32.jpg",
  "images/event-33.jpg",
  "images/event-34.jpg",
  "images/event-35.jpg",
  "images/event-38.jpg"
];

(() => {
  const carouselImage = document.getElementById("carousel-image");
  const carouselCaption = document.getElementById("carousel-caption");
  const carouselOverlay = document.getElementById("carousel-overlay");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (!carouselImage || !carouselCaption || !carouselOverlay ||
      !dotsContainer || !prevButton || !nextButton || !portfolioImages.length) return;

  let currentIndex = 0;
  let displayedIndex = null;
  let loadRequest = 0;
  let touchStartX = null;
  const shuffledImages = [...portfolioImages];
  const preloadedImages = new Set();

  function getCaption(imagePath) {
    if (imagePath.includes("creative-portrait")) return "Creative Portraits";
    if (imagePath.includes("couple-engagement")) return "Couples / Engagement";
    if (imagePath.includes("graduation")) return "Graduation Sessions";
    if (imagePath.includes("headshot")) return "Headshots";
    if (imagePath.includes("event")) return "Event Photography";
    return "Featured Work";
  }

  function getHashtag(imagePath) {
    if (imagePath.includes("creative-portrait")) return "#CreativePortraits";
    if (imagePath.includes("couple-engagement")) return "#CouplesPhotography";
    if (imagePath.includes("graduation")) return "#GraduationSessions";
    if (imagePath.includes("headshot")) return "#Headshots";
    if (imagePath.includes("event")) return "#EventPhotography";
    return "#FeaturedWork";
  }

  function shuffleImages() {
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[randomIndex]] = [
        shuffledImages[randomIndex], shuffledImages[i]
      ];
    }
  }

  function preloadAdjacentImages() {
    for (const offset of [-1, 1]) {
      const index = (currentIndex + offset + shuffledImages.length) % shuffledImages.length;
      const src = shuffledImages[index];
      if (preloadedImages.has(src)) continue;
      preloadedImages.add(src);
      const image = new Image();
      image.onerror = () => preloadedImages.delete(src);
      image.src = src;
    }
  }

  // Keep seven stable controls, including keyboard focus as the window moves.
  const dots = Array.from({ length: Math.min(7, shuffledImages.length) }, () => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-controls", "carousel-image");
    dot.addEventListener("click", () => {
      currentIndex = Number(dot.dataset.index);
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateDots() {
    const hadDotFocus = dots.includes(document.activeElement);
    const startIndex = Math.max(0, Math.min(currentIndex - 3, shuffledImages.length - dots.length));
    dots.forEach((dot, offset) => {
      const index = startIndex + offset;
      const active = index === currentIndex;
      dot.dataset.index = String(index);
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-label", `Go to photo ${index + 1} of ${shuffledImages.length}`);
      dot.setAttribute("aria-current", String(active));
      if (active && hadDotFocus) dot.focus({ preventScroll: true });
    });
  }

  function updateCarousel() {
    const requestedIndex = currentIndex;
    const request = ++loadRequest;
    const currentImage = shuffledImages[requestedIndex];
    const pendingImage = new Image();
    carouselImage.setAttribute("aria-busy", "true");

    pendingImage.onload = () => {
      if (request !== loadRequest) return;
      // Swap only once loaded; older requests cannot overwrite newer navigation.
      carouselImage.src = currentImage;
      carouselImage.alt = getCaption(currentImage);
      carouselCaption.textContent = getCaption(currentImage);
      carouselOverlay.textContent = getHashtag(currentImage);
      carouselImage.setAttribute("aria-busy", "false");
      displayedIndex = requestedIndex;
      updateDots();
      preloadAdjacentImages();
    };
    pendingImage.onerror = () => {
      if (request !== loadRequest) return;
      // Retain the last visible photograph and keep navigation available.
      currentIndex = displayedIndex ?? 0;
      carouselImage.setAttribute("aria-busy", "false");
      updateDots();
      console.warn("Unable to load carousel photo:", currentImage);
    };
    pendingImage.src = currentImage;
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % shuffledImages.length;
    updateCarousel();
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + shuffledImages.length) % shuffledImages.length;
    updateCarousel();
  }

  nextButton.addEventListener("click", showNextImage);
  prevButton.addEventListener("click", showPreviousImage);

  carouselImage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  carouselImage.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const swipeDistance = event.changedTouches[0].screenX - touchStartX;
    touchStartX = null;
    if (swipeDistance > 50) showPreviousImage();
    if (swipeDistance < -50) showNextImage();
  }, { passive: true });

  carouselImage.addEventListener("touchcancel", () => {
    touchStartX = null;
  });

  shuffleImages();
  updateDots();
  updateCarousel();
})();
