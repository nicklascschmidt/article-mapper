import { combineReducers } from 'redux';
import titles from './titles';
import locations from './locations';
import interactions from './interactions';

/** add reducers within object */
export default combineReducers({ titles, locations, interactions });
