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
 * Module :  Data Explorer
 * Description :
 * Date:07-AUG-2018.
 * =============================================================================================================================================
 *
 * #endregion
 */


/**library import section Begin*/
import React, {
  Component
} from "react";
import DateRangePicker from "../controls/dateRangePicker/DateRangePicker";
import HttpClient from "../services/apiService";
import {
  apiURL,
  DefaultValue,
  gridRequests
} from "../constants/Constants";
import $ from 'jquery';
import {
  connect
} from 'react-redux'
import {
  TagGridView,
  Buttons
} from './dataexplorer';
import {
  DataExplorerGrid
} from './dataexplorergrid';
import CommonUtils from "../commonutils/CommonUtils";
import * as FileSaver from 'file-saver';
import axios from 'axios';
import moment from 'moment';

/**library import section End*/


class DataExplorerContainer extends Component {
  _export;


  export = () => {
    this._export.save();
  }

  pageSize = DefaultValue.PageSize; //default pageSize selection 20
  take = DefaultValue.Take; //default take selection 80
  state = {
    datepickerValueChangedFrom: false,
    atepickerValueChangedTo: false,
    tagsData: [],
    total: DefaultValue.Total, //default total selection 0
    skip: DefaultValue.Skip, //default skip selection 0
    startTime: null,
    endTime: null,
    tagsRequestData: [],
    pageSize: DefaultValue.PageSize,
    take: DefaultValue.Take,
    currenttag: "",
    isExpression: false,
    events: {},
    take: 13,
    data: []
  };


  /**Life Cycle Hook Section Begin */
  /* ***executed on first render on client side - contains daterange picker code and api requests*** */
  componentWillMount() {
    if (window.innerWidth >= 1920) {
      this.setState({
        take: 13
      })
    }
  }

  componentDidMount() {

    this.setState({
      startTime: this.props.timePeriodFromStore.startTime,
      endTime: this.props.timePeriodFromStore.endTime
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed

    if (prevProps.currentSeries !== this.props.currentSeries) {
      $("a").removeClass("active");
      $('#list a').eq(0).addClass('active');

      this.setState({
        tagsRequestData: this.props.currentSeries,
      }, () => {
        this.setDefualtTagSelected();
      });
    }

    if (CommonUtils.isPropchange(prevProps.timePeriodFromStore.startTime, this.props.timePeriodFromStore.startTime)) {
      this.setState({
        startTime: this.props.timePeriodFromStore.startTime,
        endTime: this.props.timePeriodFromStore.endTime
      })
    }
  }

  

  /**Life Cycle Hook Section end */

  setDefualtTagSelected() {

    if (this.state.tagsRequestData && this.state.tagsRequestData.length > 0) {


      let series = this.state.tagsRequestData[0];
      
      this.setState({
        tagsData: [],
        total: 0,
        currenttag: this.mapToCurrentTagDetails(series),
        isExpression: series.isExpression
      }, () => {
        this.fetchDefaultTagData(series);
      }

      );
    }


  }

  fetchDefaultTagData(series) {
    let filteredData = this.fetchDataById(series.id);
    if (filteredData) {
      let mapData = this.mapDataToGridFormat(filteredData);
      this.updateKendoDataBucket(mapData);
    }
  }

  /* Go Back to trender */
  cancelDataExplorer() {
    $(".trender-container").toggleClass("d-none d-block");
    $("#data-explorer").toggleClass("d-block d-none");
  }

  /* get Data picker values */

  datePickerValues = (startTime, endTime) => {
    this.setState({
      currenttag: this.state.currenttag, startTime: moment(startTime).unix() * 1000, endTime: moment(endTime).unix() * 1000, datepickerValueChanged: true, skip: 0, take: this.state.take,
      isExpression: this.state.isExpression,
      tagsData: []
    },
      () => {

        if (this.state.startTime > this.state.endTime) {
          alert("Please select valid time")
        }
        this.requestDataForGrid();
      })
  }
  


  tagPathFormation = (params) => {
    return "optimization_second:" + params.name
  }

  exportData = () => {
    var temp = []

    const tagPathForm = (temp) => {

      for (var i = 0; i < temp.length; i++) {
        if (temp[i].isExpression == false) {
          temp[i].name = temp[i].tagPath
        }
      }
      return temp
    }


    for (var i = 0; i < this.state.tagsRequestData.length; i++) {
      if (this.state.tagsRequestData[i].isExpression == true) {

        temp.push(this.mapToExportTagDetailsExp(this.state.tagsRequestData[i]))
      }
      else {
        temp.push(this.mapToExportTagDetails(this.state.tagsRequestData[i]))
      }


    }


    


    let gridData = {
      connString: apiURL.NEW_SERVERBASE_URL,
      payload: {
        timePeriod: "",
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        userID: localStorage.getItem("userID"),
        sessionID: localStorage.getItem("sessionID"),
        resource: localStorage.getItem("resource"),
        tag: temp,
        skip: 0,
        take: gridRequests.limit,
        maxReductionPoints: gridRequests.maxReductionPoints,
        timeOffset: "UTC%2B05%",
        RepresentationAlgorithm: gridRequests.RepresentationAlgorithm
      }
    }

    let url = apiURL.API_EXPORT;
    return (this.api = axios.create({
      baseURL: this.getBaseUrl(),
      responseType: 'blob'
    })).post(url, gridData)
      .then(response => {

        var dateTime = moment(new Date()).format("YYYY-MM-DD_HH-mm");

        let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, ('Report_' + dateTime + '.xlsx'));



      })
      .catch(error => {
        console.log(error);
      });

  };

  getBaseUrl() {
    // Insert logic here to get the baseURL by either:
    // 1. Sniffing the URL to determine the environment we're running in.
    // 2. Looking for an environment variable as part of the build process.
    return apiURL.BASE_URL
  }

  requestDataForGrid = () => {

    this.requestInProgress = true;

    let connString = apiURL.NEW_SERVERBASE_URL
    let representationAlgorithm = gridRequests.RepresentationAlgorithm
    if (this.state.isExpression) {
      connString = apiURL.NEW_SERVERBASE_URL.concat('/expression')
      representationAlgorithm = gridRequests.RepresentationAlgorithmForExpression
    }
    let gridData = {
      connString: connString,
      payload: {
        timePeriod: "",
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        userID: localStorage.getItem("userID"),
        sessionID: localStorage.getItem("sessionID"),
        resource: localStorage.getItem("resource"),
        tag: this.state.currenttag,
        skip: this.state.skip,
        take: this.state.take,
        maxReductionPoints: gridRequests.maxReductionPoints,
        RepresentationAlgorithm: representationAlgorithm,
        timeOffset: "UTC%2B05%"
      }
    };


   


    const httpClient = new HttpClient();

    let url = apiURL.API_DATAEXPLORER;
    

    httpClient
      .post(url, gridData)
      .then(response => {

        const total = response.data.payload.totalcount;

        const data = response.data.payload.data;
        var previousData = this.state.tagsData;
        var previousArray = [...previousData, ...data];
        this.setState({
          tagsData: previousArray,
          total: total,
          data: data
        })


      });

  }



  onPageChange = event => {

   
    if (this.state.datepickerValueChanged && this.state.startTime && this.state.endTime && this.state.currenttag) {

      this.setState({
        skip: event.page.skip,
        take: event.page.take
      }, () => {
        this.requestDataForGrid()
      });
    }
    else {
      this.setState({
        skip: event.page.skip,
        take: event.page.take,
        data: this.state.tagsData.slice(event.page.skip, event.page.take + event.page.skip)
      });
    }
  }

  loadingCell = (tdElement, props) => {

    if (props.dataItem === undefined || props.dataItem[props.field] === undefined) {
  
      return (
        <td>
          {" "}
          <span className="k-icon k-i-loading" />
        </td>
      );
    }

    
    return tdElement
  };

  reInitializeState() {
    this.setState({
      total: DefaultValue.Total, //default total selection 0
      skip: DefaultValue.Skip, //default skip selection 0
      pageSize: DefaultValue.PageSize,
      take: DefaultValue.Take,

    }, () => {
      this.requestDataForGrid();
    });
  }

  onTagClick = (e, series) => {

    $("a").removeClass("active");

    var eventTarget = $(e.target).closest('li').find('a');

    eventTarget.addClass("active");

    this.setState({
      tagsData: [],
      total: 0,
      skip: 0,
      take: 11,
      currenttag: this.mapToCurrentTagDetails(series),
      isExpression: series.isExpression
    }, () => {
      let filteredData = this.fetchDataById(series.id);
      if (this.state.datepickerValueChanged && this.state.startTime && this.state.endTime && this.state.currenttag) {
        this.reInitializeState();

      } else if (filteredData) {
        let mapData = this.mapDataToGridFormat(filteredData);
        this.updateKendoDataBucket(mapData);
      }
    }

    );


  }

  mapToCurrentTagDetails(tag) {
    if (tag.isExpression == true) {
      console.log("true")
      return {
        "name": tag.expressionValue,
        "retrivalMode": "raw",
        "description": "RTP",
        "UOM": "Q"
      }
    }
    else {
      return {
        "name": tag.tagPath,
        "retrivalMode": "raw",
        "description": "RTP",
        "UOM": "Q"
      }
    }

  }

  mapToExportTagDetails(tag) {

    return {
      "name": tag.tagPath,
      "retrivalMode": tag.retrivalMode,
      "description": tag.description,
      "UOM": tag.unit,
      "isExpression": tag.isExpression
    }
  }

  mapToExportTagDetailsExp(tag) {
    return {
      "name": tag.expressionValue,
      "retrivalMode": tag.retrivalMode,
      "description": tag.description,
      "UOM": tag.unit,
      "isExpression": tag.isExpression
    }
  }

  updateKendoDataBucket(mapData) {
    if (window.innerWidth >= 1920) {

    }

    this.setState({
      tagsData: mapData,
      total: mapData && mapData.length > 0 ? mapData.length : 0,
      data: mapData && mapData.length > 0 ? mapData.slice(this.state.skip, this.state.take + this.state.skip) : []
    });
  }


  fetchDataById(id) {
    let filteredData = this.props.currentSeries.filter(item => {
      return item.id === id;
    })
    if (filteredData && filteredData.length > 0) {
      return filteredData[0].data;
    } else {
      return null;
    }
  }



  mapDataToGridFormat = (data) => {

    let result = [];
    if (data && data.length > 0) {
      data.map(val => {
        result.push({
          timestamp: moment(val[0]).format('DD MMM YYYY  h:mm:ss A'),
          value: val[1],
          quality: val[2]
        })
      })
      return result;
    }


  }
  render() {

    return (
      <div className="data-explorer d-none" id="data-explorer" >
        <h3 className="text-blue white-control-area">Data Grid</h3>
        <div className="data-grid-area">
          <div className="row mb-3">
            <div className="col-lg-12">
              <span className="content-heading mr-3">Export Data Between</span>
              <DateRangePicker startDate={moment((this.state.startTime)).format('DD MMM YYYY  h:mm A')} endDate={moment((this.state.endTime)).format('DD MMM YYYY  h:mm A')} datePickerValues={this.datePickerValues} />
            </div>
          </div>

          <div className="row export-data-table">
            <TagGridView onTagClick={this.onTagClick} {...this.props} />
            <div className="col-9 tag-data-col">
              <DataExplorerGrid loadingCell={this.loadingCell} onPageChange={this.onPageChange} {...this.state} />
            </div>
          </div>

          <Buttons exportData={this.exportData} cancelDataExplorer={this.cancelDataExplorer} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    currentSeries: Object.assign([], state.addSeriesReducer.ChartConfig),

    timePeriodFromStore: {
      startTime: state.addSeriesReducer.startTime * 1000, endTime: state.addSeriesReducer.endTime * 1000,
      timePeriod: state.addSeriesReducer.timePeriod
    } 
  };
}



export default connect(
  mapStateToProps,
  null,
)(DataExplorerContainer)
