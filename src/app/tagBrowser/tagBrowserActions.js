export const GET_TAG_LIST = 'GET_TAG_LIST';
export const GET_TAG_LIST_SUCCESS = 'GET_TAG_LIST_SUCCESS';
export const GET_TAG_LIST_FAILURE = 'GET_TAG_LIST_FAILURE';

export const getTagList = () => ({ type: GET_TAG_LIST, payload: null });
export const getTagListSuccess = tagList => ({ type: GET_TAG_LIST_SUCCESS, payload: tagList });
export const getTagListFailure = tagList => ({ type: GET_TAG_LIST_FAILURE, payload: tagList });