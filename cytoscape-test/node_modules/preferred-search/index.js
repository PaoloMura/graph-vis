'use strict';

const fs = require('fs');
const path = require('path');

function search(dir, arr) {
  if (!Array.isArray(arr)) throw new TypeError('Files type should be an array');

  return getFilenameForDirectory(dir, arr);
}

function getFilenameForDirectory(directory, files) {
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(directory, files[i]);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) return filename;
  }

  return null;
}

module.exports = search;