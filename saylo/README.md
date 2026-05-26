# SAYLO — Proyecto Web

## Estructura de archivos

```
saylo/
├── index.html                  # Homepage
├── pages/
│   ├── precios.html            # Página de precios
│   ├── como-funciona.html      # Cómo funciona el producto
│   └── sobre-saylo.html        # Sobre nosotros
│
├── css/
│   ├── tokens.css              # Variables de diseño (colores, tipografía, spacing)
│   ├── base.css                # Reset, estilos base, scroll reveal
│   ├── components.css          # Botones, pills, badges, waveform, KPI cards
│   ├── nav-footer.css          # Navegación y footer
│   ├── sections.css            # Estilos de cada sección (hero, how, features, pricing...)
│   └── mockups.css             # Mockup de la app y dashboard
│
├── js/
│   ├── partials.js             # Inyección de nav y footer (HTML compartido)
│   └── main.js                 # Cursor, scroll, nav, reveal, pricing toggle, CTA
│
└── assets/
    └── icons/                  # Iconos SVG (añadir según necesidad)
```

---

## Sistema de diseño

### Colores
| Token            | Valor     | Uso                                  |
|------------------|-----------|--------------------------------------|
| `--void`         | `#080810` | Fondo base oscuro                    |
| `--void-2`       | `#0F0F1A` | Fondo secundario                     |
| `--void-3`       | `#161625` | Fondo terciario / cards              |
| `--signal`       | `#FF4D00` | Primario — botones, acciones, énfasis |
| `--pulse`        | `#00E5A0` | Éxito / confirmación                 |
| `--sky`          | `#00D4FF` | Procesando / IA                       |
| `--violet`       | `#8B5CF6` | Acento secundario                    |

### Tipografía
- **Display / Headings**: Geist 700/800
- **Body / UI**: Geist 300/400/500
- Ambas cargadas desde Google Fonts

### Clases de utilidad
- `.r` — Elemento con scroll reveal (añadir `.v` para mostrar)
- `.d1` `.d2` `.d3` `.d4` — Delays de animación (0.08s, 0.16s, 0.24s, 0.32s)
- `.btn--primary` `.btn--outline` `.btn--ghost` `.btn--text` — Variantes de botón
- `.pill--listening` `.pill--processing` `.pill--done` — Pills de estado de voz
- `.tag--signal` `.tag--sky` `.tag--pulse` `.tag--violet` — Etiquetas de sección

---

## Cómo añadir una nueva página

1. Duplica cualquier archivo en `/pages/`
2. Actualiza `<meta name="description">` y `<title>`
3. Cambia `data-page=""` en `#nav-placeholder` al ID de la nueva página
4. Añade el link en `partials.js` → función `getNavHTML()`
5. Enlaza al footer en `getFooterHTML()` si es necesario

---

## Cómo añadir una nueva sección

1. Añade los estilos en `css/sections.css`
2. Añade el HTML en el archivo de página correspondiente
3. Usa la clase `.r` + `.d1/.d2/.d3` para animaciones de entrada

---

## Para producción

- Minificar CSS: `css/tokens.css` → `css/base.css` → `css/components.css` → `css/nav-footer.css` → `css/sections.css` → `css/mockups.css`
- Considerar bundler (Vite, Parcel) para concatenar y minificar
- Añadir `<link rel="icon">` con el favicon de SAYLO
- Implementar analytics en `main.js`
- Sustituir `partials.js` por un sistema de templating real (Astro, Next.js, etc.) en escala
