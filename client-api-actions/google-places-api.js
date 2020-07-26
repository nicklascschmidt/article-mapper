const _ = require('lodash');
const axios = require('axios');

/** Params */

const defaultParams = {
  key: process.env.API_KEY_GOOGLE_PLACES,
  inputtype: 'textquery',
  language: 'en',
};

const defaultResponseFieldParams = ['name', 'place_id', 'geometry'];

const getResponseFieldParams = (fields) => {
  return {
    fields: (
      fields
        ? fields.split(',').concat(defaultResponseFieldParams).join(',')
        : defaultResponseFieldParams.join(',')
    )
  };
}

const splitClientParams = (clientParams) => {
  const { fields } = clientParams;
  return {
    fields,
    params: _.omit(clientParams, 'fields')
  };
}

/** API Call */

const fetchLocationData = (searchTerm, clientPassedParams, fieldParams) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;

  const params = {
    input: searchTerm,
    ...defaultParams,
    ...clientPassedParams,
    ...fieldParams,
  };
  
  return axios.get(url, { params });
}

/** Exported Functions */

const findPlaceFromText = async (searchTerm, clientParams) => {
  const { fields, params } = splitClientParams(clientParams);
  const fieldParams = getResponseFieldParams(fields);
  return await fetchLocationData(searchTerm, params, fieldParams);
}

module.exports = {
  findPlaceFromText,
};
