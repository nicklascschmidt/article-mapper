// module.exports.scrape = require('./scrape');
// module.exports.html = require('./html');

module.exports = app => {
  require('./scrape')(app);
  require('./html')(app);
}