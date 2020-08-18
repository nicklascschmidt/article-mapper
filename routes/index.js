module.exports = app => {
  require('./scrape')(app);
  require('./client-apis')(app);
  // require('./html')(app);
}