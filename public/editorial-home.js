const exhibit=document.querySelector('[data-page-exhibit]');
if(exhibit){
 const tabs=[...exhibit.querySelectorAll('[data-page-state]')];
 function changeState(tab,focus=false){
  const state=tab.dataset.pageState;exhibit.dataset.state=state;
  for(const t of tabs){const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;}
  exhibit.querySelector('#page-evidence').setAttribute('aria-labelledby',tab.id);
  for(const el of exhibit.querySelectorAll('[data-example-before]'))el.hidden=state!=='before';
  for(const el of exhibit.querySelectorAll('[data-example-after]'))el.hidden=state!=='after';
  if(focus)tab.focus();
 }
 for(const tab of tabs){tab.disabled=false;tab.addEventListener('click',()=>changeState(tab));tab.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const target=e.key==='Home'?tabs[0]:e.key==='End'?tabs.at(-1):tabs[1-tabs.indexOf(tab)];changeState(target,true);}});}
 const zh=document.documentElement.lang.startsWith('zh'),toggle=exhibit.querySelector('[data-timer-toggle]'),reset=exhibit.querySelector('[data-timer-reset]'),display=exhibit.querySelector('[data-timer-display]'),status=exhibit.querySelector('[data-timer-status]');
 toggle.disabled=false;reset.disabled=false;
 let remaining=300,deadline=null,interval=null;
 const render=()=>{display.textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');};
 const button=label=>toggle.replaceChildren(document.createTextNode(label));
 function stop(){if(interval!==null)clearInterval(interval);interval=null;deadline=null;}
 function tick(){remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));render();if(!remaining){stop();button(zh?'再来五分钟':'Start again');status.textContent=zh?'五分钟到了。可以暂停一下，再继续。':'Five minutes are up. Take a moment before continuing.';}}
 toggle.addEventListener('click',()=>{if(deadline){tick();stop();button(zh?'继续计时':'Resume');status.textContent=zh?'已暂停。点击继续，从剩余时间开始。':'Paused. Resume from the remaining time.';return;}if(remaining===0)remaining=300;deadline=Date.now()+remaining*1000;button(zh?'暂停计时':'Pause timer');status.textContent=zh?'正在计时。你可以暂停或重置。':'Timer running. You can pause or reset.';tick();interval=setInterval(tick,250);});
 reset.addEventListener('click',()=>{stop();remaining=300;render();button(toggle.dataset.startLabel);status.textContent=zh?'已重置为五分钟。':'Reset to five minutes.';});
 window.addEventListener('pagehide',stop);
}
