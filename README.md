# mhr
Monster Hunter Roulette

## Build

The site is fully static. Rust (askama) renders `templates/` together with the
data from `json/` into `dist/`, the rolling happens in the browser
(`static/js/app.js`).

```sh
devenv shell -- build   # Tailwind CSS + cargo run --release -> dist/
devenv shell -- serve   # http://localhost:8000
```

## Deployment

`.github/workflows/pages.yml` builds and deploys `dist/` to GitHub Pages on every
push to `main`. In the repository settings set *Pages → Source* to
*GitHub Actions*.
