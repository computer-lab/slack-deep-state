'use strict';

const assert = require('chai').assert;
const censor = require('../lib/censor');

const testCases = [
  '',
  ' ',
  '\n\t ',
  'hello',
  'well hey',
  'the quality of mercy is not straind',
  [
    'Any consistent formal system F within which a certain amount of ',
    'elementary arithmetic can be carried out is incomplete'
  ].join('\n'),
  '\nthey said what??',
  'a big surprise ',
  '\tconst testCases = [\n',
  '💩poo💩💩💩💩',
  ' 💩💩💩💩💩💩💩poop💩💩💩 💩💩💩💩💩',
  'poo💩💩💩\n💩💩💩\n'
];

const censoredTestCases = testCases.map(function (text) {
  return censor(text);
});

function countCensoredWords (text) {
  let censoredWords = text.match(/█+/g) || [];
  return censoredWords.length;
}

describe('censor', function () {
  it('should always censor at least one word', function () {
    censoredTestCases.forEach(function (censoredTestCase, index) {
      if (/\S+/.test(testCases[index])) {
        assert.isAbove(countCensoredWords(censoredTestCase), 0);
      }
    });
  });

  it('should preserve whitespace', function () {
    censoredTestCases.forEach(function (censoredTestCase, index) {
      assert.deepEqual(testCases[index].match(/\s+/g), censoredTestCase.match(/\s+/g));
    });
  });
});
