# Using local builds

If you are unable to use [preview builds](./preview-builds.md) for testing, you can always build a package locally and link it to a project.

1. First, build the monorepo by running `yarn build`.

2. In the project, open `package.json` and locate the entry in `dependencies` for the package you want to test.

3. Replace the version range in the right-hand side of the entry to point to the local build:

   ```json
   "@metamask/<PACKAGE_NAME>@<VERSION_RANGE>": "file:<PATH_TO_MONOREPO>/packages/<PACKAGE_NAME>"
   ```

   where:
   - `PACKAGE_NAME` is the name of your package
   - `VERSION_RANGE` is the version range of your package being used in production, usually starting with `^`
   - `PATH_TO_MONOREPO` is the local path to the clone of this monorepo

4. Run `yarn install`. (Note that due to the use of Yarn's `file:` protocol, you'll need to repeat this step each time you update the package in the monorepo.)

> **Example:**
>
> Given:
>
> - You have changes to `@metamask/greetings` you want to test
> - `@metamask/greetings` is listed at `^1.1.4`
> - You've cloned this repo next to the project
>
> In this case, you would go to `dependencies` and replace the line:
>
> ```json
> "@metamask/greetings": "^1.1.4"
> ```
>
> with:
>
> ```json
> "@metamask/greetings@^1.1.4": "file:../metamask-monorepo-template/packages/greetings"
> ```
