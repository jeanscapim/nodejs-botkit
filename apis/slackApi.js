const request = require('request');
const slackUrl = 'https://slack.com/api/';
const options = {};

module.exports = {
  getUserInfoById: (_userId) => {
    return new Promise((resolve, reject) => {
      options.method = 'GET';
      options.url = `${slackUrl}/users.info?token=${process.env.SLACK_TOKEN}&user=${_userId}`;
      options.json = true;
      request(options, (err, result) => {
        if (err) {
          return reject(err);
        }
        
        return resolve(result.body);
      })
    })
  }
};