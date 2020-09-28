const scrape = require('../scrape/scrape');

module.exports = app => {
  app.get('/scrape', async (req, res) => {
    let scrapeData;
    try {
      scrapeData = await scrape(req.query);
    } catch (err) {
      console.log(err);
      /**
       * This likely will not hit in bc async awaited call
       * TODO: impl domains https://nodejs.org/api/domain.html
       */
      return res.status(500).send(err.message);
    }

    res.status(200).send(scrapeData);
  });
}
