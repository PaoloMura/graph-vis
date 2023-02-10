# preferred-search

Search files by priority.

## Install
```sh
npm i preferred-search
```

## Usage
```js
const pSearch = require('preferred-search');

// pSeatch(basePath: string, searched files: Array<string>): string | null
const res = pSearch('.', [
  'a.txt',
  'b.txt'
]);

console.log(res); // /Users/hiroppy/preferred-search/a.txt
```