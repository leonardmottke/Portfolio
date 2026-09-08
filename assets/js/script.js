// Wird durch das onclick-Ereignis für #hamburger aufgerufen
function toggleNav(elem) {
  // Ruft die Klassenliste des aktuellen Elements ab und fügt die angegebene Klasse hinzu oder entfernt sie
  elem.classList.toggle("active");

  // Ruft das nächste Geschwisterelement des aktuellen Elements ab und macht dasselbe wie oben
  elem.nextElementSibling.classList.toggle("active");
}

// Mobile Dropdown-Funktionalität
document.addEventListener("DOMContentLoaded", () => {
  const dropdownLinks = document.querySelectorAll(".dropdown > a");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Nur auf Mobile (max-width: 850px)
      if (window.innerWidth <= 850) {
        const dropdown = link.parentElement;

        // Wenn Dropdown bereits offen, lass die Navigation zu
        if (dropdown.classList.contains("active")) {
          // Dropdown ist offen, navigiere normal
          return;
        }

        // Wenn Dropdown geschlossen, öffne es und verhindere Navigation
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.add("active");
      }
    });
  });

  // Sub-Links (innerhalb des Dropdowns) navigieren normal
  const subLinks = document.querySelectorAll(".sub-list a");
  subLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 850) {
        document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });
  });

  // Fenster-Resize-Event, um Hover-Verhalten zurückzusetzen
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Schließe Dropdowns, wenn man außerhalb klickt (nur Mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 850) {
      const dropdowns = document.querySelectorAll(".dropdown.active");
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("active");
        }
      });
    }
  });

  // Lazy Loading für vorhandene Bilder im aktuellen Ordner
  document.querySelectorAll("img").forEach((img, index) => {
    if (!img.hasAttribute("loading")) {
      img.loading = index < 3 ? "eager" : "lazy";
    }

    if (!img.hasAttribute("decoding")) {
      img.decoding = "async";
    }
  });
});

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
