const rewardApi = require('../apis/rewardApi');
const slackApi = require('../apis/slackApi');
var _ = require('lodash');

module.exports = {
  createReward: async (bot, message) => {
    const [_mandoubem, _userId, _term] = message.text.split(' ');
    const _user = _userId.replace('<@', '').replace('>', '');
    const _texto = message.text.replace(_reward, '').replace(_userId, '').trim();

    if (_.isEqual(_userId.trim(), '')) {
      bot.replyInThread(message, 'Por favor, informe o usuário ```@RewardBot reward <usuario> <mensagem>```');
      return;
    }

    if (_.isEqual(_term.trim(), '')) {
      bot.replyInThread(message, 'Por favor, informe a mensagem ```@RewardBot reward <usuario> <mensagem>```');
      return;
    }

    if (_.isEqual(message.user.trim(), _user.trim())) {
      bot.replyInThread(message, `Ops, não foi possível pontuar o usuário *${_userId}* :C`);
      return;
    }

    if (!_.isEqual(_texto.trim(), '')) {
      try {
        let senderUserSlack = await slackApi.getUserInfoById(message.user);
        let senderUser = await buildSenderUser(senderUserSlack.user);

        let recipientUserSlack = await slackApi.getUserInfoById(_user);
        let recipientUser = await buildRecipientUser(recipientUserSlack.user);

        let reward = await buildMessage(_texto, senderUser, recipientUser);

        rewardApi.createReward(reward)
          .then(result => {
            bot.replyInThread(message, `${_userId} seu trabalho foi reconhecido! ;)`);
          })
          .catch(error => {
            bot.replyInThread(message, `Ops, não foi possível pontuar o usuário *${_userId}* :C \nerrorMessage: *${error.message}*`);
          });
      }
      catch (error) {
        bot.replyInThread(message, `Ops, não foi possível pontuar o usuário *${_userId}* :C \nerrorMessage: *${error.message}*`);
      }
    } else {
      bot.replyInThread(message, 'Por favor, informe a mensagem ```@RewardBot reward <usuario> <mensagem>```');
    }
  }
}

function buildMessage(message, senderUser, recipientUser) {
  return new Promise((resolve, reject) => {
    let reward = {
      message: message,
      senderUser: senderUser,
      recipientUser: recipientUser
    };

    return resolve(reward);
  });
}

function buildSenderUser(senderUserSlack) {
  return new Promise((resolve, reject) => {
    let senderUser = {
      slackId: senderUserSlack.id,
      nickname: senderUserSlack.name,
      name: senderUserSlack.real_name
    };

    return resolve(senderUser);
  });
}

function buildRecipientUser(recipientUserSlack) {
  return new Promise((resolve, reject) => {
    let recipientUser = {
      slackId: recipientUserSlack.id,
      nickname: recipientUserSlack.name,
      name: recipientUserSlack.real_name
    };

    return resolve(recipientUser);
  });
}
