# Building packages

Packages are built using TypeScript 7 ([`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html)) and [project references](https://www.typescriptlang.org/docs/handbook/project-references.html). The output is ES modules only.

Built files show up in the `dist/` directory in each package. These are the files which will ultimately be published to NPM.

- Run `yarn build` to build all packages in the monorepo.
- Run `yarn workspace <workspaceName> run build` to build a single package in isolation.
