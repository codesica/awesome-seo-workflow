# 使用 First Crawl Skill

简体中文 · [English](USAGE.md) · [项目说明](README.zh-CN.md)

学习 SEO 时，先看[入门说明](https://skills.yangluotong.top/zh/start/)。四行纸上练习不需要 Skill、账号或安装。理解任务、知道怎样判断结果以后，再选择帮手。

## 选择一个任务

| Skill 名称 | 做什么 | 需要什么输入 |
| --- | --- | --- |
| `research-search-results` | 观察公开搜索结果与代表页面 | 一个问题、受众和语言、有界范围、已授权浏览器 |
| `seo-opportunity-evidence` | 为一个页面想法整理证据 | 用户提供或已授权读取的问题、观察或反馈 |
| `seo-page-brief` | 规划一张页面 | 需要、读者任务、已有证据、现有页面背景 |
| `seo-publish-audit` | 检查上线证据 | 原本应公开的目标网址，以及可用 HTML、响应头、robots、网站地图、语言和链接证据 |
| `inspect-search-console` | 读取 Google 搜索与索引报告 | 精确的网站资源、日期/筛选或网址、已有报告读取权限 |
| `inspect-bing-webmaster` | 读取 Bing 索引和现有网站地图报告 | 精确的网站/网址、问题、已有报告读取权限 |
| `seo-measure-decide` | 根据可比较证据选择一个改动 | 观察、日期/筛选、改动记录，以及存在时的基线 |

这里没有专门制作网页的 Skill，也没有自动对外推广的 Skill。浏览器包需要助手当前环境提供兼容的浏览器或电脑工具。本地分析包不会自动取得缺失证据或账号权限。

## 选择中文或英文

- 中文源码：`skills/browser/<名称>/` 或 `skills/workflow/<名称>/`。
- 英文源码：`skills/en/browser/<名称>/` 或 `skills/en/workflow/<名称>/`。
- [中文下载页](https://skills.yangluotong.top/zh/skills/)和[英文下载页](https://skills.yangluotong.top/en/skills/)明确标注包的语言，也提供另一语言的入口。
- 每个 ZIP 解压为 `<名称>/SKILL.md`，包含必要的相对引用和资源。合辑包含七个具名文件夹。使用前查看完整包、参考材料和 MIT 许可。

同一个安装位置里，每个 Skill 名称只选一种语言。入口仍叫 `SKILL.md`，frontmatter 的 `name` 保持一致。第二语言是可替换版本，不是另一个同名安装。其它助手有各自的发现规则；没有执行过或认证所有宿主的兼容性。

## 决定使用后，再安装

网站不会自动安装。对于 Codex，可以把选好的完整文件夹放入你配置的 Skill 位置，例如 `~/.codex/skills/`。引用文件必须与 `SKILL.md` 一起保留；浏览器 Skill 和发布审计案例不能只复制入口文件。

例如，在仓库目录中，**确认目标目录还没有这个 Skill 后**：

```sh
mkdir -p ~/.codex/skills
cp -R skills/browser/research-search-results ~/.codex/skills/
```

英文版本改用 `skills/en/browser/research-search-results`。同名 Skill 已安装时，先查看并备份原目录，再决定是否替换；不要在同名目录内再套一层。按宿主正常流程刷新或发现 Skill。调用示例为 `$research-search-results`，前提是宿主已经发现选定的文件夹。

安装说明不等于运行。七个已发布包仍保持 **真实网站未运行（NOT_RUN）**。安装不会授予浏览器访问、账号权限、发布授权或发消息权限。

## 给帮手一个有边界的请求

说明任务、允许读取什么、目标站点/页面或文件、相关日期和筛选，以及结果保存位置。例如：

> 请使用 $seo-opportunity-evidence，只分析我提供的受众问题和笔记。没有依据的需求与搜索量保持未知。交付一份带证据的机会记录及下一验证动作。不要发布或发送任何内容。

执行前阅读 Skill 的输入契约和必要参考。缺权限、站点身份不明、数据冲突或工具不可用时，应留下具体阻塞或未知，不能伪造通过。原创本地分析说明不要求付费 SEO 服务，但助手、模型或可选宿主工具可能有自己的费用。

## 看懂结果

字段名和枚举/状态值保留英文，程序继续使用同一结构；解释和报告正文可使用选定语言。浏览器包附对应语言的 `references/output-contract.md` 与空白 `assets/result-template.json`；工作流 Skill 在对应语言的 `SKILL.md` 中解释内嵌 JSON 字段。

- `null` 表示缺失或未知，不是零。空数组不能证明没有问题。
- `NOT_RUN` 表示声明的实际运行没有发生。来源审阅或分析用户截图不能算浏览器已运行。
- 真正浏览时，可按契约为该次范围记 `COMPLETE`、`PARTIAL`、`BLOCKED`。完成报告不代表收录、排名、增长或页面成功使用。
- `observed`、`provided`、`inferred`、`unknown` 分别区分实际观察、用户提供、推断和未知。保留来源、时间、页面上下文与限制。
- 空白模板和合成案例是教学材料，不是你的网站报告。索引/流量未知就保留未知，不拿虚构数字代替真实数据。

亲自核对证据与完成标准。英文说明与中文说明的范围和限制相同，翻译不会增加实际执行证据。

## 构建或参与贡献

本地预览与发布见 [项目说明](README.zh-CN.md)，双语维护见 [贡献说明](CONTRIBUTING.zh-CN.md)，可选外部项目见 [第三方归属](THIRD_PARTY.zh-CN.md)。七个原创下载包不包含第三方 Skill 的代码或说明。
