/* Pre-render reduced-motion intro gate (externalized for strict CSP) */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("intro-on");
}
