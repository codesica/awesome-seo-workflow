const chinese = document.documentElement.lang.startsWith('zh');
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(source.textContent);
      button.textContent = chinese ? '已复制' : 'Copied';
      document.getElementById('copy-status').textContent = chinese ? '已复制到剪贴板。' : 'Copied to clipboard.';
    } catch {
      button.textContent = chinese ? '选择并复制' : 'Select and copy';
      const selection = window.getSelection(), range = document.createRange();
      range.selectNodeContents(source); selection.removeAllRanges(); selection.addRange(range);
      document.getElementById('copy-status').textContent = chinese ? '已选择文本，请用键盘复制。' : 'Text selected. Use your keyboard to copy.';
    }
  });
}
const tabs = [...document.querySelectorAll('[data-demo-tab]')];
function selectTab(button, focus = false) {
  for (const tab of tabs) {
    const active = tab === button;
    tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
    document.querySelector(`[data-demo-panel="${tab.dataset.demoTab}"]`).hidden = !active;
  }
  if (focus) button.focus();
}
for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    const current = tabs.indexOf(tab);
    const next = ({ArrowRight:(current+1)%tabs.length, ArrowLeft:(current+tabs.length-1)%tabs.length, Home:0, End:tabs.length-1})[event.key];
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
  });
}
for (const language of document.querySelectorAll('[data-language]')) {
  language.addEventListener('click', () => {
    if (location.hash) language.hash = location.hash;
  });
}
const conceptFilter = document.querySelector('[data-concept-filter]');
if (conceptFilter) conceptFilter.addEventListener('change', () => {
  let count = 0;
  for (const entry of document.querySelectorAll('[data-concept-stages]')) {
    entry.hidden = conceptFilter.value !== 'all' && !entry.dataset.conceptStages.split(' ').includes(conceptFilter.value);
    if (!entry.hidden) count++;
    for (const tocLink of document.querySelectorAll('a[href="#' + entry.id + '"]')) {
      const item = tocLink.closest('li');
      if (item) item.hidden = entry.hidden;
    }
  }
  document.getElementById('concept-status').textContent = chinese ? `显示 ${count} 个概念。` : `${count} concepts shown.`;
});
// Existing deep links can point into the retained, collapsed technical checklist.
function revealFragment() {
  if (!location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  for (let parent = target; parent; parent = parent.parentElement) {
    if (parent.tagName === 'DETAILS') parent.open = true;
  }
}
revealFragment();
window.addEventListener('hashchange', revealFragment);
