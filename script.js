/* ============================================================
   TARJETA DE CUMPLEAÑOS — SCRIPT PRINCIPAL (Vanilla JS)
   1. Scroll suave portada <-> recuerdos
   2. Animación de entrada de tarjetas
   3. Carrusel "destacado" de la portada (index.html)
   4. Carrusel de imágenes de las páginas internas
   5. Mensaje "Próximamente"
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollPortada();
  initAnimacionTarjetas();
  initCarruselDestacado();
  initCarruselInterno();
});

/* ------------------------------------------------------------
   1. SCROLL SUAVE: portada <-> sección de recuerdos
------------------------------------------------------------- */
function initScrollPortada() {
  const btnDesbloquear = document.getElementById('unlockBtn');
  const btnVolver = document.getElementById('backBtn');
  const btnVolverArriba = document.getElementById('ctaVolverArriba');
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
  if (btnVolverArriba && portada) {
    btnVolverArriba.addEventListener('click', () => {
      portada.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/* ------------------------------------------------------------
   2. ANIMACIÓN DE ENTRADA DE LAS TARJETAS DE RECUERDOS
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
   3. CARRUSEL "DESTACADO" DE LA PORTADA (index.html)
   Un único bloque de imagen + texto cuyo contenido se reemplaza
   mediante JavaScript (fade + slide) al presionar las flechas.
------------------------------------------------------------- */
function initCarruselDestacado() {
  const bloque = document.getElementById('destacadaHome');
  if (!bloque) return;

  const img = document.getElementById('destacadaImg');
  const titulo = document.getElementById('destacadaTitulo');
  const desc = document.getElementById('destacadaDesc');
  const puntosCont = document.getElementById('destacadaPuntos');
  const btnIzq = bloque.querySelector('.flecha-circular--izq');
  const btnDer = bloque.querySelector('.flecha-circular--der');

  // Contenido de cada diapositiva. Editá este arreglo para cambiar
  // las imágenes y textos del carrusel destacado de la portada.
  const slides = [
    { img: 'img/atardeceres.jpg', titulo: 'Atardeceres que se quedan', desc: 'Cada momento contigo ha sido un regalo. Gracias por ser parte de mis mejores recuerdos.' },
    { img: 'img/nosotros-1.jpg', titulo: 'Risas compartidas', desc: 'De las charlas sin fin a las carcajadas de madrugada: así construimos nuestra historia.' },
    { img: 'img/dama-chiquita-1.jpg', titulo: 'Pequeños grandes momentos', desc: 'Los instantes más simples se volvieron los más importantes de todos.' },
  ];

  let indiceActual = 0;

  slides.forEach((_, i) => {
    const punto = document.createElement('span');
    punto.className = 'carrusel-punto' + (i === 0 ? ' activo' : '');
    punto.addEventListener('click', () => irASlide(i));
    puntosCont.appendChild(punto);
  });

  function actualizarVista(direccion) {
    const data = slides[indiceActual];

    img.style.transition = 'opacity 350ms ease';
    img.style.opacity = '0';
    titulo.style.transition = 'opacity 300ms ease';
    desc.style.transition = 'opacity 300ms ease';
    titulo.style.opacity = '0';
    desc.style.opacity = '0';

    setTimeout(() => {
      img.src = data.img;
      titulo.textContent = data.titulo;
      desc.textContent = data.desc;
      img.style.opacity = '1';
      titulo.style.opacity = '1';
      desc.style.opacity = '1';
    }, 260);

    Array.from(puntosCont.children).forEach((punto, i) => {
      punto.classList.toggle('activo', i === indiceActual);
    });
  }

  function irASlide(indice) {
    indiceActual = (indice + slides.length) % slides.length;
    actualizarVista();
  }

  if (btnIzq) btnIzq.addEventListener('click', () => irASlide(indiceActual - 1));
  if (btnDer) btnDer.addEventListener('click', () => irASlide(indiceActual + 1));
}

/* ------------------------------------------------------------
   4. CARRUSEL DE IMÁGENES — páginas internas (nosotros / dama-chiquita)
   Estructura esperada dentro de un contenedor .carrusel:

   <div class="carrusel">
     <button class="flecha-circular flecha-circular--izq">...</button>
     <div class="carrusel-track">
        <div class="carrusel-slide activa" data-caption="texto"> <img> </div>
        ...
     </div>
     <button class="flecha-circular flecha-circular--der">...</button>
     <p class="carrusel-caption"></p>
   </div>
------------------------------------------------------------- */
function initCarruselInterno() {
  const carruseles = document.querySelectorAll('.carrusel');

  carruseles.forEach((carrusel) => {
    const slides = Array.from(carrusel.querySelectorAll('.carrusel-slide'));
    const btnIzq = carrusel.querySelector('.flecha-circular--izq');
    const btnDer = carrusel.querySelector('.flecha-circular--der');
    const caption = carrusel.querySelector('.carrusel-caption');

    if (!slides.length) return;

    let indiceActual = slides.findIndex((s) => s.classList.contains('activa'));
    if (indiceActual === -1) indiceActual = 0;

    function actualizarVista() {
      slides.forEach((slide, i) => slide.classList.toggle('activa', i === indiceActual));

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

    carrusel.setAttribute('tabindex', '0');
    carrusel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') irASlide(indiceActual - 1);
      if (e.key === 'ArrowRight') irASlide(indiceActual + 1);
    });

    if (caption) caption.style.transition = 'opacity 200ms ease';
    actualizarVista();
  });
}
