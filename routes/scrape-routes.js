const scrape = require('../scrape/scrape');

module.exports = app => {
  app.get('/scrape', async (req, res) => {
    const scrapeData = await scrape(req.query);
    
    res.status(200).send(scrapeData);
  });
}
