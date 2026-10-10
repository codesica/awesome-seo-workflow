# 参与贡献

简体中文 · [English](CONTRIBUTING.md) · [项目说明](README.zh-CN.md)

从一处更正或一个完整教学示例开始。说明读者遇到什么问题、建议怎样改、如何验证。搜索引擎事实使用官方一手来源，保留核查日期和第三方 Skill 的固定源提交。

来源审阅、实际执行和数据出处分别记录。未运行的 Skill 不能标成已经测试。执行示例需要命令、版本、输入范围、输出与限制。合成示例在输入和发现旁明确标注。收录、排名、流量未知时继续保持未知。

使用原创 example.com 案例。不要提交真实账号截图、密钥、cookie、token、个人邮箱、私密网址、客户导出、内部路径或未经许可的第三方 Skill 源码。提交公开改动前，检查源文件、生成 HTML 和下载文件。

使用 `npm ci --ignore-scripts && npm run build` 构建。在浏览器检查改过的页面、链接、小屏布局、键盘操作与复制/下载控件。纯内容改动不需要新增测试框架。保留一个主标题、独立标题和描述、canonical 网址及有意义的链接文字。贡献不涉及改动其它生产项目或购买域名。

原创贡献适用本仓库 MIT 许可；链接的第三方项目不在这个许可范围内。

## 同时维护两种语言

英文项目说明使用 README.md、USAGE.md、CONTRIBUTING.md、THIRD_PARTY.md；对应中文文件为 *.zh-CN.md，并相互链接。行为、前提或证据限制变化时，同步更新两种语言。

中文 Skill 入口继续位于 skills/browser 与 skills/workflow；完整英文对应版本位于 skills/en/browser 与 skills/en/workflow。每个语言文件夹都有可发现的 SKILL.md 和全部必要相对引用。保留 Skill 名称、机器字段、枚举、null 和真实网站 NOT_RUN 的证据状态。翻译不等于实际执行验证。原始运行/案例证据保持原样，不能把翻译后的内容说成另一次观察。

改动 Skill 或打包后，运行 `python3 scripts/validate-skill-locales.py` 和 `npm run build:release`。检查两种语言完整 ZIP、相对引用、许可、原始说明下载及网站语言入口。旧中文下载地址继续可用；新链接优先使用明确的 /downloads/skills/zh/ 和 /en/ 路径。同时更新目录、网页说明和字段解释。
