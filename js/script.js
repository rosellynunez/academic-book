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
