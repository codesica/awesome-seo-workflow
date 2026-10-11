const chinese = document.documentElement.lang.startsWith('zh');
for (const button of document.querySelectorAll('[data-copy]')) {
  button.disabled=false;
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
  tab.disabled=false;
    const active = tab === button;
    tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
    document.querySelector(`[data-demo-panel="${tab.dataset.demoTab}"]`).hidden = !active;
  }
  if (focus) button.focus();
}
for (const tab of tabs) {
  tab.disabled=false;
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
if (conceptFilter) conceptFilter.disabled=false;
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

// Progressive teaching diagrams: the native details list remains usable without JS.
for (const diagram of document.querySelectorAll('[data-teaching-diagram]')) {
  const nodes = [...diagram.querySelectorAll('[data-diagram-node]')];
  const buttons = [];
  const sync = () => {
    for (const button of buttons) {
      const expanded = nodes.find(node => node.dataset.diagramNode === button.dataset.diagramTarget).open;
      button.setAttribute('aria-expanded', String(expanded));
      button.querySelector('.node-affordance').textContent = expanded ? '−' : '+';
    }
  };
  const select = (selected, expanded) => {
    for (const node of nodes) node.open = node === selected && expanded;
    sync();
  };
  for (const visual of diagram.querySelectorAll('.diagram-visual')) {
    const svg = visual.querySelector('svg');
    const overlay = visual.querySelector('.diagram-hotspots');
    const visualButtons = [];
    for (const node of nodes) {
      const group = [...svg.querySelectorAll('[data-node-id]')].find(group => group.dataset.nodeId === node.dataset.diagramNode);
      if (!group) continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'diagram-hotspot';
      button.dataset.diagramTarget = node.dataset.diagramNode;
      button.setAttribute('aria-label', node.querySelector('summary').textContent.trim().replace(/^(\d{2})/, '$1 '));
      button.setAttribute('aria-controls', node.querySelector('.diagram-example').id);
      const plus = document.createElement('span');
      plus.className = 'node-affordance';
      plus.setAttribute('aria-hidden', 'true');
      button.append(plus);
      button.addEventListener('click', () => {
        select(node, !node.open);
        if (node.open) node.querySelector('.diagram-example').scrollIntoView({block:'nearest', behavior:'instant'});
      });
      button.addEventListener('keydown', event => {
        const index = visualButtons.indexOf(button);
        const next = ({ArrowRight:(index+1)%nodes.length, ArrowDown:(index+1)%nodes.length, ArrowLeft:(index+nodes.length-1)%nodes.length, ArrowUp:(index+nodes.length-1)%nodes.length, Home:0, End:nodes.length-1})[event.key];
        if (next !== undefined && visualButtons[next]) {
          event.preventDefault();
          visualButtons[next].focus();
        }
      });
      overlay.append(button);
      visualButtons.push(button);
      buttons.push(button);
      button.diagramGroup = group;
    }
    visual.diagramButtons = visualButtons;
  }
  const arrange = () => {
    let ready = false;
    for (const visual of diagram.querySelectorAll('.diagram-visual')) {
      if (!visual.clientWidth || visual.diagramButtons.length !== nodes.length) continue;
      const svg = visual.querySelector('svg');
      const box = svg.viewBox.baseVal;
      const bounds = visual.diagramButtons.map(button => button.diagramGroup.getBBox());
      if (bounds.some(bound => !bound.width || !bound.height)) continue;
      visual.diagramButtons.forEach((button, i) => {
        const bound = bounds[i];
        button.style.left = `${100*(bound.x-box.x-4)/box.width}%`;
        button.style.top = `${100*(bound.y-box.y-4)/box.height}%`;
        button.style.width = `${100*(bound.width+8)/box.width}%`;
        button.style.height = `${100*(bound.height+8)/box.height}%`;
      });
      svg.setAttribute('aria-hidden', 'true');
      visual.classList.add('has-hotspots');
      ready = true;
    }
    diagram.classList.toggle('is-enhanced', ready);
    const hint = diagram.querySelector('[data-diagram-hint]');
    if (ready) hint.textContent = hint.dataset.interactiveHint;
  };
  for (const node of nodes) node.addEventListener('toggle', () => {
    if (node.open) select(node, true);
    sync();
  });
  sync();
  arrange();
  window.addEventListener('resize', arrange);
}

// Native disclosure navigation remains available without JavaScript.
for(const menu of document.querySelectorAll('.mobile-menu')){
 menu.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){event.preventDefault();menu.open=false;menu.querySelector('summary').focus();}});
}
