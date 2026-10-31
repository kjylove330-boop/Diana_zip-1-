(() => {
  const ui = window.PortfolioUI;
  ui.Button = ({ label, variant = 'primary', size = 'medium', disabled = false, onClick, type = 'button' }) => {
    const node = ui.el('button', `button button--${variant} button--${size}`, label);
    node.type = type;
    node.disabled = disabled;
    if (onClick) node.addEventListener('click', onClick);
    // 처리 중에도 버튼 너비와 기존 비활성 상태를 유지합니다.
    node.setLoading = (loading, message = '처리 중…') => {
      if (loading) node.style.minWidth = `${node.getBoundingClientRect().width}px`;
      else node.style.minWidth = '';
      node.disabled = loading || disabled;
      node.setAttribute('aria-busy', String(loading));
      node.textContent = loading ? message : label;
    };
    return node;
  };
  ui.LinkButton = ({ label, href, variant = 'secondary', size = 'medium', download }) => {
    const node = ui.el('a', `button button--${variant} button--${size}`, label);
    node.href = ui.safeHref(href);
    if (download !== undefined) node.download = download;
    return node;
  };
})();
