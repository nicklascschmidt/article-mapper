import _ from 'lodash';
import { createSelector } from 'reselect'

import {
  parseDeterminedLocations,
  parseUndeterminedLocations,
} from './parsers/index';


/** HELPERS */

const getLocationsByType = (type, locations) => {  
  return Object.keys(locations).reduce((acc, key, idx) => {
    const location = locations[key];
    if (location.status === type) acc[key] = location;
    return acc;
  }, {});
};

/**
 * @summary - accepts locations from reducer and returns array of [lat, lng] bounds for each location
 *          - used for getting the map view zoom
 * @param {object{}} locations - obj of location objs from the reducer
 * @returns {array[]} - array of [lat, lng] arrays
*/
const getLocationBounds = (locations) => {
  return Object.keys(locations).map((key, idx) => {
    const { lat, lng } = locations[key];
    return [lat, lng];
  });
};

const getNextIdFromLocations = (locations) => {
  const ids = Object.keys(locations).map(key => parseInt(locations[key]._id));
  const nextIndex = _.isEmpty(ids) ? 0 : Math.max(...ids) + 1;
  return nextIndex.toString();
};

/** SELECTORS */

const locationsSelector = state => state.locations.data;

export const determinedLocationsSelector = createSelector(
  locationsSelector,
  locations => getLocationsByType('determined', locations),
  unparsedLocations => parseDeterminedLocations(unparsedLocations)
);

export const undeterminedLocationsSelector = createSelector(
  locationsSelector,
  locations => getLocationsByType('undetermined', locations),
  unparsedLocations => parseUndeterminedLocations(unparsedLocations)
);

export const locationBoundsSelector = createSelector(
  determinedLocationsSelector,
  locations => getLocationBounds(locations)
);

export const nextIdSelector = createSelector(
  locationsSelector,
  locations => getNextIdFromLocations(locations)
);



/** UNUSED */

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
