/*/#region Copyright(c) 2018 D-Driven All rights are reserved
* =============================================================================================================================================
* <copyright company="D-Driven">
* COPYRIGHT (c) 2018 D-Driven (P) Ltd.
* ALL RIGHTS ARE RESERVED. REPRODUCTION OR TRANSMISSION IN WHOLE OR IN PART,
* ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL OR OTHERWISE,
* WITHOUT THE PRIOR PERMISSION OF THE COPYRIGHT OWNER.
* </copyright>
* =============================================================================================================================================
* Created By :
* Module :  Constants
* Description : this file contain all global constants values of application level.
* Date:31-JULY-2018.
* =============================================================================================================================================
 *
 * #endregion
*/

//library import section Begin
import keyMirror from "keymirror";
import CommonUtils from "../commonutils/CommonUtils";

//library import section End

/**for Redux Actions constants area*/
// export const apiURL = keyMirror({
//   CONNECTION_STRING: "/connstring/conndata"
// });

//Constants http codes
export const httpStatusCodes = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

//Constants http urls
export const apiURL = {
  BASE_URL: "https://api.ddriven.xyz/api",
 // BASE_URL: "http://101.53.136.158:3000/api",
  //BASE_URL: "http://localhost:3000/api",
  SERVERBASE_URL: "https://api.signal.ddriven.in:1111",
  //NEW_SERVERBASE_URL: "http://101.53.138.47:8091/SignalAPI/signaldata",
  //NEW_SERVERBASE_URL: "http://101.53.138.47:8091/SignalAPI/signaldata",
  NEW_SERVERBASE_URL: "https://api.signal.ddriven.in:1111/trender/signaldata",
  AUTHENTICATE:"https://api.entitlement.ddriven.in:3773/entitlement/api/security-manager/authenticate",
  AUTHORIZE:"https://api.entitlement.ddriven.in:3773/entitlement/api/security-manager/authorize",
  LOGOUT:"https://api.entitlement.ddriven.in:3773/entitlement/api/security-manager/logout",
  API_CONNECTION_STRING: "/connstring/conndata",
  API_TAGBROWSER: "tag/tagmeta",
  API_TAGBROWSERELASTIC: "tag/metav1",
  API_DATAEXPLORER: "/tag/getdata",
  API_HISTORICDATA: "tags/history/",
  API_TRENDMETA: "trend/trendmeta",
  API_CURRENTVALUE: "/tag/tagvalue/",
  API_DATA: "tags/",
  API_TAGVALUE: "tags/point/",
  API_EXPORT: "tag/excelexport",
  SHARE_URL: "/?trendid=",
  LICENCE: "https://api.lms.ddriven.in:2125/license/statusCheck",
  URL_AFTER_LOGIN_LOCAL:"http://localhost:8080/",
  URL_AFTER_LOGIN_SERVER:"http://dev.trender.ddriven.xyz/",
  //Signals:"/SignalAPI/signals",
  Signals: "/trender/signals",
  ElasticSearch: "http://101.53.139.108:9200",
  searchURL: "/signalmetasearch/signals/_search"
};

export const RetrivalMode = {
  RAW: "raw",
  INTERPOLATE: "interpolate",
  MIN: "min",
  AVG: "avg",
  MAX: "max"
};


export const Permissions = {
  ALLOWED:"1 1 1 1",
  NOTALLOWED:"0 0 0 0"
};

export const AppId={
  id:"UTR"
}

export const LineWidth = {
  LineSmall: 1,
  LineBig: 2,
  LineMedium: 3,
  LineLong: 4,
  LineLargeLong: 5
};

export const TimeInterval = {
  Min_15: 15,
  Min_30: 30,
  Hour_1: 60,
  Hour_8: 480,
  Day_1: 1440
};


export const LicenceTime={
  time:300000
}

export const gridRequest = {
  "connString": "https://api.signal.ddriven.in:1111/trender/signaldata",
  //"connString": "http://101.53.138.47:8091/SignalAPI/signaldata",
  timePeriod: "",
  "maxReductionPoints": 2000,
  endTime: "08 Aug 2018 9:45 PM",
  tags: "",
  skip: "",
  take: "",

}

// const algo = () => {
//   console.log("1")
//   var MongoClient = require('mongodb').MongoClient;
//   console.log("2")
//   var url = ("mongodb://101.53.136.158:27017/unleashmetadb");
//   console.log("3")
//   var test = []
//   MongoClient.connect(url, function (err, db) {
//   db.collection("algorithm").find({ "_id": "classic" }).toArray(function (err, detail) {
//   if (err) throw err;
//   test = detail
//   });
//   });
//   console.log(test)
//   return test
//   }

//   export const gridRequests = {

//   "maxReductionPoints": 1000,
//   "limit": 1000,
//   "RepresentationAlgorithm": algo()
//   } 


export const gridRequests = {
  "maxReductionPoints": 250,
  "limit": 250,
  //"RepresentationAlgorithm": "average"
  "RepresentationAlgorithmForExpression": "average",
 "RepresentationAlgorithm": "eclassic"
}




  // export const gridRequests = {
   
  //     "maxRepresentationPoints": 1000,
  //     "maxReductionPoints": 1000,
  //     "limit": 1000,
  //     "RepresentationAlgorithm": "classic"
      
  //   }




export const LineSymbol = {
  LineCircle: "circle",
  LineTriangle: "triangle",
  LineSquare: "square",
  LineTriangleDown: "triangle-down",
  LineDiamond: "diamond"
};

export const AlertMessage = {
  Save: "Series saved successfully",
  Update: "Series updated successfully",
  Delete: "Series deleted succesfully",
  Error: "Server Error",
  EmptyTagBrowserMsg: "No Signals are found",
  EmptyTagBrowserMsgHeader: "Empty Search Results",
  Duplicate: "Duplicate name",
  SaveTrend: "Trend saved successfully",
  DeleteTrend: "Trend deleted successfully",
  UpdateTrend: "Trend updated successfully",
  EmptyTrendName: "Please provide Name for Trend.",
  EmptySignalPropertiesMsg: "No Signals are found",
  EmptySignalPropertiesMsgHeader: "Empty Search Results"
};

export const Status = {
  Success: "success",
  Error: "error",
  Info: "info",
  danger: "danger",
  warning: "warning"
};

export const Expressionfunction = {
  MIN: "MIN",
  AVG: "AVG",
  MAX: "MAX",
  INTERPOLATE: "INTERPOLATE",
  COUNT: "COUNT"
}
export const DefaultValue = {
  ChartType: "line",
  IsShowFormArea: true,
  TimePeriod: 1,
  JoinType: false,
  YAxisSwitchValue: false,
  HasError: false,
  IsLoading: false,
  PlotSplitSwitch: false,
  PageSize: 20,
  Take: 11,
  Total: 0,
  Skip: 0,
  StartTime: "18 Jan 1970 11:31 PM",
  EndTime: "08 Aug 2018 9:45 PM",
  Aggregate: "aggregate",
  Current: "current",
  Max: "max",
  Min: "min",
  Avg: "avg",
  EmptyTagBrowserMsg: "Browse Tags",
  EmptyTagBrowserMsgHeader: "Search for tags and add it to your trend",
  isEnabledDataLable: false,
  ishowDataLable: false,
  EmptySignalPropertiesMsg: "Browse Tags",
  EmptySignalPropertiesMsgHeader: "Search for tags to see the properties"
};

export const NavigatorButtonAction = [
  {
    leftPagination: "-0.1",
    rightPagination: "0.1",
    leftOuterPagination: "-0.25",
    rightOuterPagination: "0.25"
  }
];

export const RangeList = [
  {
    rangeName: "1H",
    rangeValue: "60", //minutes
    rangeUnit: "Hr",
    leftPagination: "-30",
    rightPagination: "30",
    leftOuterPagination: "-60",
    rightOuterPagination: "60"
  },
  {
    rangeName: "8H",
    rangeValue: "480",
    rangeUnit: "Hr",
    leftPagination: "-240",
    rightPagination: "240",
    leftOuterPagination: "-480",
    rightOuterPagination: "480"
  },
  {
    rangeName: "1D",
    rangeValue: "1440",
    rangeUnit: "Hr",
    leftPagination: "720",
    rightPagination: "720",
    leftOuterPagination: "-1440",
    rightOuterPagination: "1440"
  },
  {
    rangeName: "1W",
    rangeValue: "10080",
    rangeUnit: "Hr",
    leftPagination: "-5040",
    rightPagination: "5040",
    leftOuterPagination: "-10080",
    rightOuterPagination: "10080"
  },
  {
    rangeName: "1M",
    rangeValue: CommonUtils.daysInCurrentMonth() * 1440,
    rangeUnit: "Hr",
    leftPagination: (-1 * (CommonUtils.daysInCurrentMonth() * 1440)) / 2,
    rightPagination: (CommonUtils.daysInCurrentMonth() * 1440) / 2,
    leftOuterPagination: -1 * CommonUtils.daysInCurrentMonth() * 1440,
    rightOuterPagination: CommonUtils.daysInCurrentMonth() * 1440
  },
  {
    rangeName: "15MIN",
    rangeValue: "15",
    rangeUnit: "Min",
    leftPagination: "-7.5",
    rightPagination: "7.5",
    leftOuterPagination: "-15",
    rightOuterPagination: "15"
  },
  {
    rangeName: "30MIN",
    rangeValue: "30",
    rangeUnit: "Min",
    leftPagination: "-15",
    rightPagination: "15",
    leftOuterPagination: "-30",
    rightOuterPagination: "30"
  },
  {
    rangeName: "60MIN",
    rangeValue: "60", //minutes
    rangeUnit: "Hr",
    leftPagination: "-30",
    rightPagination: "30",
    leftOuterPagination: "-60",
    rightOuterPagination: "60"
  },
  {
    rangeName: "6H",
    rangeValue: "360",
    rangeUnit: "Hr",
    leftPagination: "-180",
    rightPagination: "180",
    leftOuterPagination: "-360",
    rightOuterPagination: "360"
  },
  {
    rangeName: "12H",
    rangeValue: "720",
    rangeUnit: "Hr",
    leftPagination: "-360",
    rightPagination: "360",
    leftOuterPagination: "-720",
    rightOuterPagination: "720"
  },
  {
    rangeName: "24H",
    rangeValue: "1440",
    rangeUnit: "Hr",
    leftPagination: "720",
    rightPagination: "720",
    leftOuterPagination: "-1440",
    rightOuterPagination: "1440"
  },
  {
    rangeName: "7DAYS",
    rangeValue: "10080",
    rangeUnit: "Hr",
    leftPagination: "-5040",
    rightPagination: "5040",
    leftOuterPagination: "-10080",
    rightOuterPagination: "10080"
  },
  {
    rangeName: "30DAYS",
    rangeValue: "43200",
    rangeUnit: "Hr",
    leftPagination: "-21600",
    rightPagination: "21600",
    leftOuterPagination: "-43200",
    rightOuterPagination: "43200"
  },
  {
    rangeName: "90DAYS",
    rangeValue: "129600",
    rangeUnit: "Hr",
    leftPagination: "-64800",
    rightPagination: "64800",
    leftOuterPagination: "-129600",
    rightOuterPagination: "129600"
  },
  {
    rangeName: "Today",
    rangeValue: CommonUtils.today(),
    rangeUnit: "Hr",
    leftPagination: -1 * (CommonUtils.today() / 2),
    rightPagination: CommonUtils.today() / 2,
    leftOuterPagination: -1 * CommonUtils.today(),
    rightOuterPagination: CommonUtils.today()
  },
  {
    rangeName: "ThisWeek",
    rangeValue: CommonUtils.thisWeek(),
    rangeUnit: "Hr",
    leftPagination: -1 * (CommonUtils.thisWeek() / 2),
    rightPagination: CommonUtils.thisWeek() / 2,
    leftOuterPagination: -1 * CommonUtils.thisWeek(),
    rightOuterPagination: CommonUtils.thisWeek()
  },
  {
    rangeName: "ThisYear",
    rangeValue: CommonUtils.thisYear(),
    rangeUnit: "Hr",
    leftPagination: -1 * (CommonUtils.thisYear() / 2),
    rightPagination: CommonUtils.thisYear() / 2,
    leftOuterPagination: -1 * CommonUtils.thisYear(),
    rightOuterPagination: CommonUtils.thisYear()
  },
  {
    rangeName: "Yesterday",
    rangeValue: CommonUtils.yesterday(),
    rangeUnit: "Hr",
    leftPagination: -1 * (CommonUtils.yesterday() / 2),
    rightPagination: CommonUtils.yesterday() / 2,
    leftOuterPagination: -1 * CommonUtils.yesterday(),
    rightOuterPagination: CommonUtils.yesterday()
  },
  {
    rangeName: "ThisMonth",
    rangeValue: CommonUtils.thisMonth(),
    rangeUnit: "Hr",
    leftPagination: -1 * (CommonUtils.thisMonth() / 2),
    rightPagination: CommonUtils.thisMonth() / 2,
    leftOuterPagination: -1 * CommonUtils.thisMonth(),
    rightOuterPagination: CommonUtils.thisMonth()
  },
];

export const EmailBody = {
  Subject: "Share Trend Link",
  Body1: "Hi %0A%0APlease find below the link for the trend : %0A",
  Body2: "%0A%0AThanks%0A%0A"
};

export const FunctionWikiList =
  [{
    "functionId": "1",
    "functionName": "AVG()",
    "Description": "Returns arithmetic mean of samples in the given signal",
    "Syntax": `<p>AVG(Tagname, Interval)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Interval - An evenly spaced time-period (in milliseconds) over which the function is applied</li>
          </ul>`,
    "Remarks": `<ul>
          <li>Any <strong>BAD or UNCERTAIN</strong> quality samples in the interval are included</li>
          <li>No time-weights are included</li>
          </ul>`,
    "Usage": `Return hourly average of a signal
          <code>(TK123T.PV).AVG(3600000)</code>
          <br/><br/>
          Return daily average of a signal
          <code>(TK123T.PV).AVG(86400000)</code>`
  },

  {
    "functionId": "2",
    "functionName": "MIN()",
    "Description": "Returns minimum sample value of the given signal",
    "Syntax": `<p>MIN(Tagname, Interval)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Interval - An evenly spaced time-period (in milliseconds) over which the function is applied</li>
          </ul>`,
    "Remarks": `<ul>
          <li>Any <strong>BAD or UNCERTAIN</strong> quality samples in the interval are included</li>
          </ul>`,
    "Usage": `Return minimum sample value of a signal for every 1 hour
          <code>(TK123T.PV).MIN(3600000)</code>`
  },

  {
    "functionId": "3",
    "functionName": "MAX()",
    "Description": "Returns maximum sample value of the given signal",
    "Syntax": `<p>MAX(Tagname, Interval)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Interval - An evenly spaced time-period (in milliseconds) over which the function is applied</li>
          </ul>`,
    "Remarks": `<ul>
          <li>Any <strong>BAD or UNCERTAIN</strong> quality samples in the interval are included</li>
          </ul>`,
    "Usage": `Return maximum sample value of a signal for every 1 hour
          <code>(TK123T.PV).MAX(3600000)</code>`
  },

  {
    "functionId": "4",
    "functionName": "COUNT()",
    "Description": "Returns count of samples in the given signal",
    "Syntax": `<p>COUNT(Tagname, Interval)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Interval - An evenly spaced time-period (in milliseconds) over which the function is applied</li>
          </ul>`,
    "Remarks": `<ul>
          <li>Any <strong>BAD or UNCERTAIN</strong> quality samples in the interval are included</li>
          </ul>`,
    "Usage": `Return count of samples in a signal for every 1 hour
          <code>(TK123T.PV).COUNT(3600000)</code>`
  },

  {
    "functionId": "5",
    "functionName": "ADD()",
    "Description": "Returns the signal added by a constant value",
    "Syntax": `<p>Tagname.ADD(Constant)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Constant – Any numeric value</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `Add an offset to any signal
          <code>(TK123T.PV).ADD(35000)</code>`
  },

  {
    "functionId": "6",
    "functionName": "SUB()",
    "Description": "Returns the signal subtracted by a constant value",
    "Syntax": `<p>Tagname.SUB(Constant)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Constant – Any numeric value</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `Subtract an offset from any signal
          <code>(TK123T.PV).SUB(35000)</code>`
  },

  {
    "functionId": "7",
    "functionName": "MUL()",
    "Description": "Returns the signal multiplied by a constant value",
    "Syntax": `<p>Tagname.MUL(Constant)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Constant – Any numeric value</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `Convert a Kilo Barrel Signal to a Barrel Signal
          <code>(TK123T.PV).MUL(10000)</code>`
  },

  {
    "functionId": "8",
    "functionName": "DIV()",
    "Description": "Returns the signal divided by a constant value",
    "Syntax": `<p>Tagname.DIV(Constant)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Constant – Any numeric value</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `Convert a Barrel Signal to a Kilo Barrel Signal
          <code>(TK123T.PV).DIV(35000)</code>`
  },

  {
    "functionId": "9",
    "functionName": "LN()",
    "Description": "Returns the natural algorithm of a signal",
    "Syntax": `<p>Tagname.LN()</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `<code>(TK123T.PV).LN()</code>`
  },

  {
    "functionId": "10",
    "functionName": "LOG10()",
    "Description": "Returns the base-10 logarithm of a signal",
    "Syntax": `<p>Tagname.LOG10()</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `<code>(TK123T.PV).LOG10()</code>`
  },

  {
    "functionId": "11",
    "functionName": "ABS()",
    "Description": "Returns the absolute value of a signal",
    "Syntax": `<p>Tagname.ABS()</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          </ul>`,
    "Remarks": `<ul>
          <li>•	The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `<code>(TK123T.PV).ABS()</code>`
  },

  {
    "functionId": "12",
    "functionName": "EXP()",
    "Description": "Returns e raised to the power of signal",
    "Syntax": `<p>Tagname.EXP()</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          </ul>`,
    "Remarks": `<ul>
          <li>•	The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `<code>(TK123T.PV).EXP()</code>`
  },

  {
    "functionId": "13",
    "functionName": "SQRT()",
    "Description": "Returns square root of the given signal",
    "Syntax": `<p>Tagname.SQRT()</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
    "Usage": `<code>(TK123T.PV).SQRT()</code>`
  },

  {
    "functionId": "14",
    "functionName": "CEIL()",
    "Description": "Returns signal rounded-up to the nearest multiple of significance",
    "Syntax": `<p>Tagname.CEIL(Significance)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Significance -Number whose multiple is used for rounding</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
          "Usage": `Rounds up all samples in the signal to nearest multiple of 1
          <code>(TK123T.PV).CEIL(1)</code>
          <br/><br/>
          Rounds up all samples in the signal to nearest multiple of 10
          <code>(TK123T.PV).CEIL(10)</code>`
  },

  {
    "functionId": "15",
    "functionName": "FLOOR()",
    "Description": "Returns signal rounded-down to the nearest multiple of significance",
    "Syntax": `<p>Tagname.FLOOR(Significance)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Significance -Number whose multiple is used for rounding</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
          "Usage": `Rounds up all samples in the signal to nearest multiple of 1
          <code>(TK123T.PV).FLOOR(1)</code>
          <br/><br/>
          Rounds up all samples in the signal to nearest multiple of 10
          <code>(TK123T.PV).FLOOR(10)</code>`
  },

  {
    "functionId": "16",
    "functionName": "ROUND()",
    "Description": "Returns signal rounded to given no of decimals",
    "Syntax": `<p>Tagname.ROUND(Significance)</p>
          <ul>
          <li>Tagname - Identifier of the Signal</li>
          <li>Significance -Number whose multiple is used for rounding</li>
          </ul>`,
    "Remarks": `<ul>
          <li>The function shall be applied on each Sample and returns the same quality</li>
          </ul>`,
          "Usage": `Rounds down all samples in the signal to 1 decimal point
          <code>(TK123T.PV).ROUND(1)</code>
          <br/><br/>
          Rounds down all samples in the signal to 2 decimal point
          <code>(TK123T.PV).ROUND(2)</code>`
  }
  ]


/* ColorPalette with 14 main colors each with 4 different shades 
making total available colors as 56 */

export const ColorPalette = [
  { colorHex: "#979797", colorId: 43, displayId: 15, Category: "Light" },
  { colorHex: "#DAC3AD", colorId: 55, displayId: 16, Category: "Light" },
  { colorHex: "#F9D9AB", colorId: 45, displayId: 17, Category: "Light" },
  { colorHex: "#FFA65C", colorId: 53, displayId: 18, Category: "Light" },
  { colorHex: "#FAB3A7", colorId: 47, displayId: 19, Category: "Light" },
  { colorHex: "#FFAFD1", colorId: 51, displayId: 20, Category: "Light" },
  { colorHex: "#F67ED1", colorId: 49, displayId: 21, Category: "Light" },
  { colorHex: "#A886D2", colorId: 54, displayId: 22, Category: "Light" },
  { colorHex: "#458BE3", colorId: 56, displayId: 23, Category: "Light" },
  { colorHex: "#8BC9F7", colorId: 44, displayId: 24, Category: "Light" },
  { colorHex: "#97B6D6", colorId: 52, displayId: 25, Category: "Light" },
  { colorHex: "#50B5CF", colorId: 50, displayId: 26, Category: "Light" },
  { colorHex: "#69F1C6", colorId: 46, displayId: 27, Category: "Light" },
  { colorHex: "#B4DA66", colorId: 48, displayId: 28, Category: "Light" },

  { colorHex: "#4C4C4C", colorId: 29, displayId: 29, Category: "Dark" },
  { colorHex: "#C8A585", colorId: 41, displayId: 30, Category: "Dark" },
  { colorHex: "#F6C781", colorId: 31, displayId: 31, Category: "Dark" },
  { colorHex: "#E77A1E", colorId: 39, displayId: 32, Category: "Dark" },
  { colorHex: "#F68D7B", colorId: 33, displayId: 33, Category: "Dark" },
  { colorHex: "#FF87BA", colorId: 37, displayId: 34, Category: "Dark" },
  { colorHex: "#B84B97", colorId: 35, displayId: 35, Category: "Dark" },
  { colorHex: "#7D62A0", colorId: 40, displayId: 36, Category: "Dark" },
  { colorHex: "#2A5C9B", colorId: 42, displayId: 37, Category: "Dark" },
  { colorHex: "#4FACF3", colorId: 30, displayId: 38, Category: "Dark" },
  { colorHex: "#6C849D", colorId: 38, displayId: 39, Category: "Dark" },
  { colorHex: "#31859B", colorId: 36, displayId: 40, Category: "Dark" },
  { colorHex: "#3AA281", colorId: 32, displayId: 41, Category: "Dark" },
  { colorHex: "#8DAE4A", colorId: 34, displayId: 42, Category: "Dark" },

  { colorHex: "#BFBFBF", colorId: 15, displayId: 1, Category: "Lightest" },
  { colorHex: "#ECE1D6", colorId: 27, displayId: 2, Category: "Lightest" },
  { colorHex: "#FCECD5", colorId: 17, displayId: 3, Category: "Lightest" },
  { colorHex: "#FFD6B3", colorId: 25, displayId: 4, Category: "Lightest" },
  { colorHex: "#FCD9D3", colorId: 19, displayId: 5, Category: "Lightest" },
  { colorHex: "#FFD6E8", colorId: 23, displayId: 6, Category: "Lightest" },
  { colorHex: "#FFC2EC", colorId: 21, displayId: 7, Category: "Lightest" },
  { colorHex: "#D8C0F5", colorId: 26, displayId: 8, Category: "Lightest" },
  { colorHex: "#8CBFFF", colorId: 28, displayId: 9, Category: "Lightest" },
  { colorHex: "#B4DCFA", colorId: 16, displayId: 10, Category: "Lightest" },
  { colorHex: "#BCDDFF", colorId: 24, displayId: 11, Category: "Lightest" },
  { colorHex: "#ACE9F9", colorId: 22, displayId: 12, Category: "Lightest" },
  { colorHex: "#B9FEE8", colorId: 18, displayId: 13, Category: "Lightest" },
  { colorHex: "#E8FDBC", colorId: 20, displayId: 14, Category: "Lightest" },

  { colorHex: "#262626", colorId: 1, displayId: 43, Category: "Darkest" },
  { colorHex: "#6F5032", colorId: 13, displayId: 44, Category: "Darkest" },
  { colorHex: "#C87D0D", colorId: 3, displayId: 45, Category: "Darkest" },
  { colorHex: "#AD4F00", colorId: 11, displayId: 46, Category: "Darkest" },
  { colorHex: "#C3260C", colorId: 5, displayId: 47, Category: "Darkest" },
  { colorHex: "#E90162", colorId: 9, displayId: 48, Category: "Darkest" },
  { colorHex: "#933275", colorId: 7, displayId: 49, Category: "Darkest" },
  { colorHex: "#5F497A", colorId: 12, displayId: 50, Category: "Darkest" },
  { colorHex: "#17365D", colorId: 14, displayId: 51, Category: "Darkest" },
  { colorHex: "#0D78C9", colorId: 2, displayId: 52, Category: "Darkest" },
  { colorHex: "#4A5B6D", colorId: 10, displayId: 53, Category: "Darkest" },
  { colorHex: "#31859B", colorId: 8, displayId: 54, Category: "Darkest" },
  { colorHex: "#0B7F5A", colorId: 4, displayId: 55, Category: "Darkest" },
  { colorHex: "#76923C", colorId: 6, displayId: 56, Category: "Darkest" }
];


export const RouteParams = {
  TrendID: 'trendID',
  TagName: 'tagName',

}