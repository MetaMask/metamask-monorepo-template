# Building packages

Packages are built with [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and TypeScript project references. The output is ES modules only.

Built files show up in the `dist/` directory in each package. These are the files which will ultimately be published to NPM.

- Run `yarn build` to build all packages in the monorepo.
- Run `yarn workspace <workspaceName> run build` to build a single package.
