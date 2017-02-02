#!/usr/bin/env node
const readline = require('readline');
const deepState = require('..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (token) => {
  deepState(token);
});
