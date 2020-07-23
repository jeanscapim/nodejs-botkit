const rewardService = require('../services/rewardService');
const helpService = require('../services/helpService');

module.exports = (controller) => {
    controller.hears(['help'], 'direct_message,direct_mention,mention', (bot, message) => {
        bot.startTyping(message);
        bot.replyInThread(message, reply(message, '> RewardBot: Exemplo ```@RewardBot reward <usuario> <mensagem>```'));
        // bot.replyInThread(message, reply(message, '> List: Exemplo ```@RewardBot list tag```'));
        // bot.replyInThread(message, reply(message, '> Exec: Exemplo ```@RewardBot exec tag <tag>```'));
    });

    controller.hears(['mandoubem'], 'direct_message,direct_mention,mention', (bot, message) => {
        bot.startTyping(message);
        rewardService.createReward(bot, message);
    });

    controller.hears(['list tag'], 'direct_message,direct_mention,mention', (bot, message) => {
        bot.startTyping(message);
        helpService.getTags(bot, message);
    });

    controller.hears(['exec tag'], 'direct_message,direct_mention,mention', (bot, message) => {
        bot.startTyping(message);
        helpService.getByTag(bot, message);
    });
}
