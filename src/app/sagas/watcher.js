import { takeLatest,all,takeEvery,take } from 'redux-saga/effects';
import { fetchMetaByTagNameSaga,fetchCurrentValuesSingleSaga,fetchTagsSummaryForSingleSaga,fetchTagsSummaryForCustomDateRangeSaga,fetchSeriesDataSaga,UpdateTrendMetaSaga ,saveTrendMetaSaga,fetchMultiSeriesDataSaga,fetchSeriesDataForCustomDateSaga,fetchCurrentValuesSaga} from '../addSeries/addSeriesSaga';
import {fetchAllSaveTrendsSaga, fetchSelectedSaveTrendSaga, deleteSelectedSaveTrendSaga} from '../mytrends/mytrendSaga';
import {fetchTagListSaga} from '../tagBrowser/tagBrowserSaga';
import * as addSeriesActions from '../addSeries/addSeriesActions';
import * as mytrendActions from '../mytrends/mytrendActions';
import * as tagBrowserActions from '../tagBrowser/TagBrowserActions';


// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchSeriesData() {
  yield takeEvery(addSeriesActions.ADD_SERIES_TO_STORE, fetchSeriesDataSaga);
}


// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchTrendsMeta() {
  yield takeLatest(mytrendActions.FETCH_SAVED_TRENDS, fetchAllSaveTrendsSaga);
}

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchSelectedTrendMeta() {
  yield takeLatest(mytrendActions.FETCH_SELECTED_SAVED_TRENDS, fetchSelectedSaveTrendSaga);
}

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchSaveTrendsMeta() {
  yield takeLatest(addSeriesActions.ADD_SERIES_TO_DB, saveTrendMetaSaga);
}

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchMultiSeriesDataFetch() {
  yield takeLatest(addSeriesActions.ADD_MULTIPLE_SERIES_TO_STORE, fetchMultiSeriesDataSaga);
}


// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchMultiSeriesDataFetchForCustomDate() {
  yield takeLatest(addSeriesActions.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE, fetchSeriesDataForCustomDateSaga);
}

export  function* watchDeleteSelectedTrendMeta() {
  yield takeLatest(mytrendActions.DELETE_SELECTED_SAVED_TRENDS, deleteSelectedSaveTrendSaga);
}


//Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchSeriesMetaUpdatedDb() {
  yield takeLatest(addSeriesActions.UPDATE_SERIES_TO_DB, UpdateTrendMetaSaga);
}

//Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchFetchCurrentValuesDB() {
  yield takeLatest(addSeriesActions.Fetch_CurrentValues_TO_DB, fetchCurrentValuesSaga);
}

//Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchFetchCurrentValuesSingleDB() {
  yield takeLatest(addSeriesActions.Fetch_CurrentValues_SINGLE_TO_DB, fetchCurrentValuesSingleSaga);
}

//Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export  function* watchfetchTagsSummaryForCustomDateRangeSaga() {
  yield takeLatest(addSeriesActions.FETCH_TAGSUMMARY, fetchTagsSummaryForCustomDateRangeSaga);
}fetchTagsSummaryForCustomDateRangeSaga

export  function* watchfetchTagsSummaryForSingleSaga() {
  yield takeLatest(addSeriesActions.FETCH_TAGSUMMARY_SINGLE, fetchTagsSummaryForSingleSaga);
}


export  function* watchfetchMetaByTagNameSaga() {
  yield takeLatest(addSeriesActions.FETCH_TAG_META, fetchMetaByTagNameSaga);
}

export function* watchfetchTagList(){
  yield takeLatest(tagBrowserActions.GET_TAG_LIST, fetchTagListSaga);
}