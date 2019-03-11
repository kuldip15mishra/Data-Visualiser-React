import * as types from './seriesGridViewActions';
import {
  combineReducers
} from 'redux';
import {
  InitialState
} from '../store/initialState';


export default (state = {}, action) => {
  switch (action.type) {

    case types.LOAD_CURRENT_INFO_SERIES:
     const newState =action.series
      return {
        ...newState}
      
      ;

    
      
    default:
      return state;
  }
}

