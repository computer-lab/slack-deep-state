#!/usr/bin/env node

if (process.argv.length < 4) {
  console.log('usage: slack-deep-state <host> <port>');
  process.exit(1);
}

const http = require('http');
const deepState = require('..');

const server = http.createServer((req, res) => {
  const token = req.headers['x-slack-token'];
  console.log(token);
  deepState(token);
  res.end();
});

const host = process.argv[2];
const port = process.argv[3];

server.listen(port, host, function () {
  console.log(`${host} ${port} starting`)
});

process.on('SIGINT', function () {
  console.log(`${host} ${port} stopping`)
  process.exit(0);
});
