const request = require('request');
const options = {
  headers: {
    'Authorization': `Bearer ${process.env.TOKEN_RTE}`,
    'Content-Type': 'application/json'
  },
  json: true
};

module.exports = {
  createReward: (reward) => {
    return new Promise((resolve, reject) => {
      //options.url = `${process.env.REWARD_API_URL}`;
      options.url = `http://www.mocky.io/v2/5d38829e9f0000344e9b3f9d`;
      options.method = 'POST';
      options.body = reward;
      options.json = true;
      request(options, (err, result) => {
        if (err) {
          return reject(err);
        }

        if (result.statusCode != 201) {
          let error = new Error();
          return reject(error);
        }

        return resolve(result);
      });
    });
  }
}