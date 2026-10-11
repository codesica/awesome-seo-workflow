# Awesome SEO Workflow

简体中文 · [English](README.md)

[公开仓库：codesica/awesome-seo-workflow](https://github.com/codesica/awesome-seo-workflow)。这是原仓库的直接改名，Git 历史、issues 和 stars 均保留。现有 `first-crawl` 下载文件名及稳定课程 ID 保持兼容。

一套适合新手的 SEO 课程，以及七个原创 Agent Skills。用“免费五分钟冥想计时网页”的假设例子，理解搜索怎样把人带到有用的页面，再一次完成一件小事。示例不代表真实需求、收录、排名、流量或收入。

[中文网站](https://skills.yangluotong.top/zh/) · [English website](https://skills.yangluotong.top/en/) · [使用 Skills](USAGE.zh-CN.md) · [参与贡献](CONTRIBUTING.zh-CN.md)

## 选择语言

网站、入门课程、三篇完整技术教程、项目使用与贡献说明均提供中文和英文。七个原创 Skill 各有完整的中英文执行入口和必要参考材料。JSON 的机器字段名和状态值保持一致。

| 材料 | 简体中文 | English |
| --- | --- | --- |
| 项目介绍 | 本文 | [README.md](README.md) |
| 使用与安装 Skill | [USAGE.zh-CN.md](USAGE.zh-CN.md) | [USAGE.md](USAGE.md) |
| 参与贡献 | [CONTRIBUTING.zh-CN.md](CONTRIBUTING.zh-CN.md) | [CONTRIBUTING.md](CONTRIBUTING.md) |
| 原创 Skill 源文件 | [skills/browser/](skills/browser/)、[skills/workflow/](skills/workflow/) | [skills/en/](skills/en/) |
| 下载全部七个 | [中文 ZIP](https://skills.yangluotong.top/downloads/skills/zh/first-crawl-execution-skills.zip) | [English ZIP](https://skills.yangluotong.top/downloads/skills/en/first-crawl-execution-skills.zip) |
| 第三方归属 | [THIRD_PARTY.zh-CN.md](THIRD_PARTY.zh-CN.md) | [THIRD_PARTY.md](THIRD_PARTY.md) |

每个 Skill 只选择一种语言安装。文件夹中仍有可自动发现的 `SKILL.md`，名称、机器字段和任务范围不变。不要把同名的两个语言版本同时装进同一个助手的 Skill 目录。旧的 `/downloads/skills/<id>.zip` 与合辑地址继续指向兼容的中文包。

## 先学懂，再用帮手

[入门说明](https://skills.yangluotong.top/zh/start/) 在第 1 课之前。先在自己的纸或文档里写四行：写给谁、解决什么、准备怎么帮、还不知道什么。这个练习不需要网站、账号，也不用上传。

[六堂课](https://skills.yangluotong.top/zh/roadmap/) 依次处理需要、页面规划、内容制作、上线检查、发现与推广、根据证据改进。已有网站时，选择你负责、原本就应公开的页面；私密页面继续保持私密。草稿不等于可用工具，也不等于网站已上线。

每课先展示小动作、填好的假设示例、适合你的路径和完成标准。需要时再展开技术清单与可选 Skills。原有六个稳定阶段 ID 和 25 个动作均保留。

## 六阶段可点速览

先完成自己的小任务；没有网站也能走纸上练习路线。

| 阶段 | 这次留下什么 |
| --- | --- |
| [01 · 想清楚要帮谁](https://skills.yangluotong.top/zh/stages/01-search-opportunity/) | 受众与任务四行记录 |
| [02 · 画出这一页](https://skills.yangluotong.top/zh/stages/02-page-plan/) | 一张页面草图 |
| [03 · 写出来、做出来](https://skills.yangluotong.top/zh/stages/03-content-production/) | 可读草稿或可用页面 |
| [04 · 打开上线页面检查](https://skills.yangluotong.top/zh/stages/04-publish-check/) | 公开页面检查记录 |
| [05 · 让需要的人找到入口](https://skills.yangluotong.top/zh/stages/05-discovery-promotion/) | 发现与分享入口记录 |
| [06 · 看发生了什么，再改](https://skills.yangluotong.top/zh/stages/06-measure-iterate/) | 一项改动与复查条件 |

## 完成练习后，继续深入作业

[学习资料目录](https://skills.yangluotong.top/zh/resources/) 汇集概念、模板、教程、案例与可选 Skills。做完课程里的小练习，再按当前问题选择 [六份深入作业](https://skills.yangluotong.top/zh/advanced/)：机会证据、页面价值、索引诊断、报表口径、渠道选择与有界实验。每份均有完整中英正文、官方依据和空白 CSV。示例完全虚构；真实执行与真人学习验证仍为 `NOT_RUN`。

## 七个原创 Skills：任务 → 输入 → 输出

先理解任务，再选一个有界帮手。三个浏览器包需要已有授权；七个包都保持真实站点 `NOT_RUN`。

| Skill / 任务 | 输入 | 输出 |
| --- | --- | --- |
| [公开搜索结果研究](https://skills.yangluotong.top/zh/skills/research-search-results/) · `research-search-results` | 问题、受众、地区和有界搜索范围 | 观察证据 JSON；保留未检查项 |
| [搜索机会证据卡](https://skills.yangluotong.top/zh/skills/seo-opportunity-evidence/) · `seo-opportunity-evidence` | 受众问题、已有页面、搜索观察或用户反馈 | 机会卡 JSON；推荐下一验证动作 |
| [单页规划与搜索意图](https://skills.yangluotong.top/zh/skills/seo-page-brief/) · `seo-page-brief` | 机会卡、读者任务、第一手材料、现有页面 | 页面 brief JSON；交给内容制作的清单 |
| [发布技术检查](https://skills.yangluotong.top/zh/skills/seo-publish-audit/) · `seo-publish-audit` | URL、公开索引意图、HTML/响应头/robots/sitemap/内链 | 七项证据审计；阻塞、未知与修复建议 |
| [读取 Google 报告](https://skills.yangluotong.top/zh/skills/inspect-search-console/) · `inspect-search-console` | 精确资源、日期/网址和已有读取权限 | 带筛选条件、页面及限制的结果 JSON |
| [读取 Bing 后台](https://skills.yangluotong.top/zh/skills/inspect-bing-webmaster/) · `inspect-bing-webmaster` | 精确站点、网址/网站地图和已有读取权限 | 索引与发现证据 JSON；不提交索引 |
| [数据驱动迭代决策](https://skills.yangluotong.top/zh/skills/seo-measure-decide/) · `seo-measure-decide` | 数据导出、改动记录、可比基线、观察窗口 | 迭代决策卡；复查与停止条件 |

第 3 阶段没有专门的制作 Skill；第 5 阶段不提供自动对外推广。完整用法见 [使用说明](USAGE.zh-CN.md)。

## 可选第三方来源

这三个来源与七个原创包分开，许可和费用分别说明，不打包第三方代码。

- [SEO Skill · Local CLI](https://skills.yangluotong.top/zh/skills/local-seo/)
- [Claude SEO · Sitemap](https://skills.yangluotong.top/zh/skills/seo-sitemap/)
- [Firecrawl Scrape](https://skills.yangluotong.top/zh/skills/firecrawl-scrape/)

## 固定版本与下载校验

使用 [GitHub Releases](https://github.com/codesica/awesome-seo-workflow/releases) 获取固定版本。每个发布将版本、源提交、中文/英文 ZIP 与 SHA-256 校验和关联；网站的 [下载清单](https://skills.yangluotong.top/downloads/skills/manifest.json) 也提供对应关系。校验和用于确认文件一致，不证明 Skill 在真实网站运行过。

## 本地运行

需要 Node.js 22+ 和 Python 3。Skill 打包只使用 Python 标准库。

```sh
npm ci --ignore-scripts
npm run build
PORT=4180 npm run preview
```

打开 `http://127.0.0.1:4180/zh/` 或 `/en/`。`npm run dev` 默认使用 4173 端口。构建生成 `dist/`，不会安装或执行任何 Skill。

## 源文件与页面结构

- `content/beginner/`：双语首页、入门说明和一次一件事的教学层。
- `content/workflow/`：六个双语阶段、25 个动作、官方来源与六份空白模板。
- `content/advanced-fieldwork/`：六份公开双语深入作业、31 个官方来源与六个空白 CSV。
- `content/concepts/`：23 个双语概念说明。
- `content/` 与 `content/zh/`：原有三篇完整英文、中文技术教程。
- `skills/browser/` 与 `skills/workflow/`：保留的中文 Skill 入口。
- `skills/en/browser/` 与 `skills/en/workflow/`：完整英文入口及其必要资源。
- `scripts/content-routes.mjs`：稳定内容 ID 与语言路由。
- `scripts/package-skills.py`：构建两种语言的下载及旧地址兼容包。

每页都有对应的 `/zh/`、`/en/` 路径，各自的 canonical 和相互对应的 hreflang。没有语言前缀的旧地址进入中文页，不进入网站地图。原始证据下载与语言无关；翻译后的说明使用明确语言路径。

## 证据与限制

七个原创 Skill 仍为“来源已审阅”，**真实网站未运行（NOT_RUN）**。合成结构和算术校验与实际 SEO 执行分开。浏览器 Skill 使用已有授权会话。翻译包不会授予登录、读数据、提交索引、发布、发消息或调用付费工具的权限。

四个离线缺陷案例均为模拟输入。已有一次固定版本 `seo 0.2.41 audit-page` 的真实 CLI 执行，以本地 HTTP 提供合成 HTML。修改后仍返回 `canonical_mismatch`，不能说成全部通过或已收录。见 [完整中文运行记录](https://skills.yangluotong.top/zh/examples/local-cli-run/)。

第 3 课没有专门制作网页的 Skill。第 5 课包含只读 Bing 检查，不包含自动推广。纸上路径学习规划与证据解释，不会做出示例中的计时器。编辑复核和浏览器检查不等于真实新手试读。

```sh
npm run check
```

上述检查只验证各自声明的本地范围，不验证收录、排名、增长或 Agent 端到端执行。

## 发布与许可

正式地址为 `https://skills.yangluotong.top`，由现有 `lab-seo-starter-skills` Cloudflare Worker 提供。`npm run deploy` 构建发布版并更新这个 Worker。`/build-info.json` 记录发布版本、源提交与 76 个可索引路由。发布沿用现有配置和权限。

原创代码、教程、示例和七个双语原创 Skill 使用 [MIT 许可](LICENSE)。链接的第三方项目保留各自许可，不包含在七个原创 Skill 下载中。见 [第三方归属说明](THIRD_PARTY.zh-CN.md)。

## 项目规范 / Project standards

修改前阅读相关规范，交付时记录实际本地检查结果；未测不等于通过。当前视觉为项目编辑式 v1。

Read the relevant standard before making changes and record actual local verification at delivery. Untested does not mean passed. The current visual direction is project editorial v1.

- [生图 / Image generation](docs/standards/image-generation.md)
- [UI](docs/standards/ui.md)
- [视觉交互 / Visual interaction](docs/standards/visual-interaction.md)
- [内容 / Content](docs/standards/content-standard.md)
- [调研 / Research](docs/standards/research-standard.md)
