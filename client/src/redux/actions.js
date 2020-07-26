import * as T from './actionTypes';

/** TITLES */

export const addTitles = titles => ({
  type: T.ADD_TITLES,
  payload: {
    titles,
  },
});

export const overwriteTitles = titles => ({
  type: T.OVERWRITE_TITLES,
  payload: {
    titles,
  },
});

/** LOCATIONS */

/**
 * @summary - updates an official location
 *          - overwrites if key already exists
 * @param {number} key - index from the titles array
 * @param {object} location - location object from openstreetmap API
 */
export const updateOfficialLocation = (key, location) => ({
  type: T.UPDATE_LOCATION,
  payload: {
    key,
    location,
    type: 'official',
  },
});

export const updateUndeterminedLocation = (key, location) => ({
  type: T.UPDATE_LOCATION,
  payload: {
    key,
    location,
    type: 'undetermined',
  },
});

export const overwriteOfficialLocations = (locations) => ({
  type: T.OVERWRITE_LOCATIONS_FIELD,
  payload: {
    field: 'official',
    value: locations,
  },
});

export const overwriteUndeterminedLocations = (locations) => ({
  type: T.OVERWRITE_LOCATIONS_FIELD,
  payload: {
    field: 'undetermined',
    value: locations,
  },
});

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
