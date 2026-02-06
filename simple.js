// Simple theme JS: tiny helpers only.
(function () {
  // Optional: close mode gate if present and already decided (defensive).
  try {
    if (localStorage.getItem('siteMode')) {
      const gate = document.getElementById('modeGate');
      if (gate) gate.classList.remove('mode-gate--active');
      document.body.classList.remove('mode-gate-open');
      document.documentElement.classList.add('mode-gate-skip');
    }
  } catch (_) {}
})();

