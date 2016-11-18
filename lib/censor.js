function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function censor (text) {
  let words = text.split(' ');
  let numCensoredWords = randomInt(1, words.length);

  for (let i = 0; i < numCensoredWords; i++) {
    let censoredIndex = randomInt(0, words.length);
    words[censoredIndex] = new Array(words[censoredIndex].length).fill('█').join('');
  }

  return words.join(' ');
}

module.exports = censor;
