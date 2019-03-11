export const SET_JOINTYPE = 'SET_JOINTYPE';
export const setJoinType = isjointype => ({ type: SET_JOINTYPE, payload: isjointype });


export const SET_RENDERER = 'SET_RENDERER';
export const setRenderer = renderer => ({ type: SET_RENDERER, payload: renderer });

export const SET_YAXIS = 'SET_YAXIS';
export const setYAxis = isyAxis => ({ type: SET_YAXIS, payload: isyAxis });


export const SET_TIME_PERIOD = 'SET_TIME_PERIOD';
export const setTimePeriod = timePeriodVal => ({ type: SET_TIME_PERIOD, payload: timePeriodVal });

export const SET_PLOTSPLIT = 'SET_PLOTSPLIT';
export const setPlotSplit = isplotSplit => ({ type: SET_PLOTSPLIT, payload: isplotSplit });


export const SHARE_TREND = 'SHARE_TREND';
export const shareTrend = () => ({ type: SHARE_TREND });

export const SET_POINTLABLE = 'SET_POINTLABLE';
export const setPointLable = isShowDataLable => ({ type: SET_POINTLABLE, payload: isShowDataLable });

export const SET_DATALABLE = 'SET_DATALABLE';
export const setDataLable = isEnabledDataLable => ({ type: SET_DATALABLE, payload: isEnabledDataLable });


export const ADD_FILTERS_TO_STORE = 'ADD_FILTERS_TO_STORE';
export const ADD_FILTERS_TO_STORE_SUCCESS = 'ADD_FILTERS_TO_STORE_SUCCESS';
export const ADD_FILTERS_TO_STORE_FAILURE = 'ADD_FILTERS_TO_STORE_FAILURE';

export const addFilters = filter => ({ type: ADD_FILTERS_TO_STORE, payload: filter });
export const addFiltersSucess = filter => ({ type: ADD_FILTERS_TO_STORE_SUCCESS, payload: filter });


export const RESET_STORE = 'RESET_STORE';
export const resetTrendAreaStore = () => ({ type: RESET_STORE });