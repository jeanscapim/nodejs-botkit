global.blue = (phrase) => {
    return console.log(`\x1b[36m${phrase}\x1b[0m`);
};

global.reply = (message, text) => {
    return {
        'text': text,
        'reply_broadcast': message.reply_broadcast
    }
};

global.replyAttachments = (message, text, attachments) => {
    return {
        'text': text,
        'attachments': attachments,
        'reply_broadcast': message.reply_broadcast
    }
};

global.objectHook = (text, attachments) => {
    return {
        'text': text,
        'attachments': attachments,
        'channel': process.env.SLACK_CHANNEL
    }
};