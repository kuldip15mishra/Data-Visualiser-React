import HttpClient from "../services/apiService"
import queryString from 'query-string';
import { apiURL, AlertMessage, Status, DefaultValue, RetrivalMode } from "../constants/Constants"
export const getTagValue = (extremeValues) => {
    getTagValues(extremeValues);
}


const getTagValues = (extremeValues) => {
    let callTypeList = [DefaultValue.Current, DefaultValue.Min, DefaultValue.Max, DefaultValue.Avg]
    let self = this
    let linksArr = [];


    let timeStamplist = {};
    timeStamplist.timestamp1 = extremeValues.min/1000;
    timeStamplist.timestamp2 = extremeValues.max/1000;

    for (let i = 0; i < callTypeList.length; i++) {
        linksArr.push(generatePoint(callTypeList[i], extremeValues.target.series, timeStamplist))
    }
   
    const httpClient = new HttpClient();

    httpClient.getallList(linksArr)
        .then(function (results) {
            let result = results.map(r => r.data.data);
        });
}

const generatePoint = (pointType, tagnameList, timeStamplist) => {
    switch (pointType) {
        case DefaultValue.Current://raw
            return generateUrlForPointCurrent(tagnameList);
            break;
        default://min,max,avg
            return generateUrlForPointAggregate(tagnameList, pointType, timeStamplist);
    }
}

const generateUrlForPointCurrent = (tagNameList) => {
    let QueryJson = {}
    QueryJson.name = tagNameList.map(r => r.name);
    let url = generatePointUrl(DefaultValue.Current, QueryJson);
    return url;
}

const generateUrlForPointAggregate = (tagNameList, aggregateType, timeStamplist) => {
    let QueryJson = {}
    QueryJson.name = tagNameList.map(r => r.name);
    QueryJson.timestamp1 = timeStamplist.timestamp1
    QueryJson.timestamp2 = timeStamplist.timestamp2
    QueryJson.function = aggregateType;

    let url = generatePointUrl(DefaultValue.Aggregate, QueryJson);
    return url;
}

const generatePointUrl = (type, urlParramData) => {
    type = type + "?"
    return apiURL.SERVERBASE_URL.concat(apiURL.API_TAGVALUE).concat(type).concat(queryString.stringify(urlParramData))
}