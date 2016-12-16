'use strict';

const assert = require('chai').assert;
const censor = require('../lib/censor');

function countCensoredWords (text) {
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if ((i-1 < 0 || /\s/.test(text[i-1])) && /█/.test(text[i])) {
      count++;
    }
  }

  return count;
}

describe('censor', function () {
  it('should always censor at least one word', function () {
    [
      'hello',
      'well hey',
      'the quality of mercy is not straind',
      [
        'Any consistent formal system F within which a certain amount of ',
        'elementary arithmetic can be carried out is incomplete'
      ].join('\n')
    ].map(function (text) {
      return countCensoredWords(censor(text));
    }).forEach(function (count) {
      assert.isAbove(count, 0);
    });
  });
});
