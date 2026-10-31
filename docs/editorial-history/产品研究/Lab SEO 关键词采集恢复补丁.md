# Lab SEO 关键词采集恢复补丁

基线：codesica/lab-seo main 78926e9d6a9cc522c072b21dda52b31ec30cb750（2026-10-11）。仅本地制备与离线验证；未提交、推送、创建PR、触发GitHub Actions、部署或安装Mac runtime。

## 改动与边界

仅5个项目文件，清单与基线/目标哈希见 FILE_MANIFEST.json：
- scripts/keyword_radar.py：默认串行、请求上限、缓存、只读证据入口与显示、缓存时间兼容。
- scripts/keyword_evidence.py：同目录标准库模块；串行网络/缓存与严格离线CSV导入。
- research/keyword-radar/README.md
- research/system/workflows/keywords.md
- research/system/methods.json

不更改默认调度、GitHub工作流、站点、登录保护或分享权限。tests/checks 只在交付包中，不写入项目，不新增CI。标准库+已有curl，无新依赖。

## 验证

- 34项离线契约验收通过，包含真实CSV导入与原始字节核对；网络均mock或禁用。
- 独立复审重新验证真实导入、UTC边界、分类、完整连续桶、不同查询窗口、429/Retry-After、畸形header、重定向、缓存时间、原始证据、幂等与零网络，未发现剩余代码阻断。
- 补丁对精确基线副本 dry-run/apply 通过；5目标文件SHA256全匹配。
- 未运行生产采集；现有无关产品/网站测试未运行。没有声称恢复Google服务可用性。

## 本地CLI

从项目根目录：

```sh
python3 -B scripts/keyword_radar.py --max-requests 20 --cache-hours 24 collect --workers 1
python3 -B scripts/keyword_radar.py --max-requests 0 trends-plan /path/to/plan.json
python3 -B scripts/keyword_radar.py --max-requests 0 trends-import /path/to/import.json
python3 -B scripts/keyword_radar.py --max-requests 0 trends-status
python3 -B scripts/keyword_radar.py --max-requests 0 status
```

前三个trends命令不要求先collect，不联网。collect仍是原热榜/RSS/网页来源，不能当Explore时间序列。请求预算是每命令curl调用数，浏览器/服务器实际HTTP请求数未知。403/429当前主机本次停止，真实Retry-After跨命令保留；没有自动重试、跟随3xx或全Trends同日锁。原expand同日停止规则保留。

固定runtime安装必须同时复制 keyword_radar.py 与 keyword_evidence.py 到同一目录。沿原安装流程核对并更新 installed.json 的来源与文件哈希；仅复制入口脚本会缺模块。保留现有config、SQLite、输出、调度和归档；不要切共享分支或覆盖无关改动。先核对目标五文件与此基线哈希，不一致需重新检查。

交付包自检：

```sh
python3 -B checks/offline_acceptance.py
```

## 本次真实证据

real-evidence/cut-list-optimizer.csv 是Mac已授权Chrome下载的完整字节复原，946字节，SHA256 d363cf68e5c5bbfb83dab46543aa80a56442bfaac1be3832a298ed0cac8ec530。

查询：Worldwide / Past 12 months / Web Search / Search term / All categories，cut list optimizer 与 gpts 同次导出，2026-10-11T15:09:07.141Z。实际URL省略date，原URL与已核准visible_filters保留在 browser-manifest.json；不补造URL。源码导入清单为 real-evidence/import.json，研究队列为 real-evidence/plan.json。

CSV共54周行。按UTC查询窗2025-10-11至2026-10-11，首周2025-10-05遭起始截断，末周2026-10-11尚未完成；保守剔除后52完整周，有效覆盖2025-10-12至2026-10-10。候选均值0.9423076923，gpts均值64.1923076923，机械均值比49/3338≈0.0147。候选指数近零，状态low_resolution_candidate；不能拿此比值直接判定需求、增长、淘汰或投入。原先只排末周的53周计算保留在原manifest作为更正前结果。

第二组csv to ics的页面显示Oops，HTTP未知，无CSV，无重试。Shopify inventory upload未继续查询，是旧watch题；kindle highlights export为旧题/反例候选。其余保持未查询或待补证据，收入/成本null，不自动建站。

## 导入限制

- 最多10词根、总候选最多10，不凑数；人工排AI图像/视频，关键词拦截只辅助。
- 严格已知英文CSV格式，至少30天的日/周窗口、两列、完整连续覆盖、category0、Worldwide、Web Search、search term。
- rolling查询日期范围与CSV桶覆盖分开；90天数据另建计划同次比较，不与12个月拼比。
- 近零基准均值不硬除；候选近零只警告；<1/缺测不伪造精确值。1点为可调保守工程守门，不是验证过的商业筛词阈值。
- 浏览器sidecar是操作者核准的来源记录，程序不证明截图真实性；原CSV字节可通过SHA核对。
- 无Google Trends Alpha权限，无非公开Explore客户端，普通浏览器导出仍需真实完成。此补丁修复执行入口和证据链，不保证外部数据源永远可用。
