
/* ============================================================
   TARJETA DE CUMPLEAÑOS — SCRIPT PRINCIPAL (Vanilla JS)
   Contiene:
   1. Scroll suave entre portada y sección de recuerdos (index.html)
   2. Animación de entrada de las tarjetas al hacer scroll
   3. Carrusel de imágenes reutilizable (páginas internas)
   ============================================================ */
 
document.addEventListener('DOMContentLoaded', () => {
  initScrollPortada();
  initAnimacionTarjetas();
  initCarrusel();
});
 
/* ------------------------------------------------------------
   1. SCROLL SUAVE: portada <-> sección de recuerdos
   Se usa en index.html (botones #unlockBtn y #backBtn)
------------------------------------------------------------- */
function initScrollPortada() {
  const btnDesbloquear = document.getElementById('unlockBtn');
  const btnVolver = document.getElementById('backBtn');
  const seccionRecuerdos = document.getElementById('memories');
  const portada = document.getElementById('hero');
 
  if (btnDesbloquear && seccionRecuerdos) {
    btnDesbloquear.addEventListener('click', () => {
      seccionRecuerdos.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
 
  if (btnVolver && portada) {
    btnVolver.addEventListener('click', () => {
      portada.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
 
/* ------------------------------------------------------------
   2. ANIMACIÓN DE ENTRADA DE LAS TARJETAS DE RECUERDOS
   Aparecen con un suave "fade in + slide up" cuando entran
   en el viewport, y muestran un mensaje al tocar "Próximamente".
------------------------------------------------------------- */
function initAnimacionTarjetas() {
  const tarjetas = document.querySelectorAll('.memory-card');
  if (!tarjetas.length) return;
 
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = '1';
          entrada.target.style.transform = 'translateY(0)';
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );
 
  tarjetas.forEach((tarjeta, indice) => {
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(24px)';
    tarjeta.style.transition = `opacity 500ms ease ${indice * 120}ms, transform 500ms ease ${indice * 120}ms`;
    observador.observe(tarjeta);
  });
}
 
/* ------------------------------------------------------------
   3. CARRUSEL DE IMÁGENES (páginas internas)
   Estructura HTML esperada dentro de un contenedor .carrusel:
 
   <div class="carrusel">
     <button class="carrusel-flecha carrusel-flecha--izq">...</button>
     <div class="carrusel-track">
        <div class="carrusel-slide activa"> <img> </div>
        <div class="carrusel-slide"> <img> </div>
        ...
     </div>
     <button class="carrusel-flecha carrusel-flecha--der">...</button>
     <p class="carrusel-caption"></p>
     <div class="carrusel-puntos"></div>
   </div>
 
   Cada .carrusel-slide puede tener el atributo data-caption="texto"
   que se mostrará debajo del carrusel al mostrarse esa imagen.
------------------------------------------------------------- */
function initCarrusel() {
  const carruseles = document.querySelectorAll('.carrusel');
 
  carruseles.forEach((carrusel) => {
    const slides = Array.from(carrusel.querySelectorAll('.carrusel-slide'));
    const btnIzq = carrusel.querySelector('.carrusel-flecha--izq');
    const btnDer = carrusel.querySelector('.carrusel-flecha--der');
    const caption = carrusel.querySelector('.carrusel-caption');
    const contenedorPuntos = carrusel.querySelector('.carrusel-puntos');
 
    if (!slides.length) return;
 
    let indiceActual = slides.findIndex((s) => s.classList.contains('activa'));
    if (indiceActual === -1) indiceActual = 0;
 
    // Generar los puntos indicadores dinámicamente
    if (contenedorPuntos) {
      slides.forEach((_, i) => {
        const punto = document.createElement('span');
        punto.className = 'carrusel-punto' + (i === indiceActual ? ' activo' : '');
        punto.addEventListener('click', () => irASlide(i));
        contenedorPuntos.appendChild(punto);
      });
    }
 
    function actualizarVista() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('activa', i === indiceActual);
      });
 
      if (contenedorPuntos) {
        Array.from(contenedorPuntos.children).forEach((punto, i) => {
          punto.classList.toggle('activo', i === indiceActual);
        });
      }
 
      if (caption) {
        const texto = slides[indiceActual].dataset.caption || '';
        caption.style.opacity = '0';
        setTimeout(() => {
          caption.textContent = texto;
          caption.style.opacity = '1';
        }, 200);
      }
    }
 
    function irASlide(indice) {
      indiceActual = (indice + slides.length) % slides.length;
      actualizarVista();
    }
 
    if (btnIzq) btnIzq.addEventListener('click', () => irASlide(indiceActual - 1));
    if (btnDer) btnDer.addEventListener('click', () => irASlide(indiceActual + 1));
 
    // Navegación con teclado (accesibilidad)
    carrusel.setAttribute('tabindex', '0');
    carrusel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') irASlide(indiceActual - 1);
      if (e.key === 'ArrowRight') irASlide(indiceActual + 1);
    });
 
    caption.style.transition = 'opacity 200ms ease';
    actualizarVista();
  });
}
 