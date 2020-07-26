import _ from 'lodash';

/** TODO:
 * write selector to parse API fields and return flat object with fields
 *  so it's easier to reference those fields in the components
*/

/**
 * @summary - parses Google Places API location and returns a flat(ish) object
 * @param {object} location - GPlaces API location object
 */
export const parseOfficialLocation = (location) => {
  return {
    formatted_address: _.get(location, 'formatted_address', ''),
    lat: _.get(location, 'geometry.location.lat', ''),
    lng: _.get(location, 'geometry.location.lng', ''),
    viewport: _.get(location, 'viewport', ''),
    name: _.get(location, 'name', ''),
    place_id: _.get(location, 'place_id', ''),
    types: _.get(location, 'types', []),
  };
};
