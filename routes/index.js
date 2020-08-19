module.exports = app => {
  require('./scrape')(app);
  require('./client-apis')(app);
}