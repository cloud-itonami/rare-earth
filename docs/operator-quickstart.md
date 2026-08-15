# Operator quickstart

**A complete API worker you can run in one command, and the fact that deploying
this repository does not serve it.** The deployed page fetches four endpoints that
the deployed worker does not have, with no error handling, so it renders
`Loading rare earth coverage...` and stops there.

Steps marked ✅ were run against this tree on 2026-08-15. The ⚠ items were
measured.

---

## 1. Run the worker offline ✅ (with one rewrite, stated)

`src/app.ts` cannot be handed to Node as it stands. Its only import is
`from './coverage-data'` — extensionless, which TypeScript accepts and Node's ESM
resolver does not:

```
ERR_MODULE_NOT_FOUND  .../src/coverage-data
```

That is not a defect; it means the file expects the bundler. It is also the one
difference from the other migrated appviews in this cohort, whose facades import
nothing and run directly. So rewrite that single specifier into a copy and run the
copy — nothing else changes:

```bash
cd appview/rare-earth-ui-re4c0v26
mkdir -p /tmp/re-run
sed "s|from './coverage-data'|from './coverage-data.ts'|" src/app.ts > /tmp/re-run/app.ts
cp src/coverage-data.ts /tmp/re-run/

cat > /tmp/rewalk.mjs <<'EOF'
const app = (await import(process.argv[2])).default;
for (const p of ["/health", "/api/rare-earth/coverage", "/api/rare-earth/actors",
                 "/api/rare-earth/minerals",
                 "/xrpc/com.etzhayyim.apps.rareEarth.coverage.listActors",
                 "/nope"]) {
  const res = await app.fetch(new Request("https://rare-earth.etzhayyim.com" + p));
  console.log(res.status, p, "->", (await res.text()).length, "bytes");
}
EOF

node --experimental-strip-types /tmp/rewalk.mjs /tmp/re-run/app.ts
```

Actual output:

```
200 /health -> 46 bytes
200 /api/rare-earth/coverage -> 26328 bytes
200 /api/rare-earth/actors -> 15437 bytes
200 /api/rare-earth/minerals -> 3048 bytes
200 /xrpc/com.etzhayyim.apps.rareEarth.coverage.listActors -> 15384 bytes
404 /nope -> 26 bytes
```

It answers **14 routes** in total: six `/api/rare-earth/*` (coverage, actors,
flows, minerals, scorecard, shinka), four `com.etzhayyim.apps.rareEarth.*` XRPC
methods, `/_heartbeat`, `/health`, `/healthz`, `/readyz`. Enumerate them yourself:

```bash
grep -oE "url\.pathname === '[^']+'" src/app.ts | sed "s/.*=== //"
```

This is the most complete thing in the repository, and it is worth knowing it works,
because it is what you develop against.

## 2. ⚠ It is not what deploys, and the page never finishes loading

`wrangler.jsonc` sets `main` to `svelte/.svelte-kit/cloudflare/_worker.js`.
Measured: there is **no `+server.ts` or `+page.server.ts` anywhere under
`svelte/src/`**, so the deployed worker serves no `/api/*` and no `/xrpc/*` at all.
And `assets.not_found_handling` is `single-page-application`, so those paths return
the SPA shell — HTML — rather than 404.

Meanwhile `svelte/src/App.svelte` makes exactly four fetches and **zero** `.catch`
handlers:

```
fetch('/xrpc/com.etzhayyim.apps.rareEarth.coverage.listActors')
fetch('/xrpc/com.etzhayyim.apps.rareEarth.coverage.listFlows')
fetch('/api/rare-earth/coverage')
fetch('/api/rare-earth/shinka')
```

Every one is a route only `src/app.ts` serves. `res.json()` on the SPA shell
rejects, nothing catches it, `data` is never assigned, and the template's guard is
`{#if data} … {:else}`, whose else branch is:

```svelte
<main class="loading">Loading rare earth coverage...</main>
```

**So the deployed site shows "Loading rare earth coverage..." indefinitely** — not
an error page, not a blank one. That is the symptom to expect, and it does not
distinguish "the API is down" from "the API was never deployed".

Verify the two halves yourself:

```bash
grep '"main"' wrangler.jsonc
find svelte/src -name '+server.ts' -o -name '+page.server.ts'   # no output
grep -c '\.catch(' svelte/src/App.svelte                        # 0
```

This repository is also in the fleet-wide facade measurement — of the 329 appview
repositories carrying a `wrangler.jsonc`, 89 serve `/health` only in an undeployed
facade. The standing check is `:verify-appview-facade` in
`manifest/orgs-detectors.edn`. What is specific here is that the undeployed file is
not just a health endpoint: it is the entire data API the page depends on.

## 3. ⚠ Two copies of the coverage data, disagreeing on 7 of 9 keys

`src/coverage-data.ts` and `svelte/static/rare-earth/coverage.json` hold the same
shape. Measured:

| key | `coverage-data.ts` | `static/…/coverage.json` |
|---|---|---|
| `actors` | **43** | 20 |
| `flows` | **43** | 18 |
| `minerals` | 6 | **key absent** |
| `stageCoverage` | 7 | 6 |
| `metrics` | 5 keys | 4 keys |
| `bottlenecks` | 3 | 3, different content |
| `updatedAt` | `2026-04-13T19:10:00Z` | `2026-04-13T17:45:00Z` |
| `appviewDid`, `primaryActorDid` | identical | identical |

Same day, **85 minutes apart**, and the older copy is missing an entire category.

Which one ships is the opposite of which one is current: the TypeScript copy is
fresher and reaches the browser only through the worker that is not deployed, while
the JSON copy is under SvelteKit's `static/`, so it IS published — at
`/rare-earth/coverage.json`, a path **nothing in this repository requests**.

Reproduce with the comparison used above:

```bash
cat > /tmp/recmp.mjs <<'EOF'
import { readFileSync } from "node:fs";
const ts = (await import(process.argv[2])).coverageData;
const json = JSON.parse(readFileSync(process.argv[3], "utf8"));
for (const k of [...new Set([...Object.keys(ts), ...Object.keys(json)])].sort()) {
  const size = (v) => Array.isArray(v) ? `[${v.length}]`
    : (v && typeof v === "object" ? `{${Object.keys(v).length}}` : JSON.stringify(v));
  console.log(JSON.stringify(ts[k]) === JSON.stringify(json[k]) ? "same" : "DIFF",
              k, "ts=" + size(ts[k]), "json=" + size(json[k]));
}
EOF
node --experimental-strip-types /tmp/recmp.mjs \
  "$PWD/src/coverage-data.ts" "$PWD/svelte/static/rare-earth/coverage.json"
```

## 4. Build ⚠ NOT WALKED

`svelte/package-lock.json` **exists**, so an install here is reproducible and
`npm ci` is available rather than a fresh resolve. That is not unusual in this
cohort — measured, 70 of the 329 appview repositories carrying a `wrangler.jsonc`
track a lockfile. (An earlier draft of this file called it the first one; that was
a superlative I had not measured, and it was wrong.) It still needs the network,
and `node_modules` is absent, so the build was not run while writing this and is
not claimed to work. Go through the repo-wide resource
governor rather than invoking it directly:

```bash
node <root>/scripts/resource-guard.mjs run build -- \
  npm --prefix appview/rare-earth-ui-re4c0v26/svelte ci
node <root>/scripts/resource-guard.mjs run build -- \
  npm --prefix appview/rare-earth-ui-re4c0v26/svelte run build
```

Building will not fix §2. The build produces the SvelteKit worker, and the API
routes the page needs are not in it.

---

## 5. Identity

There is no `CLAUDE.md` here; `appview/README.md` carries the identity:

| | |
|---|---|
| Primary actor | `did:web:rare-earth-coverage.etzhayyim.com` |
| Appview | `did:web:rare-earth.etzhayyim.com` |
| Collections | `com.etzhayyim.apps.rareEarth.actor` and siblings |
| nanoid | `re4c0v26` |

`migration.edn` records the source as `etzhayyim/root` at
`60-apps/etzhayyim-project-rare-earth`, revision `7c815d8a`, tree `295fbeaa`, 17
tracked files, 70,453 bytes.
