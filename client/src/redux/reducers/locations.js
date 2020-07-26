import * as T from '../actionTypes';

const initialState = {
  official: {},
  /**
   * TODO: use Google Places API locationbias to narrow undetermined list results down
   * or even just autoselect the closest one
   */
  undetermined: {},
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

    case T.OVERWRITE_LOCATIONS_FIELD: {
      const { field, value } = action.payload;

      return {
        ...state,
        [field]: value,
      };
    }

    default:
      return state;
  }
}
