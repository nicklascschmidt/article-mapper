import * as T from '../actions/actionTypes';

const initialState = {
  titleStrings: [],
  generalLocation: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.ADD_TITLES: {
      const { titles } = action.payload;

      return {
        ...state,
        titleStrings: state.titles.concat(titles),
      };
    }

    case T.OVERWRITE_TITLES: {
      const { titles } = action.payload;

      return {
        ...state,
        titleStrings: titles,
      };
    }

    case T.OVERWRITE_GENERAL_LOCATION: {
      const { generalLocation } = action.payload;

      return {
        ...state,
        generalLocation,
      };
    }

    default:
      return state;
  }
}
