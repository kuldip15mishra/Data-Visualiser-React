import * as types from './mytrendActions';
import {
  combineReducers
} from 'redux';
import * as uniqid from 'uniqid';
import CommonUtils from '../commonutils/CommonUtils'; 
import {apiURL} from '../constants/Constants'

const InitialState = {};
export default (state = InitialState, action) => {
  switch (action.type) {
    case types.FETCH_SAVED_TRENDS:

      return {
        ...state,
        fetching: true,
        SaveTrends: [],
        error: null
      };
    case types.FETCH_SAVED_TRENDS_SUCCESS:

      return {
        ...state,
        SaveTrends: [...action.SaveTrends],
        fetching: false,
        error: null
      };

    case types.FETCH_SELECTED_SAVED_TRENDS:
      state.isTrendLoadedFromSaveTrends = true;
      return {
        ...state,
        fetching: true,
        SelectedSaveTrends: [],
        error: null
      };
    case types.FETCH_SELECTED_SAVED_TRENDS_SUCCESS:

      return {
        ...state,
        SelectedTrendID: action.SelectedSaveTrends[0]._id,
        SelectedSaveTrends: [...action.SelectedSaveTrends],
        fetching: false,
        error: null
      };


    case types.FETCH_TRENDS_FOR_ID:

      return {
        ...state,
        fetching: true,
        Trends: [],
        error: null
      };
    case types.FETCH_TRENDS_FOR_ID_SUCCESS:

      return {
        ...state,
        Trends: [...action.trends],
        fetching: false,
        error: null
      };

    case types.DELETE_SELECTED_SAVED_TRENDS:

      return {
        ...state,
        isdelete: false,
        error: null
      };


    case types.DELETE_SELECTED_SAVED_TRENDS_SUCCESS:
      return {
        ...state,
        isdelete: true
      };

    case types.DELETE_SELECTED_SAVED_TRENDS_LOCAL_STORE:
      const indexOfTrendToDelete = action.payload._id
      DeleteSavedTrendLocalStore(state, indexOfTrendToDelete);
      return {
        ...state,
        isdelete: false,
        error: null
      };


    case types.RESET_STORE:

      const resetStore = Object.assign({}, state);
      return {
        ...resetStore,
        trendShareID: "",
        trendShareLink: "",
        SelectedTrendID: "",
        Trends: [],
        fetching: false,
        error: null,
        SelectedSaveTrends: [],
        isTrendLoadedFromSaveTrends: false
      };

    case types.SET_CURRENT_TREND_ID:

      state.trendShareID = action.id;
      state.SelectedTrendID = action.id;
      return {
        ...state
      }
    case types.SHARE_TREND:
     
        state.trendShareID = updateTrendId(state);
        state.trendShareLink = CommonUtils.getServerURL() + apiURL.SHARE_URL + state.trendShareID;
        state.isTrendSaved=true;
      
      return {
        ...state
      }
    default:
      return state;
  }
}


const updateTrendId = (state, id) => {

  if (state.SelectedTrendID) {
    return state.SelectedTrendID;
  } else {
    let id = uniqid();
    return id;
  }
}

const DeleteSavedTrendLocalStore = (state, indexOfTrendToDelete) => {
  let savetrendarray = state.SaveTrends
  savetrendarray.splice(savetrendarray.findIndex(matchesEl), 1);

  function matchesEl(el) {
    return el.id == indexOfTrendToDelete;
  }
}