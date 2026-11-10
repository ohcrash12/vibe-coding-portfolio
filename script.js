(() => {
  const ARTBOARD_W = 900;
  const ARTBOARD_H = 1240;

  const page = document.querySelector("[data-artboard]");
  const scaler = document.querySelector("[data-scaler]");
  const panels = document.querySelectorAll("[data-panel]");
  const links = document.querySelectorAll("[data-panel-link]");
  const brandLabel = document.querySelector("[data-brand-label]");

  const labels = {
    about: "About Me",
    portfolio: "Portfolio",
  };

  const fitArtboard = () => {
    if (!page || !scaler) return;

    const scale = Math.min(
      window.innerWidth / ARTBOARD_W,
      window.innerHeight / ARTBOARD_H
    );

    scaler.style.width = `${ARTBOARD_W * scale}px`;
    scaler.style.height = `${ARTBOARD_H * scale}px`;
    page.style.transform = `scale(${scale})`;
  };

  const showPanel = (name) => {
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === name);
    });

    links.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.dataset.panelLink === name && link.classList.contains("sidebar__link")
      );
    });

    if (brandLabel) {
      brandLabel.textContent = labels[name] || "About Me";
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPanel(link.dataset.panelLink);
    });
  });

  let resizeTick = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeTick);
    resizeTick = requestAnimationFrame(fitArtboard);
  });

  fitArtboard();
})();
