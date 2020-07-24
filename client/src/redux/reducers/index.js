import { combineReducers } from 'redux';
import titles from './titles';
import locations from './locations';

/** add reducers within object */
export default combineReducers({ titles, locations });
