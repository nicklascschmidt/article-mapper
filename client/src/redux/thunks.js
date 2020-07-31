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
 *          - Map through locations and add all to a locationData obj of objs
 *              - determined: single location spread as an obj
 *              - undetermined: multiple locations in locations.data, rest of fields in obj (status, id, etc.)
 *          - Update redux with the full obj of locations
*/
const getLocationData = async (titles) => {
  const locationDataPromises = getLocationDataPromises(titles);
  const locations = await Promise.all(locationDataPromises).catch(err => console.log(err));
  
  let locationData = {};

  locations.forEach(async (locationResp, idx) => {
    locationData[idx] = prepareLocationRespForReducer(titles[idx], locationResp, idx);
  });

  return locationData;
};

const getLocationDataPromises = (titles) => {
  return titles.map(async (title, idx) => {
    return fetchLocationData(title, { padding: [20, 20] });
  });
};

const fetchLocationData = (searchTerm) => {
  const params = { fields: 'formatted_address,type' };
  return axios.get(`/api/client/find-place-from-text/${searchTerm}`, { params });
};

/** Populate One */

export const populateSingleLocationFromTitle = (title, id) => {
  return async (dispatch, getState) => {
    console.log('populateSingleLocationFromTitle title + id', title, id);
    try {
      const locationResp = await fetchLocationData(title);
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

    let locationData;
    try {
      locationData = await getLocationData(titles.titleStrings);
    } catch (error) {
      console.log(error);
    }
    
    dispatch(A.overwriteLocationsField('data', locationData));
  }
};
