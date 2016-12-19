'use strict';

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateIndices (count) {
  return new Array(count).map(function (_, index) { return index; });
}

function interleave (list1, list2) {
  function _interleave (list1, list2, acc, pickFirst) {
    if (list1.length === 0 && list2.length === 0) {
      return acc;
    }

    return (
      pickFirst
        ? _interleave(list1.slice(1), list2, acc.concat(list1.slice(0,1)), !pickFirst)
        : _interleave(list1, list2.slice(1), acc.concat(list2.slice(0,1)), !pickFirst)
    );
  }

  return _interleave(list1, list2, [], true);
}

function combineWordsAndSpaces (words, spaces, startsWithWord) {
  return (
    startsWithWord
      ? interleave(words, spaces)
      : interleave(spaces, words)
  ).join('');
}

function censorWord (words, wordIndex) {
  words[wordIndex] = new Array(words[wordIndex].length).fill('█').join('');
  return words;
}

function censorWords (words, numWordsToCensor, uncensoredIndices) {
  if (numWordsToCensor === 0) {
    return words;
  }

  let uncensoredIndex = randomInt(0, uncensoredIndices.length);
  let wordIndex = uncensoredIndices[uncensoredIndex];

  return censorWords(
    censorWord(words, wordIndex),
    --numWordsToCensor,
    uncensoredIndices.filter(function (index) { return index !== wordIndex })
  );
}

function censor (text) {
  if (text.length === 0) {
    return text;
  }

  let words = text.match(/\S+/g) || [];

  words = censorWords(
    words,
    randomInt(1, words.length),
    new Array(words.length).fill(0).map(function (_, index) { return index; })
  );

  return combineWordsAndSpaces(words, text.match(/\s+/g) || [], /\S/.test(text[0]));
}

module.exports = censor;
