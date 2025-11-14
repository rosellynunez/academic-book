function copyText() {
    const textToCopy = document.getElementById('textToCopy');
    const copyButton = document.getElementById('copyButton');
    const codeContent = textToCopy.querySelector('code').innerText;
    
    // Usar la API moderna del portapapeles
    navigator.clipboard.writeText(codeContent).then(() => {
        // Éxito - cambiar icono
        copyButton.classList.add('copied');
        
        // Restaurar después de 2 segundos
        setTimeout(() => {
            copyButton.classList.remove('copied');
        }, 2000);
        
    }).catch(err => {
        // Fallback para navegadores antiguos
        console.error('Error al copiar: ', err);
        const range = document.createRange();
        range.selectNode(textToCopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        try {
            document.execCommand('copy');
            copyButton.classList.add('copied');
            setTimeout(() => {
                copyButton.classList.remove('copied');
            }, 2000);
        } catch (err2) {
            console.error('Fallback también falló: ', err2);
        }
        
        window.getSelection().removeAllRanges();
    });
}

// Menú hamburguesa

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
    hamburger.setAttribute("aria-expanded", "true");
    // opcional: mover foco al primer enlace para accesibilidad
    const firstLink = navMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  // función para cerrar
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    closeBtn.classList.remove("visible");

    // ocultamos completamente la X después de un breve retardo (coincidiendo con la transición)
  setTimeout(() => {
    closeBtn.style.display = "none";
  }, 300);

  hamburger.setAttribute("aria-expanded", "false");
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

  // click en algún enlace del menú cierra (ya lo querías)
  navLinks.forEach(link =>
    link.addEventListener("click", () => {
      closeMenu();
    })
  );

  // (opcional) cerrar si el usuario hace click fuera del menú - útil si el overlay no cubre toda la pantalla
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

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("[data-copy]");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.closest(".card-code");
      const codeContent = card.querySelector(".code-content");

      if (!codeContent) return;

      const text = codeContent.innerText.trim();

      try {
        await navigator.clipboard.writeText(text);

        // activate success state
        btn.classList.add("copied");

        // after 2 seconds reset
        setTimeout(() => {
          btn.classList.remove("copied");
        }, 2000);

      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  });
});
