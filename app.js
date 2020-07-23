const Botkit = require('botkit');
require('dotenv').config()
require('./global');

const controller = Botkit.slackbot({
  debug: false,
  send_via_rtm: true,
  retry: Infinity,
  disable_startup_messages: true
});

controller.setupWebserver(process.env.PORT || 3000, (err, webserver) => {
  controller.createWebhookEndpoints(webserver);
  controller.spawn({
    token: process.env.SLACK_TOKEN,
    incoming_webhook: {
      url: process.env.SLACK_WEBHOOK
    }
  }).startRTM();

  require('./controller/listenerController')(controller);
});
