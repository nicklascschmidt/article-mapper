import * as T from './actionTypes';

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
