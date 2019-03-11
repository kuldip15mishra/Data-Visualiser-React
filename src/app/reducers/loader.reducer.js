import * as types from '../actions/index';


export default (state = {
  fetching: false
}, action) => {

  switch (action.type) {

    case types.LOADING:
      return {
        ...state,
        fetching: action.payload,
      }
   

    default:
      return state;
  }
}