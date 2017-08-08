# simple-changelog

> Simple GitHub release changelog from public semantic commits

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]
[![next-update-travis badge][nut-badge]][nut-readme]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save simple-changelog
```

## Examples

See these example release docs

* [github-post-release/releases](https://github.com/bahmutov/github-post-release/releases)

## Use

To get good release changelog from semantic commits

```js
const changelog = require('simple-changelog')
changelog('1.2.3')
  .then(console.log)
```

Prints Markdown like with grouped breaking changes, new features and bug
fixes.

```
# 1.2.3 (2017-07-19)
## New features
### docs
* documentation feature 1 (sha)
...
```

## Non-semantic mode

Sometimes we want to publish release notes, even if we have not followed
semantic convention. For this, pass a number of commits to allow including
in the log. For example

```js
const changelog = require('simple-changelog')
changelog('1.2.3', 3)
  .then(console.log)
```

If there are semantic commits - only semantic public commits will be used.
If there are fewer than 3 commits (of any type), they will be in the changelog.
Otherwise the log will have only the version and the date.

## Debugging

Run with `DEBUG=simple-changelog ...` environment variable

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/simple-changelog/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/simple-changelog.svg?downloads=true
[npm-url]: https://npmjs.org/package/simple-changelog
[ci-image]: https://travis-ci.org/bahmutov/simple-changelog.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/simple-changelog
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[nut-badge]: https://img.shields.io/badge/next--update--travis-weekly-green.svg
[nut-readme]: https://github.com/bahmutov/next-update-travis#readme
