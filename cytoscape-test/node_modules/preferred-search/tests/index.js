const assert = require('assert');
const pSearch = require('..');

{
  const res = pSearch(__dirname, [
    'a.txt'
  ]);

  assert(/\/a.txt$/.test(res));
}

{
  const res = pSearch(__dirname, [
    'a.txt',
    'b.txt'
  ]);

  assert(/\/a.txt$/.test(res));
}

{
  const res = pSearch(__dirname, [
    'b.txt',
    'a.txt'
  ]);

  assert(/\/b.txt$/.test(res));
}

{
  const res = pSearch(__dirname, [
    'b.txt',
    'c.txt',
    'a.txt'
  ]);

  assert(/\/b.txt$/.test(res));
}

{
  const res = pSearch(__dirname, []);

  assert.equal(res, null);
}