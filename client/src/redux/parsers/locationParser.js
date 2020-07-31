import _ from 'lodash';

/**
 * @summary - parses Google Places API location and returns a flat(ish) object
 * @param {object} location - GPlaces API location object
 */
const parseLocationBody = (location) => {
  return {
    _id: _.get(location, '_id', ''),
    userSearchTerm: _.get(location, 'userSearchTerm', ''), // manually passed in
    formatted_address: _.get(location, 'formatted_address', ''),
    lat: _.get(location, 'geometry.location.lat', ''),
    lng: _.get(location, 'geometry.location.lng', ''),
    viewport: _.get(location, 'viewport', ''),
    name: _.get(location, 'name', ''),
    place_id: _.get(location, 'place_id', ''),
    types: _.get(location, 'types', []),
  };
};

/**
 * @summary - accepts locations from reducer and returns parsed locations (flat-ish)
 * @param {object{}} locations - obj of location objs from the reducer
 * @returns {object{}} - obj of location objs
*/
export const parseDeterminedLocations = (locations) => {
  return Object.keys(locations).reduce((acc, key, idx) => {
    acc[key] = parseLocationBody(locations[key]);
    return acc;
  }, {});
};

export const parseUndeterminedLocations = (locations) => {
  return Object.keys(locations).reduce((acc, key, idx) => {
    const location = locations[key];
    const parsedLocations = location.possibleLocations.map((location => parseLocationBody(location)));
    acc[key] = {
      ...location,
      possibleLocations: parsedLocations,
    };
    return acc;
  }, {});
};
