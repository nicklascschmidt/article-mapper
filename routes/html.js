const path = require('path');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.status(200).send({ test: 'home route' });

    // res.sendFile(path.join(__dirname, '../','client', 'build', 'index.html'));
  });
};
