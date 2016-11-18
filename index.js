const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const censor = require('./lib/censor');

const botToken = process.env.SLACK_BOT_TOKEN || '';
if (!botToken) { console.log('Please set SLACK_BOT_TOKEN'); process.exit(-1); }

const rtm = new RtmClient(botToken, {autoReconnect: false});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
  rtm.on(RTM_EVENTS.MESSAGE, function (messageEvent) {
    if (messageEvent.subtype && messageEvent.subtype === 'message_deleted') {
      let message = censor(messageEvent.previous_message.text);
      rtm.sendMessage(message, messageEvent.channel);
    }
  });
});
