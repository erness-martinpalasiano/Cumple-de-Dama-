# Cumple-de-D-ma-
# 🎂 Tarjeta de Cumpleaños Interactiva

Proyecto hecho en **HTML5 + CSS3 + JavaScript Vanilla** (sin frameworks ni librerías).

## Cómo usarlo

1. Abrí la carpeta `cumpleanos` en VS Code.
2. Instalá la extensión **Live Server** (opcional pero recomendada) y hacé clic derecho sobre `index.html` → "Open with Live Server". También podés abrir `index.html` directamente en el navegador con doble clic.
3. Navegá: portada → botón "Desbloquear recuerdos" → tarjetas → cada tarjeta abre su propia página con carrusel.

## Estructura

```
cumpleanos/
├── index.html          → Portada + sección de recuerdos
├── styles.css           → Todos los estilos (variables, componentes, responsive)
├── script.js             → Scroll suave, animación de tarjetas y carrusel
├── nosotros.html         → Página del recuerdo "Nosotros"
├── dama-chiquita.html    → Página del recuerdo "Dama chiquita"
├── proximamente.html     → Página "Próximamente..."
├── img/                  → Poné acá tus fotos (ver abajo)
├── assets/                → Recursos adicionales opcionales
└── icons/                 → Recursos adicionales opcionales (los íconos griegos ya están embebidos como SVG dentro de cada HTML, no hace falta archivo aparte)
```

## Imágenes

La carpeta `img/` está vacía porque no había fotos reales para incluir. Mientras tanto, cada `<img>` tiene un `onerror` que muestra una imagen de reemplazo (placeholder) para que el diseño se vea completo desde ya.

Para poner tus propias fotos, agregá archivos con estos nombres exactos dentro de `img/` (o cambiá las rutas en el HTML si preferís otros nombres):

- `nosotros-portada.jpg`, `nosotros-principal.jpg`, `nosotros-1.jpg` a `nosotros-4.jpg`
- `dama-chiquita-portada.jpg`, `dama-chiquita-principal.jpg`, `dama-chiquita-1.jpg` a `dama-chiquita-4.jpg`

Una vez que agregues las imágenes con esos nombres, el `onerror` deja de activarse automáticamente y se muestran tus fotos reales.

## Personalización rápida

- **Colores**: todos están centralizados como variables CSS al inicio de `styles.css` (`:root { --morado, --cereza, --dorado, ... }`).
- **Textos del carrusel**: cada `.carrusel-slide` tiene un atributo `data-caption="..."` con el texto que aparece debajo de la imagen.
- **Agregar una tarjeta nueva**: copiá el bloque `<a class="memory-card">...</a>` en `index.html` y creá una nueva página HTML con la misma estructura que `nosotros.html`.
