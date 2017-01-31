'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const censor = require('./lib/censor');

module.exports = function (token) {
  const rtm = new RtmClient(token, {autoReconnect: false});
  rtm.start();

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.error(`info: Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
  });

  rtm.on(RTM_EVENTS.MESSAGE, function (messageEvent) {
    if (messageEvent.subtype && messageEvent.subtype === 'message_deleted') {
      rtm.sendMessage(censor(messageEvent.previous_message.text), messageEvent.channel);
    }
  });
};
