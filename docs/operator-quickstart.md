# Operator quickstart

**A complete API worker and a shadow-cljs/reagent front-end that now talk to each
other.** Until 2026-09-07 the deployed page fetched four endpoints that the
deployed worker did not have (the SvelteKit build bundled no API routes), with no
error handling, so it rendered `Loading rare earth coverage...` and stopped
there. §2 of this document recorded that gap; the svelte→cljs migration closed
it. Steps marked ✅ were run against this tree. The ⚠ items were measured.

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

## 2. ✅ What used to be broken, and what closed it (2026-09-07)

`wrangler.jsonc` used to set `main` to `svelte/.svelte-kit/cloudflare/_worker.js`.
Measured then: there was **no `+server.ts` or `+page.server.ts` anywhere under
`svelte/src/`**, so the deployed worker served no `/api/*` and no `/xrpc/*` at
all, while `svelte/src/App.svelte` fetched exactly those four endpoints with zero
`.catch` handlers. The page therefore showed "Loading rare earth coverage..."
indefinitely in production.

The migration replaced the SvelteKit front-end with a shadow-cljs + reagent app
(`src/cloud_itonami/rare_earth/`) that fetches the same four endpoints **and
handles failure**: `state.cljs`'s `load!` guards every response status and routes
rejections into the state atom, and `ui.cljs` renders an explicit
"Failed to load rare earth coverage: …" panel instead of hanging on the loading
branch. `wrangler.jsonc` now points `main` at `./appview/rare-earth-ui-re4c0v26/src/app.ts`
(the real API worker) and serves the compiled UI from `./web/dist`.

This repository is also in the fleet-wide facade measurement — of the 329 appview
repositories carrying a `wrangler.jsonc`, 89 serve `/health` only in an undeployed
facade. The standing check is `:verify-appview-facade` in
`manifest/orgs-detectors.edn`. What was specific here is that the undeployed file
was not just a health endpoint: it was the entire data API the page depends on —
now deployed and now wired up.

## 3. ✅ Two copies of the coverage data — one is gone

`src/coverage-data.ts` and `svelte/static/rare-earth/coverage.json` held the same
shape but disagreed on 7 of 9 keys (measured 2026-08-15): 43 vs 20 actors, 43 vs
18 flows, minerals key absent from the JSON, different bottleneck text, `updatedAt`
85 minutes apart. The JSON copy was published at `/rare-earth/coverage.json`, a
path nothing requested.

The migration deleted the `svelte/` directory, so the stale JSON copy is gone and
`src/coverage-data.ts` is the single source of truth. The CLJS UI reads data only
through the worker's API routes — the same routes §1 walks.

## 4. Build the UI ✅

The front-end is shadow-cljs (CLJS + reagent on kotoba-ui.core + appkit.core,
murakumo-studio構成 — same as public-malak / app-itonami / yuubin). From the repo
root:

```bash
npm install                                  # react / react-dom for the shadow-cljs npm provider
clojure -M:cljs -m shadow.cljs.devtools.cli compile app
```

Verified on 2026-09-07: `[:app] Build completed. (95 files, 94 compiled, 0
warnings)` and the compiled `web/dist/` served through a stub-API http server in
Chrome renders every panel (hero, metrics, stage coverage, bottlenecks, heartbeat,
minerals, priority actors, flows), the stage filter narrows the actor list, and a
failing endpoint shows the error panel instead of hanging.

The committed `web/dist/` is that build's output; rebuilding regenerates it.

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
