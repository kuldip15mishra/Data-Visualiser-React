import {
  ColorPalette,RetrivalMode, LineWidth, LineSymbol 
} from "../constants/Constants"
import {
  _
} from 'underscore';
import * as shortid from 'shortid';


class CommonUtils {

  

  /**
   * Tells if the provided object is empty
   * @param {mixed} obj
   */
  static isEmpty(obj) {
    let isEmpty = false;
    const type = typeof obj;

    isEmpty = isEmpty || !obj;
    isEmpty = isEmpty || (type === 'undefined'); // if it is undefined
    isEmpty = isEmpty || (obj === null); // if it is null
    isEmpty = isEmpty || (type === 'string' && (obj === '')); // if the string is empty
    isEmpty = isEmpty || (obj === false || obj === 0); // if boolean value returns false
    isEmpty = isEmpty || (Array.isArray(obj) && obj.length === 0); // if array is empty
    isEmpty = isEmpty || (type === 'object' && Object.keys(obj).length === 0); // if object is empty

    return isEmpty;
  }

  static isPropchange(prevProps, currentProps) {
    let isPropchange = false;
    if (prevProps !== currentProps) {
      isPropchange = true
    }
    return isPropchange
  }

  /**
   * Tells if a string is Empty or Null.
   * If the provided params is of any other type than string, then it will return true
   * @param {string} obj
   */
  static isStringEmptyOrNull(obj) {
    const type = typeof obj;

    let isStringEmptyOrNull = false;

    if (obj === null || type !== 'string' || obj === '') {
      isStringEmptyOrNull = true;
    }

    return isStringEmptyOrNull;
  }


  // convert time to unix
  static timeToUnix(obj) {
    var unixTime = moment(obj).unix();

    return unixTime;
  }
  // convert unix to timestamp
  static UnixToCalendarTimeStamp(obj) {
    //var unixTime = moment(obj).unix();
    var unixTime = moment(obj).format('LLLL');
    return unixTime;
  }
  // convert unix to timestamp
  static UnixToDateTimePickerFormat(obj) {
    var unixTime = moment(obj * 1000).format('DD MMM YYYY  h:mm A');
    return unixTime;
  }


  static daysInCurrentMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  static today(){
    var now = new Date();
    var startOfDay = new Date(now.getHours())*60+ now.getMinutes();
    return startOfDay
  }

  static thisWeek(){
    var now = new Date();
    var dateToday= now.getDate();
    var startOfDay = new Date(now.getHours())*60+ now.getMinutes();
    var firstday = new Date(now.setDate(now.getDate() - now.getDay()));
    return ((dateToday-firstday.getDate())*24*60+startOfDay)
  }

  static thisYear(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    var startOfDay = new Date(now.getHours())*60+ now.getMinutes();
    return ((day-1)*24*60+startOfDay)
  }

  static thisMonth(){
    var now = new Date();
    var dateToday= now.getDate();
    var startOfDay = new Date(now.getHours())*60+ now.getMinutes();
    return ((dateToday-1)*24*60+startOfDay)
  }

  static yesterday(){
    var now = new Date();
    var startTime=  new Date(now.getHours())*60 + 24*60 + now.getMinutes();

    return startTime

  }
  // function to calculate start time according to durtion term provided
  static timestampConfig(h_duration_term, n) {
    var MS_PER_MINUTE = 60000;
    let start, end = new Date();

    switch (h_duration_term) {

      case 'n hour':
        {
          start = new Date(+end - (n * 60 * MS_PER_MINUTE));
        }
        break;
      case 'n day':
        {
          start = new Date(+end - (n * 1440 * MS_PER_MINUTE));
        }
        break;
      case 'n week':
        {
          start = new Date(+end - (n * 7 * 1440 * MS_PER_MINUTE));
        }
        break;
      case 'n month':
        {
          start = new Date(+end - (n * 30 * 1440 * MS_PER_MINUTE));
        }
        break;
      case 'midnight':
        {
          start = start.setHours(0, 0, 0, 0);
        }
        break;

    }

    start = moment(start).unix();
    end = moment(end).unix();

    return start
  }



  /**
   * Performs the left trim
   * @param {string} strToTrim
   * @param {string} trimMe
   */
  static ltrim(strToTrim, trimMe) {
    let trimmedStr = strToTrim;

    if (!CommonUtils.isStringEmptyOrNull(trimmedStr) && !CommonUtils.isStringEmptyOrNull(trimMe)) {
      while (trimmedStr.length === 0 || trimmedStr.startsWith(trimMe)) {
        trimmedStr = trimmedStr.substr(trimMe.length);
      }
    }

    return trimmedStr;
  }

  /**
   * Performs the right trim
   * @param {string} strToTrim
   * @param {string} trimMe
   */
  static rtrim(strToTrim, trimMe) {
    let trimmedStr = strToTrim;

    if (!CommonUtils.isStringEmptyOrNull(trimmedStr) && !CommonUtils.isStringEmptyOrNull(trimMe)) {
      while (trimmedStr.length === 0 || trimmedStr.endsWith(trimMe)) {
        trimmedStr = trimmedStr.substr(0, trimmedStr.lastIndexOf(trimMe));
      }
    }

    return trimmedStr;
  }

  /**
   * Tells if given object is Array|Object
   * @param {mixed} obj
   */
  static isEnumerable(obj) {
    let isEnumerable = false;

    if (Array.isArray(obj) || (obj instanceof Object)) {
      isEnumerable = true;
    }

    return isEnumerable;
  }
  /**
   * Tells if given object is Array
   * @param {mixed} obj
   */
  static isEnumerableArray(obj) {
    let isEnumerable = false;

    if (Array.isArray(obj)) {
      isEnumerable = true;
    }

    return isEnumerable;
  }
  /**
   * Tells if a key exists
   * @param {string} key
   * @param {array|object} obj
   */
  static keyExists(key, obj) {
    if ((Array.isArray(obj) && key in obj) ||
      (obj instanceof Object && Object.prototype.hasOwnProperty.call(obj, key))) {
      return true;
    }

    return false;
  }

  /**
   *
   * @param {array|object} obj
   * @param {string} key key string separated with dot
   * @param {mixed} defaultValue  the default value to be returned if the specified
   * array key does not exists
   */
  static getObjectValue(obj, key, defaultValue = null) {
    let enumerator = obj;
    let property = key;

    if (CommonUtils.isEnumerable(enumerator) && CommonUtils.keyExists(property, enumerator)) {
      return enumerator[property];
    }

    const dotLastIndex = property.lastIndexOf('.');

    if (dotLastIndex >= 0) {
      const withoutLastKey = property.substr(0, dotLastIndex);
      enumerator = CommonUtils.getObjectValue(enumerator, withoutLastKey, defaultValue);
      property = property.substr(dotLastIndex + 1);
    }

    if (CommonUtils.isEnumerable(enumerator)) {
      return (CommonUtils.keyExists(property, enumerator) ? enumerator[property] : defaultValue);
    }
    return defaultValue;
  }

  /**
   * If the searched value is empty, then it gives the default value
   * @param {array|object} obj
   * @param {string} key key string separated with dot
   * @param {mixed} defaultValue  the default value to be returned if the specified
   * array key does not exists
   */
  static getObjectValueIfEmpty(obj, key, defaultValue = null) {
    const value = CommonUtils.getObjectValue(obj, key);

    if (CommonUtils.isEmpty(value)) {
      return defaultValue;
    }
    return value;
  }

  /**
   * Filters the array or object for empty values
   * @param {array|object} obj
   */
  static filter(obj) {
    let filteredObj = obj;

    if (CommonUtils.isEnumerable(obj)) {
      Object.keys(filteredObj).forEach((keyName) => {
        if (CommonUtils.isEmpty(filteredObj[keyName])) {
          delete filteredObj[keyName];
        }
      });

      // if array reset the keys
      if (Array.isArray(filteredObj)) {
        filteredObj = Object.values(filteredObj);
      }
    }

    return filteredObj;
  }

  /**
   * Creates new object from the two given objects with newObject
   * overriding properties of oldObject. This does not affect objects passwed in arguments
   * @param {object} oldObject
   * @param {object} newObject
   */
  static clone(oldObject, newObject) {
    return { ...oldObject,
      ...newObject
    };
  }


  // static convertJsonToQueryString(queryParrams)
  // {
  //   let queryString = "?"
  //   if(!CommonUtils.isEnumerableArray(queryParrams))
  //   {

  //   }

  //   return queryString
  // }

  /**
   * Get number from string
   * @param {string} str
   */
  static getNumber(str) {
    const number = str.replace(/([^0-9])+/g, '');
    return number;
  }

  static getServerURL() {
    let url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    return url
  }

  static titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  static convertStringToBoolean(str) {
    if (str == "true")
      return true;
    else if (str == "false")
      return false;
  }

  static addMinutes = (timestamp, minutes) => {
    let dt = new Date(timestamp);
    return new Date(dt.getTime() + minutes * 60000);
  }

  static addMilliseconds = (timestamp, Milliseconds) => {
    let dt = new Date(timestamp);
    return new Date(dt.getTime() + Milliseconds);
  }
  static covertDateToTimeStamps = (dt) => {
    return parseInt(Date.parse(dt)) / 1000;
  }
  static getMobileOperatingSystem() {

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return false;
  }

  /**
   * return difference between two date in ms
   * overriding properties of oldObject. This does not affect objects passwed in arguments
   * @param {TimeStamp} startDateTime
   * @param {TimeStamp} endDateTimie
   */
  static calculateTimePeriodInMilliSecond(startDateTime, endDateTimie) {
    let then = new Date(startDateTime * 1000);
    let now = new Date(endDateTimie * 1000);
    let ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
    return ms
  }

  static CreateCaptionForNavigator(timeStampInMiliseconds) {
    let timeStampInminutes = moment.duration(timeStampInMiliseconds).asMinutes();
    let captionValue = "";
    let minutes = 60;
    let dayIntoMinutes = 24 * 60
    let WeekIntoMinutes = 24 * 60 * 7
    let MonthIntoMinutes = 24 * 60 * 30
    let YearIntoMinutes = 24 * 60 * 365


    if (timeStampInminutes < minutes)
      captionValue = moment.duration(timeStampInMiliseconds).asMinutes().toFixed(1).replace(/\.0+$/, '') + " m"
    else if (timeStampInminutes >= minutes && timeStampInminutes < dayIntoMinutes)
      captionValue = moment.duration(timeStampInMiliseconds).asHours().toFixed(1).replace(/\.0+$/, '') + " h"
    else if (timeStampInminutes >= dayIntoMinutes && timeStampInminutes < WeekIntoMinutes)
      captionValue = moment.duration(timeStampInMiliseconds).asDays().toFixed(1).replace(/\.0+$/, '') + " d"
    else if (timeStampInminutes >= WeekIntoMinutes && timeStampInminutes < MonthIntoMinutes)
      captionValue = moment.duration(timeStampInMiliseconds).asWeeks().toFixed(1).replace(/\.0+$/, '') + " w"
    else if (timeStampInminutes >= MonthIntoMinutes && timeStampInminutes < YearIntoMinutes)
      captionValue = moment.duration(timeStampInMiliseconds).asMonths().toFixed(1).replace(/\.0+$/, '') + " M"
    else if (timeStampInminutes >= YearIntoMinutes)
      captionValue = moment.duration(timeStampInMiliseconds).asYears().toFixed(1).replace(/\.0+$/, '') + " y"

    return captionValue
  }


  static debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Suggests color in Hexadecimal for a signal according to predifined color preference order
  // Ignores colors that are already used in the Trend
  static suggestColorHex(ChartConfig) {
    var ColorPaletteSortedbyPreference = _.sortBy(ColorPalette, "colorId");
    var currentTrendColors;
    if (ChartConfig && ChartConfig.length > 0) {
      currentTrendColors = ChartConfig.map(a => a.colorCode);
    }

    var suggestedColor = "";
    var unusedPalette = "";

    // 
    if (currentTrendColors && currentTrendColors.length >0)  {
      
      unusedPalette = ColorPaletteSortedbyPreference.filter(a => currentTrendColors.indexOf(a.colorHex) < 0);

      var suggestedcolorIndex = unusedPalette.findIndex(
        a => a.colorId == Math.min.apply(Math, unusedPalette.map(a => a.colorId)));
      suggestedColor = unusedPalette[suggestedcolorIndex].colorHex;
    }else{
      suggestedColor = ColorPaletteSortedbyPreference[0].colorHex;
    }


    return (
      suggestedColor
    );
  }

  static mapToDefaultSeriesValues(series){
    let _id=shortid.generate();
   return{  name: series.name,
            description: series.description,
            unit: series.unit,
            tagPath: series.tagPath,
            colorCode: 'black',
            lineWidth: LineWidth["LineBig"],
            lineSymbol: LineSymbol["LineCircle"],
            retrivalMode: RetrivalMode["RAW"],
            enableSubmit: "",
            visible:true,
            id:_id,
            isExpression:false,
  }}

}



export default CommonUtils;