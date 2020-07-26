const googlePlacesApi = require('../../client-api-actions/google-places-api');

module.exports = function(app) {
  /**
   * @param {string} searchTerm - the location being searched in the API
   * @param {string} paramsString - request params split up like this: `name=value&name=value` etc
   * @param {string} fieldParams - fields that will be returned in the API response
   *                             - just strings separated by commas
   *                             - source: https://developers.google.com/places/web-service/place-data-fields?hl=en_US
  */
  app.get('/api/client/find-place-from-text/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;

    let response;
    try {
      response = await googlePlacesApi.findPlaceFromText(searchTerm, req.query);
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
    
    return res.status(200).send(response.data);
  });
};
