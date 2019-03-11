export const FETCH_SAVED_TRENDS = 'FETCH_SAVED_TRENDS';
export const FETCH_SAVED_TRENDS_SUCCESS = 'FETCH_SAVED_TRENDS_SUCCESS';
export const FETCH_SAVED_TRENDS_FAILURE = 'FETCH_SAVED_TRENDS_FAILURE';


export const FETCH_SELECTED_SAVED_TRENDS = 'FETCH_SELECTED_SAVED_TRENDS';
export const FETCH_SELECTED_SAVED_TRENDS_SUCCESS = 'FETCH_SELECTED_SAVED_TRENDS_SUCCESS';
export const FETCH_SELECTED_SAVED_TRENDS_FAILURE = 'FETCH_SELECTED_SAVED_TRENDS_FAILURE';


export const GetAllSavedTrends = trends => ({ type: FETCH_SAVED_TRENDS, SaveTrends: trends });
export const GetAllSavedTrendsSuccessfully = trends => ({ type: FETCH_SAVED_TRENDS_SUCCESS, SaveTrends: trends });


export const GetSelectedSavedTrend = (idx,trends) => ({ type: FETCH_SELECTED_SAVED_TRENDS, payload: {_id : idx.id} });
export const GetSelectedSavedTrendSuccessfully = trends => ({ type: FETCH_SELECTED_SAVED_TRENDS_SUCCESS, SelectedSaveTrends: trends });

export const DELETE_SELECTED_SAVED_TRENDS = 'DELETE_SELECTED_SAVED_TRENDS';
export const DELETE_SELECTED_SAVED_TRENDS_SUCCESS = 'DELETE_SELECTED_SAVED_TRENDS_SUCCESS';
export const DELETE_SELECTED_SAVED_TRENDS_FAILURE = 'DELETE_SELECTED_SAVED_TRENDS_FAILURE';

export const DELETE_SELECTED_SAVED_TRENDS_LOCAL_STORE = 'DELETE_SELECTED_SAVED_TRENDS_LOCAL_STORE';

export const OnDeleteSavedTrend = (idx) => ({ type: DELETE_SELECTED_SAVED_TRENDS, payload: {_id : idx.id} });
export const OnDeleteSavedTrendSuccess = (idx) => ({ type: DELETE_SELECTED_SAVED_TRENDS_SUCCESS, payload: {_id : idx.id} });
export const DeleteSavedTrendLocalStore = (idx) => ({ type: DELETE_SELECTED_SAVED_TRENDS_LOCAL_STORE, payload: {_id : idx.id} });

export const RESET_STORE = 'RESET_STORE';
export const resetMyTrendStore = () => ({ type: RESET_STORE });



export const SHARE_TREND = 'SHARE_TREND';
export const shareTrend = (name) => ({ type: SHARE_TREND,payload:name });

export const SET_CURRENT_TREND_ID = 'SET_CURRENT_TREND_ID';
export const setCurrentTrendID = () => ({ type: SET_CURRENT_TREND_ID,payload :id });
