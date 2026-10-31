(() => {
  const ui = window.PortfolioUI;
  ui.Dialog = ({ title, description, confirmLabel = '삭제', onConfirm }) => {
    const node = ui.el('dialog', 'dialog');
    const heading = ui.el('h2', '', title);
    heading.id = ui.id();
    const copy = ui.el('p', 'muted', description);
    copy.id = ui.id();
    node.setAttribute('aria-labelledby', heading.id);
    node.setAttribute('aria-describedby', copy.id);
    const actions = ui.el('div', 'actions');
    const result = ui.Alert({ tone: 'error', live: true });
    result.classList.add('status-message');
    const cancel = ui.Button({ label: '취소', variant: 'secondary', onClick: () => node.close() });
    cancel.autofocus = true;
    let busy = false;
    const confirm = ui.Button({ label: confirmLabel, variant: 'danger', onClick: async () => {
      busy = true;
      confirm.setLoading(true);
      cancel.disabled = true;
      try { await onConfirm?.(); node.close('confirmed'); }
      catch { result.textContent = '처리하지 못했습니다. 다시 시도해주세요.'; }
      finally { busy = false; confirm.setLoading(false); cancel.disabled = false; }
    } });
    // 기본 대화상자가 키보드 초점을 내부에 유지하고 닫힐 때 복원합니다.
    node.addEventListener('cancel', (event) => { if (busy) event.preventDefault(); });
    actions.append(cancel, confirm);
    node.append(heading, copy, result, actions);
    return { element: node, open: () => { result.textContent = ''; node.showModal(); } };
  };
})();
