# First Crawl

简体中文 · [English](README.md)

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
python3 examples/verify.py
python3 content/workflow/validate.py
python3 scripts/validate-skill-locales.py
npm run build:release
```

上述检查只验证各自声明的本地范围，不验证收录、排名、增长或 Agent 端到端执行。

## 发布与许可

正式地址为 `https://skills.yangluotong.top`，由现有 `lab-seo-starter-skills` Cloudflare Worker 提供。`npm run deploy` 构建发布版并更新这个 Worker。`/build-info.json` 记录发布版本、源提交与 60 个可索引路由。发布沿用现有配置和权限。

原创代码、教程、示例和七个双语原创 Skill 使用 [MIT 许可](LICENSE)。链接的第三方项目保留各自许可，不包含在七个原创 Skill 下载中。见 [第三方归属说明](THIRD_PARTY.zh-CN.md)。
