# Deployment

The site is hosted on GitHub Pages and deployed by
`.github/workflows/pages.yml`.

## Trigger

- every push to `main`
- manually via _Actions → Deploy to GitHub Pages → Run workflow_

## Steps

1. Install the stable Rust toolchain (with cache).
2. Download the Tailwind CSS standalone binary (v4.3.3) into the runner's temp
   directory, so Tailwind's source detection does not scan it.
3. Build the minified CSS into `static/css/main.css`.
4. Generate the site with `cargo run --release`.
5. Upload `dist/` as Pages artifact and deploy it.

## One-time setup

> [!IMPORTANT]
> In the repository settings set _Pages → Source_ to _GitHub Actions_,
> otherwise the deploy job fails.

## Updating Tailwind CSS

The Tailwind version in CI is pinned in the workflow, the local one comes from
`devenv.nix` (`tailwindcss_4`). Keep both on the same major version.
