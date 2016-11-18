const assert = require('chai').assert;
const censor = require('../lib/censor');

function isCensored (word) {
  return word.split('').every(function (letter) {
    return letter === '█';
  });
}

describe('censor', function () {
  it('should always censor at least one word', function () {
    let texts = [
      'hello',
      'well hey',
      'the quality of mercy is not straind',
      [
        'Any consistent formal system F within which a certain amount of ',
        'elementary arithmetic can be carried out is incomplete'
      ].join('')
    ];

    let censoredCounts = texts.map(function (text) {
      let censoredText = censor(text);
      return censoredText.split(' ').reduce(function (count, word) {
        return isCensored(word) ? count + 1 : count;
      }, 0);
    });

    censoredCounts.forEach(function (count) {
      assert.isAbove(count, 0);
    });
  });
});
