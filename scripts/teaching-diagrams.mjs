import {readFile} from 'node:fs/promises';
import {esc} from './site-ui.mjs';
import {contentURL,stageIds} from './content-routes.mjs';

const assets={};
for(const topic of ['search-journey','roadmap','agent-workflow']) {
 assets[topic]={};
 for(const lang of ['zh','en']) {
  assets[topic][lang]={};
  for(const size of ['desktop','mobile']) {
   const filename=topic==='search-journey'?`${topic}.${lang}.${size}.svg`:`${topic}-${lang}-${size}.svg`;
   const svg=await readFile(`public/diagrams/${topic}/${filename}`,'utf8');
   if(!svg.includes('<title')||!svg.includes('<desc')||/<(?:script|foreignObject|image|style)\b|\bon[a-z]+\s*=|\bhref\s*=/i.test(svg))throw new Error(`Expected a self-contained static teaching SVG: ${filename}`);
   assets[topic][lang][size]=svg;
  }
 }
}

function inlineSVG(topic,lang,size,instance) {
 const prefix=`${instance}-${size}-`;
 return assets[topic][lang][size]
  .replace(/<g id="(step-[1-4])"/g,'<g data-node-id="$1" id="$1"')
  .replace(/\sid="([^"]+)"/g,(_,id)=>` id="${prefix}${id}"`)
  .replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${prefix}${id})`)
  .replace(/aria-labelledby="([^"]+)"/g,(_,ids)=>`aria-labelledby="${ids.split(' ').map(id=>prefix+id).join(' ')}"`)
  .replace('<svg ','<svg focusable="false" ');
}

function diagram(topic,lang,instance,nodes,{context='',firstOpen=true}={}) {
 const zh=lang==='zh';
 const label={'search-journey':zh?'搜索如何带来访客':'How search brings visitors',roadmap:zh?'六堂课的学习路线':'The six-lesson roadmap','agent-workflow':zh?'Agent 的输入、操作、产物与用户核验':'Agent input, operation, output, and your review'}[topic];
 const panels=nodes.map((node,i)=>{
  const id=`${instance}-${node.id}-example`;
  return `<details class="diagram-node" data-diagram-node="${esc(node.id)}"${firstOpen&&i===0?' open':''}><summary id="${id}-label"><span class="diagram-text-number">${String(i+1).padStart(2,'0')}</span>${esc(node.label)}</summary><div class="diagram-example" id="${id}" role="region" aria-labelledby="${id}-heading"><h3 id="${id}-heading"><span>${String(i+1).padStart(2,'0')}</span> ${esc(node.label)}</h3>${node.body}</div></details>`;
 }).join('');
 return `<figure class="teaching-diagram diagram-${topic}" id="${instance}" aria-label="${esc(label)}" data-teaching-diagram><figcaption><span class="diagram-kind">${zh?'教学图解':'Teaching diagram'}</span><span data-diagram-hint data-interactive-hint="${zh?'点图中节点，看对应例子':'Select a node in the diagram to see its example'}">${zh?'展开下方文字节点，看对应例子':'Open the text steps below to see the examples'}</span></figcaption>${['desktop','mobile'].map(size=>`<div class="diagram-visual diagram-${size}">${inlineSVG(topic,lang,size,instance)}<div class="diagram-hotspots"></div></div>`).join('')}${context?`<p class="diagram-context">${context}</p>`:''}<div class="diagram-examples">${panels}</div></figure>`;
}

const searchNodes={
 zh:[
  {id:'need',label:'人有问题',body:'<p>假设这个人想安静坐五分钟，又不想下载应用。这是我们写页面前，先要说明白的需要。</p><p class="diagram-record">人：不想下载应用的人。<br>事：直接计时五分钟。</p>'},
  {id:'search',label:'发起搜索',body:'<p>他可能输入：“不用下载的冥想计时器”。这是教学假设；我们还不知道是否真有人这样搜索。</p><p class="diagram-record">猜想的搜索词：不用下载的冥想计时器。<br>搜索结果：未检查。</p>'},
  {id:'result',label:'看到结果',body:'<p>相关页面有机会出现在结果里。能打开、能被搜索引擎读取、被保存、被展示，是不同的事。</p><p class="diagram-record">假设结果标题：免费冥想计时器，不用下载。<br>说明：直接选时间，开始一次计时。</p><p>这不是实时搜索结果，也没有展示、排名或点击数据。</p>'},
  {id:'visit',label:'进入页面',body:'<p>如果标题和说明与需要相符，他可能点进来。出现过不代表一定有人点击；点击也不证明页面已经帮到他。</p><p class="diagram-record">计划中的页面：先选时间，再找到“开始计时”。<br>页面草图：还不是可用工具。</p>'},
  {id:'finish',label:'完成计时',body:'<p>页面要让他真正完成计时。打开页面只是开始，成功使用需要另行检查。</p><p class="diagram-record">计划行为：选五分钟 → 开始计时 → 计时完成。<br>状态：尚未实现或测试。</p><p>这里没有可操作的计时器，也没有真实搜索或流量结果。</p>'}
 ],
 en:[
  {id:'need',label:'A real need',body:'<p>Imagine someone wants five quiet minutes without downloading an app. Describe that need before planning the page.</p><p class="diagram-record">Person: someone who does not want an app.<br>Task: time five minutes now.</p>'},
  {id:'search',label:'A search',body:'<p>They might search for “meditation timer no download.” This is a teaching hypothesis. We do not yet know whether people actually search this way.</p><p class="diagram-record">Suggested query: meditation timer no download.<br>Search results: not checked.</p>'},
  {id:'result',label:'A result appears',body:'<p>A relevant page may appear. Being accessible, readable by search, stored, and shown are separate events.</p><p class="diagram-record">Fictional result title: Free meditation timer, no download.<br>Description: Choose a duration and start a timer.</p><p>This is not a live search result. No impression, ranking, or click data is shown.</p>'},
  {id:'visit',label:'A page visit',body:'<p>If the title and description fit the need, someone may click. An appearance does not guarantee a click, and a click does not prove successful use.</p><p class="diagram-record">Planned page: choose a duration, then find “Start timer.”<br>A page sketch is not a working tool.</p>'},
  {id:'finish',label:'A task completed',body:'<p>The page should let the visitor finish the timer. Opening it is only a beginning; successful use needs a separate check.</p><p class="diagram-record">Planned behavior: choose five minutes → start → finish.<br>Status: not built or tested.</p><p>No working timer, real search, or traffic result is provided here.</p>'}
 ]
};

export const searchDiagram=(lang,instance)=>diagram('search-journey',lang,instance,searchNodes[lang]);

export function roadmapDiagram(lang,instance,stages,outputs) {
 if(stages.map(stage=>stage.id).join('|')!==stageIds.join('|'))throw new Error('Diagram lessons must retain the six stable stage IDs.');
 const zh=lang==='zh';
 const nodes=stages.map((stage,i)=>({id:stage.id,label:stage.title[lang],body:`<p>${esc(stage.firstScreen.question[lang])}</p><p class="diagram-record"><strong>${zh?'留下的产物':'What you keep'}：</strong>${esc(outputs[i])}</p><p>${esc(stage.firstScreen.oneAction[lang])}</p><a class="diagram-lesson-link" href="${contentURL(stage.id,lang)}">${zh?`去第 ${i+1} 课`:`Go to lesson ${i+1}`} <span aria-hidden="true">→</span></a>`}));
 return diagram('roadmap',lang,instance,nodes,{context:zh?'没有网站也能用纸或文档完成草稿。每一课的具体产物，展开节点后再看。':'Use paper or a document even without a website. Open each step to see the small output for its lesson.'});
}

export function agentDiagram(lang,instance) {
 const zh=lang==='zh';
 const nodes=zh?[
  {id:'step-1',label:'给出目标',body:'<p>先交给 Agent 一个明确问题，以及这次允许它读取的资料。它是执行任务的 AI；Skill 是给它参考的步骤。</p><p class="diagram-record">第 1 课的输入：自己的四行说明。<br>目标：帮我区分需要、猜想和未知。<br>本次范围：只整理已给出的文字。</p>'},
  {id:'step-2',label:'按步骤查证',body:'<p>Agent 依照 Skill 整理资料或做已获授权的检查。没有资料、账号权限或实际操作，就应写“未检查”。</p><p class="diagram-record">第 1 课的操作：读四行说明，标出假设与未知。<br>若另做搜索观察：先确认搜索词、语言、地区与范围。</p><p>点这个节点只是在阅读示例，不会启动 Agent 或搜索。</p>'},
  {id:'step-3',label:'带回发现',body:'<p>产物应把实际观察与未检查的事项分开，再说明下一步的建议。</p><dl class="diagram-evidence"><div><dt>模拟已知</dt><dd>页面能打开。</dd></div><div><dt>模拟待查</dt><dd>搜索引擎收录尚未检查。</dd></div><div><dt>建议下一步</dt><dd>由有权限的人核对收录报告。</dd></div></dl><p>这是图里的模拟检查。第 1 课的产物仍是四行说明，猜想不能当成真实需求。</p>'},
  {id:'step-4',label:'由你做决定',body:'<p>先核对产物，再决定是否采取建议。图里没有执行、批准或发布操作。</p><ul><li>资料来自哪里？</li><li>哪些确实做过，哪些仍未检查？</li><li>建议解决的是哪个问题？</li><li>是否需要额外权限？</li></ul><p>第 1 课：自己解释四行说明，保留“假设”和“还不知道”。现在不用安装任何东西。</p>'}
 ]:[
  {id:'step-1',label:'Give a goal',body:'<p>Give the Agent a specific question and the material it may read. An Agent is the AI doing the task; a Skill supplies its steps.</p><p class="diagram-record">Lesson 1 input: your four-line record.<br>Goal: separate a need, a hypothesis, and unknowns.<br>Scope: organize only the text provided.</p>'},
  {id:'step-2',label:'Check the evidence',body:'<p>An Agent follows a Skill to organize material or run authorized checks. Without material, account access, or actual execution, it should record “not checked.”</p><p class="diagram-record">Lesson 1 operation: read the four lines and identify assumptions.<br>For a separate search observation: confirm the query, language, region, and scope.</p><p>This node only opens an example. It does not run an Agent or a search.</p>'},
  {id:'step-3',label:'Bring back findings',body:'<p>The output should separate actual observations from unchecked items, then suggest a next step.</p><dl class="diagram-evidence"><div><dt>Simulated known</dt><dd>The page opens.</dd></div><div><dt>Simulated unknown</dt><dd>Indexing has not been checked.</dd></div><div><dt>Suggested next step</dt><dd>An authorized owner reviews the indexing report.</dd></div></dl><p>This is the diagram’s simulated check. Lesson 1 still produces four lines; a guess does not establish real demand.</p>'},
  {id:'step-4',label:'You decide',body:'<p>Review the output before deciding on a suggestion. The diagram contains no execution, approval, or publishing action.</p><ul><li>Where did the material come from?</li><li>What was actually done, and what is unchecked?</li><li>Which problem does the suggestion address?</li><li>Does it require more permission?</li></ul><p>For lesson 1, explain your four lines yourself and keep hypotheses and unknowns. There is nothing to install now.</p>'}
 ];
 return diagram('agent-workflow',lang,instance,nodes,{context:zh?'图中用网页检查解释输入 → 操作 → 产物 → 用户核验。第 1 课只整理四行说明；没有网站也能完成。':'The diagram uses a page check to explain input → operation → output → your review. Lesson 1 only needs a four-line record, even without a website.'});
}
