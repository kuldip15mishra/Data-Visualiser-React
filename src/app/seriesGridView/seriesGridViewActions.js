
export const DELETE_SERIES_FROM_STORE = 'DELETE_SERIES_FROM_STORE';
export const CURRENT_EDITING_SERIES_FROM_STORE = 'CURRENT_EDITING_SERIES_FROM_STORE';

export const deleteSeries = index => ({ type: DELETE_SERIES_FROM_STORE, payload: index });
export const editCurrentSeries = index => ({ type: CURRENT_EDITING_SERIES_FROM_STORE, payload: index });


export const LOAD_CURRENT_INFO_SERIES = 'LOAD_CURRENT_INFO_SERIES';

export const loadCurrentInfoSeries = series => ({ type: LOAD_CURRENT_INFO_SERIES, payload: series });
