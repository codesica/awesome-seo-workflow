// Stable content IDs keep learning pages and original evidence downloads separate.
export const stageIds=['01-search-opportunity','02-page-plan','03-content-production','04-publish-check','05-discovery-promotion','06-measure-iterate'];
export const contentRoutes={
 home:'/',start:'/start/',roadmap:'/roadmap/',concepts:'/concepts/',templates:'/templates/',guides:'/guides/',
 crawlability:'/guides/crawlability/',sitemap:'/guides/sitemap/','page-check':'/guides/page-check/',
 skills:'/skills/','local-seo':'/skills/local-seo/','seo-sitemap':'/skills/seo-sitemap/','firecrawl-scrape':'/skills/firecrawl-scrape/',
 examples:'/examples/','robots-block':'/examples/#robots-block',noindex:'/examples/#noindex',
 'sitemap-html':'/examples/#sitemap-html','canonical-conflict':'/examples/#canonical-conflict',
 'local-cli-run':'/examples/local-cli-run/',sources:'/sources/',contribute:'/contribute/',notfound:'/404.html'
};
for(const id of stageIds)contentRoutes[id]='/stages/'+id+'/';
for(const id of ['inspect-search-console','inspect-bing-webmaster','research-search-results','seo-opportunity-evidence','seo-page-brief','seo-publish-audit','seo-measure-decide'])contentRoutes[id]='/skills/'+id+'/';
Object.freeze(contentRoutes);
const aliases={
 'check-crawlability.md':'crawlability','submit-sitemap.md':'sitemap','one-page-seo-check.md':'page-check',
 'content/check-crawlability.zh.md':'crawlability','content/submit-sitemap.zh.md':'sitemap','content/one-page-seo-check.zh.md':'page-check',
 'content/sources.zh.md':'sources','catalog/README.zh.md':'skills','examples/README.zh.md':'examples',
 'local-seo.zh.md':'local-seo','seo-sitemap.zh.md':'seo-sitemap','firecrawl-scrape.zh.md':'firecrawl-scrape'
};
for(const id of ['robots-block','noindex','sitemap-html','canonical-conflict']){
 aliases[id+'/README.zh.md']=id;aliases[id+'/README.md']=id;
 aliases['examples/'+id+'/README.zh.md']=id;aliases['examples/'+id+'/README.md']=id;
}
export function route(path,lang='zh'){
 if(!path.startsWith('/')||path.startsWith('/downloads/'))return path;
 const base=path.replace(/^\/(en|zh)(?=\/)/,'');
 return '/'+lang+base;
}
export function contentURL(id,lang='zh'){
 if(!contentRoutes[id])throw new Error('Unknown content ID: '+id);
 return route(contentRoutes[id],lang);
}
export function referenceURL(reference,lang='zh'){
 const trimmed=reference.replace(/^\.\//,'');
 const id=aliases[trimmed];
 return id?contentURL(id,lang):route(reference,lang);
}
