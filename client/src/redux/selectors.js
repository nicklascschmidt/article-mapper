import _ from 'lodash';

import { parseLocationBody } from './parsers/index';


const getLocationsByType = (type, locations) => {  
  return Object.keys(locations).reduce((acc, key, idx) => {
    const location = locations[key];
    if (location.status === type) acc[key] = location;
    return acc;
  }, {});
}

/**
 * @summary - accepts locations from reducer and returns parsed locations (flat-ish)
 * @param {object{}} locations - obj of location objs from the reducer
 * @returns {object{}} - obj of location objs
 */
export const getDeterminedLocations = (locations) => {
  const determinedLocations = getLocationsByType('determined', locations);

  return Object.keys(determinedLocations).reduce((acc, key, idx) => {
    acc[key] = parseLocationBody(determinedLocations[key]);
    return acc;
  }, {});
}

export const getUndeterminedLocations = (locations) => {
  const undeterminedLocations = getLocationsByType('undetermined', locations);

  return Object.keys(undeterminedLocations).reduce((acc, key, idx) => {
    const location = undeterminedLocations[key];
    const parsedLocations = location.possibleLocations.map((location => parseLocationBody(location)));
    acc[key] = {
      ...location,
      possibleLocations: parsedLocations,
    };
    return acc;
  }, {});
};


/**
 * @summary - accepts locations from reducer and returns array of [lat, lng] bounds for each location
 *          - used for getting the map view zoom
 * @param {object{}} determinedLocations - obj of location objs from the reducer
 * @returns {array[]} - array of [lat, lng] arrays
*/
export const getLocationBounds = (determinedLocations) => {
  return Object.keys(determinedLocations).map((key, idx) => {
    const { lat, lng } = determinedLocations[key];
    return [lat, lng];
  });
};

/**
 * TODO:
 * get min/max lat/long and pass into locationbias to get a place close to the others 
 * use G Places locationbias to  */
export const getMinMaxLatLng = (determinedLocations) => {
  const latLngBounds = Object.keys(determinedLocations).map((key, idx) => {
    const { lat, lon } = determinedLocations[key];
    return [lat, lon];
  });
  return latLngBounds;
};
