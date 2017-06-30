'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const bans = require('./bans');

const VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;

module.exports = (err, admins) => {
  if (err) {
    console.error('FATAL: could not get admin users');
    throw err;
  }
  const app = express();

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(function (req, res, next) {
    if (!req.body.token || req.body.token != VERIFICATION_TOKEN) {
      res.status(400).send('Invalid token');
    }
    else if (!req.body.user_id || (admins.indexOf(req.body.user_id) === -1)) {
      res.status(403).send('You are not an admin');
    }
    else {
      next();
    }
  });

  app.post('/ban', function (req, res) {
    if (bans.has(req.body.user_id)) {
      res.status(200).send(`${req.body.user_name} is already banned`)
    }
    else {
      bans.add(req.body.user_id);
      res.status(200).send(`${req.body.user_name} is now banned`)
    }
  });

  app.post('/unban', function (req, res) {
    if (!bans.has(req.body.user_id)) {
      res.status(200).send(`${req.body.user_name} is already not banned`)
    }
    else {
      bans.delete(req.body.user_id);
      res.status(200).send(`${req.body.user_name} is now unbanned`)
    }
  });

  app.listen(3000, function () {
    console.log('Express listening on port 3000');
  });
};
