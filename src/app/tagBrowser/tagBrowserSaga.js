import {
  put,
  call,
  select,
  cancelled,
  fork
} from 'redux-saga/effects';
import HttpClient from "../services/apiService"
import * as types from './TagBrowserActions';

import {
  apiURL
} from "../constants/Constants"
import queryString from 'query-string';
import * as uniqid from 'uniqid';
import CommonUtils from "../commonutils/CommonUtils";

import * as loaderAction from '../actions/index';

export function* fetchTagListSaga({
}) {
  try {

    // yield [put({
    //   type: loaderAction.LOADING,
    //   payload: true
    // })]

    const tagList = yield call(GetTagListData);
    if (tagList) {
      yield [
        put({
          type: types.GET_TAG_LIST_SUCCESS,
          tagList
        }),
        put({
          type: loaderAction.LOADING,
          payload: false
        })
      ];
    } else {
      yield put({
        type: types.GET_TAG_LIST_FAILURE,
        error
      });
    }

  } catch (error) {
    yield [put({
      type: types.GET_TAG_LIST_FAILURE,
      error
    }), put({
      type: loaderAction.LOADING,
      payload: false
    })]
  }
}


const GetTagListData = () => {
  let url = apiURL.SERVERBASE_URL + apiURL.Signals
 
  const httpClient = new HttpClient();
  return httpClient.get(url)
    .then(response => {
      var i;

      for (i = 0; i < response.data.data.length; i++) {
        response.data.data[i]._id = (i + 1).toString();
        response.data.data[i].name = response.data.data[i]['tagName'];
        delete response.data.data[i].tagName;
      }

      return response.data;
    })
    .catch(error => {
      alert(JSON.stringify(error));
      console.log(error);
    });
}