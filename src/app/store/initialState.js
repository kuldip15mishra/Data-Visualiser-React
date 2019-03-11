import {
  DefaultValue
} from '../constants/Constants';
import CommonUtils from '../commonutils/CommonUtils';


export const InitialState = {
  "isReset": false,
  "fetching": false,
  "trendName": "",
  "trendShareLink": "",
  "SaveTrends": [],
  "plotconfig": [],
  "ChartConfig": [],
  "SeriesGridViewConfig": [],
  "ClipBoardData": [],
  "CurrentEditingSeriesIndex": 0,
  "updatedseriesdata": [],
  "isShowAddSeriesForm": false,
  "hideSeriesIndex": -1,
  "currentUpdatedSeries": {},
  "isExpressionRemoved":false,
  "startTime": CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), -60)),
  "endTime": CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0)),
  "timePeriod": 0,
  "periodInMillisecond": CommonUtils.calculateTimePeriodInMilliSecond(CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), -60)),
  CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0))),
  "isTrendSaved": false,
  "caption": "1 hr",
  "action": "",
  "filter": {
    "jointype": DefaultValue.JoinType,
    "renderer": DefaultValue.ChartType,
    "yAxis": DefaultValue.YAxisSwitchValue, //default yAxisSwitchValue selection false
    "plotSplit": DefaultValue.PlotSplitSwitch, //default plotSplitSwitch selection false
    "isShowDataLable": DefaultValue.isShowDataLable,
    "isEnabledDataLable": DefaultValue.isEnabledDataLable
  },
  "config": {
    series: [],
    deletedseries: []
  },
  "currentTagNameValues": [],
  "TagSummary": [],
  "Routing" :[],
  "tagList":[]
  
}