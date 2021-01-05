# js-proper-logger

This repository contains the code for our backend JavaScript logger.

## Using this package

To use this package in a backend JavaScript project:

```
npm install --save @goproperly/js-proper-logger
```

Set an environment variable to set the level that should be logged at
(assuming this is a lambda this can be done via the AWS console):

```sh
PROPERLY_LOG_LEVEL = 20  # Possible values can be found in the `LogLevels` constant
```

And then start logging things:

```javascript
import { ProperLogger } from '@goproperly/js-proper-logger';

// Instances of the logger can be created
const logger = ProperLogger.getLogger('get_offer_details');

// Those instance have methods that allow you to log at different levels of
// severity. Depending on what the `logger.logLevel` is set at (controlled by
// the `PROPERLY_LOG_LEVEL` environment variable) the log may or may not be
// emitted for collection by CloudWatch.
logger.info('Test logging', { exampleTag: 'additional details' });
// This will call `console.log` with `{'message': 'Test logging', 'exampleTag': 'additional details'}`
```

### How does it work

The `ProperLogger` provides us with 3 things:

- An interface for writing structured logs.
- A way to make our structured logs isometric with the logs created by our
  Python backend services.
- A way to change the amount of detail about what is recorded without a new deploy.

The way the `ProperLogger` works is that when a method is called it writes a
message in a JSON format to the `Console`. These messages written to the
console are then collected by `CloudWatch` which we then use to create dashboards
and/or understand what happened when something goes wrong.

#### Metrics

The logger instances can also be used to record metrics:

```javascript
logger.metric('external_call_count', 3);
// This will log to `console.log` and can be used by CloudWatch insights.
```

#### Creating a logger

Instances of the `ProperLogger` should be created using the
`ProperLogger.getLogger` method. This method will return the same instance of
the logger depending on the name provided which allows for reusing the same
logger at different files without passing logger instances between functions.

#### Common tags

This is also a concept of "common tags". These tags are recorded in every log message:

```javascript
logger.addCommonTags({ requestId: 'x-123-fake-request-id' });
logger.info('Enqueued message on event bus');
logger.error('MISSING_VALUE_ERROR', "Expected 'x' to be present on 'Vector'");
// Both of these calls will include the `requestId` in what they write to the Console.

// Common tags can also be cleared
logger.clearCommonTags();
```

#### Log levels

There are four supported levels of logging, which correspond to Python's levels
of logging:

- `logger.debug` (10)
- `logger.info` (20)
- `logger.warning` (30)
- `logger.error` (40)

If you want to decrease the number of logs that the service is creating (for
example if the service was deployed and has been well-behaved for a little
while) you can increase the value of the `PROPERLY_LOG_LEVEL` environment
variable. If the `loggler.logLevel` is greater than the called logging
method's level, nothing will be written to the console (e.g. if
`logger.debug` is called and the `PROPERLY_LOG_LEVEL` is set to
`LogLevels.DEBUG` (10), a message will be written to `console.debug`. If the
`PROPERLY_LOG_LEVEL` log is `LogLevels.INFO` (20) a message will not be written
to `console.debug`).

## Setup

You can install the package by:

```sh
git clone git@github.com:GoProperly/js-proper-logger.git
npm install
```

## Building

This project is built using TypeScript. Because of this there is a "build" step
using Rollup to generate a CommonJS and ESmodule bundles.

```sh
npm run build
```

If you're making many changes you can run the build in "watch" mode:

```sh
npm run dev
```

## Running tests

We use [Jest](https://jestjs.io/docs/en/expect) for testing this library. The
tests run on every pushed commit using [GitHub
actions](https://github.com/GoProperly/js-proper-logger/actions?query=workflow%3A%22Test+%26+Release%22).

Tests can be run with:

```sh
npm run test
npm run test -- --watch
```

## Running linting

This code is linted using `eslint` and autoformatted using `prettier`.
Additionally we make use of a tool called `husky` which will create git hooks
which will check your formatting before allowing you to commit.

```sh
npm run lint
npm run lint:fix
```

## Committing changes

This project adheres to [Semantic Versioning](https://semver.org/) and changes
are documented in the
[CHANGELOG](https://github.com/GoProperly/js-proper-logger/blob/main/CHANGELOG.md).

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
