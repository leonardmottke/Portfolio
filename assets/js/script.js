// Wird durch das onclick-Ereignis für #hamburger aufgerufen
function toggleNav(elem) {
  // Ruft die Klassenliste des aktuellen Elements ab und fügt die angegebene Klasse hinzu oder entfernt sie
  elem.classList.toggle("active");

  // Ruft das nächste Geschwisterelement des aktuellen Elements ab und macht dasselbe wie oben
  elem.nextElementSibling.classList.toggle("active");
}

let currentGallery = [];
let currentIndex = 0;

const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
  <span class="close">&times;</span>
  <span class="prev">&#10094;</span>
  <img src="" alt="">
  <span class="next">&#10095;</span>
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");

// Bilder anklickbar machen
document.querySelectorAll(".collage-container img").forEach((img) => {
  img.addEventListener("click", () => {
    const gallery = Array.from(
      img.closest(".collage-container").querySelectorAll("img"),
    );

    currentGallery = gallery;
    currentIndex = gallery.indexOf(img);

    openLightbox();
  });
});

function openLightbox() {
  updateImage();
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function updateImage() {
  lightboxImg.src = currentGallery[currentIndex].src;
}

// Navigation
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateImage();
});

closeBtn.addEventListener("click", closeLightbox);

// Klick auf Hintergrund schließt
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Tastatursteuerung (optional, aber nice)
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  }
});
