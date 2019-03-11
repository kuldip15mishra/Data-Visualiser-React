import HttpClient from "../services/apiService";
import CommonUtils from '../commonutils/CommonUtils'
import { apiURL } from "../constants/Constants"



export const getAllTrends = () => {

    var userID= localStorage.getItem("userID") 
    var trendMetaRequestModel = {
        "collectionName": "metatrender",
        "payload": [{"userid":localStorage.getItem("userID")} ],
        "operation": "search"
    }

    const httpClient = new HttpClient();
    let url = apiURL.API_TRENDMETA;
    return httpClient.post(url, trendMetaRequestModel)
        .then(response => {

            if (!CommonUtils.isEmpty(response.data.payload)) {
                if (response.data.payload.length > 0) {
                    return response.data.payload;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const getSelectedTrend = (params) => {
    var trendMetaRequestModel = {
        "collectionName": "metatrender",
        "payload": [params],
        "operation": "getdetail"
    }
  
    const httpClient = new HttpClient();
    let url = apiURL.API_TRENDMETA;
    return httpClient.post(url, trendMetaRequestModel)
        .then(response => {

            if (!CommonUtils.isEmpty(response.data.payload)) {
                if (response.data.payload.length > 0) {
                    return response.data.payload;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const deleteSelectedSaveTrend = (params) => {
    
    var trendMetaRequestModel = {
        "collectionName": "metatrender",
        "payload": [params],
        "operation": "delete"
    }

    
    const httpClient = new HttpClient();
    let url = apiURL.API_TRENDMETA;
    return httpClient.post(url, trendMetaRequestModel)
        .then(response => {

            if (!CommonUtils.isEmpty(response.data.payload)) {
                if (response.data.payload.Message = "Trend successfuly deleted from mongodb") {
                    return response.data.payload;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

