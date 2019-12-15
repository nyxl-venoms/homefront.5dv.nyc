# 5DV Homefront Charity Initiative Website
[![CircleCI](https://circleci.com/gh/nyxl-venoms/homefront.5dv.nyc.svg?style=svg)](https://circleci.com/gh/nyxl-venoms/homefront.5dv.nyc)

This is the source code for the 5DV Homefront Charity Initiative website. It is built using [Webpack](https://webpack.js.org) as the bundling and compiling tool.

## Build and run
To view the site, you must build it first.

Please ensure you have Node and NPM installed.

1. Run `npm install` in the root directory to install all required packages.
2. Run `npm run build` to build and pack the site. The compiled result will be located in the `dist/` directory.
3. Run `npm run start` to work on the site. It will launch the Webpack dev server and open a browser window at `http://localhost:8080` with the site visible. Webpack Hot Module Replacement will be active, so you can edit the files in `src/` and the result will be automatically loaded in the browser window.

## Deployment
This website will automatically deploy after pushing to the `master` branch.
