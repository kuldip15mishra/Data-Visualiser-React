import * as types from './TagBrowserActions';
import merge from 'lodash/merge';
import {
    combineReducers
} from 'redux';
import {
    InitialState
} from '../store/initialState';

import CommonUtils from '../commonutils/CommonUtils';


export default (state = InitialState, action) => {

    switch (action.type) {
       
        case types.GET_TAG_LIST:
            return {
                ...state,
               // tagList: [...state.tagList],
                fetching: true,
                error: null,
                isReset: false
            };
        case types.GET_TAG_LIST_SUCCESS:
      
            return {
                ...state,
                tagList: [...state.tagList,action.tagList],
                isReset: false,
                fetching: false,
                error: null
            };
        case types.GET_TAG_LIST_FAILURE:
            return {
                ...state,
                fetching: false,
                isReset: false,
                isupdate: false
            }
        default:
            return state;

    }
}


