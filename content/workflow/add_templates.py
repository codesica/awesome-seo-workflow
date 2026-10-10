import json,pathlib
R=pathlib.Path(__file__).parent
def b(z,e):return {'zh-CN':z,'en':e}
rows=[
('01-search-opportunity','opportunity-card','机会卡','Opportunity card',[
('audience','目标读者','Audience'),('context','发生问题的情境','Problem context'),('question','原始问题','Original question'),('intent','希望完成的任务','Intended task'),('evidence','需求证据：来源、日期、原话或摘要','Need evidence: source, date, quote or summary'),('regionLanguage','地区与语言','Region and language'),('resultReview','查询、检查日期、结果类型与未解决的问题','Query, review date, result formats, and unmet question'),('distinctiveHelp','我能提供的具体帮助','Distinctive help I can provide'),('volume','搜索量：数值及来源，或未知','Volume: number and provenance, or unknown'),('decision','选择/暂缓及理由','Choose/defer and rationale')]),
('02-page-plan','page-brief','页面简报','Page brief',[
('readerOutcome','读者完成标准','Reader outcome'),('format','页面类型与理由','Format and rationale'),('targetUrl','目标 URL 或计划路径','Target URL or planned path'),('createOrUpdate','新建/更新及与现页关系','Create/update and existing-page relationship'),('title','工作标题','Working title'),('outline','章节与每节要解决的问题','Sections and questions answered'),('evidenceMap','每节证据与素材','Evidence and assets per section'),('internalLinks','从哪里进入、链接到哪里','Inbound and onward internal links'),('locales','语言版本对应关系','Locale mapping'),('nextAction','读者下一步','Reader next action')]),
('03-content-production','content-package','内容包','Content package',[
('body','正文文件或草稿链接','Body file or draft link'),('metadata','title 与 description','Title and description'),('facts','事实—来源—核查日—测试状态','Claim-source-date-test status'),('assets','素材、权利说明、替代文本','Assets, rights, and alt text'),('links','站内与外部来源链接','Internal links and external sources'),('reviewer','作者/审阅者与范围','Author/reviewer and scope'),('locales','中英文内容位置','Locale content locations'),('walkthrough','试读问题与修复','Reader walkthrough and fixes'),('unresolved','仍未解决的问题','Unresolved issues')]),
('04-publish-check','release-checklist','发布检查单','Release checklist',[
('authorization','发布范围与权限','Publication scope and permission'),('version','版本与回滚点','Version and rollback point'),('url','最终线上 URL 与检查时间','Final live URL and check time'),('delivery','响应、跳转、正文、资源、手机端','Response, redirects, body, resources, mobile'),('directives','robots.txt、robots meta、X-Robots-Tag','robots.txt, robots meta, X-Robots-Tag'),('canonical','声明 canonical 与适用的索引证据','Declared canonical and available index evidence'),('sitemap','sitemap 网址、内容检查、提交状态','Sitemap URL, content check, submission status'),('locales','语言切换与 hreflang','Language switch and hreflang'),('inspection','已保存索引信息与实时测试分列','Stored index information and live test separately'),('unverified','未检查项与复查条件','Unchecked items and recheck trigger')]),
('05-discovery-promotion','discovery-log','发现与推广日志','Discovery log',[
('internalEntry','站内入口、链接文字和验证','Internal entry, anchor text, verification'),('channel','外部渠道、受众与规则','External channel, audience, and rules'),('copy','有上下文的草稿','Contextual draft'),('permission','发送范围与批准记录','Sending scope and approval'),('status','未发送/已发送及时间','Draft/sent and timestamp'),('campaign','如适用：source/medium/campaign','If applicable: source/medium/campaign'),('observations','实际访问/反馈及证据','Observed visits/feedback and evidence'),('unknowns','无法测量或确认的事项','Unmeasurable or unverified items')]),
('06-measure-iterate','iteration-card','改进与复盘卡','Iteration and review card',[
('goal','主要目标与页面','Primary outcome and page'),('baseline','基线来源、周期、筛选、缺失项','Baseline source, period, filters, gaps'),('metrics','点击/展示/CTR/位置及业务目标分列','Clicks/impressions/CTR/position and business outcomes separately'),('hypothesis','问题与证据','Problem and evidence'),('change','改动、上线时间与回滚点','Change, release time, rollback point'),('reviewWindow','复查时间与比较范围','Review date and comparison range'),('confounders','同期变化、季节与数据限制','Concurrent changes, seasonality, limitations'),('observation','实际观察，不作无证据因果断言','Observations, without unsupported causality'),('decision','保留/回滚/继续观察/返回阶段','Keep/rollback/observe/return to stage'),('ownerNext','负责人、下一步和触发条件','Owner, next step, and trigger')])]
templates=[]
for sid,tid,z,e,fields in rows:
 templates.append({'id':'template.'+tid,'stageId':sid,'title':b(z,e),'instruction':b('复制这张空白模板；没有证据时保留“未知/未检查”，不要填演示成绩。','Copy this blank template. Keep unknown/not checked where evidence is missing; do not insert demonstration outcomes.'),'fields':[{'id':tid+'.'+fid,'label':b(zh,en),'value':None,'evidenceStatus':'not-checked'} for fid,zh,en in fields]})
(R/'templates.json').write_text(json.dumps({'schemaVersion':'1.0.0','templates':templates},ensure_ascii=False,indent=2)+'\n')
for locale,short in [('zh-CN','zh'),('en','en')]:
 text=['# '+('六步空白交付模板' if short=='zh' else 'Six blank output templates')]
 for t in templates:
  text+=['## '+t['title'][locale],t['instruction'][locale]]
  text+=['- '+f['label'][locale]+': __________' for f in t['fields']]
 (R/short/'templates.md').write_text('\n\n'.join(text)+'\n')
