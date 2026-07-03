//Diese Funktion sorgt dafür, dass sich die verschiedenen Bilder auf der Home-Seite, langsam abwechseln

/**var slideIndex = 0;
kreisel();

function kreisel() {
  var i;
  var x = document.getElementsByClassName("Slid");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(kreisel, 3000);
}
**/

// slider.js
// Slideshow: Auto 3s pro Bild, Pfeile, Dots, Pause on hover, Keyboard-Steuerung

(function () {
  const slider = document.querySelector(".meinSlider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".Slid"));
  if (slides.length === 0) return;

  const INTERVAL = 3000; // 3 Sekunden
  let current = 0;
  let timerId = null;
  let isPaused = false;

  // ---- Hilfsfunktionen ----
  function setActive(index) {
    index = ((index % slides.length) + slides.length) % slides.length;
    // Bilder
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    // Dots
    const dots = slider.querySelectorAll(".slider-dots button");
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    current = index;
  }

  function nextSlide() {
    setActive(current + 1);
  }
  function prevSlide() {
    setActive(current - 1);
  }

  function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
      if (!isPaused) nextSlide();
    }, INTERVAL);
  }
  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }
  function resetTimer() {
    startTimer();
  }

  // ---- UI: Pfeile ----
  const leftBtn = document.createElement("button");
  leftBtn.className = "slider-arrow left";
  leftBtn.setAttribute("aria-label", "Vorheriges Bild");
  leftBtn.innerHTML = "&#10094;"; // ‹
  leftBtn.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  const rightBtn = document.createElement("button");
  rightBtn.className = "slider-arrow right";
  rightBtn.setAttribute("aria-label", "Nächstes Bild");
  rightBtn.innerHTML = "&#10095;"; // ›
  rightBtn.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  slider.appendChild(leftBtn);
  slider.appendChild(rightBtn);

  // ---- UI: Dots ----
  const dotsWrap = document.createElement("div");
  dotsWrap.className = "slider-dots";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Gehe zu Bild ${i + 1}`);
    b.addEventListener("click", () => {
      setActive(i);
      resetTimer();
    });
    dotsWrap.appendChild(b);
  });
  slider.appendChild(dotsWrap);

  // ---- Verhalten: Hover to pause ----
  slider.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  slider.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // ---- Keyboard navigation (links/rechts) ----
  slider.addEventListener("focusin", () => {
    /* wenn Fokus im Slider ist */
  });
  document.addEventListener("keydown", (ev) => {
    // nur reagieren, wenn Slider sichtbar auf Seite ist
    if (!document.body.contains(slider)) return;
    // außerdem nur wenn der Slider im Viewport ist (kleiner Check)
    const rect = slider.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    if (ev.key === "ArrowLeft") {
      prevSlide();
      resetTimer();
    }
    if (ev.key === "ArrowRight") {
      nextSlide();
      resetTimer();
    }
  });

  // ---- Initialisierung ----
  setActive(0);
  startTimer();

  // Optional: falls Bilder unterschiedlich groß sind, kann man Container-Höhe dynamisch anpassen:
  // hier setzen wir min-height basierend auf dem ersten Bild (nur, wenn Höhe nicht per CSS festgelegt)
  (function adjustHeightFromFirstImg() {
    const first = slides[0];
    if (!first) return;
    // versuchen, wenn Bild geladen ist
    if (first.complete && first.naturalHeight) {
      // nichts tun, CSS legt Höhe. Falls du automatische Höhe willst, entferne/comment die CSS-Höhe.
    } else {
      first.addEventListener("load", () => {
        // keine automatische Anpassung vorgenommen, nur als Hook falls benötigt
      });
    }
  })();
})();
