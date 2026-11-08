# Development

## Project layout

| Path                  | Content                                                   |
| --------------------- | --------------------------------------------------------- |
| `src/main.rs`         | Site generator: renders `index.html` and copies `static/` |
| `src/data/`           | Loaders for the JSON files in `json/`                     |
| `templates/`          | Askama templates (configured in `askama.toml`)            |
| `static/js/app.js`    | Alpine.js component `mumh`: roll logic, state, animations |
| `static/js/alpine.js` | Vendored Alpine.js build                                  |
| `static/images/`      | Monster, weapon, flag and UI images (WebP)                |
| `tailwind.css`        | Tailwind CSS 4 entry point with theme and animations      |
| `json/`               | Game data and translations, see [Game data](game-data.md) |
| `dist/`               | Build output (not tracked)                                |

## Build pipeline

1. Tailwind CSS compiles `tailwind.css` into `static/css/main.css` (not
   tracked).
2. `cargo run --release` loads monsters, weapons and all languages, renders
   `templates/pages/index.html` and embeds the data as JSON in a
   `<script id="mumh-data">` tag.
3. The generator recreates `dist/` with `index.html`, an empty `.nojekyll` and a
   copy of `static/` under `dist/assets/`.

In the browser, `app.js` reads the embedded JSON, restores the saved state from
`localStorage` (key `mumh`) and falls back to defaults for any value that no
longer matches the data.

All paths are resolved against the crate root (`CARGO_MANIFEST_DIR`), so the
build works from any working directory.

## devenv scripts

| Command                        | Purpose                                      |
| ------------------------------ | -------------------------------------------- |
| `devenv shell -- build`        | Minified CSS, then generate `dist/`          |
| `devenv shell -- serve`        | Serve `dist/` on <http://localhost:8000>     |
| `devenv shell -- tailwind`     | Rebuild the CSS on every change (watch mode) |
| `devenv shell -- tailwindmini` | Like `tailwind`, but minified                |

> [!NOTE]
> `dist/` is a snapshot: after changing templates, JSON or static files run
> `cargo run --release` (or `build`) again before reloading the page.

## Code style

- Rust is formatted with `rustfmt` (`max_width = 80`, see `rustfmt.toml`).
- HTML, JavaScript, CSS and JSON are formatted with Prettier (`prettierd` is
  part of the devenv).
