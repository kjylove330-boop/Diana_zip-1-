(() => {
  const ui = window.PortfolioUI;
  ui.SkillCard = ({ title, number, description }) => {
    const node = ui.el('article', 'skill-card');
    const marker = ui.el('span', 'skill-card__number', number);
    marker.setAttribute('aria-hidden', 'true');
    node.append(marker, ui.el('h3', '', title));
    if (description) node.append(ui.el('p', 'muted', description));
    return node;
  };
})();
