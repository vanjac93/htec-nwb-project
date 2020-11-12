# htec-nwb-project

This project was bootstrapped with [nwb](https://github.com/insin/nwb).

## Installation

Run `yarn install` to install required dependencies.

If `yarn` is not available, run `sudo npm i -g yarn` to install it.

### II. The `environment.js` file

There's a master `environment.js` file containing all default values.
Environment has API key set to some existing value, which has a limited number
of API calls, so make sure to create accounts if existing key is expired.
Would you desire to override any of the defaults, create `environment.local.js`,
with your modifications.

## ESLint

[ESLint](https://eslint.org/) is pluggable linting utility for JavaScript. Install it with `npm i -g eslint`.  Its configuration and rules are located in `.eslintrc.json` file.

To run ESLint use the following command:

```sh
yarn lint
```

It will perform eslint checks on all files inside `src` folder.

Some of the warnings are potentially auto fixable with:

```sh
yarn lint:fix
```
