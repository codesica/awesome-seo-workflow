import {readFile,readdir} from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import config from '../site.config.mjs';
import {esc} from './site-ui.mjs';
import {referenceURL} from './content-routes.mjs';
const catalog=JSON.parse(await readFile('catalog/skills.zh.json','utf8'));
const fixtures=JSON.parse(await readFile('examples/catalog.zh.json','utf8'));
const md=new MarkdownIt({html:false,linkify:false,typographer:false});
let codeId=0;
const slug=text=>text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'');
md.renderer.rules.heading_open=(tokens,i)=>{
 if(['h2','h3'].includes(tokens[i].tag))tokens[i].attrSet('id',slug(tokens[i+1].content));
 return md.renderer.renderToken(tokens,i,{});
};
md.renderer.rules.fence=(tokens,i)=>{
 const token=tokens[i],id='zh-code-'+(++codeId),language=token.info.trim().split(/\s/)[0];
 const command=['sh','bash','reproduce-sh'].includes(language);
 const label=language==='reproduce-sh'?'复现命令 · 仅使用合成输入':command?'终端命令 · 此教学命令未在这里执行':'教学示例 / 原始记录 / 记录模板';
 return `<div class="code-block"><div class="code-toolbar"><span>${label}</span><button class="copy-button" data-copy="${id}">复制${command?'命令':'示例'}</button></div><pre><code id="${id}">${esc(token.content)}</code></pre></div>`;
};
const render=text=>md.render(text).replace(/<table>/g,'<div class="table-scroll"><table>').replace(/<\/table>/g,'</table></div>');
const list=items=>`<ul>${items.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`;
const link=(url,text)=>`<a href="${esc(url)}">${esc(text)}${url.startsWith('https://')?' ↗':''}</a>`;
const guideMap={'/guides/crawlability/':['check-crawlability.md','搜索引擎能不能访问页面？','01','robots-block'],'/guides/sitemap/':['submit-sitemap.md','搜索引擎能不能发现页面？','02','sitemap-html'],'/guides/page-check/':['one-page-seo-check.md','页面信息有没有写对？','03','canonical-conflict']};
const guideName=path=>guideMap[path]?.[1]||'教程';
const status=s=>`<span class="status">来源已审阅</span> <span class="status pending">助手集成未运行</span>${s.id==='local-seo'?' <span class="status">单次 CLI · 合成输入已执行</span>':''}`;
const rows=()=>catalog.skills.map(s=>`<div class="skill-row"><div><h3>${link('/skills/'+s.id+'/',s.name)}</h3><small>${s.role==='default'?'默认本地路线':s.role==='optional-specialist'?'已有 Claude Code 时可选':'进阶 · 托管服务'}</small></div><p>${esc(s.one_liner)}</p><div>${status(s)}</div></div>`).join('');
function toc(text){return [...text.matchAll(/^## (.+)$/gm)].map(x=>[slug(x[1]),x[1]]);}
export async function chinesePage(page, context) {
 codeId=0;
 const A=(path,title,description,body,options={})=>context.article(path,title,description,body,{parentTitle:'三步教程',eyebrow:'基础检查教程',...options,lang:'zh'});
 const path=page.path;
 if(guideMap[path]) {
  const [filename,displayTitle,number,example]=guideMap[path];
  const source=await readFile('content/zh/'+filename,'utf8');
  const raw=source.replace(/^---\n[\s\S]*?\n---\n/,'').replace(/^\s*# .+\n/,'');
  const description=source.match(/^description:\s*"?(.+?)"?$/m)?.[1]||'按步骤检查，记录证据与下一步。';
  let body=render(raw)+`<h2 id="optional-skill">可选辅助 Skill</h2><p>你可以手动完成教程。如果你已经在用兼容助手，先读 ${link('/skills/local-seo/','本地 SEO Skill')} 的来源与环境要求。${status(catalog.skills[0])}。</p>${number==='02'?`<p>如果已有 Claude Code，${link('/skills/seo-sitemap/','Claude SEO：站点地图')} 是可选专项。</p>`:''}${number==='03'?`<p>${link('/examples/local-cli-run/','查看使用合成 HTML 的真实本地 CLI 运行记录')}。</p>`:''}<p>${link('/examples/#'+example,'打开完整教学输入与修改后文件')}</p><div class="page-next">${link('/guides/','全部教程')}${link(context.guides[Number(number)]?.path||'/examples/',context.guides[Number(number)]?guideName(context.guides[Number(number)].path):'查看教学案例')}</div>`;
  return A(path,displayTitle,description,body,{eyebrow:`第 ${number} 篇 / 共 03 篇`,meta:'原稿核验：2026-10-10 · 浏览器优先 · 教学命令未在这里执行',toc:[...toc(raw),['optional-skill','可选辅助 Skill']]});
 }
 if(path==='/start/') return A(path,'从一个页面开始。','不需要 SEO 看板，也能完成第一次有用的检查。',`<h2 id="choose">1. 选一个页面</h2><p>选择你拥有或有权检查的网站上的一个公开页面。避免包含私密令牌或个人信息的网址。先选你希望被搜索引擎发现的页面，记下它的完整网址。</p><h2 id="tools">2. 选择跟着做的方式</h2><p>浏览器足以完成基础路线。教程也提供可选终端命令，不需要新的付费 SEO API。Google Search Console 和 Bing 站长工具步骤是可选项，需要网站所有者已有的权限。</p><p>助手也是可选的。如果你已经在用兼容助手，先读 ${link('/skills/local-seo/','本地 SEO Skill')} 的来源与前提。模型或助手本身仍可能产生费用。</p><h2 id="record">3. 留下检查记录</h2><p>记录网址、时间、你检查了什么、观察到的证据，以及仍不确定的部分。每篇教程都有记录模板和明确标注的教学例子。</p><h2 id="begin">4. 从访问检查开始</h2><p>先确认访问情况，再优化页面信息。目标是一份有依据的记录和一个优先处理的下一步。</p><a class="button" href="/guides/crawlability/">开始访问检查 →</a><h2 id="vocabulary">先理解三个词</h2><p><strong>抓取（crawling）</strong>是访问并获取页面。<strong>索引（indexing）</strong>是处理页面内容，将信息保存到搜索索引。<strong>排名（ranking）</strong>是决定搜索某个词时，结果出现在哪里。完成其中一步，不代表后两步也完成。</p><div class="callout"><strong>还没有自己的网址？</strong><p>先阅读 ${link('/examples/','模拟案例')}，看懂输入、修改和结果的边界。</p></div>`,{parent:'/',parentTitle:'首页',eyebrow:'开始检查',toc:[['choose','选一个页面'],['tools','选择工具'],['record','留下记录'],['begin','开始检查'],['vocabulary','三个基础词']]});
 if(path==='/guides/') return {...page,title:'按顺序，做完三个检查。',description:'从访问、发现到页面信息，每次完成一件具体的事。',body:`<div class="wrap"><header class="page-head"><p class="eyebrow">三步教程</p><h1>按顺序，做完三个检查。</h1><p class="lede">从访问、发现到页面信息，每次完成一件具体的事。浏览器就能开始。</p></header><div class="lesson-list">${[['crawlability','01','能不能访问？','检查页面响应、robots 规则和 noindex。','一份访问检查记录'],['sitemap','02','能不能发现页面？','找到网站地图，检查 XML 与其中的网址。','一份网站地图检查记录'],['page-check','03','页面信息写对了吗？','检查标题、首选网址、标题层级与链接。','一份单页检查记录']].map(([id,num,name,desc,output])=>`<a class="lesson-row" href="/guides/${id}/"><span class="lesson-number">${num}</span><span><span class="lesson-title">${name}</span><span class="lesson-desc">${desc}</span></span><span class="lesson-output">完成后留下<strong>${output}</strong></span><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</div><div class="closing"><p>第一次做 SEO 检查？</p>${link('/start/','先从一个页面开始')}</div></div>`};
 if(path==='/skills/') return {...page,title:'先读明白，再决定用哪个工具。',description:'查看固定版本、环境要求、费用与权限边界。',body:`<div class="wrap"><header class="page-head"><p class="eyebrow">精选 Skills</p><h1>先读明白，<br>再决定用哪个工具。</h1><p class="lede">Skill 是给兼容助手的一组操作说明。这三个选项帮助完成具体检查，不保证收录、排名或流量。</p><p class="page-meta">原稿来源核验：${catalog.reviewed_at} · 一次固定版本本地 CLI 在合成输入上执行；三项 Skill 的助手集成及其他工作流程未运行。</p></header><div class="callout"><strong>先用浏览器，或已有的本地工具。</strong><p>本地技术报告不需要新的付费 SEO API。助手或模型费用仍可能适用。源码审阅不等于安全审计或兼容性测试。</p></div>${rows()}<div class="closing"><p>还没有安装 CLI？</p>${link('/guides/','先跟着手动教程做')}</div></div>`};
 const skill=catalog.skills.find(s=>path==='/skills/'+s.id+'/');
 if(skill) {
  const s=skill;
  for(const target of s.guide_routes)if(!Object.values(guideMap).length||!guideMap[target])throw new Error('Unknown Skill guide: '+target);
  let body=`<h2 id="purpose">它能帮你做什么</h2><p>${esc(s.starter_scope)}</p><p><strong>预期输出</strong></p>${list(s.expected_output)}<h2 id="environment">环境与准备</h2><p>上游文档列出的助手：${esc(s.agents.upstream_documented.join('、'))}。</p><p>${esc(s.agents.note)}</p>${list(s.dependencies)}<p>安装前阅读固定版本的 ${link(s.source_url,'原始 Skill 说明')} 和 ${link(s.sources[0],'环境准备文档')}。本站不自动安装。请先查看固定版本及依赖，再按你的环境操作。</p><h2 id="cost">费用与权限</h2><p>${esc(s.cost.summary)}</p><p><strong>商业 API 要求：</strong>${esc(s.cost.commercial_api_required)}</p><p>${esc(s.cost.guardrail)}</p>${list(s.permissions_and_risks)}<h2 id="prompt">限定范围的入门任务提示</h2>${render('```text\n'+s.suggested_prompt+'\n```')}<p>这是原创教学模板，没有在第三方 Skill 的助手集成中执行。</p>`;
  if(s.safe_start_examples)body+=`<h3>文档中的 CLI 示例 · 此处未执行</h3>${s.safe_start_examples.map(x=>`<p>${esc(x.purpose)}。${esc(x.status_label||x.status)}。</p>${render('```sh\n'+x.command+'\n```')}${x.note?'<p>'+esc(x.note)+'</p>':''}`).join('')}`;
  body+=`<h2 id="limits">结果能说明什么，不能说明什么</h2>${list(s.limitations||s.not_for||[])}<p>来源审阅与实际执行是不同的证据维度。这里不证明搜索引擎收录、排名、流量、安装安全或所有环境的运行兼容性。</p>${s.id==='local-seo'?`<h2 id="execution">有一次独立的本地 CLI 执行记录</h2><p>已使用 seo 0.2.41 的 audit-page，在回环 HTTP 上检查两份原创合成 HTML。${link('/examples/local-cli-run/','阅读真实命令、完整 JSON 与限制')}。这个记录仅支持该版本和这两份输入的报告行为，不证明助手集成、广泛抓取、网站地图报告或搜索收录。</p>`:''}<h2 id="source">来源与许可</h2><p>维护者：${esc(s.repository_owner)}。原稿审阅版本：${esc(s.package_version)}。</p><p>固定提交：<code>${s.commit}</code></p><p>许可证：${esc(s.license.identifier)}。${esc(s.license.verification)}</p><p>${link(s.license.source_url,'许可证来源')} · ${link(s.repository,'原始仓库')}</p><ul>${[...s.sources,...(s.extra_sources||[])].map((u,i)=>`<li>${link(u,'参考资料 '+(i+1)+' · '+new URL(u).hostname)}</li>`).join('')}</ul><h2 id="guides">跟着对应教程检查</h2><ul>${s.guide_routes.map(p=>`<li>${link(p,guideName(p))}</li>`).join('')}</ul><div class="page-next">${link('/skills/','全部 Skills')}${link(s.source_url,'查看原始 Skill 来源')}</div>`;
  return A(path,s.name,s.one_liner,body,{parent:'/skills/',parentTitle:'Skills',eyebrow:s.role==='default'?'默认本地路线':'可选辅助工具',meta:status(s)+' · 原稿来源核验 '+catalog.reviewed_at,toc:[['purpose','用途与输出'],['environment','环境与准备'],['cost','费用与权限'],['prompt','入门任务提示'],['limits','结果边界'],...(s.id==='local-seo'?[['execution','真实 CLI 记录']]:[]),['source','来源与许可'],['guides','对应教程']]});
 }
 if(path==='/examples/') {
  let body=`<div class="callout"><strong>合成教学案例。</strong><p>这里的网址与输入都是编写的教学文件。四个离线案例没有检查或修改真实网站，不声称进行了实时请求、账号操作，也没有收录结果或流量数据。</p><p>随附离线检查已在 2026-10-10 使用 Python 3 执行。八组修改前后结果均符合预期。另外还有 ${link('/examples/local-cli-run/','一次使用合成输入的真实本地 CLI 报告')}。${link(config.repository+'/tree/main/examples','仓库保留完整文件与检查器')}。</p></div>`;
  for(const c of fixtures.cases){
   const readme=(await readFile('examples/'+c.id+'/README.zh.md','utf8')).replace(/^# .+\n/,'').replace(/^## /gm,'### ');
   // Namespacing prevents repeated README headings from producing duplicate IDs.
   const explanation=render(readme).replace(/id="([^"]+)"/g,(_,id)=>`id="${c.id}-${id}"`);
   body+=`<section class="example-case"><h2 id="${c.id}">${esc(c.title)}</h2><span class="status">合成教学案例</span>${explanation}<p>${link(referenceURL(c.guide_zh),'本案例固定链接')}</p>`;
   for(const state of ['before','after']){
    body+=`<h3>${state==='before'?'修改前：完整输入':'修改后：完整教学文件'}</h3>`;
    for(const name of await readdir('examples/'+c.id+'/'+state)){
     const content=await readFile('examples/'+c.id+'/'+state+'/'+name,'utf8');
     body+=`<p><strong>${esc(name)}</strong> · <a href="/downloads/examples/${c.id}/${state}/${name}.txt" download="${name}">下载 ${esc(name)}</a></p>${render('```text\n'+content+'\n```')}`;
    }
    body+=`<p><strong>离线输出：</strong>${state==='before'?'修改前':'修改后'}样例的本课验收条件${context.expected.cases[c.id][state]?'通过':'未通过'}，符合预期。仅检查合成输入中的这一条件。</p>`;
   }
   body+=`<p><strong>这个验收能说明：</strong>${esc(c.acceptance)}</p><p><strong>未检查：</strong>真实 HTTP 访问、搜索引擎选择的 canonical、收录、排名与流量。</p><p>${link(c.source,'官方参考资料')} · ${link(context.guides.find(g=>g.example===c.id)?.path||'/guides/crawlability/','跟着对应教程检查')}</p></section>`;
  }
  return A(path,'看懂一个问题，再决定怎么改。','完整的修改前后输入，以及证据能说明什么。',body,{parent:'/',parentTitle:'首页',eyebrow:'完整教学案例',meta:'合成数据 · 离线样例已执行 · 未检查真实网站',toc:fixtures.cases.map(c=>[c.id,c.title])});
 }
 if(path==='/examples/local-cli-run/') {
  const records=await Promise.all(['before','after'].map(async state=>({state,result:JSON.parse(await readFile('runs/local-seo/'+state+'.json','utf8'))})));
  const original=await readFile('runs/local-seo/README.md','utf8');
  const commands=[...original.matchAll(/```sh\n([\s\S]*?)```/g)].map(x=>x[1]);
  let body=`<div class="callout"><strong>CLI 报告实际执行，输入为合成文件。</strong><p>发生过真实的本地 HTTP 读取。没有检查公开网站，没有使用搜索引擎账号或付费 API。这个记录不是助手集成测试或搜索收录结果。</p></div><h2 id="observed">真实报告观察到了什么</h2><div class="table-scroll"><table><thead><tr><th>输入</th><th>首选网址证据</th><th>原始问题代码</th><th>完整输出</th></tr></thead><tbody>`;
  for(const {state,result} of records)body+=`<tr><td>${state==='before'?'修改前':'修改后'}</td><td>${result.page.canonicalEvidence.candidates.length} 个声明 · ${state==='before'?'相互冲突':'单一声明'}</td><td><code>${esc(result.issues.map(i=>i.code).join(', '))}</code></td><td><a href="/downloads/runs/local-seo/${state}.json" download="${state}.json">下载原始 JSON</a></td></tr>`;
  body+=`</tbody></table></div><p>修改前，报告观察到两个不同的 canonical，返回 <code>canonical_conflict</code>。修改后，仍返回 <code>canonical_mismatch</code>：教学文件中的 example.com 首选网址与提供文件的本地回环网址不同。这是教学设置的限制，并不是“全部通过”。原始 JSON 保留完整建议与警告。</p><h2 id="environment">执行环境与范围</h2><p>执行时间为 2026-10-10 12:09:48 UTC。环境是 macOS arm64、Node.js 22.22.3、npm 包 seo 0.2.41。npm 元数据标注仓库 iannuttall/seo，固定 gitHead 为 <code>5b794fe9c8addbc227c49262bb6ac79ad8429452</code>。</p><p>软件包在本地使用 <code>--ignore-scripts</code> 安装。没有全局助手安装、Google 连接、服务商凭据或付费 API。通过 <code>DO_NOT_TRACK=1</code> 关闭遥测，配置、缓存与日志隔离保存。</p><p>输入是 <code>examples/canonical-conflict/{before,after}/page.html</code> 中的原创 example.com 教学文件。样例服务器通过回环 HTTP 原样提供文件，并提供允许抓取的 robots.txt。样例服务器没有请求外部 example.com。CLI 使用原始 HTTP（<code>js:false</code>），没有运行浏览器渲染。</p><p>它只证明这一版本的 audit-page 对这两份输入的报告行为。Claude/Codex 助手集成、广泛抓取、站点地图报告、付费数据服务与线上收录均未测试。</p><h2 id="reproduce-from-the-repository-root">在仓库根目录复现</h2><p>在一个终端中启动样例服务器：</p>${render('```reproduce-sh\n'+commands[0]+'\n```')}<p>在另一个终端中，固定安装版本，隔离状态，再执行报告：</p>${render('```reproduce-sh\n'+commands[1]+'\n```')}<p>上面的可执行文件与状态目录是原隔离实验对应的相对路径，实际报告参数保持不变。你复现时的时间戳和耗时会不同。其他软件版本的报告结构或行为可能变化，因此需要固定版本。公开记录中没有凭据、主机用户名、私有工作目录或内部笔记。</p><div class="page-next">${link('/examples/#canonical-conflict','查看未改动的输入文件')}${link('/skills/local-seo/','阅读本地 Skill 的来源与限制')}</div>`;
  return A(path,'真实 CLI 执行，使用合成输入。','固定版本的一次本地运行：命令、原始 JSON 与实际限制。',body,{parent:'/examples/',parentTitle:'教学案例',eyebrow:'可复现运行记录',meta:'seo 0.2.41 · 仅 audit-page · 2026-10-10 12:09:48 UTC',toc:[['observed','真实报告'],['environment','执行环境与范围'],['reproduce-from-the-repository-root','复现记录']]});
 }
 if(path==='/sources/') {
  const raw=(await readFile('content/zh/sources.md','utf8')).replace(/^# .+\n/,'');
  const body=render(raw)+`<h2 id="skills">Skill 来源与核验</h2><p>每个 ${link('/skills/','Skill 详情页')} 都列出固定来源提交、许可证依据、依赖、权限与费用边界。三项均审阅过来源；独立执行过一次使用合成输入的本地 CLI 报告，其他工作流程与助手集成没有执行。不将第三方说明、代码、名称或美术资源作为本站原创材料再分发。</p><h2 id="license">原创项目许可</h2><p>原创站点代码、教程和教学文件使用 MIT 许可证。${link(config.repository+'/blob/main/LICENSE','阅读完整许可')}。第三方项目保留自身许可。构建使用的 Markdown 渲染器 markdown-it 为 MIT 许可，不作为浏览器运行依赖发布。</p><h2 id="privacy">静态站点与隐私</h2><p>没有账号、表单、分析脚本、数据库或 SEO API。托管商按自己的条款处理普通 HTTP 请求。可选工具各自的隐私与费用影响列在详情页中。</p><h2 id="identity">项目名称与正式地址</h2><p>First Crawl 是项目工作名称，未确认商标可用性。正式地址使用已有域名的子域名 ${link(config.origin,'skills.yangluotong.top')}，没有购买新域名。</p>`;
  return A(path,'来源、范围与许可。','教程依据官方资料；教学材料原创，第三方 Skills 仅提供来源链接。',body,{parent:'/',parentTitle:'首页',eyebrow:'依据与边界',toc:[...toc(raw),['skills','Skill 来源'],['license','原创许可'],['privacy','静态站点'],['identity','名称与地址']]});
 }
 if(path==='/contribute/')return A(path,'让下一次检查更清楚。','贡献一处准确修正、一段更清楚的解释，或一个可复现的教学例子。',`<h2 id="contributing">通过 GitHub 参与</h2><p>先读 ${link(config.repository+'/blob/main/CONTRIBUTING.md','贡献说明')}，再在 ${link(config.repository,'公开仓库')} 提交 issue 或 pull request。</p><h2 id="evidence">准确说明证据</h2><p>用官方来源支持搜索引擎相关事实。区分来源审阅、实际执行与合成数据。记录运行日期与范围，不把未知写成成功。</p><h2 id="boundaries">使用可公开的教学材料</h2><p>采用 example.com 与原创教学文件。不要提交凭据、私密网址、账号导出、客户数据、内部截图，或没有再分发许可的第三方 Skill 全文。</p><div class="page-next">${link('/sources/','查看来源与许可')}${link(config.repository+'/issues','提出问题')}</div>`,{parent:'/',parentTitle:'首页',eyebrow:'开源参与',toc:[['contributing','通过 GitHub 参与'],['evidence','准确说明证据'],['boundaries','可公开材料']]});
 if(path==='/404.html')return {...page,title:'这个地址没有页面。',description:'回到首页，或从第一个检查重新开始。',body:`<div class="wrap"><header class="page-head"><p class="eyebrow">404 · 页面不存在</p><h1>这个地址没有页面。</h1><p class="lede">链接可能已经改变。回到首页，或者选择第一篇检查教程。</p><div class="actions"><a class="button" href="/start/">从一个页面开始 →</a>${link('/','回到首页')}</div></header><div class="closing">${link('/guides/','查看三步教程')}</div></div>`};
 throw new Error('Missing Chinese page: '+path);
}
