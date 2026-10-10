import { readFile, writeFile, mkdir, cp, rm, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import MarkdownIt from 'markdown-it';
import config from '../site.config.mjs';
import {layout as siteLayout, localLinks, route} from './site-ui.mjs';
import {chinesePage} from './site-zh.mjs';
import {conceptsPage,templatesPage,skillsPage,skillPage,executionSkillIds,workflowSourcesHTML} from './content-ui.mjs';
import {home,startPage,stagePage,roadmapPage} from './beginner-ui.mjs';
import {stageIds} from './content-routes.mjs';

const release = process.argv.includes('--release');
if (release && !config.releaseReady) throw new Error('Release blocked: the UI preview awaits user visual approval.');
const origin = new URL(config.origin).origin;
if (release && !origin.startsWith('https://')) throw new Error('Release requires an HTTPS origin.');
const out = resolve('dist');
const catalog = JSON.parse(await readFile('catalog/skills.json', 'utf8'));
const fixtures = JSON.parse(await readFile('examples/catalog.json', 'utf8'));
const expected = JSON.parse(await readFile('examples/expected-results.json', 'utf8'));
const esc = x => String(x).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = x => x.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
const md = new MarkdownIt({html:false,linkify:false,typographer:false});
let blockId = 0;
md.renderer.rules.fence = (tokens, i) => {
  const t = tokens[i], id = 'code-' + (++blockId), language = t.info.trim().split(/\s/)[0];
  const label = language==='reproduce-sh' ? 'Reproduction command · Synthetic input only' : ['sh','bash'].includes(language) ? 'Terminal command · Not run here' : 'Teaching example / record template';
  return `<div class="code-block"><div class="code-toolbar"><span>${label}</span><button class="copy-button" data-copy="${id}">Copy ${['sh','bash'].includes(language)?'command':'example'}</button></div><pre><code id="${id}">${esc(t.content)}</code></pre></div>`;
};
md.renderer.rules.heading_open = (tokens, i) => {
  const token = tokens[i];
  if (token.tag === 'h2' || token.tag === 'h3') token.attrSet('id', slug(tokens[i+1].content));
  return md.renderer.renderToken(tokens, i, {});
};
const pages = [];
const homeData={
 beforeHtml:await readFile('examples/canonical-conflict/before/page.html','utf8'),
 afterHtml:await readFile('examples/canonical-conflict/after/page.html','utf8'),
 beforeRun:JSON.parse(await readFile('runs/local-seo/before.json','utf8')),
 afterRun:JSON.parse(await readFile('runs/local-seo/after.json','utf8')),
 skills:catalog.skills,
 concepts:JSON.parse(await readFile('content/concepts/concepts.json','utf8'))
};
const guides = [
  {path:'/guides/crawlability/', file:'check-crawlability.md', short:'Can a crawler reach your page?', description:'Check the response and rules that affect crawling. Learn why reachable and indexed mean different things.', output:'A crawlability evidence log', number:'01', example:'robots-block'},
  {path:'/guides/sitemap/', file:'submit-sitemap.md', short:'Does your sitemap point to the right pages?', description:'Find and check your sitemap, submit it through official tools when you have access, and record the result.', output:'A sitemap check and submission record', number:'02', example:'sitemap-html'},
  {path:'/guides/page-check/', file:'one-page-seo-check.md', short:'Is this page ready to share?', description:'Review its purpose, title, canonical URL, headings and links. Choose one useful change and verify it.', output:'A one-page review', number:'03', example:'canonical-conflict'},
];
const link = (url, text) => `<a href="${esc(url)}">${esc(text)}${url.startsWith('https://')?' ↗':''}</a>`;
const list = items => `<ul>${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const statuses = (skill) => '<span class="status">Source reviewed</span> ' + (skill?.execution ? '<span class="status">CLI run · synthetic</span>' : '<span class="status pending">Not run</span>');
async function emit(page) {
  blockId=0;
  for(const lang of ['zh','en']) {
    const basePath=page.path;
    const data=page.translations?{...page,...page.translations[lang]}:basePath==='/skills/'?{...page,...skillsPage(lang)}:basePath==='/start/'?{...page,...startPage(lang)}:basePath==='/'?{...page,...home(lang,homeData)}:lang==='zh'?await chinesePage(page,{md,catalog,fixtures,expected,guides,article,esc,link,list,statuses}):page;
    const body=basePath==='/sources/'?data.body.replace('<article class="prose">','<article class="prose">'+workflowSourcesHTML(lang)):data.body;
    const localized={...data,basePath,path:route(basePath,lang),body:localLinks(body,lang)};
    const location = resolve(out, '.' + (basePath==='/404.html'?localized.path:localized.path+'index.html'));
    await mkdir(dirname(location),{recursive:true});
    await writeFile(location,siteLayout(localized,{lang,origin,repository:config.repository,preview:!release}));
    if (!localized.noindex) pages.push({path:localized.path,title:localized.title});
  }
}

function article(path,title,description,body,{eyebrow='FIELD GUIDE',meta='',toc=[],parent='/guides/',parentTitle='Guides',displayTitle=title,lang='en'}={}) {
  const tocLinks=toc.map(([id,t])=>`<li><a href="#${id}">${esc(t)}</a></li>`).join('');
  return {path,title,description,body:`<div class="wrap"><div class="breadcrumb">${link('/',lang==='zh'?'首页':'Home')} / ${link(parent,parentTitle)}</div><header class="page-head"><div class="eyebrow">${eyebrow}</div><h1>${esc(displayTitle)}</h1><p class="lede">${esc(description)}</p>${meta?`<div class="page-meta">${meta}</div>`:''}</header><div class="article-layout"><aside class="toc desktop-toc" aria-label="${lang==='zh'?'本页目录':'On this page'}"><strong>${lang==='zh'?'本页目录':'On this page'}</strong><ul>${tocLinks}</ul></aside><details class="mobile-toc"><summary>${lang==='zh'?'本页目录':'On this page'}</summary><ul>${tocLinks}</ul></details><article class="prose">${body}</article></div></div>`};
}
const lessonRows = () => `<div class="lesson-list">${guides.map(g=>`<a class="lesson-row" href="${g.path}"><span class="lesson-number">${g.number}</span><span><span class="lesson-title">${g.short}</span><span class="lesson-desc">${g.description}</span></span><span class="lesson-output">You'll keep<strong>${g.output}</strong></span><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
const skillRows = () => catalog.skills.map(s=>`<div class="skill-row" id="${s.id}"><div><h3>${link('/skills/'+s.id+'/',s.name)}</h3><small>${s.role==='default'?'Default local route':s.role==='optional-specialist'?'Optional · Claude Code':'Advanced · hosted service'}</small></div><p>${esc(s.one_liner)}</p><div>${statuses(s)}</div></div>`).join('');
await rm(out,{recursive:true,force:true}); await mkdir(out,{recursive:true}); await cp('public',out,{recursive:true});
await emit({path:'/',...home('zh',homeData)});
await emit({path:'/concepts/',translations:{zh:conceptsPage('zh'),en:conceptsPage('en')}});
await emit({path:'/templates/',translations:{zh:templatesPage('zh'),en:templatesPage('en')}});
for(const id of executionSkillIds)await emit({path:'/skills/'+id+'/',translations:{zh:await skillPage(id,'zh'),en:await skillPage(id,'en')}});
await emit({path:'/roadmap/',translations:{zh:roadmapPage('zh'),en:roadmapPage('en')}});
for(const id of stageIds)await emit({path:'/stages/'+id+'/',translations:{zh:await stagePage(id,'zh'),en:await stagePage(id,'en')}});
await emit(article('/start/','Start with one page.','You don’t need an SEO dashboard to make your first useful check.',`<h2 id="choose">1. Choose a page</h2><p>Pick one public page on a website you own or have permission to inspect. Avoid URLs containing private tokens or personal information. Choose a page that you intend to make searchable.</p><h2 id="tools">2. Choose how to follow along</h2><p>Use your browser for the complete beginner route. The guides also contain optional terminal commands. No new paid SEO API is required. Search Console and Bing account steps are optional and require the owner’s existing permissions.</p><p>An assistant is optional. If you already use one, ${link('/skills/local-seo/','inspect the local SEO Skill')} and its prerequisites first. Existing assistant or model costs may still apply.</p><h2 id="record">3. Record what you find</h2><p>Keep the URL, time, what you checked, your evidence, and what remains uncertain. Each guide includes a blank template and a clearly labelled worked record.</p><h2 id="begin">4. Do the first check</h2><p>Start with access before polishing metadata. Your output is one evidence log and one prioritized next action.</p><a class="button" href="/guides/crawlability/">Check crawler access →</a><h2 id="vocabulary">Three words to know</h2><p><strong>Crawling</strong> means fetching a page. <strong>Indexing</strong> means processing and storing page information in a search index. <strong>Ranking</strong> means deciding where to show a result for a query. Passing one step does not establish the others.</p><div class="callout"><strong>Before you begin</strong><p>You need a browser and one authorized public URL. You can learn from ${link('/examples/','the synthetic examples')} before inspecting a live site.</p></div>`,{parent:'/',parentTitle:'Home',eyebrow:'START HERE',toc:[['choose','Choose a page'],['tools','Choose your tools'],['record','Record the result'],['begin','Do the first check'],['vocabulary','Three words to know']]}));
await emit({path:'/guides/',title:'Three practical SEO guides',description:'Start with crawler access, then check a sitemap and inspect one page with a small evidence record.',body:`<div class="wrap"><header class="page-head"><div class="eyebrow">The beginner path</div><h1>Three practical checks.</h1><p class="lede">Complete one useful task at a time. Your browser is enough to start.</p></header>${lessonRows()}<div class="closing"><p>New to SEO?</p>${link('/start/','Start with one page')}</div></div>`});
for (const g of guides) {
  const source = await readFile('content/'+g.file,'utf8');
  const [,front,raw] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fields = Object.fromEntries(front.split('\n').map(l=>{const i=l.indexOf(':');return [l.slice(0,i),l.slice(i+1).trim().replace(/^"|"$/g,'')]}));
  const content = raw.replace(/^\s*# .+\n/,'');
  const toc = [...content.matchAll(/^## (.+)$/gm)].map(x=>[slug(x[1]),x[1]]);
  let body = md.render(content).replace(/<table>/g,'<div class="table-scroll"><table>').replace(/<\/table>/g,'</table></div>');
  body += `<h2 id="optional-skill">Optional matching Skills</h2><p>You can complete this guide manually. If you already use a compatible assistant, inspect ${link('/skills/local-seo/','SEO Skill: Local CLI')} before using it. ${statuses(catalog.skills[0])} · Reviewed ${catalog.reviewed_at}.</p>${g.number==='03'?`<p>${link('/examples/local-cli-run/','See the actual local CLI run on synthetic HTML')}</p>`:''}${g.number==='02'?`<p>Already using Claude Code? ${link('/skills/seo-sitemap/','Claude SEO: Sitemap')} is an optional specialist.</p>`:''}<p>${link('/examples/#'+g.example,'Open the complete teaching input and corrected output')}</p><div class="page-next">${link('/guides/','All guides')}${link(guides[Number(g.number)]?.path||'/examples/',guides[Number(g.number)]?.short||'Practice with the examples')}</div>`;
  await emit(article(g.path,fields.title,fields.description,body,{displayTitle:g.short,eyebrow:`GUIDE ${g.number} OF 03`,meta:'Source reviewed · 10 October 2026 · Browser first · Commands not run here',toc:[...toc,['optional-skill','Optional matching Skills']]}));
}
await emit({path:'/skills/',title:'Small workflows you can inspect',description:'Curated SEO Skills with pinned sources, prerequisites, costs, permissions and separate source-review and execution labels.',body:`<div class="wrap"><header class="page-head"><div class="eyebrow">Curated Skills</div><h1>Small workflows<br>you can inspect.</h1><p class="lede">A Skill is a set of instructions for a compatible assistant. These selections help with specific checks; they don’t guarantee a result.</p><p class="page-meta">Source review: ${catalog.reviewed_at} · One fixed-version local CLI report was executed with synthetic input; assistant integrations and the other Skills were not run.</p></header><div class="callout"><strong>Start with your browser, or the local route.</strong><p>Local technical reports require no new paid SEO API. Assistant/model costs can still apply. Source review is not a security audit or a compatibility test.</p></div>${skillRows()}<div class="closing"><p>No CLI installed?</p>${link('/guides/','Use the manual guides')}</div></div>`});
for (const s of catalog.skills) {
  const route = '/skills/'+s.id+'/';
  let body = `<h2 id="purpose">What it helps you do</h2><p>${esc(s.starter_scope)}</p><p><strong>Expected output</strong></p>${list(s.expected_output)}<h2 id="environment">Environment and setup</h2><p>Upstream documents: ${esc(s.agents.upstream_documented.join(', '))}.</p><p>${esc(s.agents.note)}</p>${list(s.dependencies)}<p>Read the pinned ${link(s.source_url,'original Skill instructions')} and ${link(s.sources[0],'setup documentation')} before installing. No automatic installation is provided by this site. Review a fixed version and its dependencies before running setup.</p><h2 id="cost">Costs and permissions</h2><p>${esc(s.cost.summary)}</p><p><strong>Commercial API requirement:</strong> ${esc(s.cost.commercial_api_required)}</p><p>${esc(s.cost.guardrail)}</p>${list(s.permissions_and_risks)}<h2 id="prompt">A bounded starter prompt</h2>${md.render('```text\n'+s.suggested_prompt+'\n```')}<p>This prompt is an original teaching template. It has not been executed with the third-party Skill.</p>`;
  if(s.safe_start_examples) body += `<h3>Documented CLI examples · Not run here</h3>${s.safe_start_examples.map(x=>`<p>${esc(x.purpose)}. ${esc(x.status)}.</p>${md.render('```sh\n'+x.command+'\n```')}${x.note?'<p>'+esc(x.note)+'</p>':''}`).join('')}`;
  body += `<h2 id="limits">Limits of the result</h2>${list(s.limitations||s.not_for||[])}<p>Source reviewed and Not run describe different evidence. No indexing, ranking, traffic, installation safety or blanket runtime compatibility is established here.</p>${s.execution?`<h2 id="execution">One exact CLI path was executed</h2><p>We ran seo 0.2.41 audit-page on two original synthetic HTML documents over loopback HTTP. ${link('/examples/local-cli-run/','Read the real run, complete JSON and limits')}. This does not establish assistant integration, broad crawling or sitemap-report behavior.</p>`:''}<h2 id="source">Source and license</h2><p>Maintainer: ${esc(s.repository_owner)}. Reviewed version: ${esc(s.package_version)}.</p><p>Commit: <code>${s.commit}</code></p><p>License: ${esc(s.license.identifier)}. ${esc(s.license.verification)}</p><p>${link(s.license.source_url,'License source')} · ${link(s.repository,'Original repository')}</p><ul>${[...s.sources,...(s.extra_sources||[])].map(u=>`<li>${link(u,u.split('/').at(-1)||'Source')}</li>`).join('')}</ul><h2 id="guides">Follow the matching guide</h2><ul>${s.guide_routes.map(p=>`<li>${link(p,guides.find(g=>g.path===p)?.short||'Guide')}</li>`).join('')}</ul><div class="page-next">${link('/skills/','All Skills')}${link(s.source_url,'View original Skill source')}</div>`;
  await emit(article(route,s.name,s.one_liner,body,{parent:'/skills/',parentTitle:'Skills',eyebrow:s.role==='default'?'DEFAULT LOCAL ROUTE':'OPTIONAL HELPER',meta:`${statuses(s)} · Source review ${catalog.reviewed_at}`,toc:[['purpose','Purpose and output'],['environment','Environment and setup'],['cost','Costs and permissions'],['prompt','Starter prompt'],['limits','Limits'],['source','Source and license'],['guides','Matching guides']]}));
}
const runReadme=(await readFile('runs/local-seo/README.md','utf8')).replace(/^# .+\n/,'').replace(/```sh/g,'```reproduce-sh');
const runRecords=await Promise.all(['before','after'].map(async state=>({state,result:JSON.parse(await readFile('runs/local-seo/'+state+'.json','utf8'))})));
let runBody='<div class="callout"><strong>Executed CLI report. Synthetic input.</strong><p>A real local HTTP fetch occurred. No public website, search-engine account or paid API was used. This is not an assistant integration test or an indexing result.</p></div><h2 id="observed">What the actual report observed</h2><div class="table-scroll"><table><thead><tr><th>Input</th><th>Canonical evidence</th><th>Reported issue</th><th>Complete output</th></tr></thead><tbody>';
for(const {state,result} of runRecords){
  const path='/downloads/runs/local-seo/'+state+'.json';await mkdir(dirname(out+path),{recursive:true});await cp('runs/local-seo/'+state+'.json',out+path);
  runBody+=`<tr><td>${state}</td><td>${result.page.canonicalEvidence.candidates.length} candidates · ${esc(result.page.canonicalEvidence.status)}</td><td>${esc(result.issues.map(i=>i.code).join(', '))}</td><td><a href="${path}" download="${state}.json">Download raw JSON</a></td></tr>`;
}
runBody+='</tbody></table></div><p>The after input still reports a canonical mismatch because its intended example.com URL differs from the loopback fetch address. That limitation is preserved in the raw output.</p>'+md.render(runReadme)+`<div class="page-next">${link('/examples/#canonical-conflict','Inspect the unchanged input files')}${link('/skills/local-seo/','Read the local Skill source and limits')}</div>`;
await emit(article('/examples/local-cli-run/','A real CLI run. Synthetic input.','Read the commands, complete raw output and precise limits of one fixed-version local SEO report.',runBody,{parent:'/examples/',parentTitle:'Examples',eyebrow:'REPRODUCIBLE RUN RECORD',meta:'seo 0.2.41 · audit-page only · 10 October 2026, 12:09:48 UTC',toc:[['observed','Actual observations'],['reproduce-from-the-repository-root','Reproduce the run']]}));
const exampleToc=[];let exampleBody=`<div class="callout"><strong>Synthetic teaching examples.</strong><p>All URLs and inputs below are invented. No real site was inspected or changed, and no live request, account action, indexing result or traffic measurement is claimed for the four offline examples.</p><p>The supplied offline fixture checks were executed on 10 October 2026 with Python 3. All eight before/after outcomes matched their expected conditions. Separately, ${link('/examples/local-cli-run/','one real CLI report was run against synthetic input')}. The full source and checker are ${link(config.repository+'/tree/main/examples','in the repository')}.</p></div>`;
for (const c of fixtures.cases) {
  exampleToc.push([c.id,c.title]);
  exampleBody += `<section class="example-case"><h2 id="${c.id}">${esc(c.title)}</h2><span class="status">Synthetic example</span><p><strong>Finding:</strong> ${esc(c.finding)}</p><p><strong>Small correction:</strong> ${esc(c.fix)}</p>`;
  for (const state of ['before','after']) {
    exampleBody += `<h3>${state==='before'?'Before: complete input':'After: corrected teaching files'}</h3>`;
    for (const name of await readdir('examples/'+c.id+'/'+state)) {
      const content=await readFile('examples/'+c.id+'/'+state+'/'+name,'utf8');
      const filepath='/downloads/examples/'+c.id+'/'+state+'/'+name+'.txt';
      await mkdir(dirname(out+filepath),{recursive:true}); await writeFile(out+filepath,content);
      exampleBody+=`<p><strong>${esc(name)}</strong> · <a href="${filepath}" download="${name}">Download ${esc(name)}</a></p>${md.render('```text\n'+content+'\n```')}`;
    }
    exampleBody += `<p><strong>Offline output:</strong> The lesson-specific criterion ${expected.cases[c.id][state]?'passes':'fails'} for this ${state} fixture, as expected. This is an executed offline check of synthetic input.</p>`;
  }
  exampleBody += `<p><strong>What the criterion establishes:</strong> ${esc(c.acceptance)}</p><p><strong>Not checked:</strong> Live HTTP access, search-engine-selected canonical, indexing, ranking and traffic.</p><p>${link(c.source,'Official reference')} · ${link(guides.find(g=>g.example===c.id)?.path||'/guides/crawlability/','Follow the matching guide')}</p></section>`;
}
await emit(article('/examples/','See a check from start to next step.','Complete before-and-after inputs show how to read a result, including what it cannot prove.',exampleBody,{parent:'/',parentTitle:'Home',eyebrow:'WORKED EXAMPLES',toc:exampleToc,meta:'Synthetic data · Offline fixture checks executed · No live site checked'}));
await emit(article('/sources/','Sources, scope and licenses.','Factual guidance comes from official search-engine documentation. Teaching material is original; third-party Skills are linked, not bundled.',`<h2 id="editorial">Editorial source review</h2><p>The three guides were reviewed against their linked primary sources on 10 October 2026. Account steps are instructions for the authorized owner, not claims that this site can access an account. Worked records are synthetic.</p><ul>${[...new Set((await Promise.all(guides.map(g=>readFile('content/'+g.file,'utf8')))).join('\n').match(/https:\/\/(?:developers\.google\.com|support\.google\.com|search\.google\.com|(?:www2?\.)?bing\.com|blogs\.bing\.com)[^\s)]+/g))].map(u=>`<li>${link(u,new URL(u).hostname+' / '+new URL(u).pathname.split('/').at(-1))}</li>`).join('')}</ul><h2 id="skills">Skill provenance</h2><p>Each ${link('/skills/','Skill detail page')} lists a fixed source commit, license evidence, dependencies, permissions and cost limits. All three are source-reviewed. One local CLI report was executed with synthetic input; other workflows and assistant integrations were not run. We do not redistribute their instructions, source code, names or artwork as our own.</p><h2 id="license">Original project license</h2><p>Original site code, tutorials and example files are licensed under MIT. ${link(config.repository+'/blob/main/LICENSE','Read the complete license')}. Third-party projects keep their own licenses. The build-time Markdown renderer is markdown-it, MIT licensed; it is not delivered as a browser runtime.</p><h2 id="privacy">A small static site</h2><p>No accounts, forms, analytics script, database or SEO API are included. The hosting provider handles ordinary HTTP requests under its own terms. Optional tools have separate privacy and cost implications described on their detail pages.</p><h2 id="identity">Working identity</h2><p>First Crawl is this project’s working name. Trademark clearance has not been established. The site uses a subdomain of an existing owned domain; no new domain was purchased.</p>`,{parent:'/',parentTitle:'Home',eyebrow:'TRANSPARENT BY DESIGN',toc:[['editorial','Editorial sources'],['skills','Skill provenance'],['license','Project license'],['privacy','Static site'],['identity','Working identity']]}));
await emit(article('/contribute/','Make the next check clearer.','Contribute one accurate correction, clearer explanation or reproducible teaching example.',`<h2 id="contributing">Contribute through GitHub</h2><p>Read ${link(config.repository+'/blob/main/CONTRIBUTING.md','the contribution guide')} and open an issue or pull request in ${link(config.repository,'the public repository')}.</p><h2 id="evidence">Keep evidence precise</h2><p>Support search-engine claims with official sources. Distinguish source review, actual execution and synthetic data. Record the date and scope of a run; preserve unknowns instead of inventing a result.</p><h2 id="boundaries">Keep examples public</h2><p>Use example.com and original teaching fixtures. Do not contribute credentials, private URLs, account exports, customer data, internal screenshots or third-party Skill text without a license allowing redistribution.</p><div class="page-next">${link('/sources/','Read sources and licenses')}${link(config.repository+'/issues','Open an issue')}</div>`,{parent:'/',parentTitle:'Home',eyebrow:'OPEN SOURCE',toc:[['contributing','Contribute'],['evidence','Keep evidence precise'],['boundaries','Public examples']]}));
await emit({path:'/404.html',title:'Page not found',description:'This address does not exist. Return to First Crawl or choose a practical beginner SEO guide.',noindex:true,body:`<div class="wrap"><header class="page-head"><div class="eyebrow">404 · Page not found</div><h1>This trail ends here.</h1><p class="lede">The address may have changed. Start with one public page, or choose a guide below.</p><div class="actions"><a class="button" href="/start/">Start here →</a>${link('/','Return home')}</div></header>${lessonRows()}<div class="section"></div></div>`});
execFileSync('python3',['scripts/package-skills.py'],{stdio:'inherit'});
// Preserve pre-redesign addresses as Chinese entry points, outside the sitemap.
const legacyPaths=[...new Set(pages.map(p=>p.path.replace(/^\/(zh|en)(?=\/)/,'')))];
for(const oldPath of [...legacyPaths,'/404.html']) {
  const target=route(oldPath,'zh');
  const file=resolve(out,'.'+(oldPath==='/404.html'?oldPath:oldPath+'index.html'));
  await mkdir(dirname(file),{recursive:true});
  await writeFile(file,`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${origin+target}"><title>First Crawl</title></head><body><a href="${target}">打开中文页面 / Open in Chinese</a></body></html>`);
}
await writeFile(out+'/_redirects',legacyPaths.map(p=>`${p} ${route(p,'zh')} 302`).join('\n')+'\n');
await writeFile(out+'/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${origin+p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(out+'/robots.txt',`User-agent: *\nAllow: /\nDisallow: /downloads/\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(out+'/_headers','/downloads/*\n  X-Robots-Tag: noindex\n  Content-Disposition: attachment\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Content-Security-Policy: default-src \'self\'; script-src \'self\'; style-src \'self\'; img-src \'self\'; connect-src \'self\'; object-src \'none\'; base-uri \'self\'; frame-ancestors \'none\'\n');
let sourceCommit=null;
try{sourceCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch{}
await writeFile(out+'/build-info.json',JSON.stringify({name:config.name,origin,version:release?'2.2.0':'2.2.0-preview',sourceCommit,pages:pages.map(p=>p.path)},null,2)+'\n');
console.log(`Built ${pages.length} indexable pages, custom 404, sitemap, robots and teaching downloads.`);
