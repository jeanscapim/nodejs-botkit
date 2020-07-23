const request = require('request');
const options = {};

module.exports = {
  getTags: () => {
    return new Promise((resolve, reject) => {
      options.method = 'GET';
      //options.url = `${process.env.HELP_API_URL}`;
      options.url = `http://www.mocky.io/v2/5d1ce08e34000024b1b600f4`;
      options.json = true;
      request(options, (err, result) => {
        if (err) {
          return reject(err);
        }

        if (result.statusCode != 200) {
          let error = new Error();
          return reject(error);
        }

        return resolve(result);
      });
    });
  },

  getByTag: (_tag) => {
    return new Promise((resolve, reject) => {
      options.method = 'GET';
      //options.url = `${process.env.HELP_API_URL}/?tag=${_tag}`;
      options.url = `http://www.mocky.io/v2/5d1ced1934000023b1b60157`;
      options.json = true;
      request(options, (err, result) => {
        if (err) {
          return reject(err);
        }

        if (result.statusCode != 200) {
          let error = new Error();
          return reject(error);
        }

        return resolve(result);
      });
    });
  }
}
