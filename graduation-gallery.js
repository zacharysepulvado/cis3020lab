const graduationSessions = [
  
  {
    title: "Salo Graduation Session",
    folder: "Salo",
    prefix: "Salo",
    total: 33
  },
  {
    title: "Camila Graduation Session",
    folder: "Camila",
    prefix: "Camila",
    total: 14
  },
  {
    title: "Mariana Graduation Session",
    folder: "Mariana",
    prefix: "Mariana",
    total: 165
  },

  {
    title: "Valeria Graduation Session",
    folder: "Valeria",
    prefix: "Valeria",
    total: 159
  }
];

const graduationGallery = document.getElementById("graduation-gallery");

if (graduationGallery) {
  graduationSessions.forEach((session) => {
    const section = document.createElement("section");
    section.classList.add("gallery-section");

    const heading = document.createElement("h3");
    heading.textContent = session.title;

    const grid = document.createElement("div");
    grid.classList.add("gallery-grid");

    for (let i = 1; i <= session.total; i++) {
      const image = document.createElement("img");
image.src = `images/${session.folder}/${session.prefix}-${i}.jpg`;
image.alt = `${session.title} photo ${i}`;

image.addEventListener("error", () => {
  image.remove();
});

grid.appendChild(image);

    }

    section.appendChild(heading);
    section.appendChild(grid);
    graduationGallery.appendChild(section);
  });
}