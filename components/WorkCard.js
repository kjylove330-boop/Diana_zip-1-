(() => {
  const ui = window.PortfolioUI;
  ui.WorkCard = ({ title, category, period, description, href, image, imageAlt = '' }) => {
    const node = ui.el('a', 'work-card');
    node.href = ui.safeHref(href);
    const cover = ui.el('div', 'work-card__cover');
    if (image) {
      const img = ui.el('img');
      img.src = ui.safeHref(image);
      img.alt = imageAlt;
      img.loading = 'lazy';
      cover.append(img);
    } else cover.append(ui.el('span', '', category));
    const body = ui.el('div', 'work-card__body');
    body.append(ui.Badge({ label: category, tone: 'success' }), ui.el('h3', '', title), ui.el('p', '', description), ui.el('p', 'muted small', period));
    node.append(cover, body);
    return node;
  };
})();
