# Publishing and using preview builds

Preview builds are pre-production versions of packages. Unlike [local builds](./local-builds.md), they are published to NPM (albeit under a separate NPM namespace) and can therefore be treated the same way as production releases in CI. Because of this, we recommend using preview builds for testing.

Generally, when working with preview builds, you will follow this process:

1. Create a branch in your clone of this repo
2. Work on changes to your package(s)
3. [Publish preview builds](#publishing-preview-builds)
4. Switch to the project and [configure it to use the new preview builds](#using-preview-builds)
5. Repeat steps 2-4 as necessary

## Publishing preview builds

To publish preview builds:

1. Create a pull request with the changes to your package(s).
2. Post a comment on the pull request with the text `@metamaskbot publish-preview`. The `publish-preview` GitHub action will kick off to generate and publish preview builds for all packages in the monorepo.
3. After a few minutes, you will see a new comment that lists the newly published packages along with their versions.

Note two things about each published package:

- The name is scoped to `@metamask-previews` instead of `@metamask`.
- The ID of the last commit in the branch is appended to the version, e.g. `1.2.3-preview-e2df9b4` instead of `1.2.3`.

The workflow is [`MetaMask/github-tools`' reusable `publish-preview` workflow](https://github.com/MetaMask/github-tools/blob/main/.github/workflows/publish-preview.yml), which handles renaming, building, and publishing. It only runs for pull requests opened from a branch in this repo; pull requests from forks are skipped, since the publishing token cannot be trusted to forks.

## Using preview builds

To use a preview build for a package within a project, you need to override the resolution logic for your package manager so that the "production" version of that package is replaced with the preview version.

1. Open `package.json` in the project and locate the dependency entry for the package for which you want to use a preview build.
2. Locate the section responsible for resolution overrides (or create it if it doesn't exist). If you're using Yarn, this is `resolutions`; if you're using NPM or any other package manager, this is `overrides`.
3. Add a line to this section that mirrors the dependency entry on the left-hand side and points to the preview version on the right-hand side:

   ```json
   "@metamask/<PACKAGE_NAME>@<PRODUCTION_VERSION_RANGE>": "npm:@metamask-previews/<PACKAGE_NAME>@<PREVIEW_VERSION>"
   ```

   > **Example:**
   >
   > If your project uses Yarn, `@metamask/greetings` is listed in dependencies at `^1.1.4`, and you want to use the preview version `1.2.3-preview-e2df9b4`, add the following to `resolutions`:
   >
   > ```json
   > "@metamask/greetings@^1.1.4": "npm:@metamask-previews/greetings@1.2.3-preview-e2df9b4"
   > ```

4. Run `yarn install`.

If you make more changes to a package, publish new preview builds and update the resolution to point at the new version.
