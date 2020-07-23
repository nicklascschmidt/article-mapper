import * as T from './actionTypes';

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

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
