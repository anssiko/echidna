[![Build Status](https://travis-ci.org/w3c/echidna.svg?branch=master)](https://travis-ci.org/w3c/echidna)
[![Dependency Status](https://david-dm.org/w3c/echidna.svg)](https://david-dm.org/w3c/echidna)
[![devDependency Status](https://david-dm.org/w3c/echidna/dev-status.svg)](https://david-dm.org/w3c/echidna#info=devDependencies)

# Echidna

Echidna is the central piece of software taking care of the new publication workflow at [W3C](http://www.w3.org/). The plan is for Echidna and related sub-projects (see below) to automatise the publication of new specs under [`http://www.w3.org/TR/`](http://www.w3.org/TR/).

## Dependencies

### OS-level dependencies

* [Node.js](http://nodejs.org/)
* [npm](https://www.npmjs.org/)
* [PhantomJS](http://phantomjs.org/)

### npm dependencies

These will be resolved automatically by simply running `npm install` on the directory of the project.

* [express](https://github.com/strongloop/express)
* [ejs](https://github.com/tj/ejs)
* [Immutable.js](https://github.com/facebook/immutable-js/)
* [Promise](https://github.com/then/promise)
* [Moment](http://momentjs.com/)
* [Specberus](https://github.com/w3c/specberus)

## How to get it up and running

```bash
$ git clone git@github.com:w3c/echidna.git
$ cd echidna
$ cp config.js.example config.js
$ npm install
$ npm start
```

Echidna will then be ready to attend publication requests sent to its enpoint, [`http://localhost:3000/api/`](http://localhost:3000/api/).
You can also find a minimal holding page at [`http://localhost:3000`](http://localhost:3000).

## Syntax and command-line parameters

(with npm >= 2)
```
$ npm start [-- STAGING_PATH [HTTP_BASE_URI [PORT [RESULT_PATH]]]]
```

Meaning of positional parameters:

1. `STAGING_PATH`: path in the local filesystem where documents will be downloaded; *staged*.
(Default `/var/www/html/trstaging/`.)
2. `HTTP_LOCATION`: HTTP endpoint for [Specberus](https://github.com/w3c/specberus) and the [Third-party checker](https://github.com/dontcallmedom/third-party-resources-checker).
(Default `http://localhost/trstaging/`.)
3. `PORT`: where Echidna will be listening for publication requests.
(Default `3000`.)
4. `RESULT_PATH`: local path where Echidna will dump the results of publication requests in JSON format.

Examples:

```bash
$ npm start -- /home/nick/public_html/staging/ http://localhost/~nick/staging/ 80
```

```bash
$ npm start -- ../tmp/echidna-files/
```

## Automated testing

### Command line script

Type this to launch `mocha` and its associated tests:

```bash
$ npm test
```

### Web-based testbed

For testing purposes, we are using an internal web server by default at `http://localhost:3001`.
The test server simulates some of the W3C services, such as the CSS and HTML validators, or the token authorization checker.
It also serves a set of sample drafts.

It will get started and stopped automatically when launching `mocha`.

One may launch this test server separately by using:

```bash
$ npm run testserver
```

When the test server is running, the testbed with all drafts will be available in `http://localhost:3001/`.

## Sub-projects, and related tools

* [Specberus](https://github.com/w3c/specberus)
* [LinkChecker](https://github.com/halindrome/linkchecker)
* [`third-party-resources-checker`](https://github.com/dontcallmedom/third-party-resources-checker)
* [`w3c-validate`](https://github.com/busbud/w3c-validate)
* [`w3cjs`](https://github.com/thomasdavis/w3cjs)
* [Tenon](http://www.tenon.io/documentation/)
* Generators (see [`spec-generator`](https://github.com/w3c/spec-generator)):
 * Respec
 * [CSS Spec Preprocessor](https://api.csswg.org/bikeshed/) for Bikeshed

## Feedback and contributions

Please refer to our [contribution reference](https://github.com/w3c/echidna/blob/master/CONTRIBUTING.md) to learn how to contact us, give feedback, or actively contribute to this project.
