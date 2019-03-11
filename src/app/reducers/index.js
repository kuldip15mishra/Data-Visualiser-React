
import { combineReducers,co } from 'redux';
import addSeriesReducer from '../addSeries/addSeriesReducer';
import mytrendReducer from '../mytrends/mytrendReducer';
import seriesGridViewReducer from '../seriesGridView/seriesGridViewReducer';
import trenderArea from '../trenderArea/reducer';
import loader from './loader.reducer';
import menu from './menu.reducer';
import tagBrowserReducer from '../tagBrowser/TagBrowserReducer'
import utlity from './utlity.reducer'
const rootReducer = combineReducers({
  addSeriesReducer,
  mytrendReducer,
  trenderArea,
  loader,
  seriesGridViewReducer,
  menu,
  tagBrowserReducer,
  utlity
  });
  
  export default rootReducer;