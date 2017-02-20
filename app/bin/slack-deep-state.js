const kafka = require('kafka-node');
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const deepState = require('..');

const kafkaClient = new kafka.Client(
  process.env['ZOOKEEPER_URI'],
  'deep-state-client'
);
const kafkaConsumer = new kafka.Consumer(
  kafkaClient,
  [{'topic': 'registration'}],
  {
    'fromOffset': true,
    'groupId': 'deep-state-group'
  }
);

kafkaConsumer.on('message', function (message) {
  let value;
  try {
    value = JSON.parse(message.value);
  }
  catch (_) {
    console.error(`could not parse ${message.value} as JSON`);
    return;
  }
  console.info(`team registered: ${value.name}`);
  const rtmClient = deepState(value.name, value.token);
  rtmClient.on(RTM_EVENTS.DISCONNECT, function () {
    console.info(`team de-registered: ${value.name}`);
  });
});

console.info('ready: waiting for messages');
