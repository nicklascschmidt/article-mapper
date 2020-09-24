import _ from 'lodash';
import axios from 'axios';
import * as A from './actions/index';

const prepareLocationRespForReducer = (userSearchTerm, locationResp, key) => {
  const locationArr = _.get(locationResp, 'data.candidates', {});
  const _id = key.toString();

  const newLocation = (locationArr.length === 1)
    ? {
      status: 'determined',
      ...locationArr[0],
    } : {
      status: 'undetermined',
      possibleLocations: locationArr,
    };

  return {
    _id,
    userSearchTerm,
    ...newLocation,
  };
}

/**
 * @summary - Get location data from GPlaces API for all locations
 *              - pass generalLocation in with each search term, but keep redux titles clean (i.e. w/o generalLocation)
 *          - Map through locations and add all to a locationData obj of objs
 *              - determined: single location spread as an obj
 *              - undetermined: multiple locations in locations.data, rest of fields in obj (status, id, etc.)
 *          - Update redux with the full obj of locations
*/
const getLocationData = async (titles, generalLocation) => {
  const locationDataPromises = getLocationDataPromises(titles, generalLocation);
  const locations = await Promise.all(locationDataPromises).catch(err => console.log(err));
  
  let locationData = {};

  locations.forEach(async (locationResp, idx) => {
    locationData[idx] = prepareLocationRespForReducer(titles[idx], locationResp, idx);
  });

  return locationData;
};

const getLocationDataPromises = (titles, generalLocation) => {
  return titles.map(async (title, idx) => {
    return fetchLocationData(title, generalLocation,
      // { padding: [40, 40] }
    );
  });
};

const fetchLocationData = (searchTerm, generalLocation) => {
  const params = { fields: 'formatted_address,type,photos' };
  return axios.get(`/api/client/find-place-from-text/${searchTerm} ${generalLocation}`, { params });
};


/** Populate location data
 * - search for each title
 *    - add generalLocation from reducer to the search term for regional specificity
 * - fetch data from GPlaces API
 * - fire action to update location data in the reducer
 */

/** Populate One */

export const populateSingleLocationFromTitle = (title, id) => {
  return async (dispatch, getState) => {
    console.log('populateSingleLocationFromTitle title + id', title, id);
    const { titles } = getState();
    
    try {
      const locationResp = await fetchLocationData(title, titles.generalLocation);
      const payloadData = prepareLocationRespForReducer(title, locationResp, id);
      dispatch(A.overwriteLocationByKey(id, payloadData));
    } catch (error) {
      console.log(error);
    }
  }
};

/** Populate All */

export const populateLocationDataFromTitles = () => {
  return async (dispatch, getState) => {
    const { titles } = getState();
    const { titleStrings, generalLocation } = titles;

    let locationData;
    try {
      locationData = await getLocationData(titleStrings, generalLocation);
    } catch (error) {
      console.log(error);
    }
    
    dispatch(A.overwriteLocationsField('data', locationData));
  }
};
