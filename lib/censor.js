'use strict';

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getWordIndices (text) {
  let indices = [];

  for (let i = 0; i < text.length; i++) {
    if ((i-1 < 0 || /\s/.test(text[i-1])) && /\S/.test(text[i])) {
      indices.push(i);
    }
  }

  return indices;
}

function censor (text) {
  text = text.split('');

  let wordIndices = getWordIndices(text);
  const numCensoredWords = randomInt(1, wordIndices.length);

  for (let i = 0; i < numCensoredWords; i++) {
    let wordIndex = randomInt(0, wordIndices.length);
    let censorIndex = wordIndices[wordIndex];

    while (text[censorIndex] && /\S/.test(text[censorIndex])) {
      text[censorIndex] = '█';
      censorIndex++;
    }

    wordIndices.pop(wordIndex);
  }

  text = text.join('');

  return text;
}

module.exports = censor;
