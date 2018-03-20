# Package Scripts

## `npm run analyze:client`

Runs `webpack-bundle-analyze` against a production build of the client bundle.

## `npm run analyze:server`

Runs `webpack-bundle-analyze` against a production build of the server bundle.

## `npm run build`

Builds optimized client and server bundles.

## `npm run build:dev`

Builds client and server bundles in `development` mode.

## `npm run clean`

Deletes any of the build files/folders.

## `npm run deploy`

Deploys the application using [`now`](https://zeit.co/now). This requires almost zero configuration to allow your project to be deployed to their servers. Make sure to run `npm i -g now` to install `now` before running this command.

## `npm run develop`

Starts a development server for the client and server bundles. To keep our bundles up-to-date, `react-hot-loader` is launched to handle hot reloading of the client bundle, and an `fs` watcher is launched to reload the server.

## `npm run lint`

Runs `eslint` against the project.

## `npm run start`

Runs the server. This will expect that you've already build the bundles using `npm run build` as the server is using ES6.

## `npm run test`

Runs `jest` tests.

## `npm run test:coverage`

Runs `jest` tests and generates a coverage report. Something like [codecov.io](https://codecov.io) can be used to host any coverage reports.
