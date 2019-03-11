import * as types from './action';
import {
    combineReducers
} from 'redux';
import {
    InitialState
} from '../store/initialState';
import * as uniqid from 'uniqid';
import CommonUtils from '../commonutils/CommonUtils'; 
import {apiURL} from '../constants/Constants'
 

import {
    
    select
  } from 'redux-saga/effects';

export default (state = InitialState.filter, action) => {
    switch (action.type) {
        case types.SET_JOINTYPE:
            state.jointype = action.payload
            return {
                ...state
            }
        case types.SET_RENDERER:
            state.renderer = action.payload
            return {
                ...state
            }
        case types.SET_YAXIS:
            state.yAxis = action.payload
            return {
                ...state
            }
        case types.SET_TIME_PERIOD:
            state.timeperiod = action.payload
            return {
                ...state
            }
        case types.SET_PLOTSPLIT:
            state.plotSplit = action.payload
            return {
                ...state
            }

        case types.SHARE_TREND:
           
            
            return {
                ...state
            }

        case types.SET_POINTLABLE:
            state.isShowDataLable = action.payload
            return {
                ...state
            }
        case types.SET_DATALABLE:
            state.isEnabledDataLable = action.payload
            return {
                ...state
            }

        case types.ADD_FILTERS_TO_STORE:
            return {
                ...action.filter
            };


        case types.ADD_FILTERS_TO_STORE_SUCCESS:
            return {
                ...state,

            };
        case types.RESET_STORE:

        return {
                ...state,
                isEnabledDataLable:false,
                isShowDataLable:false,
                jointype: false,
                renderer :'line',
                timeperiod :0,
                yAxis :false,
                plotSplit :false,
                fetching: false,
                error: null
            };
        default:
            return {
                ...state
            };

    }
}

