// 모든 컴포넌트가 사용하는 안전한 요소 생성 도우미입니다.
window.PortfolioUI = {};
(() => {
  let sequence = 0;
  const ui = window.PortfolioUI;
  ui.id = () => `portfolio-${++sequence}`;
  ui.el = (tag, className = '', text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  ui.safeHref = (value) => {
    const url = new URL(value, document.baseURI);
    if (!['http:', 'https:', 'mailto:', 'file:'].includes(url.protocol)) {
      throw new Error('지원하지 않는 링크 형식입니다.');
    }
    return value;
  };
})();
