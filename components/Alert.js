(() => {
  const ui = window.PortfolioUI;
  ui.Alert = ({ message = '', tone = 'info', live = false }) => {
    const node = ui.el('div', `alert tone-${tone}`, message);
    if (live) {
      node.setAttribute('role', tone === 'error' ? 'alert' : 'status');
      node.setAttribute('aria-atomic', 'true');
    }
    return node;
  };
})();
