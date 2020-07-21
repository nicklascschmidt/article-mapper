const path = require('path');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.send({ test: 'home route' });

    // res.sendFile(path.join(__dirname, '../','client', 'build', 'index.html'));
  });
};
