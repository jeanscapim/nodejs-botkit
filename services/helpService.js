const helpApi = require('../apis/helpApi');
var _ = require('lodash');

module.exports = {
  getTags: (bot, message) => {
    try {
      helpApi.getTags()
        .then(result => {
          _.forEach(result.body, tag => {
            bot.replyInThread(message, '> ```@RewardBot exec tag ' + tag.name + '```');
          });
        })
        .catch(error => {
          bot.replyInThread(message, `Deu erro ao buscar as tags :C \nerrorMessage: *${error.message}*`);
        });
    }
    catch (error) {
      bot.replyInThread(message, `Deu erro ao buscar as tags :C \nerrorMessage: *${error.message}*`);
    }
  },

  getByTag: (bot, message) => {
    const [_bot1, _bot2, tag] = message.text.split(' ');
    if (!tag) {
      bot.replyInThread(message, 'Por favor, informe a tag! Exemplo ```@RewardBot exec tag <tag>```');
      return;
    }
    try {
      helpApi.getByTag(tag)
        .then(result => {
          bot.replyInThread(message, `${result.body.description}`);
        })
        .catch(error => {
          bot.replyInThread(message, `Deu erro ao buscar a tag *${tag}* :C \nerrorMessage: *${error.message}*`);
        });
    }
    catch (error) {
      bot.replyInThread(message, `Deu erro ao buscar a tag *${tag}* :C \nerrorMessage: *${error.message}*`);
    }
  }
}
