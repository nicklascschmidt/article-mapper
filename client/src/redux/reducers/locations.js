import * as T from '../actionTypes';

// {
//   data: {
//     0: {
//       status: 'undetermined',
//       possibleLocations: [
//         { ...locationApi }
//       ],
//     },
//     1: {
//       status: 'official',
//       ...locationApi,
//     }
//   }
// }

/**
 * TODO: use Google Places API locationbias to narrow undetermined list results down
 * or even just autoselect the closest one
*/
const initialState = {
  locationsList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.UPDATE_LOCATION_BY_INDEX: {
      const { index, location } = action.payload;
      const newLocationList = state.locationsList;
      newLocationList[index] = location;

      return {
        ...state,
        locationsList: newLocationList,
      };
    }

    case T.ADD_NEW_LOCATION: {
      const newLocationList = state.locationsList;
      newLocationList.push(action.payload);

      return {
        ...state,
        locationsList: newLocationList,
      };
    }

    case T.OVERWRITE_LOCATIONS_FIELD: {
      const { field, value } = action.payload;
      console.log('setting', field, 'to', value);
      
      return {
        ...state,
        [field]: value,
      };
    }

    default:
      return state;
  }
}
