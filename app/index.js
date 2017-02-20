'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const censor = require('./lib/censor');

module.exports = function (name, token) {
  const rtm = new RtmClient(token);
  rtm.start();

  rtm.on(RTM_EVENTS.MESSAGE, function (messageEvent) {
    if (messageEvent.subtype && messageEvent.subtype === 'message_deleted') {
      console.info(`censoring a message for team ${name}`)
      rtm.sendMessage(
        censor(messageEvent.previous_message.text),
        messageEvent.channel
      );
    }
  });

  return rtm;
};
