// Mode gate: prompt user for Simple vs Colorful experience.
// Applies site-wide via localStorage and redirects to matching pages.
(function () {
  const MODE_KEY = 'siteMode'; // 'simple' | 'colorful'

  function getFileName() {
    const p = window.location.pathname || '';
    const file = p.split('/').pop();
    return file && file.length ? file : 'index.html';
  }

  function isSimpleFile(file) {
    return /-simple\.html$/i.test(file);
  }

  function toSimpleFile(file) {
    if (!/\.html$/i.test(file)) return 'index-simple.html';
    if (isSimpleFile(file)) return file;
    return file.replace(/\.html$/i, '-simple.html');
  }

  function toColorfulFile(file) {
    if (!/\.html$/i.test(file)) return 'index.html';
    return file.replace(/-simple\.html$/i, '.html');
  }

  function redirectToMode(mode) {
    const file = getFileName();
    const hash = window.location.hash || '';
    const target = mode === 'simple' ? toSimpleFile(file) : toColorfulFile(file);
    if (target !== file) window.location.href = target + hash;
  }

  function setMode(mode) {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch (_) {}
    redirectToMode(mode);
  }

  function getStoredMode() {
    try {
      return localStorage.getItem(MODE_KEY);
    } catch (_) {
      return null;
    }
  }

  const stored = getStoredMode();
  const file = getFileName();
  const onSimple = isSimpleFile(file);

  function initModeToggle() {
    const toggle = document.querySelector('[data-mode-toggle]');
    if (!toggle) return;

    const targetMode = onSimple ? 'colorful' : 'simple';
    const label = onSimple ? 'Switch to Colorful' : 'Switch to Simple';
    toggle.textContent = label;
    toggle.setAttribute('aria-label', label);
    toggle.addEventListener('click', () => setMode(targetMode));
  }

  function initModeToggleWhenReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initModeToggle, { once: true });
    } else {
      initModeToggle();
    }
  }

  // If user already chose, enforce it immediately.
  if (stored === 'simple' && !onSimple) {
    redirectToMode('simple');
    return;
  }
  if (stored === 'colorful' && onSimple) {
    redirectToMode('colorful');
    return;
  }

  initModeToggleWhenReady();
})();

