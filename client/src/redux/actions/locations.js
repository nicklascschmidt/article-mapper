import * as T from './actionTypes';

/** Update / Overwrite */

export const overwriteLocationByKey = (key, data) => ({
  type: T.OVERWRITE_LOCATION_BY_KEY,
  payload: {
    key,
    data,
  },
});

export const removeLocationByKey = (key) => ({
  type: T.REMOVE_LOCATION_BY_KEY,
  payload: {
    key,
  },
});

export const overwriteLocationsField = (field, data) => ({
  type: T.OVERWRITE_LOCATIONS_FIELD,
  payload: {
    field,
    value: data,
  },
});

export const updateLocationStatusByKey = (key, status) => ({
  type: T.UPDATE_LOCATION_STATUS_BY_KEY,
  payload: {
    key,
    status,
  },
});

/** Add New */

export const addNewDeterminedLocation = (locationData, index) => ({
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
