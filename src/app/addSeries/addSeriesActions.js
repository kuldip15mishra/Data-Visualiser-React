export const ADD_SERIES_TO_STORE = 'ADD_SERIES_TO_STORE';
export const ADD_SERIES_TO_STORE_SUCCESS = 'ADD_SERIES_TO_STORE_SUCCESS';
export const ADD_SERIES_TO_STORE_FAILURE = 'ADD_SERIES_TO_STORE_FAILURE';
export const DELETE_SERIES_FROM_STORE = 'DELETE_SERIES_FROM_STORE';
export const EMPTY_BUCKET_STORE = 'EMPTY_BUCKET_STORE';
export const EMPTY_ADD_BUCKET_STORE = 'EMPTY_ADD_BUCKET_STORE';

export const ADD_SERIES_TO_DB = 'ADD_SERIES_TO_DB';
export const ADD_SERIES_TO_DB_SUCCESS = 'ADD_SERIES_TO_DB_SUCCESS';
export const ADD_SERIES_TO_DB_FAILURE = 'ADD_SERIES_TO_DB_FAILURE';

export const ADD_TAGINFO_TO_CLIPBOARD = 'ADD_TAGINFO_TO_CLIPBOARD';

export const IS_SHOW_ADD_SERIES_FORM = 'IS_SHOW_ADD_SERIES_FORM';
export const isShowAddSeriesForm = index => ({ type: IS_SHOW_ADD_SERIES_FORM, payload: isShow });

export const addSeries = series => ({ type: ADD_SERIES_TO_STORE, payload: series });
export const addSeriesSucess = series => ({ type: ADD_SERIES_TO_STORE_SUCCESS, payload: series });
export const deleteSeries = (index,isexpressiondeleted) =>
 ({
      type: DELETE_SERIES_FROM_STORE, 
      payload: index ,
      isexpressiondeleted:isexpressiondeleted

});
export const emptyDeleteBucket = index => ({ type: EMPTY_BUCKET_STORE, payload: index });
export const emptyAddBucket = index => ({ type: EMPTY_ADD_BUCKET_STORE, payload: index });

export const addSeriesToDb = series => ({ type: ADD_SERIES_TO_DB, payload: series });
export const addSeriesToDbSucess = series => ({ type: ADD_SERIES_TO_DB_SUCCESS, payload: series });

export const addTagInfoToClipBoard = series => ({ type: ADD_TAGINFO_TO_CLIPBOARD, payload: series });

export const CURRENT_EDITING_SERIES_FROM_STORE = 'CURRENT_EDITING_SERIES_FROM_STORE';


export const editCurrentSeries = index => ({ type: CURRENT_EDITING_SERIES_FROM_STORE, payload: index });


export const ADD_MULTIPLE_SERIES_TO_STORE = 'ADD_MULTIPLE_SERIES_TO_STORE';
export const ADD_MULTIPLE_SERIES_TO_STORE_SUCCESS = 'ADD_MULTIPLE_SERIES_TO_STORE_SUCCESS';
export const ADD_MULTIPLE_SERIES_TO_STORE_FAILURE = 'ADD_MULTIPLE_SERIES_TO_STORE_FAILURE';

export const addMultipleSeries = series => ({ type: ADD_MULTIPLE_SERIES_TO_STORE, payload: series });
export const addMultipleSeriesSucess = series => ({ type: ADD_MULTIPLE_SERIES_TO_STORE_SUCCESS, payload: series });





export const RESET_STORE = 'RESET_STORE';
export const resetStore = () => ({ type: RESET_STORE });

export const SET_TREND_NAME = 'SET_TREND_NAME';
export const setTrendName = (trendName) => ({ type: SET_TREND_NAME,payload: trendName });

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const clearerror = () => ({ type: CLEAR_ERROR });

export const FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE = 'FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE';
export const FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_SUCCESS = 'FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_SUCCESS';
export const FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_FAILURE = 'FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_FAILURE';
export const FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_RESET = 'FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_RESET';

export const fetchSeriesDataCustomDateRange = (t1,t2) => ({ type: FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE, payload: {'t1':t1,'t2':t2} });
export const fetchSeriesDataCustomDateRangeSucess = series => ({ type: FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_SUCCESS, payload: series });

export const fetchSeriesDataCustomDateRangeReset = () => ({ type: FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_RESET });



export const UPDATE_SERIES = 'UPDATE_SERIES';
export const UPDATE_SERIES_SUCCESS = 'UPDATE_SERIES_SUCCESS';
export const UPDATE_SERIES_FAILURE = 'UPDATE_SERIES_FAILURE';

export const updateSeries = (series,index) => ({ type: UPDATE_SERIES, payload: series });
export const updateSeriesSucess = series => ({ type: UPDATE_SERIES_SUCCESS, payload: series });


export const HIDE_SERIES_INDEX = 'HIDE_SERIES_INDEX';
export const hideSeriesIndex = (index) => ({ type: HIDE_SERIES_INDEX,payload: index });

export const SET_TIMEPERIOD = 'SET_TIMEPERIOD';
export const setTimePeriod = (timeperiod) => ({ type: SET_TIMEPERIOD,payload: timeperiod });


export const SET_TIMEPERIOD_FROM_SAVE_TREND_META = 'SET_TIMEPERIOD_FROM_SAVE_TREND_META';
export const setTimePeriodFromSavedMeta = (timeperiod) => ({ type: SET_TIMEPERIOD_FROM_SAVE_TREND_META,payload: timeperiod });


export const UPDATE_SERIES_TO_DB = 'UPDATE_SERIES_TO_DB';
export const UPDATE_SERIES_TO_DB_SUCCESS = 'UPDATE_SERIES_TO_DB_SUCCESS';
export const UPDATE_SERIES_TO_DB_FAILURE = 'UPDATE_SERIES_TO_DB_FAILURE';

export const updateSeriesToDb = () => ({ type: UPDATE_SERIES_TO_DB, payload: null });
export const updateSeriesToDbSuccess = series => ({ type: UPDATE_SERIES_TO_DB_SUCCESS, payload: series });
export const updateSeriesToDbFailure = series => ({ type: UPDATE_SERIES_TO_DB_FAILURE, payload: series });



export const RESET_ACTION = 'RESET_ACTION';
export const resetAction = () => ({ type: RESET_ACTION });


export const Fetch_CurrentValues_TO_DB = 'Fetch_CurrentValues_TO_DB'; 
export const Fetch_CurrentValues_TO_DB_SUCCESS = 'Fetch_CurrentValues_TO_DB_SUCCESS';
export const Fetch_CurrentValues_TO_DB_FAILURE = 'Fetch_CurrentValues_TO_DB_FAILURE';


export const fetchCurrentValuesDB = (tagList) => ({ type: Fetch_CurrentValues_TO_DB, payload: {'tagList':tagList} });
export const fetchCurrentValuesSUCCESS = currentTagNameValues => ({ type: Fetch_CurrentValues_TO_DB_SUCCESS, payload: currentTagNameValues });
export const fetchCurrentValuesFAILURE = () => ({ type: Fetch_CurrentValues_TO_DB_FAILURE });

export const Fetch_CurrentValues_SINGLE_TO_DB = 'Fetch_CurrentValues_SINGLE_TO_DB'; 
export const Fetch_CurrentValues_SINGLE_TO_DB_SUCCESS = 'Fetch_CurrentValues_SINGLE_TO_DB_SUCCESS';
export const Fetch_CurrentValues_SINGLE_TO_DB_FAILURE = 'Fetch_CurrentValues_SINGLE_TO_DB_FAILURE';


export const fetchCurrentValuesDBSingle = (tagList) => ({ type: Fetch_CurrentValues_SINGLE_TO_DB, payload: {'tagList':tagList} });
export const fetchCurrentValuesSingleSUCCESS = currentTagNameValues => ({ type: Fetch_CurrentValues_SINGLE_TO_DB_SUCCESS, payload: currentTagNameValues });
export const fetchCurrentValuesSingleFAILURE = () => ({ type: Fetch_CurrentValues_SINGLE_TO_DB_FAILURE });


export const FETCH_TAGSUMMARY = 'FETCH_TAGSUMMARY'; 
export const FETCH_TAGSUMMARY_SUCCESS = 'FETCH_TAGSUMMARY_SUCCESS';
export const FETCH_TAGSUMMARY_FAILURE = 'FETCH_TAGSUMMARY_FAILURE';


export const fetchTagSummary = (tagList) => ({ type: FETCH_TAGSUMMARY, payload: {'tagList':tagList} });
export const fetchTagSummarysuccess = currentTagNameValues => ({ type: FETCH_TAGSUMMARY_SUCCESS, payload: currentTagNameValues });
export const fetchTagSummaryfailure = () => ({ type: FETCH_TAGSUMMARY_FAILURE });


export const FETCH_TAGSUMMARY_SINGLE = 'FETCH_TAGSUMMARY_SINGLE'; 
export const FETCH_TAGSUMMARY_SINGLE_SUCCESS = 'FETCH_TAGSUMMARY_SINGLE_SUCCESS';
export const FETCH_TAGSUMMARY_SINGLE_FAILURE = 'FETCH_TAGSUMMARY_SINGLE_FAILURE';

export const fetchTagSummarysingle = (tagList) => ({ type: FETCH_TAGSUMMARY_SINGLE, payload: {'tagList':tagList} });
export const fetchTagSummarysinglesuccess = currentTagNameValues => ({ type: FETCH_TAGSUMMARY_SINGLE_SUCCESS, payload: currentTagNameValues });
export const fetchTagSummarysinglefailure = () => ({ type: FETCH_TAGSUMMARY_SINGLE_FAILURE });



export const FETCH_TAG_META = 'FETCH_TAG_META';
export const FETCH_TAG_META_SUCCESS = 'FETCH_TAG_META_SUCCESS';
export const FETCH_TAG_META_FAILURE = 'FETCH_TAG_META_FAILURE';

export const fetchTagMeta = (tagName,tagPath) => ({ type: FETCH_TAG_META, payload: tagName,tagPath:tagPath });
export const fetchTagMetaSuccess = (meta) => ({ type: FETCH_TAG_META_SUCCESS, payload: meta });
export const fetchTagMetaFailure = () => ({ type: FETCH_TAG_META_FAILURE });
