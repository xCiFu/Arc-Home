/* ═══════════════════════════════════════════
   SAYLO — Shared HTML Partials
   Rutas relativas: funciona abriendo en local
   y desplegado en cualquier servidor.

   Lógica de base:
   - index.html  → data-page=""  → base = ""
   - pages/*.html → data-page="X" → base = "../"
═══════════════════════════════════════════ */

function getNavHTML(activePage, base) {
  return `
    <div id="cur"></div>
    <div id="cur-r"></div>

    <nav class="nav" id="nav">
      <a href="${base}index.html" class="nav__logo">
        <div class="nav__logo-dot"></div>
        SAYLO
      </a>

      <div class="nav__links">
        <a href="${base}pages/como-funciona.html" ${activePage === 'como-funciona' ? 'class="nav__link--active"' : ''}>Cómo funciona</a>
        <a href="${base}pages/precios.html"        ${activePage === 'precios'        ? 'class="nav__link--active"' : ''}>Precios</a>
        <a href="${base}pages/sobre-saylo.html"    ${activePage === 'sobre-saylo'    ? 'class="nav__link--active"' : ''}>Sobre SAYLO</a>
        <a href="${base}pages/consultoria.html"    ${activePage === 'consultoria'    ? 'class="nav__link--active"' : ''} style="color:var(--signal);">Consultoría ✦</a>
        <a href="${base}pages/precios.html" class="nav__cta">Solicitar acceso →</a>
      </div>

      <button class="nav__hamburger" id="hamburger" aria-label="Menú">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="nav__mobile" id="mobileMenu">
      <button class="nav__mobile-close" id="mobileClose">✕</button>
      <a href="${base}index.html">Inicio</a>
      <a href="${base}pages/como-funciona.html">Cómo funciona</a>
      <a href="${base}pages/precios.html">Precios</a>
      <a href="${base}pages/sobre-saylo.html">Sobre SAYLO</a>
      <a href="${base}pages/consultoria.html" style="color:var(--signal);">SAYLO Consultoría ✦</a>
      <a href="${base}pages/precios.html" style="color:var(--signal);">Solicitar acceso →</a>
    </div>
  `;
}

function getFooterHTML(base) {
  return `
    <footer class="footer">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__brand-logo">
            <div class="nav__logo-dot"></div>
            SAYLO
          </div>
          <p>El CRM que te escucha. Cotiza, gestiona y cierra negocios con tu voz. Sin tocar un formulario.</p>

        </div>

        <div class="footer__col">
          <h4>Producto</h4>
          <a href="${base}pages/como-funciona.html">Cómo funciona</a>
          <a href="${base}pages/precios.html">Precios</a>
          <a href="${base}pages/consultoria.html" style="color:var(--signal);">SAYLO Consultoría</a>
        </div>

        <div class="footer__col">
          <h4>Empresa</h4>
          <a href="${base}pages/sobre-saylo.html">Sobre SAYLO</a>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© 2025 SAYLO Technologies S.L. · Todos los derechos reservados.</p>
        <div class="footer__tagline">Di lo que necesitas. SAYLO lo hace.</div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // Leer data-page ANTES de reemplazar el nav-placeholder
  const navPlaceholder = document.getElementById('nav-placeholder');
  const page = navPlaceholder ? (navPlaceholder.dataset.page || '') : '';
  const base = page === '' ? '' : '../';

  // Inyectar nav
  if (navPlaceholder) {
    navPlaceholder.outerHTML = getNavHTML(page, base);
  }

  // Inyectar footer (base ya calculado arriba)
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = getFooterHTML(base);
  }
});
