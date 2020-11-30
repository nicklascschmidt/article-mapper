import * as A from '../redux/actions/index';
import sampleTitleData from './sampleTitlesData';
import sampleLocationData from './sampleLocationsData';

export const populateSampleTitleData = (seconds = 3) => {
  return async (dispatch, getState) => {
    const timeout = seconds * 1000;
    setTimeout(
      () => dispatch(A.overwriteTitles(sampleTitleData)),
      timeout,
    );  
  }
};

export const populateSampleLocationData = (seconds = 3) => {
  return async (dispatch, getState) => {
    const timeout = seconds * 1000;
    setTimeout(
      () => dispatch(A.overwriteLocationsField('data', sampleLocationData)),
      timeout,
    );  
  }
};