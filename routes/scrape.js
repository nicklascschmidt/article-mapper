const scrape = require('../scrape/scrape');

module.exports = app => {
  app.get('/scrape/:url/:firstTitleText/:elType/:numOfTitles', async (req, res) => {
    const scrapeData = await scrape(req.params);
    
    res.status(200).send(scrapeData);
  });
}
