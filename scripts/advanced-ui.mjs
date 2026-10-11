import {readFile} from 'node:fs/promises';
import MarkdownIt from 'markdown-it';
import {esc,readableMarkdown} from './site-ui.mjs';
import {readingPage} from './content-ui.mjs';
import {contentURL,route,stageIds} from './content-routes.mjs';
export const advancedModules=JSON.parse(await readFile('content/advanced-fieldwork/modules.json','utf8'));
const mapping=JSON.parse(await readFile('content/advanced-fieldwork/stage-links.proposed.json','utf8')).stage_links;
const csvNames=['01-opportunity.csv','02-page-brief.csv','03-diagnosis.csv','04-report-scope.csv','05-channel.csv','06-experiment.csv'];
const descriptions={zh:['把真实需要、替代方案和经济假设分开，决定继续调查、做原型，或暂时不做。','先判断页面能帮助读者完成什么，再决定标题、结构和独立网址。','并列响应、robots、渲染、canonical 和引擎记录，把问题定位到具体环节。','先确认网站资源、时间、筛选与统计口径，再解释曝光、点击和变化。','先看受众、平台规则和发布条件，保留没有权限、没有数据时的未知。','在开始前写明问题、观察范围与停止条件。没有胜者也能留下有效结论。'],en:['Separate user needs, alternatives and economic assumptions before choosing research, a prototype or no development.','Decide what a reader can accomplish before choosing the title, structure and a separate URL.','Compare responses, robots, rendering, canonicals and engine records to locate the specific stage.','Align the property, dates, filters and aggregation before interpreting impressions, clicks and change.','Check audience fit, platform rules and publication conditions; preserve unknowns when access or data is missing.','Define the question, observation scope and stop conditions before starting. A test can end without a winner.']};
const title=(m,lang)=>m['title_'+lang];
const relatedStages=m=>mapping.filter(s=>s.module_slugs.includes(m.slug)).map(s=>s.stage_id);
export function advancedRelated(stageId,lang){
 const zh=lang==='zh',slugs=mapping.find(s=>s.stage_id===stageId)?.module_slugs||[];
 return `<section class="advanced-related" id="fieldwork"><p class="eyebrow">${zh?'完成小练习以后 · 深入作业':'AFTER THE SMALL EXERCISE · FIELDWORK'}</p>${slugs.map(slug=>{const m=advancedModules.find(m=>m.slug===slug);return `<a href="${contentURL(slug,lang)}">${esc(title(m,lang))}<span>${esc(descriptions[lang][m.stage-1])}</span></a>`;}).join('')}</section>`;
}
export function advancedIndex(lang){
 const zh=lang==='zh';return {title:zh?'从完成练习，到作出有依据的决定。':'From completing an exercise to making a defensible decision.',description:zh?'六份深入作业，配套公开依据、虚构示范和空白模板。接在入门课程后，不替代第一步。':'Six fieldwork exercises with public references, synthetic examples and blank templates. Continue after the introductory lessons.',body:`<div class="wrap"><div class="breadcrumb"><a href="${contentURL('resources',lang)}">${zh?'学习资料':'Learning resources'}</a> / ${zh?'深入作业':'Fieldwork'}</div><header class="page-head"><p class="eyebrow">${zh?'六份深入作业':'SIX FIELDWORK EXERCISES'}</p><h1>${zh?'把会做的步骤，<br>变成有依据的判断。':'Turn familiar steps<br>into defensible decisions.'}</h1><p class="lede">${zh?'需求是否成立、页面有没有价值、搜不到卡在哪一步、报表能不能比较。每一份作业处理一个决定，留下可复查的证据。':'Is the need supported? Does the page add value? Where is discovery blocked? Are the reports comparable? Each exercise handles one decision and retains checkable evidence.'}</p></header><div class="collection-lead"><p>${zh?'先做课程里的小练习，再选与你当前问题对应的一份作业。可以得出“暂不做”，也可以留下未知。':'Complete a small lesson first, then choose the exercise that matches your current question. No development and an unknown result are valid outcomes.'}</p><aside><strong>${zh?'示范不等于实测结果':'An example is not an observed result'}</strong>${zh?'公开来源已核对；教学作业尚未实站执行，示例完全虚构，真人学习验证未运行。':'Public references were checked. Live-site execution and learner validation are NOT_RUN. Worked examples are synthetic.'}</aside></div><div class="collection-list">${advancedModules.map((m,i)=>`<a class="collection-row" href="${contentURL(m.slug,lang)}"><span class="collection-number">0${i+1}</span><div><h2>${esc(title(m,lang))}</h2><p>${esc(descriptions[lang][i])}</p></div><div class="collection-meta"><strong>${zh?'要留下：可复查的决定':'OUTPUT: A checkable decision'}</strong>${zh?'完整作业 + 空白 CSV':'Complete exercise + blank CSV'}<br>${zh?'实站未运行':'Live execution NOT_RUN'}</div></a>`).join('')}</div></div>`};
}
export async function advancedPage(slug,lang){
 const zh=lang==='zh',m=advancedModules.find(m=>m.slug===slug),index=advancedModules.indexOf(m);if(!m)throw Error('Unknown advanced module');
 const raw=await readFile(`content/advanced-fieldwork/${lang}/${slug}.md`,'utf8'),headings=[...raw.matchAll(/^## (.+)$/gm)].map(m=>m[1]);let heading=0;
 const md=readableMarkdown(new MarkdownIt({html:false,linkify:false}));md.renderer.rules.heading_open=(tokens,i,options)=>{if(tokens[i].tag==='h2')tokens[i].attrSet('id','section-'+(++heading));return md.renderer.renderToken(tokens,i,options);};
 const evidence=`<div class="advanced-evidence"><p>${zh?'教学作业 · 示例完全虚构 · 实站执行与真人学习验证未运行（NOT_RUN）':'Teaching exercise · Synthetic examples · Live-site execution and learner validation NOT_RUN'}</p></div>`;
 const template=`<div class="advanced-template"><div><strong>${zh?'用一份空白记录完成这次作业':'Keep a blank record for this exercise'}</strong><p>${zh?'CSV 只有字段名，没有预设成绩。机器字段中英文一致，缺少证据时保留未知。':'Header-only CSV. No preset results. Machine fields are shared across languages; preserve unknowns without evidence.'}</p></div><a href="/downloads/advanced/${csvNames[index]}" download>${zh?'下载空白 CSV':'Download blank CSV'} ↓</a></div>`;
 const stageLinks=relatedStages(m).map((id,i)=>`<a href="${contentURL(id,lang)}">${zh?'回到第 '+(stageIds.indexOf(id)+1)+' 课':'Back to lesson '+(stageIds.indexOf(id)+1)}</a>`).join(' · ');
 const next=index===5?'advanced':advancedModules[index+1].slug;
 const body=evidence+md.render(raw.replace(/^# .+\n/,''))+template+`<p>${stageLinks}</p><div class="page-next"><a href="${contentURL('advanced',lang)}">${zh?'全部深入作业':'All fieldwork'}</a><a href="${contentURL(next,lang)}">${index===5?(zh?'选择下一次作业':'Choose another exercise'):(zh?'下一份作业 →':'Next exercise →')}</a></div>`;
 return readingPage('/advanced/'+slug+'/',title(m,lang),descriptions[lang][index],body,lang,{parent:'advanced',eyebrow:zh?`深入作业 0${index+1} / 06`:`FIELDWORK 0${index+1} / 06`,toc:headings.map((h,i)=>['section-'+(i+1),h])});
}
export function resourcesPage(lang){
 const zh=lang==='zh',rows=zh?[
 ['concepts','先把容易混淆的词分清楚','发现、抓取、索引、曝光与点击，各自说明什么。按课程筛选，随用随查。','23 个概念','理解与诊断'],
 ['templates','把观察写进一份空白记录','六份课程模板，字段为空。缺少证据时保留 null 或“未检查”。','六份 JSON','记录与复查'],
 ['guides','遇到技术问题，再打开完整教程','从访问规则、网站地图到单页信息，按步骤检查，并保留实际范围。','三篇完整教程','发布检查'],
 ['examples','看看一个具体问题怎样读、怎样改','四个模拟案例保留前后文件；另有一次真实本地 CLI 记录，问题与限制均保留。','四例 + 一次 CLI','理解检查结果'],
 ['advanced','把练习延伸成一次有依据的决定','六份深入作业：机会、页面价值、索引诊断、报表口径、渠道与有界实验。','六份作业 + CSV','完成入门以后'],
 ['skills','让 Agent 协助一个明确的任务','七个原创双语 Skills，与三个第三方来源分开。先看输入、产物和边界。','七个原创包','可选执行帮手']
 ]:[
 ['concepts','Separate the terms that are easy to confuse','What discovery, crawling, indexing, impressions and clicks each establish. Filter by lesson and look up as needed.','23 concepts','Understanding & diagnosis'],
 ['templates','Keep observations in a blank record','Six lesson templates with empty fields. Preserve null or not checked when evidence is missing.','Six JSON templates','Recording & rechecking'],
 ['guides','Open a complete guide for a technical question','Check access rules, sitemaps and page information, retaining the actual scope of every check.','Three complete guides','Publish checks'],
 ['examples','See how one specific issue is read and changed','Four synthetic cases preserve before-and-after files. An actual local CLI record also retains its issues and limits.','Four cases + a CLI record','Interpreting results'],
 ['advanced','Extend an exercise into a defensible decision','Six fieldwork exercises cover opportunities, page value, indexing diagnosis, report scopes, channels and bounded tests.','Six exercises + CSVs','After the introduction'],
 ['skills','Ask an agent to help with one defined task','Seven original bilingual Skills, separate from three third-party sources. Inspect inputs, outputs and boundaries.','Seven original packages','Optional execution help']
 ];
 return {title:zh?'需要哪种资料，就打开哪一份。':'Open the resource you need for the task.',description:zh?'按当前问题选择概念、模板、教程、案例、深入作业或 Skills，不必先把所有材料读完。':'Choose concepts, templates, guides, examples, fieldwork or Skills for the current question.',body:`<div class="wrap"><header class="page-head"><p class="eyebrow">${zh?'学习资料':'LEARNING RESOURCES'}</p><h1>${zh?'资料跟着任务走。':'Resources follow the task.'}</h1><p class="lede">${zh?'先知道自己要完成哪一步，再打开相关材料。刚接触 SEO，先读入门说明。':'Start with a task, then open the material that supports it. If SEO is new to you, read the introduction first.'}</p><a class="button" href="${contentURL('start',lang)}">${zh?'从入门开始':'Start with the introduction'} </a></header><div class="collection-list">${rows.map((r,i)=>`<a class="collection-row" href="${contentURL(r[0],lang)}"><span class="collection-number">0${i+1}</span><div><h2>${r[1]}</h2><p>${r[2]}</p></div><div class="collection-meta"><strong>${r[4]}</strong>${r[3]}</div></a>`).join('')}</div></div>`};
}
