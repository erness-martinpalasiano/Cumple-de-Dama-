# 🎂 Tarjeta de Cumpleaños Interactiva — Edición Griega de Lujo
=======
>>>>>>> eb6751227d7941dd846febb05a6d3e7a15f1d0bd
Landing editorial hecha en **HTML5 + CSS3 + JavaScript Vanilla** (sin frameworks), diseñada para reproducir fielmente la referencia visual: mármol claro, franja cereza ondulada con frutas, título en script morado con relieve blanco, y decoraciones doradas de mitología griega.

## Cómo usarlo

1. Abrí la carpeta `cumpleanos` en VS Code.
2. Instalá la extensión **Live Server** y hacé clic derecho sobre `index.html` → "Open with Live Server" (o abrí el archivo directo con doble clic).
3. Navegá: portada → "Desbloquear recuerdos" → tarjetas de recuerdos → cada tarjeta abre su propia página con carrusel.

## Estructura

```
cumpleanos/
├── index.html            → Portada + sección de recuerdos + carrusel destacado
├── styles.css              → Todo el diseño (variables, componentes, responsive)
├── script.js                → Scroll suave, animaciones y los 2 carruseles
├── nosotros.html            → Página del recuerdo "Nosotros"
├── dama-chiquita.html       → Página del recuerdo "Dáma chiquita"
├── proximamente.html        → Página "Próximamente..."
├── img/                      → Fotos de las tarjetas y carruseles
├── assets/
│   ├── fruit-pattern.jpg      → Patrón de cerezas/frutillas de la franja superior
│   └── deco/                    → Ilustraciones doradas de mitología griega (bustos,
│                                   columnas, laureles, búhos, templo, lira, casco, etc.)
└── icons/                    → Carpeta libre para íconos adicionales que quieras sumar
```

## Imágenes

Las fotos de `img/` fueron recortadas de tu imagen de referencia como *placeholder* para que el diseño se vea completo desde ya. Reemplazalas cuando quieras por tus fotos reales, manteniendo los mismos nombres de archivo:

- `nosotros-portada.jpg`, `nosotros-principal.jpg`, `nosotros-1.jpg` a `nosotros-4.jpg`
- `dama-chiquita-portada.jpg`, `dama-chiquita-principal.jpg`, `dama-chiquita-1.jpg` a `dama-chiquita-4.jpg`
- `atardeceres.jpg` → imagen del carrusel destacado de la portada
- `proximamente-preview.jpg` → sin uso actualmente (la tarjeta "..." usa una corona de laurel dorada en su lugar)

Las ilustraciones de `assets/deco/` son recortes reales de tu hoja de referencia, ya con fondo transparente — no hace falta tocarlas, pero podés reemplazarlas por otras del mismo estilo si querés variar la decoración.

## Personalización rápida

- **Colores**: variables CSS en `:root` al inicio de `styles.css` (`--morado`, `--cereza`, `--dorado`, etc.), tomados directamente de tu imagen de referencia.
- **Carrusel destacado de la portada**: en `script.js`, función `initCarruselDestacado()`, hay un arreglo `slides` con `img`, `titulo` y `desc` — agregá, quitá o editá objetos ahí.
- **Textos de los carruseles internos**: cada `.carrusel-slide` tiene un atributo `data-caption="..."`.
<<<<<<< HEAD
- **Agregar una tarjeta nueva**: copiá el bloque `<a class="memory-card">...</a>` en `index.html` y creá una página nueva con la misma estructura que `nosotros.html`.
=======
- **Agregar una tarjeta nueva**: copiá el bloque `<a class="memory-card">...</a>` en `index.html` y creá una página nueva con la misma estructura que `nosotros.html`.
>>>>>>> eb6751227d7941dd846febb05a6d3e7a15f1d0bd
