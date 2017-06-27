'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const bans = require('./bans');
const getAdmins = require('./admins');

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
    else if (!req.body.user_id || !admins.has(req.body.user_id)) {
      res.status(403).send('You are not an admin');
    }
    else {
      next();
    }
  });

  app.post('/ban', function (req, res) {
    let userName, userId = req.body.user.replace(/<>/, '').split('|');
    if (bans.has(userId)) {
      res.status(200).send(`${userName} is already banned`)
    }
    else {
      bans.add(userId);
      res.status(200).send(`${userName} is now banned`)
    }
  });

  app.post('/unban', function (req, res) {
    let userName, userId = req.body.user.replace(/<>/, '').split('|');
    if (!bans.has(userId)) {
      res.status(200).send(`${userName} is already not banned`)
    }
    else {
      bans.delete(userId);
      res.status(200).send(`${userName} is now unbanned`)
    }
  });

  app.listen(3000, function () {
    console.log('Express listening on port 3000');
  });
};
