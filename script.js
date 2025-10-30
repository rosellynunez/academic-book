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

// Seleccionamos los elementos del DOM
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Evento para abrir/cerrar el menú al hacer clic en la hamburguesa
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Cierra el menú automáticamente cuando el usuario hace clic en un enlace del menú
document.querySelectorAll(".nav-menu a").forEach(link =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);


