import * as types from './addSeriesActions';
import {
  InitialState
} from '../store/initialState';

import CommonUtils from '../commonutils/CommonUtils';


export default (state = InitialState, action) => {

  switch (action.type) {

    case types.ADD_SERIES_TO_DB:

      return {
        ...state,
        fetching: true,
        istrendsave: false,
        isReset: false
      }

    case types.ADD_SERIES_TO_DB_SUCCESS:

      return {
        ...state,
        istrendsave: true,
        fetching: false,
        isReset: false
      }
    case types.ADD_SERIES_TO_DB_FAILURE:

      return {
        ...state,
        fetching: false,
        isReset: false,
        error: action.error
      }


    case types.ADD_SERIES_TO_STORE:
     

      state.action = "ADD_SERIES";
      return {
        ...state,
        ChartConfig: [...state.ChartConfig, action.payload],
        fetching: true,
        error: null,
        isReset: false,
        isExpressionRemoved:false
      };
    case types.ADD_SERIES_TO_STORE_SUCCESS:
      updateSeries(state, action.series);
      state.isShowAddSeriesForm = false;

      return {
        ...state,
        ChartConfig: UpateCurrentEditingSeries(state, action.series),
        fetching: false,
        error: null,
        isReset: false
      };
    case types.DELETE_SERIES_FROM_STORE:
      const newState = Object.assign({}, state);
      const indexOfSeriesToDelete = action.payload
      DeletedSeries(state, indexOfSeriesToDelete);
      newState.ChartConfig.splice(indexOfSeriesToDelete, 1);

      return{
        ...newState,
        isExpressionRemoved :action.isexpressiondeleted ?action.isexpressiondeleted :false
      } ;
    case types.EMPTY_BUCKET_STORE:
      EmptyDeleteBucket(state);
      return {
        ...state,
        isReset: false
      }
    case types.EMPTY_ADD_BUCKET_STORE:
      EmptyAddBucket(state);
      return {
        ...state,
        isReset: false
      }

    case types.ADD_TAGINFO_TO_CLIPBOARD:
      ADD_TAGINFO_TO_CLIPBOARD(state, action.payload);

      return {
        ...state,
        fetching: true,
        isReset: false
      };
    case types.CURRENT_EDITING_SERIES_FROM_STORE:

      EditingSeries(state, action.payload);

      return {
        ...state,
        isReset: false
      };
    case types.IS_SHOW_ADD_SERIES_FORM:
      state.isShowAddSeriesForm = true;

      return {
        ...state,
        isReset: false
      };

    case types.ADD_MULTIPLE_SERIES_TO_STORE:
      removeOldSeries(state);
      return {
        ...state,
        fetching: true,
        error: null,
        isReset: false
      };
    case types.ADD_MULTIPLE_SERIES_TO_STORE_SUCCESS:
      updateSeries(state, action.series);

      return {
        ...state,
        ChartConfig: UpdateDataInMeta(action),
        fetching: false,
        error: null,
        isReset: false
      };

    case types.RESET_STORE:

      const resetStore = Object.assign({}, InitialState);
      resetStore.trendName = "";
      
      
      let _periodInMillisecond =CommonUtils.calculateTimePeriodInMilliSecond(CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), -60)),
      CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0)));
      return {
        ...resetStore,
        isReset: true,
        fetching: false,
        periodInMillisecond: _periodInMillisecond ,
        startTime: CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), -60)),
        endTime: CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0)),
        caption : CommonUtils.CreateCaptionForNavigator(_periodInMillisecond),
        error: null
      };

    case types.SET_TREND_NAME:
      state.trendName = action.payload
      return {
        ...state,
        isReset: false
      }

    case types.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE:
      action.seriesListData = [...state.ChartConfig]
      return {
        ...state,
        fetching: true,
        error: null,
        isReset: false
      };
    case types.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_SUCCESS:
      UpdateDataForCustomDateRange(state, action.updatedseries);
      return {
        ...state,
        ChartConfig: updateSeriesDataWithCustomRangeData(state, action.updatedseries),
        fetching: false,
        error: null,
        isReset: false
      };

    case types.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_RESET:
      ResetDataForCustomDateRange(state);
      return {
        ...state,
        fetching: false,
        error: null,
        isReset: false
      };
    case types.UPDATE_SERIES:

      return {
        ...state,
        ChartConfig: UpateCurrentEditingSeries(state, action.payload),
        currentUpdatedSeries: action.payload,
        fetching: true,
        error: null,
        isReset: false
      };
    case types.UPDATE_SERIES_SUCCESS:

      return {
        ...state,
        isReset: false,
        fetching: false,
        error: null
      };



    case types.UPDATE_SERIES_TO_DB:

      return {
        ...state,
        fetching: true,
        istrendupdate: false,
        isReset: false,
        isupdate : false
      }

    case types.UPDATE_SERIES_TO_DB_SUCCESS:

      return {
        ...state,
        ChartConfig: UpateCurrentEditingSeries(state, action.series), 
        istrendupdate: true,
        fetching: false,
        isReset: false,
        isupdate : true
      }


    case types.UPDATE_SERIES_TO_DB_FAILURE:

      return {
        ...state,
        istrendupdate: false,
        fetching: false,
        isReset: false,
        isupdate : false
      }

    case types.HIDE_SERIES_INDEX:
      let updatedState = updateSeriesVisibility(state, action.payload);
      return {
        ...updatedState,
        isReset: false,
        fetching: false,
        error: null,
        hideSeriesIndex: action.payload
      };

    case types.CLEAR_ERROR:

      return {
        ...state,
        isReset: false,
        fetching: false,
        error: null
      };
    case types.SET_TIMEPERIOD:
      updateTimePeriod(state, action.payload)
      return {
        ...state,
        isReset: false,
        fetching: false,
        error: null
      };
    case types.SET_TIMEPERIOD_FROM_SAVE_TREND_META:

      const stateUPdateWithTimePeriod = updateTimePeriodFromSaveMetaTrend(state, action.timeperiod)

      return {
        ...stateUPdateWithTimePeriod,
        isReset: false,
        fetching: false,
        error: null
      };

    case types.RESET_ACTION:
      state.action = "";
      return {
        ...state,
        isReset: false,
        fetching: false,
        error: null
      };


    case types.Fetch_CurrentValues_TO_DB:
    
      return {
        ...state,
        fetching: true,
        isReset: false
      }

    case types.Fetch_CurrentValues_TO_DB_SUCCESS:
          return {
        ...state,
        fetching: false,
        isReset: false,
        currentTagNameValues: [...action.currentTagValuesList]
      }

      case types.Fetch_CurrentValues_SINGLE_TO_DB:
    
      return {
        ...state,
        fetching: true,
        isReset: false,
       
      }

    case types.Fetch_CurrentValues_SINGLE_TO_DB_SUCCESS:
     
      return {
        ...state,
        fetching: false,
        isReset: false,
        currentTagNameValues :fetchCurrentSingleValuesDB(state, action.currentTagValuesList)
      }
    case types.Fetch_CurrentValues_TO_DB_FAILURE:

      return {
        ...state,
        fetching: false,
        isReset: false
      }
    case types.FETCH_TAGSUMMARY:
      return {
        ...state,
        fetching: false,
        isReset: false,
        cuurentTagNameValues: action.series
      }


    case types.FETCH_TAGSUMMARY_SUCCESS:
      var listoftagsSummary =action.tagList && action.tagList.length >0 ?action.tagList :[];
      return {
        ...state,
        fetching: false,
        isReset: false,
        TagSummary: [...listoftagsSummary]
      }
      case types.FETCH_TAGSUMMARY_SINGLE:
      return {
        ...state,
        fetching: false,
        isReset: false,
        cuurentTagNameValues: action.series
      }


    case types.FETCH_TAGSUMMARY_SINGLE_SUCCESS:
      var listoftagsSummary =action.tagList && action.tagList.length >0 ?action.tagList :[];
      return {
        ...state,
        fetching: false,
        isReset: false,
        TagSummary: updateTagSummary(state,listoftagsSummary)
      }

      case types.FETCH_TAG_META:
    
      return {
        ...state,
        fetching: true,
        isReset: false
      }

    case types.FETCH_TAG_META_SUCCESS:
      
      return {
        ...state,
        fetching: false,
        isReset: false,
        Routing: [...action.meta]
      }
    default:
      return state;

  }
}


const updateTagSummary = (state,listoftagsSummary) => {
  var _cloneTagSummary = Object.assign([],state.TagSummary);
  if(_cloneTagSummary && _cloneTagSummary.length >0){
    _cloneTagSummary =[..._cloneTagSummary,...listoftagsSummary]
  }else{
    _cloneTagSummary=[...listoftagsSummary]
  }

  return _cloneTagSummary;
}
const UpdateDataInMeta = (action) => {

  if (action && action.SelectedSaveTrends && action.SelectedSaveTrends.length > 0 && action.SelectedSaveTrends[0].config) {

    if (action.SelectedSaveTrends[0].config.length > 0) {
      action.SelectedSaveTrends[0].config.map(meta => {
        let currentSeriesData = action.series.filter(record => {
          return record.id === meta.id
        })

        if (currentSeriesData && currentSeriesData.length > 0)
          meta.data = currentSeriesData[0].data;
      })
    }
  }

  return [...action.SelectedSaveTrends[0].config]
}

const updateTimePeriod = (state, payload) => {
  if (payload) {
    state.startTime = payload.startTime
    state.endTime = payload.endTime;
    state.timePeriod = payload.timePeriod;
    state.caption = payload.caption;
    state.periodInMillisecond = payload.periodInMillisecond;
  }
}
const updateTimePeriodFromSaveMetaTrend = (state, payload) => {

  let newupdatedState = {
    ...state
  }
  if (payload) {
    newupdatedState.startTime = payload.startTime
    newupdatedState.endTime = payload.endTime;
    newupdatedState.timePeriod = payload.timePeriod;
    newupdatedState.periodInMillisecond = CommonUtils.calculateTimePeriodInMilliSecond(payload.startTime, payload.endTime)
    newupdatedState.caption = CommonUtils.CreateCaptionForNavigator(newupdatedState.periodInMillisecond);

  }
  return newupdatedState;
}

const updateSeriesVisibility = (state, index) => {
  let updatedState = {
    ...state
  }
  if (state && index > -1) {
    let isvisible = updatedState.ChartConfig[index].visible;
    if (isvisible) {
      updatedState.ChartConfig[index].visible = false;
    } else {
      updatedState.ChartConfig[index].visible = true;
    }
  }
  return updatedState;
}
const UpateCurrentEditingSeries = (state, payload) => {

  const updatedItems = state.ChartConfig.map(item => {
    if (item.id === payload.id) {
      if(  payload && payload.lineSymbol){
        item.marker.symbol = payload.lineSymbol;
      }
      return {
        ...item,
        ...payload
      }
    }

    return item
  })

  return updatedItems;
}

const removeOldSeries = (state) => {
  state.ChartConfig = [];
}

const EmptyDeleteBucket = (state) => {
  state.config.deletedseries = [];
  state.config.currentIndex = 0;

}
const EmptyAddBucket = (state) => {
  state.config.series = [];

}


const UpdateDataForCustomDateRange = (state, data) => {
  state.updatedseriesdata = [];
  state.updatedseriesdata = [...data];
}

const ResetDataForCustomDateRange = (state, data) => {
  state.updatedseriesdata = [];

}
const updateSeriesDataWithCustomRangeData = (state, data) => {
  const updatedItems = state.ChartConfig.map((item, idx) => {

    item.data = data[idx];
    return item;
  });



  return updatedItems;
}

const fetchCurrentSingleValuesDB = (state, tagList) => {
  state.tagList = [];
  var newTagList= [...state.currentTagNameValues,...tagList];
  return newTagList;
}
const fetchCurrentValuesSUCCESS = (state, currentTagValuesList) => {
  state.currentTagNameValues = [];
  state.currentTagNameValues.push(currentTagValuesList);
}
const updateSeries = (state, series) => {
  state.config.series = [];
  state.config.series.push(series);
}

const DeletedSeries = (state, index) => {

  state.config.deletedseries = [];
  let series = state.ChartConfig[index];
  state.config.deletedseries.push(series);
  state.config.currentIndex = index;
}
const ADD_TAGINFO_TO_CLIPBOARD = (state, series) => {
  state.ClipBoardData = [];
  state.ClipBoardData.push(series);
}

const EditingSeries = (state, series) => {
  const index = state.ChartConfig.map(item => item.name).indexOf(series.name);
  state.CurrentEditingSeriesIndex = index;

}