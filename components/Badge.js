(() => {
  const ui = window.PortfolioUI;
  ui.Badge = ({ label, tone = 'neutral' }) => ui.el('span', `badge tone-${tone}`, label);
})();
