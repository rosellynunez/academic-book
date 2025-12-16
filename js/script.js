// ==============================================================
// MOBILE MENU
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("mobile-nav");
  const closeBtn = document.getElementById("closeMenu");
  const navLinks = document.querySelectorAll("#mobile-nav a");

  if (!hamburger || !navMenu || !closeBtn) return;

  // Open menu
  function openMenu() {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    navMenu.classList.add("active");

    hamburger.setAttribute("aria-expanded", "true");
    closeBtn.setAttribute("aria-expanded", "true");

    const firstLink = navMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  // Close menu
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");
    closeBtn.setAttribute("aria-expanded", "false");

    hamburger.focus();
  }

  // Events
  hamburger.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) closeMenu();
    else openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);

  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("click", e => {
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
// SCROLL REVEAL
// ==============================================================

const revealSections = document.querySelectorAll('.reveal-section');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

            const delayClass = `reveal-delay-${index + 1}`;
            entry.target.classList.add(delayClass);

            entry.target.classList.add('visible');
            
            observer.unobserve(entry.target);
        }

    });
}, {
    threshold: 0.1
});

revealSections.forEach(section => revealObserver.observe(section));


// ==============================================================
// AVOIDING FRAGMENT IDENTIFIER
// ==============================================================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});