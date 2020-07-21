const scrape = require('../scrape/scrape');

module.exports = app => {
  app.get('/scrape/:url', async (req, res) => {
    console.log('req.params', req.params);

    const scrapeData = await scrape(req.params);
    
    res.send(scrapeData);
  });
}
