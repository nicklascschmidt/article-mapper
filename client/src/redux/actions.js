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

export const updateLocationStatusByKey = (key, status) => ({
  type: T.UPDATE_LOCATION_STATUS_BY_KEY,
  payload: {
    key,
    status,
  },
});

export const addNewDeterminedLocation = (locationData) => ({
  type: T.ADD_NEW_LOCATION,
  payload: {
    ...locationData,
    status: 'determined',
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
