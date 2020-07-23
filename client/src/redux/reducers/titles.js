import * as T from '../actionTypes';

const initialState = {
  titles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.ADD_TITLES: {
      const { titles } = action.payload;

      return {
        ...state,
        titles: state.titles.concat(titles),
      };
    }

    case T.REPLACE_TITLES: {
      const { titles } = action.payload;

      return {
        ...state,
        titles,
      };
    }

    default:
      return state;
  }
}
