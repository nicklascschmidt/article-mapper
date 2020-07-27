import _ from 'lodash';

import { parseLocationBody } from './parsers/index';


const getLocationsByType = (type, locations) => {
  return locations.filter((location, key) => location.status === type)
}

/**
 * @summary - accepts locations from reducer and returns parsed locations (flat-ish)
 * @param {object{}} locations - obj of location objs from the reducer
 * @returns {object[]} - array of location objs
 */
export const getOfficialLocations = (locations) => {
  const officialLocations = getLocationsByType('official', locations);

  return officialLocations.map((location, key) => parseLocationBody(location));
}

export const getUndeterminedLocations = (locations) => {
  const undeterminedLocations = getLocationsByType('undetermined', locations);
  return undeterminedLocations.reduce((acc, locationData, key) => {
    const parsedLocations = locationData.possibleLocations.map((location => parseLocationBody(location)));
    acc[key] = {
      ...locationData,
      possibleLocations: parsedLocations,
    };
    return acc;
  }, {});
};


/**
 * @summary - accepts locations from reducer and returns array of [lat, lng] bounds for each location
 *          - used for getting the map view zoom
 * @param {object{}} officialLocations - obj of location objs from the reducer
 * @returns {array[]} - array of [lat, lng] arrays
*/
export const getLocationBounds = (officialLocations) => {
  return officialLocations.map((location, idx) => {
    const { lat, lng } = location;
    return [lat, lng];
  });
};

/**
 * TODO:
 * get min/max lat/long and pass into locationbias to get a place close to the others 
 * use G Places locationbias to  */
export const getMinMaxLatLng = (officialLocations) => {
  const latLngBounds = officialLocations.map((key, idx) => {
    const { lat, lon } = officialLocations[key];
    return [lat, lon];
  });
  return latLngBounds;
};
