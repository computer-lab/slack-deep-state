'use strict';
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const bans = require('./bans');
const censor = require('./censor');

module.exports = () => {
  const rtm = new RtmClient(process.env.SLACK_BOT_TOKEN);
  rtm.start();

  rtm.on(RTM_EVENTS.MESSAGE, function (messageEvent) {
    if (bans.has(messageEvent.user)) {
      console.info(`censoring a message by banned user ${messageEvent.user}`)
      messageEvent.text = censor(messageEvent.text),
      rtm.updateMessage(messageEvent);
    }

    else if (messageEvent.subtype && messageEvent.subtype === 'message_deleted') {
      console.info(`censoring a deleted message by user ${messageEvent.previous_message.user} in channel ${messageEvent.channel}`)
      rtm.sendMessage(
        censor(messageEvent.previous_message.text),
        messageEvent.channel
      );
    }
  });
};
