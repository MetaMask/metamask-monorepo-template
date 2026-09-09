# Building packages

Packages are built with [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) and TypeScript project references. The output is ES modules only.

Built files show up in the `dist/` directory in each package. These are the files which will ultimately be published to NPM.

- Run `yarn build` to build all packages in the monorepo.
- Run `yarn workspace <workspaceName> run build` to build a single package.

## Two TypeScript versions

The repository installs TypeScript 7 and TypeScript 6 at the same time.

TypeScript 7 is a native binary and it has no JavaScript API. Tools such as ESLint and TypeDoc need that API, so they cannot run on TypeScript 7 yet. The `typescript` dependency is therefore an alias for `@typescript/typescript6`, which is the version those tools load. The `@typescript/native` dependency is TypeScript 7, and it provides the `tsc` command that builds the packages. A patch removes the `tsc` and `tsserver` commands from TypeScript 6, so that `tsc` always means TypeScript 7. TypeScript 6 remains available as `tsc6`.

Remove this arrangement when TypeScript 7.1 adds the JavaScript API.
