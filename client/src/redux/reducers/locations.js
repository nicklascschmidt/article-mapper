import * as T from '../actionTypes';

const initialState = {
  official: {},
  incomplete: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.UPDATE_LOCATION: {
      const { type, key, location } = action.payload;

      return {
        ...state,
        [type]: {
          ...state[type],
          [key]: location,
        },
      };
    }

    default:
      return state;
  }
}
