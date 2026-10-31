(() => {
  const ui = window.PortfolioUI;
  ui.Field = ({ label, name, value = '', type = 'text', multiline = false, required = false, hint = '', autocomplete, onInput }) => {
    const id = ui.id();
    const node = ui.el('div', 'field-group');
    const caption = ui.el('label', 'field-label', `${label}${required ? ' (필수)' : ''}`);
    caption.htmlFor = id;
    const input = ui.el(multiline ? 'textarea' : 'input', 'field');
    input.id = id;
    input.name = name || id;
    input.value = value;
    input.required = required;
    if (!multiline) input.type = type;
    if (autocomplete) input.autocomplete = autocomplete;
    const help = ui.el('p', 'field-help', hint);
    help.id = `${id}-help`;
    const error = ui.el('p', 'field-error');
    error.id = `${id}-error`;
    error.hidden = true;
    error.setAttribute('aria-live', 'polite');
    input.setAttribute('aria-describedby', help.id);
    node.append(caption, input, help, error);
    const setError = (message = '') => {
      input.setAttribute('aria-invalid', String(Boolean(message)));
      input.setCustomValidity(message);
      input.setAttribute('aria-describedby', message ? `${help.id} ${error.id}` : help.id);
      error.textContent = message;
      error.hidden = !message;
    };
    input.addEventListener('input', (event) => { setError(); onInput?.(event); });
    return { element: node, input, setError };
  };
})();
