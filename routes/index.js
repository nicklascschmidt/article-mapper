module.exports = app => {
  require('./scrape-routes')(app);
  require('./client-apis')(app);
}