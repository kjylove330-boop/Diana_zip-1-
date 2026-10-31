(() => {
  const ui = window.PortfolioUI;
  ui.EmptyState = ({ title, description, action, headingLevel = 3 }) => {
    const node = ui.el('div', 'empty-state');
    node.append(ui.el(`h${headingLevel}`, '', title), ui.el('p', 'muted', description));
    if (action) node.append(action);
    return node;
  };
})();
