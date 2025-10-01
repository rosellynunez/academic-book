function copyText() {
  // Texto a copiar
  const textToCopy = document.getElementById('textToCopy').innerText

  // Usamos la API de Portapapeles para copiar el texto
  navigator.clipboard
    .writeText(textToCopy)
    .then(function () {
      // Cambiar el texto del botón y deshabilitar el botón
      document.getElementById('copyButton').innerText = '✓ Copiado'
      document.getElementById('copyButton').disabled = true

      // Dejar el botón como en el estado inicial al cabo de 2 segundos
      setTimeout(function () {
        document.getElementById('copyButton').innerText = 'Copiar'
        document.getElementById('copyButton').disabled = false
      }, 2000)
    })
    .catch(function (err) {
      console.error('Imposible copiar el texto', err)
    })
}