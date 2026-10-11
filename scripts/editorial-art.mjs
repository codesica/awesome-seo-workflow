import {existsSync} from 'node:fs';
import {esc} from './site-ui.mjs';

export const artKeys=['hero','need','making','discovery','promotion','experiment','agent'];
export const lessonArt=['need','making','making','discovery','promotion','experiment'];
const descriptions={
 hero:['提问者、网页创作者和读者围绕一张植物养护网页展开的编辑插画','Editorial illustration of a questioner, page creator and reader around a plant-care page'],
 need:['观察不同人的日常问题，整理需求线索的编辑插画','Editorial illustration of observing everyday problems and collecting clues about a need'],
 making:['从草稿、页面结构到可用网页的制作场景插画','Editorial illustration of developing sketches and a page structure into a useful page'],
 discovery:['用图书馆、整理与查找类比页面被发现和索引的编辑插画','Editorial illustration using a library, organization and retrieval as an analogy for page discovery and indexing'],
 promotion:['创作者向有相关需要的小群体介绍网页的编辑插画','Editorial illustration of introducing a page to a small group with a relevant need'],
 experiment:['对照网页前后版本，圈出一处改动并记录观察的编辑插画','Editorial illustration of comparing page versions, circling a change and recording observations'],
 agent:['人向助手交代范围、检查材料并保留判断的编辑插画','Editorial illustration of a person defining an assistant’s scope, reviewing material and retaining judgment']
};
export function art(key,lang,{priority=false,caption='',className=''}={}){
 if(!artKeys.includes(key))throw new Error('Unknown editorial illustration');
 // Incomplete local previews omit unavailable art. Release builds require all seven.
 if(!existsSync(`public/images/editorial/${key}-1536.webp`))return '';
 const base=`/images/editorial/${key}`;
 return `<figure class="editorial-art ${esc(className)}"><img src="${base}-1000.webp" srcset="${base}-640.webp 640w, ${base}-1000.webp 1000w, ${base}-1536.webp 1536w" sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1240px) 55vw, 672px" width="1536" height="1024" alt="${esc(descriptions[key][lang==='zh'?0:1])}" loading="${priority?'eager':'lazy'}" decoding="async"${priority?' fetchpriority="high"':''}>${caption?`<figcaption>${esc(caption)}</figcaption>`:''}</figure>`;
}
export function illustratePage(page,key,lang){
 const captions={need:['场景示意：从现实问题中寻找需要。','Illustrative scene: look for needs in everyday problems.'],making:['制作过程示意：把回答整理成可用的网页。','Illustrative process: turn an answer into a useful page.'],discovery:['图书馆类比：发现、读取和索引是不同环节。','Library analogy: discovery, retrieval and indexing are separate steps.'],promotion:['场景示意：把网页介绍给有相关需要的人。','Illustrative scene: introduce a page to a relevant audience.'],experiment:['版本对照示意；图中不含实测成绩。','Illustrative version comparison; no measured results are shown.'],agent:['协作示意：助手整理，你检查依据。','Illustrative collaboration: the assistant organizes; you review the evidence.']};
 const image=art(key,lang,{priority:true,caption:captions[key]?.[lang==='zh'?0:1]||''});
 if(!image)return page;
 return {...page,body:page.body.replace(/<header class="page-head">([\s\S]*?)<\/header>/,`<header class="page-head illustrated-head"><div class="illustrated-title">$1</div>${image}</header>`)};
}
