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
export const updateLocationByIndex = (index, location) => ({
  type: T.UPDATE_LOCATION_BY_INDEX,
  payload: {
    index,
    location,
  },
});

export const addNewOfficialLocation = (locationData) => ({
  type: T.ADD_NEW_LOCATION,
  payload: {
    ...locationData,
    status: 'official',
  },
});

export const addNewUndeterminedLocation = (locations) => ({
  type: T.ADD_NEW_LOCATION,
  payload: {
    possibleLocations: locations,
    status: 'undetermined',
  },
});

export const overwriteLocationsField = (field, data) => ({
  type: T.OVERWRITE_LOCATIONS_FIELD,
  payload: {
    field,
    value: data,
  },
});


// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
