import _ from 'lodash';

import { parseOfficialLocation } from './parsers/index';

/**
 * @summary - accepts locations from reducer and returns parsed locations (flat-ish)
 * @param {object{}} officialLocations - obj of location objs from the reducer
 * @returns {object[]} - array of location objs
 */
export const getOfficialLocations = (officialLocations) => {
  return Object.keys(officialLocations).map((key, idx) => {
    return parseOfficialLocation(officialLocations[key]);
  });
};

/**
 * @summary - accepts locations from reducer and returns array of [lat, lng] bounds for each location
 *          - used for getting the map view zoom
 * @param {object{}} officialLocations - obj of location objs from the reducer
 * @returns {array[]} - array of [lat, lng] arrays
*/
export const getLocationBounds = (officialLocations) => {
  const latLngBounds = Object.keys(officialLocations).map((key, idx) => {
    const location = officialLocations[key];
    const lat = _.get(location, 'geometry.location.lat', 0);
    const lng = _.get(location, 'geometry.location.lng', 0);
    return [lat, lng];
  });
  return latLngBounds;
};

/**
 * TODO:
 * get min/max lat/long and pass into locationbias to get a place close to the others 
 * use G Places locationbias to  */
export const getMinMaxLatLng = (officialLocations) => {
  const latLngBounds = Object.keys(officialLocations).map((key, idx) => {
    const { lat, lon } = officialLocations[key];
    return [lat, lon];
  });
  return latLngBounds;
};
