import {readFile} from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import {esc,readableMarkdown,home as previousHome} from './site-ui.mjs';
import {readingPage,fullStagePage,executionSkills} from './content-ui.mjs';
import {contentURL,stageIds,route} from './content-routes.mjs';
import {searchDiagram,roadmapDiagram,agentDiagram} from './teaching-diagrams.mjs';
import {editorialOpening} from './editorial-home.mjs';
import {advancedRelated} from './advanced-ui.mjs';

// Retain every existing written example and anchor using native details.
function textExamples(markup,lang){return markup.replace(/<div class="diagram-visual diagram-(desktop|mobile)">[\s\S]*?<\/svg><div class="diagram-hotspots"><\/div><\/div>/g,'').replace(' data-teaching-diagram','').replace(/<figcaption>[\s\S]*?<\/figcaption>/,`<figcaption>${lang==='zh'?'展开文字示例：假设与未知都保留':'Open the written examples: keep assumptions and unknowns'}</figcaption>`);}

const copy=JSON.parse(await readFile('content/beginner/stages.replacement.json','utf8'));
if(copy.stages.map(s=>s.id).join('|')!==stageIds.join('|'))throw new Error('Beginner lessons must preserve all six stable stage IDs.');
const sources={};
for(const lang of ['zh','en'])sources[lang]={home:await readFile(`content/beginner/home.${lang}.md`,'utf8'),start:await readFile(`content/beginner/start-here.${lang}.md`,'utf8')};
const pick=(value,lang)=>value[lang];
const text=(value,lang)=>esc(pick(value,lang));
const md=readableMarkdown(new MarkdownIt({html:false}));
const P=string=>md.render(string);
const link=(id,label,lang,cls='')=>`<a${cls?` class="${cls}"`:''} href="${contentURL(id,lang)}">${esc(label)}</a>`;
const beginnerPage=page=>({...page,body:page.body.replace('<div class="wrap">','<div class="wrap beginner-page">')});
const outputs={zh:['四行需要说明','三个页面方框','标题和三句说明','一份访问检查记录','两行入口计划','一处改写和复查计划'],en:['Four lines about a need','Three page boxes','A title and three instructions','A visitor-check record','A two-line entry plan','One change and a recheck plan']};

function lessonRows(lang){
 return `<div class="beginner-lesson-list">${copy.stages.map((s,i)=>`<a class="beginner-lesson-row" href="${contentURL(s.id,lang)}"><span class="lesson-number">0${s.order}</span><div><h3>${text(s.title,lang)}</h3><p>${text(s.firstScreen.question,lang)}</p></div><span class="beginner-lesson-output">${esc(outputs[lang][i])}</span><span aria-hidden="true">→</span></a>`).join('')}</div>`;
}
function retainedHome(lang,data){
 const zh=lang==='zh',raw=sources[lang].home,sections=raw.split(/^## /m),intro=sections.shift();
 const title=intro.match(/^# (.+)/m)[1];
 const paragraphs=intro.replace(/^# .+\n/,'').trim().split(/\n\n/);
 const splitSection=s=>{const at=s.indexOf('\n');return {title:s.slice(0,at),body:s.slice(at+1).trim()};};
 const [mechanism,practice,outcome,ai]=sections.map(splitSection);
 const mechanismParts=mechanism.body.split(/\n\n/),flow=mechanismParts.slice(0,-1).join('\n\n'),distinction=mechanismParts.at(-1);
 const pathButton=(paragraph,id)=>{const match=paragraph.match(/^\[([^\]]+)\]\n([\s\S]*)$/);return `<a class="entry-link" href="${contentURL('start',lang)}"><strong>${esc(match[1])}<span aria-hidden="true"> →</span></strong><span>${esc(match[2])}</span></a>`;};
 const practiceBody=practice.body.replace(/\[([^\]]+)\]/g,(_,label)=>`[${label}](${contentURL('start',lang)})`);
 // Preserve the already-tested fixture interaction and its exact evidence, below the beginner route.
 const old=previousHome(lang,data).body;
 const workbench=old.match(/<div class="hero-demo">([\s\S]*?)<\/section>/)[1].replace(/<\/div>$/,'');
 return {title,description:paragraphs[1],styles:['/teaching-diagrams.css'],body:`<div class="wrap beginner-home diagram-home"><section class="hero beginner-hero"><div class="hero-copy"><p class="eyebrow">${zh?'第一次接触 SEO，从一个小例子开始':'New to SEO? Start with one small example.'}</p><h1>${zh?'你做了一张有用的网页，别人怎么搜到它？':esc(title)}</h1><div class="hero-introduction"><p class="lede">${esc(paragraphs[0])}</p><p class="beginner-intro">${esc(paragraphs[1])}</p><a class="button" href="${contentURL('start',lang)}">${zh?'先读入门说明':'Read the introduction'} <span aria-hidden="true">→</span></a></div></div>${searchDiagram(lang,'home-search')}</section><div class="beginner-entries"><p class="mobile-seo-intro">${esc(paragraphs[1])}</p><p>${esc(paragraphs[2])}</p><div>${pathButton(paragraphs[3],'no-site')}${pathButton(paragraphs[4],'existing-site')}</div></div><section class="beginner-section search-mechanism" id="search-to-use"><p class="eyebrow">${zh?'先看懂事情怎样发生':'Understand what happens first'}</p><h2>${esc(mechanism.title)}</h2><details class="beginner-disclosure"><summary>${zh?'展开完整说明：搜索与使用的六个问题':'Read the full explanation: six questions about search and use'}</summary><div class="beginner-flow">${P(flow)}</div><p class="mechanism-distinction">${esc(distinction)}</p></details></section><section class="beginner-section home-practice" id="first-practice"><div><p class="eyebrow">${zh?'纸或文档就够了':'Paper or a document is enough'}</p><h2>${esc(practice.title)}</h2></div><div class="prose">${P(practiceBody)}</div></section><section class="beginner-section" id="lessons"><p class="eyebrow">${zh?'接下来，边理解边动手':'Then learn by doing'}</p><h2>${zh?'六堂课，一次只做一件事。':'Six lessons. One small task at a time.'}</h2><p class="beginner-section-intro">${zh?'先画、再写，随后检查访问、安排入口，最后根据实际观察改进。没有网站也能用纸上草稿完成学习路线。':'Sketch, write, check access, plan entry points, and improve using observations. Without a website, follow along with a paper draft.'}</p>${lessonRows(lang)}</section><section class="beginner-section beginner-takeaway"><h2>${esc(outcome.title)}</h2>${P(outcome.body)}</section><section class="beginner-section beginner-ai"><h2>${esc(ai.title)}</h2>${P(ai.body)}${link('skills',zh?'按课程查看可选 Skills':'Explore optional Skills by lesson',lang,'text-link')}<details class="beginner-disclosure home-technical"><summary>${zh?'已经遇到技术问题？展开检查示例与完整教程':'Have a technical problem? Open the examples and complete guides'}</summary><p>${zh?'这些是技术教学文件，与上面的假设计时网页分开。检查记录只说明其实际范围。':'These technical teaching files are separate from the fictional timer story. Each record establishes only its stated scope.'}</p><div class="technical-workbench">${workbench}</div><ul><li>${link('guides',zh?'三篇完整技术教程：访问、网站地图、单页信息':'Three complete technical guides: access, sitemap, page information',lang)}</li><li>${link('examples',zh?'四个修改前后的模拟案例':'Four before-and-after synthetic cases',lang)}</li><li>${link('local-cli-run',zh?'真实本地 CLI 记录：保留原始问题与未知':'Actual local CLI record, including its issues and unknowns',lang)}</li><li>${link('concepts',zh?'随用随查的概念说明':'Concept explanations to look up when needed',lang)}</li><li>${link('templates',zh?'需要结构化记录时，再看 JSON 模板':'JSON templates when structured records are needed',lang)}</li></ul></details></section><section class="closing"><div><h2>${zh?'从一个人的问题开始。':'Start with one person’s question.'}</h2><p>${zh?'先读懂例子，再留下自己的四行说明。不需要账号，也不用上传。':'Read the story, then keep your own four-line record. No account or upload is needed.'}</p></div>${link('start',zh?'读入门说明':'Read the introduction',lang,'button')}</section></div>`};
}

export function home(lang,data){
 const retained=retainedHome(lang,data);
 const marker='<section class="beginner-section home-practice"';
 const tail=retained.body.slice(retained.body.indexOf(marker));
 return {...retained,title:lang==='zh'?'让有用的网页，遇到需要它的人。':'Make a useful page. Help the right people find it.',styles:['/editorial-home.css'],scripts:['/editorial-home.js'],body:editorialOpening(lang)+'<div class="wrap beginner-home">'+tail};
}

export function startPage(lang){
 const zh=lang==='zh',raw=sources[lang].start,title=raw.match(/^# (.+)/m)[1];
 const ids=['how-search-works','connect','story','first-practice','choose-path','understood'];
 const headings=[...raw.matchAll(/^## (.+)$/gm)].map(m=>m[1]);
 let h2=0,h3=0;
 const renderer=readableMarkdown(new MarkdownIt({html:false}));
 renderer.renderer.rules.heading_open=(tokens,i,options)=>{if(tokens[i].tag==='h2')tokens[i].attrSet('id',ids[h2++]);if(tokens[i].tag==='h3')tokens[i].attrSet('id',['no-site','existing-site'][h3++]);return renderer.renderer.renderToken(tokens,i,options);};
 let source=raw.replace(/^# .+\n/,'');
 source=source.replace(/\[([^\]]+)\]/g,(_,label)=>`[${label}](${contentURL(label.includes('4')?stageIds[3]:stageIds[0],lang)})`);
 const body=renderer.render(source);
 return beginnerPage(readingPage('/start/',title,zh?'先读懂一个人的搜索怎样与一张网页相遇，再动手写四行。':'Understand how someone’s search can lead to a page, then write four lines.',body,lang,{eyebrow:zh?'入门说明 · 在第 1 课之前':'Introduction · Before lesson 1',toc:ids.map((id,i)=>[id,headings[i]])}));
}

export function stagePage(id,lang){
 const zh=lang==='zh',s=copy.stages.find(s=>s.id===id),f=s.firstScreen;
 const section=(anchor,title,body)=>`<section id="${anchor}" class="beginner-step"><h2>${esc(title)}</h2>${body}</section>`;
 const sample=id===stageIds[0]?`<figure class="worked-record"><figcaption>${text(f.workedExample.label,lang)}</figcaption><dl class="lesson-record-grid">${pick(f.workedExample.content,lang).split('\n').map((line,i)=>{const colon=line.indexOf(zh?'：':':');return `<div><dt><span>0${i+1}</span>${esc(line.slice(0,colon))}</dt><dd>${esc(line.slice(colon+1).trim())}</dd></div>`;}).join('')}</dl></figure>`:`<figure class="worked-record"><figcaption>${text(f.workedExample.label,lang)}</figcaption><pre>${text(f.workedExample.content,lang)}</pre></figure>`;
 const paths=`<div class="lesson-paths"><h3>${zh?'我还没有网站':'I do not have a website'}</h3><p>${text(s.task.noSitePath,lang)}</p><h3>${zh?'我已经有网站':'I have a website'}</h3><p>${text(s.task.ownerPath,lang)}</p><p class="lesson-save">${text(s.task.saveLocation,lang)}</p></div>`;
 const legacy=fullStagePage(id,lang).body.match(/<article class="prose">([\s\S]*?)<\/article>/)[1].replace(/<div class="page-next">[\s\S]*?<\/div>$/,'').replace('id="agent"','id="legacy-agent"');
 const details=s.details.map(d=>`<details class="beginner-disclosure"><summary>${text(d.title,lang)}</summary><p>${text(d.body,lang)}</p></details>`).join('');
 const skills=executionSkills.filter(x=>x.stageIds.includes(id));
 const skillLinks=skills.length?`<ul>${skills.map(skill=>`<li>${link(skill.id,pick(skill.title,lang),lang)}<p>${esc(pick(skill.summary,lang))}</p></li>`).join('')}</ul>`:`<p>${zh?'本课没有专门的制作 Skill。先完成上面的手动练习；其他课的工具不能代替制作网页。':'There is no dedicated production Skill for this lesson. Complete the manual exercise above; tools from other lessons do not build this page.'}</p>`;
 const body=`<p>${text(f.explanation,lang)}</p>${section('practice',zh?'现在只做这一件事':'Do this one thing now',`<p class="one-action">${text(f.oneAction,lang)}</p>`)}${section('worked-example',zh?'一份填好的记录，长这样':'Here is a completed example',sample)}${section('your-path',zh?'按你的情况继续':'Continue with your situation',paths)}${section('done',zh?'怎样算完成？':'How do I know I am done?',`<p>${text(f.doneWhen,lang)}</p>`)}${section('not-yet',zh?'现在还不用做什么？':'What can wait?',`<p>${text(f.notNeededYet,lang)}</p>`)}${section('details',zh?'需要时，再展开':'Open when you need more',(id===stageIds[0]?`<details class="beginner-disclosure"><summary>${zh?'回看：一个人的搜索，怎样与网页相遇':'Review how a person’s search can meet a page'}</summary>${textExamples(searchDiagram(lang,'lesson-search'),lang)}</details>`:'')+details+`<details class="beginner-disclosure complete-checklist"><summary>${zh?'完整工作清单、技术教程、模板和来源':'Complete work checklist, technical guides, templates, and sources'}</summary><p>${zh?'上面的小练习完成后，再按真实项目需要查阅。这份详细清单保留原有六阶段的全部工作范围。':'After the small exercise, consult this for your real project as needed. It retains the full scope of the original six-stage workflow.'}</p>${legacy}</details>`)}${id===stageIds[0]?section('agent-example',zh?'看懂 AI 怎么帮忙，再决定是否用':'Understand AI help before choosing it',textExamples(agentDiagram(lang,'lesson-agent'),lang)):''}${advancedRelated(id,lang)}<details class="beginner-disclosure optional-skills" id="agent"><summary>${text(s.skills.label,lang)}</summary><p>${text(s.skills.note,lang)}</p>${skillLinks}<p>${zh?'这些完整包来源已审阅，真实网站未运行。后台需要已有权限；完整执行包提供中文和英文。':'The complete packages are source-reviewed; live-site execution is NOT_RUN. Private reports require existing access. Complete instruction packages are available in Chinese and English.'}</p></details><section id="next" class="lesson-next"><h2>${s.order===6?(zh?'下一轮，从问题所在处继续':'Start the next round where needed'):(zh?'继续下一课':'Continue to the next lesson')}</h2><p>${text(s.next,lang)}</p><div class="page-next">${link(s.order===1?'start':stageIds[s.order-2],zh?'← 回到上一页':'← Previous',lang)}${link(s.order===6?'roadmap':stageIds[s.order],s.order===6?(zh?'查看六课路线':'See all six lessons'):(zh?`去第 ${s.order+1} 课：${pick(copy.stages[s.order].title,lang)}`:`Lesson ${s.order+1}: ${pick(copy.stages[s.order].title,lang)}`),lang)}</div></section>`;
 const page=beginnerPage(readingPage('/stages/'+id+'/',pick(s.title,lang),pick(f.question,lang),body,lang,{eyebrow:zh?`第 ${s.order} 课 / 共 6 课`:`Lesson ${s.order} of 6`,toc:[['practice',zh?'一个小动作':'One small action'],['worked-example',zh?'填好示例':'Completed example'],['your-path',zh?'两条学习路径':'Your path'],['done',zh?'完成标准':'Done when'],['details',zh?'按需展开':'More when needed'],['fieldwork',zh?'深入作业':'Fieldwork'],['agent',zh?'可选 AI 帮手':'Optional AI help'],['next',zh?'接下来':'Next']]}));
 return page;
}

export function roadmapPage(lang){
 const zh=lang==='zh',title=zh?'六堂课，做出一份明白的页面草稿。':'Six lessons toward a clear page draft.';
 return {title,description:zh?'一次处理一个问题。没有网站也能从纸上练习开始。':'Handle one question at a time. Start on paper even without a website.',body:`<div class="wrap beginner-home"><header class="page-head"><p class="eyebrow">${zh?'六堂动手课':'Six practical lessons'}</p><h1>${title}</h1><p class="lede">${zh?'这张表讲你怎样动手。搜索引擎怎样找到、读取、保存和展示页面，先在入门说明里看懂。':'This is the sequence for your work. Learn how search discovers, retrieves, stores, and displays pages in the introduction first.'}</p>${link('start',zh?'先读入门说明':'Read the introduction first',lang,'button')}</header><div class="beginner-entries"><div><section class="entry-link" id="no-site"><h2>${zh?'我还没有网站':'I do not have a website'}</h2><p>${zh?'带纸或文档，从四行说明开始。六课都能用假设例子和草稿学习，不需要域名或站长账号。草稿不等于已上线，计划功能不等于可用。':'Use paper or a document, starting with four lines. Learn all six lessons with fictional examples and drafts, without a domain or webmaster account. A draft is not a published page, and planned features are not working ones.'}</p>${link(stageIds[0],zh?'去第 1 课':'Go to lesson 1',lang)}</section><section class="entry-link" id="existing-site"><h2>${zh?'我已经有网站':'I have a website'}</h2><p>${zh?'选一张你负责、原本就应公开的网页。先确认帮助谁和做什么；已经知道这些，想查访问或搜索问题，就进入第 4 课。私密页面保持私密。':'Choose a page you manage that is intended to be public. Check whom it helps and what it does. If that is clear and you need access or search checks, continue to lesson 4. Keep private pages private.'}</p>${link(stageIds[3],zh?'去第 4 课':'Go to lesson 4',lang)}</section></div></div><section class="beginner-section">${lessonRows(lang)}</section><section class="advanced-related"><p class="eyebrow">${zh?'完成练习以后':'AFTER THE EXERCISE'}</p>${link('advanced',zh?'六份深入作业：把观察变成有依据的判断':'Six fieldwork exercises: turn observations into defensible decisions',lang)}<p>${zh?'包含完整双语文章与空白 CSV。按当前问题选择，不必一次读完。':'Complete bilingual articles and blank CSVs. Choose for the current question.'}</p></section><section class="closing"><p>${zh?'这里的计时网页和记录是教学假设。真实检查保留实际日期、观察和未知项；没有权限或数据，记录“未检查”。':'The timer and records here are fictional. For real checks, keep dates, observations, and unknowns. Without access or data, record “not checked.”'}</p></section></div>`};
}
