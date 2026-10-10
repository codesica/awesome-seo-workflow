# A real CLI run with synthetic input

Executed 2026-10-10 at 12:09:48 UTC on macOS arm64, Node.js 22.22.3, npm package `seo` 0.2.41. npm metadata identifies repository `iannuttall/seo` and gitHead `5b794fe9c8addbc227c49262bb6ac79ad8429452`. The package was installed locally with `--ignore-scripts`; no global agent installation, Google connection, provider credentials or paid API was used. Telemetry was disabled with `DO_NOT_TRACK=1`; config, cache and logs were isolated.

The two input documents are original example.com teaching files in `examples/canonical-conflict/{before,after}/page.html`. The fixture server returns them unchanged over loopback HTTP and provides an allow-crawl robots.txt. No external example.com request was made by the fixture server. The CLI used raw HTTP (`js:false`), not browser rendering.

Before: the report observed two different canonical targets and emitted `canonical_conflict`. After: it observed one canonical and emitted `canonical_mismatch` because the example.com canonical differs from the loopback serving address. The latter is an expected limitation of this teaching setup; it is not an all-clear. The complete raw JSON is preserved in before.json and after.json, including recommendations and warnings. This establishes only this exact CLI report path with these two inputs. Claude/Codex integration, broad crawling, sitemap reports, paid providers and production indexing were not exercised.

## Reproduce from the repository root

In one terminal:

```sh
node scripts/fixture-server.mjs
```

In a second terminal:

```sh
npm install --prefix .seo-fixture-run --save-exact --ignore-scripts seo@0.2.41
export DO_NOT_TRACK=1
export SEO_CONFIG_DIR="$PWD/.seo-fixture-run/state"
export SEO_CACHE_DIR="$PWD/.seo-fixture-run/cache"
export SEO_LOG_DIR="$PWD/.seo-fixture-run/log"
.seo-fixture-run/node_modules/.bin/seo --version
.seo-fixture-run/node_modules/.bin/seo reports describe audit-page --json
.seo-fixture-run/node_modules/.bin/seo reports run audit-page \
  --params '{"url":"http://127.0.0.1:4174/before/trail-guide/","js":false,"refresh":true}' \
  --json > before.json
.seo-fixture-run/node_modules/.bin/seo reports run audit-page \
  --params '{"url":"http://127.0.0.1:4174/after/trail-guide/","js":false,"refresh":true}' \
  --json > after.json
```

The executable and state paths above are relative equivalents of the isolated local experiment used for the recorded run; the actual report arguments are unchanged. Your timestamps and timing diagnostics will differ. Report structure or behavior can differ with another package version, so keep the version pinned. No credentials, host username, absolute private workspace path or internal note is included in these public artifacts.
