import * as T from '../actions/actionTypes';

// Data Structure
// {
//   data: {
//     0: {
//       status: 'undetermined',
//       possibleLocations: [
//         { ...locationApi }
//       ],
//     },
//     1: {
//       status: 'determined',
//       ...locationApi,
//     }
//   }
// }

/**
 * TODO: use Google Places API locationbias to narrow undetermined list results down
 * or even just autoselect the closest one
*/
const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.OVERWRITE_LOCATIONS_FIELD: {
      const { field, value } = action.payload;
      console.log('setting', field, 'to', value);
      
      return {
        ...state,
        [field]: value,
      };
    }

    case T.REMOVE_LOCATION_BY_KEY: {
      const { key } = action.payload;
      const newData = state.data;
      delete newData[key];
      
      return {
        ...state,
        data: newData,
      };
    }
    
    case T.OVERWRITE_LOCATION_BY_KEY: {
      const { key, data } = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [key]: data,
        },
      };
    }

    case T.UPDATE_LOCATION_STATUS_BY_KEY: {
      const { key, status } = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [key]: {
            ...state.data[key],
            status,
          },
        },
      };
    }

    /** untested */
    case T.ADD_NEW_LOCATION: {
      const nextIndex = Object.keys(state.data).length + 1;

      return {
        ...state,
        data: {
          ...state.data,
          [nextIndex]: action.payload,
        },
      }
    }

    default:
      return state;
  }
}
