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
  const btnAccesoAtardeceres = document.getElementById('btnAccesoAtardeceres');
  const seccionRecuerdos = document.getElementById('memories');
  const portada = document.getElementById('hero');
  const seccionDestacada = document.getElementById('destacadaHome');

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
  // Acceso rápido junto a la tarjeta "Próximamente": baja directo a Atardeceres
  if (btnAccesoAtardeceres && seccionDestacada) {
    btnAccesoAtardeceres.addEventListener('click', () => {
      seccionDestacada.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
   Un único bloque de imagen/video + texto cuyo contenido se
   reemplaza mediante JavaScript (fade) al presionar las flechas.
   Cada diapositiva puede ser de tipo 'img', 'video' o 'cierre'
   (esta última sin contenido multimedia, solo decorativa).
------------------------------------------------------------- */
function initCarruselDestacado() {
  const bloque = document.getElementById('destacadaHome');
  if (!bloque) return;

  const mediaWrap = document.getElementById('destacadaMediaWrap');
  const titulo = document.getElementById('destacadaTitulo');
  const desc = document.getElementById('destacadaDesc');
  const puntosCont = document.getElementById('destacadaPuntos');
  const btnIzq = bloque.querySelector('.flecha-circular--izq');
  const btnDer = bloque.querySelector('.flecha-circular--der');

  // Contenido de cada diapositiva. Editá este arreglo para cambiar
  // el material y los textos del carrusel destacado de la portada.
  const slides = [
    { tipo: 'img', src: 'img/destacada/recuerdo-1.jpg', texto: 'Que nuestras manos se unan en un lazo eterno, que nuestras almas sean una, junto al amor sincero.' },
    { tipo: 'img', src: 'img/destacada/recuerdo-2.jpg', texto: '"Y aunque no tengamos mil fotos, tenemos algo mucho más nuestro. Tenemos esos recuerdos que guardamos en el corazón, entre risas, caminatas y los chistes espontáneos."' },
    { tipo: 'img', src: 'img/destacada/recuerdo-3.jpg', texto: '"Cada salida tiene su encanto: una Monster, algo de picar, y la certeza de que el tiempo pasa distinto juntos. Momentos simples que con vos quiero que sean eternos."' },
    { tipo: 'img', src: 'img/destacada/recuerdo-4.jpg', texto: '"Ay mi amorcito lindo... cómo te amo... saber y estar consciente de que te tengo en mi vida me hace olvidar casi todos mis problemas."' },
    { tipo: 'video', src: 'img/destacada/recuerdo-5.mp4', texto: '"Los momentos juntos pasan volando y quisiera siempre volver, porque abrazarte tanto tiempo hasta sentirme completa es lo que más me hace feliz."' },
    { tipo: 'img', src: 'img/destacada/recuerdo-6.jpg', texto: '"Ojalá que esta dicha dure para siempre, hasta las estrellas, como Hypnos y Pasítea. Y por favor, si muero y me buscás en el inframundo, ¡no mires hacia atrás! Está seguro que voy detrás tuyo."' },
    { tipo: 'video', src: 'img/destacada/recuerdo-7.mp4', texto: '"Desde la primera vez que te vi, ya no quise estar con nadie más. No tengo mucho que ofrecerte, solo todo mi amor."' },
    { tipo: 'video', src: 'img/destacada/recuerdo-8.mp4', texto: '"No hay mucho que decir mi amor, si todo nuestro cariño está presente todos los días en nuestras charlas, en nuestros chats y en nuestras miradas."' },
    { tipo: 'video', src: 'img/destacada/recuerdo-9.mp4', texto: '"¿Cómo no amarte si en tu risa cabe el mundo y en tu abrazo el tiempo se detiene?"' },
    { tipo: 'video', src: 'img/destacada/recuerdo-10.mp4', texto: '"Si te caes, te levanto y, si no puedo, me tumbo a tu lado.' },
    { tipo: 'img', src: 'img/destacada/recuerdo-11.jpg', texto: 'Gracias por cada momento compartido, en los cuales me fui enamorando cada vez más de vos.' },
  ];

  let indiceActual = 0;

  // Ícono decorativo utilizado en la diapositiva de cierre (sin foto/video)
  const svgCierre = `
    <div class="destacada__cierre">
      <svg viewBox="0 0 100 100"><use href="#icon-destacada-cierre"></use></svg>
    </div>`;

  slides.forEach((_, i) => {
    const punto = document.createElement('span');
    punto.className = 'carrusel-punto' + (i === 0 ? ' activo' : '');
    punto.addEventListener('click', () => irASlide(i));
    puntosCont.appendChild(punto);
  });

  function renderMedia(slide) {
    if (slide.tipo === 'img') {
      mediaWrap.innerHTML = `<img id="destacadaImg" src="${slide.src}" alt="Atardeceres que se quedan" />`;
    } else if (slide.tipo === 'video') {
      mediaWrap.innerHTML = `<video id="destacadaImg" src="${slide.src}" controls playsinline preload="metadata"></video>`;
    } else {
      mediaWrap.innerHTML = svgCierre;
    }
  }

  function actualizarVista() {
    const data = slides[indiceActual];

    mediaWrap.style.transition = 'opacity 350ms ease';
    mediaWrap.style.opacity = '0';
    titulo.style.transition = 'opacity 300ms ease';
    desc.style.transition = 'opacity 300ms ease';
    titulo.style.opacity = '0';
    desc.style.opacity = '0';

    setTimeout(() => {
      renderMedia(data);
      desc.textContent = data.texto;
      mediaWrap.style.opacity = '1';
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

  // Pintar la primera diapositiva sin esperar al primer clic
  renderMedia(slides[0]);
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
    // Los carruseles marcados como decorativos (ej. proximamente.html) se
    // muestran con el mismo estilo visual pero no reciben interactividad.
    if (carrusel.dataset.decorativo === 'true') return;

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
