import {
  put,
  call,
  select
} from 'redux-saga/effects';
import HttpClient from "../services/apiService"
import * as types from './addSeriesActions';
import * as mytrendAction from '../mytrends/mytrendActions'
import {
  apiURL,
  RetrivalMode,
  Expressionfunction,
  gridRequests
} from "../constants/Constants"
import queryString from 'query-string';
import * as uniqid from 'uniqid';
import CommonUtils from "../commonutils/CommonUtils";
import * as loaderAction from '../actions/index';

export function* saveTrendMetaSaga({
  name
}) {
  try {
    let id = uniqid();
    const payload = yield select();



    if (CheckIsTrendExist(payload.mytrendReducer.SaveTrends, payload.addSeriesReducer.trendName)) {
      let metaConfig = [...payload.addSeriesReducer.ChartConfig]
      let trendData = {
        _id: id,
        trendName: payload.addSeriesReducer.trendName,
        config: [...deleteDataFromMeta(metaConfig)],
        filter: payload.trenderArea,
        startTime: payload.addSeriesReducer.startTime,
        endTime: payload.addSeriesReducer.endTime,
        timePeriod: payload.addSeriesReducer.timePeriod,
      }
      const series = yield call(addSeriesToDB, trendData);

      if (series) {
        yield [

          put({
            type: mytrendAction.FETCH_SAVED_TRENDS,
            series
          }),
          put({
            type: mytrendAction.FETCH_SELECTED_SAVED_TRENDS,
            series
          }),

          put({
            type: mytrendAction.SET_CURRENT_TREND_ID,
            id
          }),
          put({
            type: mytrendAction.SHARE_TREND

          }),
          put({
            type: types.ADD_SERIES_TO_DB_SUCCESS,
            series
          })
        ];
      } else {
        console.log("no series")
        yield put({
          type: types.ADD_SERIES_TO_DB_FAILURE,
          error: "Duplicate Name"
        });
      }
    } else {
      yield put({
        type: types.ADD_SERIES_TO_DB_FAILURE,
        error: "Duplicate Name"
      });
    }
  } catch (error) {
    yield put({
      type: types.ADD_SERIES_TO_DB_FAILURE,
      error
    });
  }
}





export function* fetchSeriesDataSaga({
  payload
}) {
  try {

    yield [put({
      type: loaderAction.LOADING,
      payload: true
    })]
    const currentState = yield select();
    var series = {};
    let startTime = currentState.addSeriesReducer.startTime;
    let endTime = currentState.addSeriesReducer.endTime;

    if (payload && !payload.isExpression) {
      series = yield call(GetSeriesData, payload, startTime, endTime);
    } else {
      series = yield call(GetExpressionSeriesData, payload, startTime, endTime);
    }

    yield [
      put({
        type: types.FETCH_TAGSUMMARY_SINGLE,
        tagList: [series],
        payload: { t1: startTime, t2: endTime }
      }),
      put({
        type: types.Fetch_CurrentValues_SINGLE_TO_DB,
        tagList: getTagList(series)
      }),
      put({
        type: types.ADD_SERIES_TO_STORE_SUCCESS,
        series
      }),

      put({
        type: loaderAction.LOADING,
        payload: false
      })
    ];
  } catch (error) {
    yield [put({
      type: types.ADD_SERIES_TO_STORE_FAILURE,
      error
    }), put({
      type: loaderAction.LOADING,
      payload: false
    })]
  }
}

// Responsible for Fetching added series, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.fetchSeriesDataCustomDateRange
export function* fetchMultiSeriesDataSaga({
  SelectedSaveTrends
}) {
  try {
    yield [put({
      type: loaderAction.LOADING,
      payload: true
    })]
    if (SelectedSaveTrends && SelectedSaveTrends.length > 0) {
      let startTime = SelectedSaveTrends[0].startTime;
      let endTime = SelectedSaveTrends[0].endTime;
      let currenttimePeriod = SelectedSaveTrends[0].timePeriod;
      const series = yield call(GetMultiSeriesData, SelectedSaveTrends[0], startTime, endTime);
      let timeperiod = {
        startTime: startTime,
        endTime: endTime,
        timeperiod: currenttimePeriod
      }


      yield [
        put({
          type: types.FETCH_TAGSUMMARY,
          tagList: series,
          payload: { t1: startTime, t2: endTime }
        }),
        put({
          type: types.Fetch_CurrentValues_TO_DB,
          tagList: series
        }),
        put({
          type: types.SET_TIMEPERIOD_FROM_SAVE_TREND_META,
          timeperiod
        }),
        put({
          type: types.ADD_MULTIPLE_SERIES_TO_STORE_SUCCESS,
          SelectedSaveTrends,
          series
        }),
        put({
          type: loaderAction.LOADING,
          payload: false
        })
      ];
    }

  } catch (error) {
    yield [put({
      type: types.ADD_SERIES_TO_STORE_FAILURE,
      error
    }),
    put({
      type: loaderAction.LOADING,
      payload: false
    })
    ]
  } finally {

  }
}



export function* UpdateTrendMetaSaga({
  payload
}) {
  try {

    const fullstate = yield select();

    let metaConfig = [...fullstate.addSeriesReducer.ChartConfig]

    var _id, date;
    if (fullstate.mytrendReducer.SelectedSaveTrends && fullstate.mytrendReducer.SelectedSaveTrends.length > 0) {
      
      _id = fullstate.mytrendReducer.SelectedSaveTrends[0]._id;
    } else if (fullstate.mytrendReducer && fullstate.mytrendReducer.SelectedTrendID) {
      
      _id = fullstate.mytrendReducer.SelectedTrendID
    }
    
     

    if (fullstate.mytrendReducer.SelectedSaveTrends && fullstate.mytrendReducer.SelectedSaveTrends.length > 0) {
      date = fullstate.mytrendReducer.SelectedSaveTrends[0].date;
    } else if (fullstate.mytrendReducer.SaveTrends && fullstate.mytrendReducer.SaveTrends.length > 0) {
      date = fullstate.mytrendReducer.SaveTrends[0].date
    }
    let trendData = {
      date: date,
      _id: _id,
      trendName: fullstate.addSeriesReducer.trendName,
      config: [...deleteDataFromMeta(metaConfig)],
      filter: fullstate.trenderArea,
      startTime: fullstate.addSeriesReducer.startTime,
      endTime: fullstate.addSeriesReducer.endTime,
      timePeriod: fullstate.addSeriesReducer.timePeriod,
    }
    const series = yield call(updateSeriesToDb, trendData);

    if (series) {
      yield [
        put({
          type: types.UPDATE_SERIES_TO_DB_SUCCESS,
          series
        }),
        put({
          type: mytrendAction.FETCH_SAVED_TRENDS,
          series
        }),
        put({
          type: mytrendAction.FETCH_SELECTED_SAVED_TRENDS,
          series
        }),
        put({
          type: mytrendAction.SHARE_TREND

        })

      ];
    } else {
      yield put({
        type: types.UPDATE_SERIES_TO_DB_FAILURE,
        error
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_SERIES_TO_DB_FAILURE,
      error
    });
  }
}



export function* fetchCurrentValuesSaga({
  tagList
}) {
  try {

    const currentTagValuesList = yield call(getCurrentValuesForTags, tagList);
    if (currentTagValuesList) {
      yield [
        put({
          type: types.Fetch_CurrentValues_TO_DB_SUCCESS,
          currentTagValuesList
        })
      ];
    } else {
      yield put({
        type: types.Fetch_CurrentValues_TO_DB_FAILURE,
        error
      });
    }
  } catch (error) {
    yield put({
      type: types.Fetch_CurrentValues_TO_DB_FAILURE,
      error
    });
  }
}

export function* fetchCurrentValuesSingleSaga({
  tagList
}) {
  try {

    const currentTagValuesList = yield call(getCurrentValuesForTags, tagList);
    if (currentTagValuesList) {
      yield [
        put({
          type: types.Fetch_CurrentValues_SINGLE_TO_DB_SUCCESS,
          currentTagValuesList
        })
      ];
    } else {
      yield put({
        type: types.Fetch_CurrentValues_SINGLE_TO_DB_FAILURE,
        error
      });
    }
  } catch (error) {
    yield put({
      type: types.Fetch_CurrentValues_SINGLE_TO_DB_FAILURE,
      error
    });
  }
}


const deleteDataFromMeta = (metaConfig) => {
  let newSetData = [];


  metaConfig.forEach(x => {
    //  delete x.data
    newSetData.push(x);
  });

  return newSetData;
}

const CheckIsTrendExist = (trendList, name) => {

  if (trendList && name) {
    if (trendList.length > 0) {
      let result = trendList.filter(item => {
        return item.name === name
      })
      if (result && result.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }
  return true;

}


const addSeriesToDB = (params) => {
  const httpClient = new HttpClient();

  let trendMetaRequestModel = {
    "collectionName": "metatrender",
    "payload": [],
    "operation": "save"
  }

  params.userid = localStorage.getItem("userID")
  trendMetaRequestModel.payload.push(params);
  let url = apiURL.API_TRENDMETA;
  return httpClient.post(url, trendMetaRequestModel)
    .then(response => {
      if (response && response.data && response.data.message && response.data.message === "Success") {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
    });
}


const updateSeriesToDb = (params) => {
  const httpClient = new HttpClient();

  let trendMetaRequestModel = {
    "collectionName": "metatrender",
    "payload": [],
    "operation": "update"
  }


  params.userid = localStorage.getItem("userID")
  trendMetaRequestModel.payload.push(params);
  let url = apiURL.API_TRENDMETA;
  return httpClient.post(url, trendMetaRequestModel)
    .then(response => {
      if (response && response.data && response.data.message && response.data.message == "Success") {
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
    });
}


const tagPathFormation = (params) => {
  return "eclassic1:" + params
}

const tagPathFormationExpression = (params) => {
  return "optimization_second:" + params
}

const GetSeriesData = (payload, start, end) => {

  let QueryJson = {}
  QueryJson.tagPath = payload.tagPath;
  start = start * 1000
  end = end * 1000
  QueryJson.periodFrom = start //CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), -60)); //Need to convert function
  QueryJson.periodTo = end //CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0)); //Need to convert function
  QueryJson.maxReductionPoints = gridRequests.maxReductionPoints //Added for superset
  QueryJson.timeOffset = "UTC%2B05%"
  QueryJson.limit = gridRequests.limit
  QueryJson.skip = 0
  QueryJson.RepresentationAlgorithm = gridRequests.RepresentationAlgorithm

  let url = generateUrl(QueryJson);
  const httpClient = new HttpClient();
  return httpClient.get(url)
    .then(response => {
      return generateSeries(response.data.data, payload);
    })
    .catch(error => {
      alert(JSON.stringify(error));
      console.log(error);
    });
}


//Fetch Data for Custom Expression
const GetExpressionSeriesData = (payload, start, end) => {
  let bodyParams = {}

  let url = apiURL.NEW_SERVERBASE_URL.concat('/expression');
  bodyParams.expression = payload.expressionValue;
  bodyParams.retrievalOptions = {
    "timeOffset": "UTC+05:30",
    "periodFrom": start * 1000,
    "periodTo": end * 1000,
    "maxReductionPoints": gridRequests.maxReductionPoints,
    "RepresentationAlgorithm": gridRequests.RepresentationAlgorithmForExpression
    
  }

  bodyParams.pagination = {
    "skip": 0,
    "limit": gridRequests.limit
  }

  const httpClient = new HttpClient();
  return httpClient.post(url, bodyParams)
    .then(response => {
      return generateSeries(response.data.data, payload);
    })
    .catch(error => {
      console.log(error);
    });
}
const GetMultiSeriesData = (payload, start, end) => {



  let timeStamplist = {};
  timeStamplist.startTime = start;
  timeStamplist.endTime = end;
  let linksArr = [];
  var currentRequestSet = {};
  for (let i = 0; i < payload.config.length; i++) {

    if (payload.config[i] && payload.config[i].isExpression) {
      currentRequestSet = generatePostRequest(payload.config[i], timeStamplist)
      linksArr.push(currentRequestSet);
    } else {
      currentRequestSet = generateUrlForRaw('raw', payload.config[i], timeStamplist);
      linksArr.push(currentRequestSet);
    }


  }

  const httpClient = new HttpClient();

  return httpClient.postallList(linksArr)
    .then(function (response) {
      if (!CommonUtils.isEmpty(response)) {
        let res = [];
        let result = response.map(r => r.data.data);
        payload.config.forEach((x, idx) => {
          let series = generateSeries(result[idx], x);
          res.push(series);
        })

        return res;
      }


    }).catch(error => {
      console.log(error);
    });

}


//It is a function convert data into series for chart
const generateSeries = (seriesData, seriesMeta) => {

 
  let data = [];
  var seriesMetawithData = {};
  try {
    if (seriesMeta) {


      if (seriesData) {
        for (let m = 0; m < seriesData.length; m++) {
          let obj = {}
          obj.x = seriesData[m].timestamp;
          obj.y = seriesData[m].value
          obj.z = seriesData[m].quality
          data.push(Object.values(obj));
        }
      }


      seriesMetawithData = {
        color: seriesMeta.colorCode,

        animation: false,
        marker: {
          symbol: seriesMeta.lineSymbol,
          radius: 4,
          enabled: true
        },
       
        boostThreshold: 1,
        turboThreshold: 0,
        name: seriesMeta.name,
        data: data,
        step: false, 
        showInNavigator: true,
        lineWidth: seriesMeta.lineWidth,
        yAxisSwitchValue: false, 
        id: seriesMeta.id,
        tagPath: seriesMeta.tagPath


      };

    }
  } catch (e) {

  }
  return seriesMetawithData;
}



const generateUrl = (urlParramData) => {
  
  return apiURL.NEW_SERVERBASE_URL.concat("?").concat(queryString.stringify(urlParramData))
}


const generateData = (seriesData, seriesMeta) => {
  if (seriesMeta != null)
    seriesData = seriesData.filter(l => l.name == seriesMeta.name);

  let data = [];
  for (let m = 0; m < seriesData.length; m++) {
    let obj = {}
    obj.x = seriesData[m].timestamp;
    obj.y = seriesData[m].value
    obj.z = seriesData[m].quality
    data.push(Object.values(obj));
  }
  return data
}
const generatTagCurrnetValuelist = (seriesData, tagName) => {
  let data = {};
  for (let m = 0; m < seriesData.length; m++) {
    let obj = {}
    obj.tagName = tagName;
    obj.currentValue = seriesData[m].value
    data = obj;
  }
  return data
}
export const getProject = (state) => state.ChartConfig


export function* fetchSeriesDataForCustomDateSaga({
  seriesListData,
  payload
}) {
  try {
    yield [put({
      type: loaderAction.LOADING,
      payload: true
    })]
    var _state = yield select();
    const updatedDataSet = yield call(getSeriesDataForCustomData, seriesListData, payload);
    yield [

      put({
        type: types.FETCH_TAGSUMMARY,
        tagList: seriesListData,
        payload: payload
      }),
      put({
        type: types.Fetch_CurrentValues_TO_DB,
        tagList: seriesListData
      }),
      put({
        type: types.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_SUCCESS,
        updatedseries: updatedDataSet
      }),
      put({
        type: types.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_RESET

      }),
      put({
        type: loaderAction.LOADING,
        payload: false
      })
    ];
  } catch (error) {
    yield [
      put({
        type: loaderAction.LOADING,
        payload: false
      }),
      put({
        type: types.FETCH_DATA_FOR_SERIES_TO_CUSTOM_DATE_FAILURE,
        error
      }),

    ]
  }
}


export function* fetchTagsSummaryForCustomDateRangeSaga({
  tagList,
  payload
}) {
  try {
    yield [put({
      type: loaderAction.LOADING,
      payload: true
    })]

    const summaryDataField = yield call(getSeriesSummaryDataForCustomDateRange, tagList, payload);
    yield [
      put({
        type: types.FETCH_TAGSUMMARY_SUCCESS,
        tagList: summaryDataField
      }),

      put({
        type: loaderAction.LOADING,
        payload: false
      })
    ];
  } catch (error) {
    yield [put({
      type: types.FETCH_TAGSUMMARY_FAILURE,
      error
    }),
    put({
      type: loaderAction.LOADING,
      payload: false
    })
    ]
  }
}
export function* fetchTagsSummaryForSingleSaga({
  tagList,
  payload
}) {
  try {
    yield [put({
      type: loaderAction.LOADING,
      payload: true
    })]

    const summaryDataField = yield call(getSeriesSummaryDataForCustomDateRange, tagList, payload);
    yield [
      put({
        type: types.FETCH_TAGSUMMARY_SINGLE_SUCCESS,
        tagList: summaryDataField
      }),

      put({
        type: loaderAction.LOADING,
        payload: false
      })
    ];
  } catch (error) {
    yield [put({
      type: types.FETCH_TAGSUMMARY_SINGLE_FAILURE,
      error
    }),
    put({
      type: loaderAction.LOADING,
      payload: false
    })
    ]
  }
}

const getSeriesDataForCustomData = (seriesListData, payload) => {

  let timeStamplist = {};
  timeStamplist.startTime = payload.t1;
  timeStamplist.endTime = payload.t2;
  let linksArr = [];
  var currentRequestSet = {};
  for (let i = 0; i < seriesListData.length; i++) {

    if (seriesListData[i] && seriesListData[i].isExpression) {
      currentRequestSet = generatePostRequest(seriesListData[i], timeStamplist)
      linksArr.push(currentRequestSet);
    } else {

      var _uri = generateUrlForRawExpression('raw', seriesListData[i], timeStamplist);

      currentRequestSet = generateGetRequest(apiURL.NEW_SERVERBASE_URL + _uri)

      linksArr.push(currentRequestSet);
    }


  }

  const httpClient = new HttpClient();

  return httpClient.postallList(linksArr)
    .then(function (response) {
      if (!CommonUtils.isEmpty(response)) {
        let dataList = [];

        response.map((r, i) => {
          let data = generateData(r.data.data, null);
          dataList.push(data)
        });

        return dataList;

      }


    }).catch(error => {
      console.log(error);
    });


}

const getCurrentValuesForTags = (seriesListData) => {
  let linksArr = [];
  let dataList = [];
  for (let i = 0; i < seriesListData.length; i++) {
    let QueryJson = {}
    QueryJson.tagPath = seriesListData[i].tagPath;
    if (!seriesListData[i].isExpression) {
      let url = generateUrl(QueryJson);
      linksArr.push(url)
    }
  }

  const httpClient = new HttpClient();

  return httpClient.getallList(linksArr)
    .then(function (results) {
      if (!CommonUtils.isEmpty(results))
        results.map((r, i) => {
          let data = generatTagCurrnetValuelist(r.data.data, r.data.tagName);
          dataList.push(data)
        });

      return dataList;
    }).catch(error => {
      console.log(error);
    });
}


const dynamicExpression = (tagname, functionName) => {
  return "(" + tagname + ")." + functionName + "()";
}
const generatePostRequest = (payload, timeStamplist, funcName = null) => {

  var bodyParams = {}

  if (funcName) {
        bodyParams.expression = dynamicExpression(payload.tagPath, funcName);
  } else {
    bodyParams.expression = payload.expressionValue;
  }

  bodyParams.retrievalOptions = {
    "timeOffset": "UTC+05:30",
    "periodFrom": timeStamplist.startTime * 1000,
    "periodTo": timeStamplist.endTime * 1000,
    "maxReductionPoints": gridRequests.maxReductionPoints,
    "RepresentationAlgorithm": gridRequests.RepresentationAlgorithmForExpression

  }

  bodyParams.pagination = {
    "skip": 0,
    "limit": gridRequests.limit
  }



  return {
    baseURL: apiURL.NEW_SERVERBASE_URL,
    url: '/expression',
    method: 'post',
    data: bodyParams,
    headers: {
      'user-id': localStorage.getItem("userID"),
      'session-id': localStorage.getItem("sessionID"),
      'app-id': localStorage.getItem("resource")
    }

  }

}

const buildSummaryRequest = (seriesListData, timeStamplist) => {
  var funtionArr = [Expressionfunction['MIN'], Expressionfunction['MAX'], Expressionfunction['AVG']];
  var requestArr = [];

  funtionArr.forEach(fn => {

    requestArr.push(generatePostRequest(seriesListData, timeStamplist, fn));
  })
  return requestArr;
}


const getTagList = (tagData) => {
  let tagList = [];
  tagList.push(tagData);
  return tagList
}


const generateGetRequest = (baseurl, url) => {

  return {
    baseURL: baseurl,
    url: url,
    method: 'get',
    headers: {
      'user-id': localStorage.getItem("userID"),
      'session-id': localStorage.getItem("sessionID"),
      'app-id': localStorage.getItem("resource")
    }

  }
}
const getSeriesSummaryDataForCustomDateRange = (seriesListData, payload) => {


  let timeStamplist = {};
  timeStamplist.startTime = payload.t1;
  timeStamplist.endTime = payload.t2;
  let linksArr = [];
  var currentRequestSet = {};
  for (let i = 0; i < seriesListData.length; i++) {

    if (!seriesListData[i].isExpression) {

      linksArr = [...linksArr, ...buildSummaryRequest(seriesListData[i], timeStamplist)]
    }


  }

  const httpClient = new HttpClient();

  return httpClient.postallList(linksArr)
    .then(function (response) {
      if (!CommonUtils.isEmpty(response)) {


        return mapTagSummaryData(seriesListData, response)
      }


    }).catch(error => {
      console.log(error);
    });

}

const mapTagSummaryData = (taglist, data) => {
  var result = [];
  var funtionArr = [Expressionfunction['MIN'], Expressionfunction['MAX'], Expressionfunction['AVG']];
  var counter = 0;
  var tagIndex = 0;
  if (data && data.length > 0 && taglist && taglist.length > 0) {
    data.map((series, index) => {
      if (counter > 2) counter = 0;
      if (index !== 0 && (index) % 3 === 0) tagIndex++;
      result.push({
        tagName: taglist[tagIndex].name,
        key: funtionArr[counter],
        value: series.data.data[0].value
      })
      counter++;
    })
  }

  return result;
}



//generate querystring for Raw
const generateUrlForRaw = (reterivalType, seriesMeta, timeStamplist) => {

  let QueryJson = {}
  QueryJson.tagPath = seriesMeta.tagPath;
  let starttime = (timeStamplist.startTime) * 1000
  let endtime = (timeStamplist.endTime) * 1000
  QueryJson.periodFrom = starttime;
  QueryJson.periodTo = endtime;
  QueryJson.limit = gridRequests.limit;
  QueryJson.skip = 0;
  QueryJson.maxReductionPoints = gridRequests.maxReductionPoints;
  QueryJson.RepresentationAlgorithm = gridRequests.RepresentationAlgorithm;
  let url = generateUrl(QueryJson);
  return url;
}

const generateUrlForRawExpression = (reterivalType, seriesMeta, timeStamplist) => {
  let QueryJson = {}
  QueryJson.tagPath = seriesMeta.tagPath;
  let starttime = (timeStamplist.startTime) * 1000
  let endtime = (timeStamplist.endTime) * 1000
  QueryJson.periodFrom = starttime;
  QueryJson.periodTo = endtime;
  QueryJson.limit = gridRequests.limit;
  QueryJson.skip = 0;
  QueryJson.maxReductionPoints = gridRequests.maxReductionPoints;
  QueryJson.RepresentationAlgorithm= gridRequests.RepresentationAlgorithm
  QueryJson.timeOffset = "UTC%2B05%"
  let url = "?" + (queryString.stringify(QueryJson))
  return url;
}


export function* fetchMetaByTagNameSaga({
  payload,
  tagPath
}) {

  try {
    yield [put({
      type: loaderAction.LOADING,
      payload: true
    })]

    const meta = yield call(fetchTagMeta, payload, tagPath);
    yield [
      put({
        type: types.FETCH_TAG_META_SUCCESS,
        meta: meta
      }),
      put({
        type: types.ADD_SERIES_TO_STORE,
        payload: CommonUtils.mapToDefaultSeriesValues(meta[0])
      }),

      put({
        type: loaderAction.LOADING,
        payload: false
      })
    ];
  } catch (error) {
    yield [put({
      type: types.FETCH_TAG_META_FAILURE,
      error
    }),
    put({
      type: loaderAction.LOADING,
      payload: false
    })
    ]
  }
}

const fetchTagMeta = (tagName, tagPath) => {
  
  const httpClient = new HttpClient();
  tagName = tagName.split('&')[0]
  var url = apiURL.API_TAGBROWSER + "?" + "tagName=" + tagName;
  var url = "https://api.signal.ddriven.in:1111/trender/signals?tagPath=" + tagPath.split('&')[0];

  return httpClient.get(url)
    .then(response => {
      let data = [];
      if (!CommonUtils.isEmpty(response.data)) {
        if (response.data.data.length > 0) {
          for (let i = 0; i <= response.data.data.length - 1; i++) {
            if (response.data.data[i].tagPath == tagPath.split('&')[0]) {
              response.data.data[i].name = tagName;
              let obj = response.data.data[i];
              data.push(obj);
            }
          }
        }






        return data;

      }

    })
    .catch(error => {

    });
}