# js-proper-logger

This repository contains the code for our backend JavaScript logger.

## Setup

You can install the package by:

```sh
git clone git@github.com:GoProperly/js-proper-logger.git
npm install
```

## Building

This project is build using TypeScript. Because of this there is a "build" step
using rollup to generate a CommonJs and ESmodule bundle.

```sh
npm run dev
npm run build
```

## Running tests

Tests can be run with:

```sh
npm run test
```

We use [Jest](https://jestjs.io/docs/en/expect) for testing this library. The
tests run on every pushed commit using [GitHub
actions](https://github.com/GoProperly/linoleum/actions?query=workflow%3A%22Test+%26+Release%22).

## Running linting

This code is linted using `eslint` and autoformatted using `prettier`.
Additionally we make use of a tool called `husky` which will create git hooks
which will check your formatting before allowing you to commit.

## Committing changes

This project adheres to [Semantic Versioning](https://semver.org/) and changes
are documented in the
[CHANGELOG](https://github.com/GoProperly/linoleum/blob/master/CHANGELOG.md).

### Commit messages

Commit messages follow the [Conventional
Commits](https://www.conventionalcommits.org/) format.

You can use `npm run commit` (instead of `git commit`) to help with formatting
your commit message.

## Publishing new versions

New versions are automatically published to the GitHub Package Registry on
pushes to master, using
[`semantic-release`](https://github.com/semantic-release/semantic-release).

Changelog and release notes are generated based on commit messages - no need to
manually update `CHANGELOG.md`.
