# Local preview build

Run commands from the repository root. Do not publish this directory until the user approves the preview.

- `python3 previews/orbit-polish/tools/build-media.py` rebuilds responsive WebP variants from `media-inventory.json`. It retains the source assets and writes `media-manifest.js`.
- `node previews/orbit-polish/tools/prerender-work.mjs` prerenders the archive cards and filter options using native Chrome. Requires port 4188 and Google Chrome on macOS.
- `node previews/orbit-polish/tools/capture-case-snapshots.mjs` captures the 17 case renderers without redirecting legacy URLs. Requires port 4188 and Google Chrome on macOS.
- `python3 previews/orbit-polish/tools/build-pages.py` rebuilds case HTML, canonical URLs, descriptions and 1200 × 630 sharing images from those snapshots and `project-records.json`.

Update the inventory and project records when adding projects. Recapture snapshots after changing case markup. Keep generated `project-*.html`, `media/`, `media-manifest.js`, `media-runtime.js` and `project-routing.js` together when preparing a later approved publication. Original image files remain the source for explicit full-resolution viewing.

QA evidence and the local audit report are in `output/impeccable-fixes-20261125/`.
