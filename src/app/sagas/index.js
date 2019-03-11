
import { take, put, call, fork, select, all } from 'redux-saga/effects';

import {
  watchSeriesMetaUpdatedDb,
  watchMultiSeriesDataFetchForCustomDate,
  watchSeriesData,
  watchMultiSeriesDataFetch,
  watchTrendsMeta,
  watchSaveTrendsMeta,
  watchSelectedTrendMeta,
  watchDeleteSelectedTrendMeta,
  watchFetchCurrentValuesDB,
  watchfetchTagsSummaryForCustomDateRangeSaga,
  watchfetchTagsSummaryForSingleSaga,
  watchFetchCurrentValuesSingleDB,
  watchfetchMetaByTagNameSaga,
  watchfetchTagList
} from './watcher';


export default function* root() {
  yield fork(watchSeriesData);
  yield fork(watchTrendsMeta);
  yield fork(watchSelectedTrendMeta);
  yield fork(watchSaveTrendsMeta);
  yield fork(watchMultiSeriesDataFetch);
  yield fork(watchMultiSeriesDataFetchForCustomDate);
  yield fork(watchDeleteSelectedTrendMeta);
  yield fork(watchSeriesMetaUpdatedDb);
  yield fork(watchFetchCurrentValuesDB);
  yield fork(watchFetchCurrentValuesSingleDB);
  yield fork(watchfetchTagsSummaryForCustomDateRangeSaga);
  yield fork(watchfetchTagsSummaryForSingleSaga);
  yield fork(watchfetchMetaByTagNameSaga);
  yield fork(watchfetchTagList);
  //yield all([fork(watchSeriesData)])
}
