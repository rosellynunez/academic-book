// ==============================================================
// MOBILE MENU
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const closeBtn = document.getElementById("closeMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (!hamburger || !navMenu || !closeBtn) return;

  // función para abrir
  function openMenu() {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    closeBtn.classList.add("visible");   // muestra el botón X
    closeBtn.style.display = "flex";     // por si el CSS tarda

    // ARIA
    hamburger.setAttribute("aria-expanded", "true");
    closeBtn.setAttribute("aria-expanded", "true");

    // Move focus inside menu
    const firstLink = navMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  // función para cerrar
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    closeBtn.classList.remove("visible");

     // ARIA
    hamburger.setAttribute("aria-expanded", "false");
    closeBtn.setAttribute("aria-expanded", "false");

    // ocultamos completamente la X después de un breve retardo (coincidiendo con la transición)
    setTimeout(() => {
    closeBtn.style.display = "none";
    }, 300);

    hamburger.focus();
}

  // toggle con la hamburguesa
  hamburger.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) closeMenu();
    else openMenu();
  });

  // click en la X cierra
  closeBtn.addEventListener("click", () => {
    closeMenu();
  });

  // close menu when clicking a link
  navLinks.forEach(link =>
    link.addEventListener("click", () => {
      closeMenu();
    })
  );

  //  Close clicking outside menu
  document.addEventListener("click", (e) => {
    // si el menú está abierto y el click es fuera del navMenu y fuera del hamburger y fuera del closeBtn -> cerrar
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target) &&
      !closeBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });
});


// ==============================================================
// COPY BUTTON
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("[data-copy]");
  const liveStatus = document.getElementById("copyStatus");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".card-code");
      const codeContent = card.querySelector(".code-content");

      if (!codeContent) return;

      const text = codeContent.innerText.trim();

      try {
        await navigator.clipboard.writeText(text);

        // Success UI
        btn.classList.add("copied");
        if (liveStatus) {
          liveStatus.textContent = "Code copied to clipboard.";
        }

        // reset
        setTimeout(() => {
          btn.classList.remove("copied");
          if (liveStatus) liveStatus.textContent = "";
        }, 2000);

      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  });
});


// ==============================================================
// SCROLL REVEAL (Intersection Observer)
// ==============================================================

// Seleccionamos todas las secciones que queremos animar
const revealSections = document.querySelectorAll('.reveal-section');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

            // Agregamos delay dinámico por índice (cascada)
            const delayClass = `reveal-delay-${index + 1}`;
            entry.target.classList.add(delayClass);

            // Agregamos la clase que activa la animación
            entry.target.classList.add('visible');
            
            // Dejamos de observarla (solo se anima una vez)
            observer.unobserve(entry.target);
        }

    });
}, {
    threshold: 0.1 // Se activa cuando el 10% de la sección es visible
});

// Iniciamos la observación
revealSections.forEach(section => revealObserver.observe(section));


// ==============================================================
// AVOIDING FRAGMENT IDENTIFIER (contains hash)
// ==============================================================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});


