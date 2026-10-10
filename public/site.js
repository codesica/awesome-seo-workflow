for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(source.textContent);
      button.textContent = 'Copied';
      document.getElementById('copy-status').textContent = 'Copied to clipboard.';
    } catch {
      button.textContent = 'Select and copy';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(source); selection.removeAllRanges(); selection.addRange(range);
      document.getElementById('copy-status').textContent = 'Text selected. Use your keyboard to copy.';
    }
  });
}
