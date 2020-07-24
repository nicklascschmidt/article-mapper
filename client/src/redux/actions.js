import * as T from './actionTypes';

/** TITLES */

export const addTitles = titles => ({
  type: T.ADD_TITLES,
  payload: {
    titles,
  },
});

export const replaceTitles = titles => ({
  type: T.REPLACE_TITLES,
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

export const updateIncompleteLocation = (key, location) => ({
  type: T.UPDATE_LOCATION,
  payload: {
    key,
    location,
    type: 'incomplete',
  },
});

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
