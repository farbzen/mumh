# Deployment

The site is hosted on GitHub Pages and deployed by
`.github/workflows/pages.yml`.

## Trigger

Only published GitHub releases deploy the site; pushes to `main` do not. The
workflow builds the commit the release tag points to.

To release a new version:

1. Bump the version in `Cargo.toml` and move the `Unreleased` entries in
   `CHANGELOG.md` to a new version section.
2. Commit, tag (`git tag vX.Y.Z`) and push the tag.
3. Publish a GitHub release for the tag, e.g.
   `gh release create vX.Y.Z --generate-notes` or via _Releases → Draft a new
   release_.

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

> [!IMPORTANT]
> Releases run on a tag, not on `main`. Under _Settings → Environments →
> github-pages → Deployment branches and tags_ allow the release tags (e.g. the
> tag rule `v*`), otherwise GitHub rejects the deployment.

## Updating Tailwind CSS

The Tailwind version in CI is pinned in the workflow, the local one comes from
`devenv.nix` (`tailwindcss_4`). Keep both on the same major version.
