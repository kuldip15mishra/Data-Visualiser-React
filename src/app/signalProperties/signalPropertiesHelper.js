import HttpClient from "../services/apiService"
import queryString from 'query-string';
import { apiURL, AlertMessage, Status, DefaultValue, RetrivalMode } from "../constants/Constants"
export const getTagsValue = (url) => {
    var res=getTagsInfo(url);
    
    setTimeout(function () {
    return res;
    },1000)
}

const httpClient = new HttpClient();
const getTagsInfo = (url) => {
  var result= {}
    httpClient.get(url)
      .then(response => {
          result= response;
          return result
      })
      .catch(error => {
       
            return "";
          //this.showPopUpNotification(AlertMessage.Error, Status.Error)
    
      });
}

