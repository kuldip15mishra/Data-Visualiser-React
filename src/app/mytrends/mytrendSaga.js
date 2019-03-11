import {
    put,
    call,
    select
} from 'redux-saga/effects';
import * as Helper from './mytrendHelper';
import * as types from './mytrendActions';
import * as addSeriesActions from '../addSeries/addSeriesActions';
import * as trenderActions from '../trenderArea/action';
import * as loaderAction from '../actions/index';
// Responsible for Fetching added series, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.


export function* fetchAllSaveTrendsSaga({
    payload
}) {
    try {
        yield [put({
            type: loaderAction.LOADING,
            payload :true
        })]
        
        const SaveTrends = yield call(GetTrendsMeta);
        if(SaveTrends)
        {
            yield [
          
            put({
                type: types.FETCH_SAVED_TRENDS_SUCCESS,
                SaveTrends
            })
        ];
      }
      
      else{
            yield put({
                type: types.FETCH_SAVED_TRENDS_FAILURE,
                error
            });
        }
        yield [put({
            type: loaderAction.LOADING,
            payload :false
        })]
    } catch (error) {
        yield put({
            type: types.FETCH_SAVED_TRENDS_FAILURE,
            error
        });

        yield [put({
            type: loaderAction.LOADING,
            payload :false
        })]
    }
}


// Responsible for Fetching added series, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* fetchSelectedSaveTrendSaga({
    payload
}) {
    try {
        const SelectedSaveTrends = yield call(GetSelectedTrendMeta, payload);
        const prevStore = yield select();
        let timeperiod ={
            startTime :SelectedSaveTrends[0].startTime,
            endTime :SelectedSaveTrends[0].endTime
        }

        yield [

            put({
                type: addSeriesActions.SET_TREND_NAME,
                payload :SelectedSaveTrends[0].trendName
            }),
            put({
                type: types.SET_CURRENT_TREND_ID,
                id :SelectedSaveTrends[0].trendName
            }),  
            put({
                type: addSeriesActions.ADD_MULTIPLE_SERIES_TO_STORE,
                SelectedSaveTrends
            }),
            put({
                type: types.FETCH_SELECTED_SAVED_TRENDS_SUCCESS,
                SelectedSaveTrends
            }),
            put({
                type: trenderActions.ADD_FILTERS_TO_STORE,
                filter :SelectedSaveTrends[0].filter
            })
          
        ];
    } catch (error) {
        yield put({
            type: types.FETCH_SELECTED_SAVED_TRENDS_FAILURE,
            error
        });
    }
}


// Responsible for Fetching added series, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* deleteSelectedSaveTrendSaga({
    payload
}) {
    try {
 
        const DeletedSaveTrends = yield call(DeleteSelectedSaveTrend, payload);
        
        yield [
            put({
                type: types.RESET_STORE
            }),
            put({
                type: types.DELETE_SELECTED_SAVED_TRENDS_SUCCESS,
                DeletedSaveTrends
            }),
            put({
                type: types.DELETE_SELECTED_SAVED_TRENDS_LOCAL_STORE,
                payload
            })
        ];
    } catch (error) {
        yield put({
            type: types.DELETE_SELECTED_SAVED_TRENDS_FAILURE,
            error
        });
    }
}
export function* fetchTrendForIdSaga({
    payload
}) {
    try {
        const SelectedSaveTrends = yield call(GetSelectedTrendMeta, payload);

        yield [
            put({
                type: addSeriesActions.ADD_MULTIPLE_SERIES_TO_STORE,
                SelectedSaveTrends
            }),
            put({
                type: types.FETCH_SELECTED_SAVED_TRENDS_SUCCESS,
                SelectedSaveTrends
            })
        ];
    } catch (error) {
        yield put({
            type: types.FETCH_SELECTED_SAVED_TRENDS_FAILURE,
            error
        });
    }
}

const GetTrendsMeta = () => {
    return Helper.getAllTrends();

}

const GetSelectedTrendMeta = (payload) => {
    return Helper.getSelectedTrend(payload);

}

const DeleteSelectedSaveTrend = (payload) => {
    return Helper.deleteSelectedSaveTrend(payload);

}
