(() => {
  const ui = window.PortfolioUI;
  ui.FileUpload = ({ label = '이력서 PDF', kind = 'pdf', maxCount = 1, maxMB = 10, onChange }) => {
    const node = ui.el('div', 'upload');
    const id = ui.id();
    const caption = ui.el('label', 'field-label', label);
    caption.htmlFor = id;
    const input = ui.el('input', 'file-input');
    input.type = 'file';
    input.id = id;
    input.multiple = maxCount > 1;
    const types = kind === 'image' ? ['image/jpeg', 'image/png', 'image/webp'] : ['application/pdf'];
    const extensions = kind === 'image' ? /\.(jpe?g|png|webp)$/i : /\.pdf$/i;
    input.accept = types.join(',');
    const hint = ui.el('p', 'field-help', `${kind === 'image' ? 'JPG, PNG, WebP' : 'PDF'} · 파일당 ${maxMB}MB 이하 · 최대 ${maxCount}개. 선택한 파일은 서버에 전송되지 않습니다.`);
    hint.id = `${id}-hint`;
    input.setAttribute('aria-describedby', hint.id);
    const feedback = ui.Alert({ live: true, tone: 'error' });
    feedback.classList.add('status-message');
    const list = ui.el('ul', 'file-list');
    let files = [];
    const render = () => {
      list.replaceChildren();
      files.forEach((file, index) => {
        const row = ui.el('li', 'file-row');
        row.append(ui.el('span', '', `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)}MB`));
        const remove = ui.Button({ label: '제거', size: 'small', variant: 'text', onClick: () => {
          files.splice(index, 1); render(); onChange?.([...files]); input.focus();
        } });
        remove.setAttribute('aria-label', `${file.name} 제거`);
        row.append(remove);
        list.append(row);
      });
    };
    input.addEventListener('change', () => {
      const next = Array.from(input.files);
      input.value = '';
      if (!next.length) return;
      // 브라우저 검사는 사용 편의용이며 서버에서 실제 형식을 다시 검사해야 합니다.
      if (next.length > maxCount || next.some(file => file.size > maxMB * 1024 * 1024 || !extensions.test(file.name) || (file.type && !types.includes(file.type)))) {
        feedback.textContent = `파일 형식, ${maxMB}MB 용량 제한, 최대 ${maxCount}개 조건을 확인해주세요.`;
        return;
      }
      files = next;
      feedback.textContent = '';
      render();
      onChange?.([...files]);
    });
    node.append(caption, hint, input, feedback, list);
    return { element: node, getFiles: () => [...files] };
  };
})();
