(() => {
  const ui = window.PortfolioUI;
  ui.Section = ({ id, title, description, children = [] }) => {
    const node = ui.el('section', 'section');
    node.id = id;
    const heading = ui.el('h2', '', title);
    heading.id = `${id}-title`;
    node.setAttribute('aria-labelledby', heading.id);
    node.append(heading);
    if (description) node.append(ui.el('p', 'section-description muted', description));
    node.append(...children);
    return node;
  };
  ui.Header = ({ name = '김지연', subtitle = '환경교육사', homeHref = '#main', items = [] }) => {
    const header = ui.el('header', 'site-header');
    const inner = ui.el('div', 'container header-inner');
    const brand = ui.el('a', 'brand');
    brand.href = ui.safeHref(homeHref);
    brand.append(ui.el('strong', '', name), ui.el('span', 'small muted', subtitle));
    const nav = ui.el('nav', 'nav');
    nav.setAttribute('aria-label', '주요 메뉴');
    items.forEach(({ label, href, current }) => {
      const link = ui.el('a', '', label);
      link.href = ui.safeHref(href);
      if (current) link.setAttribute('aria-current', 'page');
      nav.append(link);
    });
    inner.append(brand, nav);
    header.append(inner);
    return header;
  };
})();
