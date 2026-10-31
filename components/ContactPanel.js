(() => {
  const ui = window.PortfolioUI;
  ui.ContactPanel = ({ email, resumeHref, resumeName = '김지연_환경교육_이력서.pdf' } = {}) => {
    const node = ui.el('div', 'contact-panel');
    const actions = ui.el('div', 'actions');
    const status = ui.Alert({ live: true, message: '' });
    status.classList.add('status-message');
    if (email) {
      node.append(ui.el('p', 'contact-email', email));
      actions.append(ui.LinkButton({ label: '이메일 보내기', href: `mailto:${encodeURIComponent(email)}`, variant: 'primary' }));
      actions.append(ui.Button({ label: '주소 복사', variant: 'secondary', onClick: async () => {
        try {
          await navigator.clipboard.writeText(email);
          status.textContent = '이메일 주소를 복사했습니다.';
        } catch {
          status.textContent = '주소를 복사하지 못했습니다. 이메일 주소를 직접 선택해 복사해주세요.';
        }
      } }));
    } else node.append(ui.el('p', '', '연락처는 준비 중입니다.'));
    if (resumeHref) actions.append(ui.LinkButton({ label: '이력서 다운로드', href: resumeHref, download: resumeName }));
    else node.append(ui.el('p', 'muted', '이력서는 준비 중입니다.'));
    node.append(actions, status);
    return node;
  };
})();
