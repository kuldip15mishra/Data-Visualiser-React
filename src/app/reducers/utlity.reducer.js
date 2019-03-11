import * as types from '../actions/index';

export default (state = {
    isEventRangSlider: false
}, action) => {

  switch (action.type) {

    case types.ISEVENT_RANGESLIDER_TRIGGER:
      return {
        ...state,
        isEventRangSlider: action.payload,
      }
   

    default:
      return state;
  }
}