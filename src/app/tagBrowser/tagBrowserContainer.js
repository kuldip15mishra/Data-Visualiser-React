
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
* Module :  TagBrowser Component
* Description : it is a component which gives tags information into the list according to the search by user
* Date:01-JUNE-2018.
* =============================================================================================================================================
 *
 * #endregion
*/

/**library import section Begin*/
import React, { Component, Fragment } from 'react'
import $ from 'jquery';
import kendo from '@progress/kendo-ui';
import HttpClient from "../services/apiService"
import { apiURL, Status, AlertMessage, DefaultValue, RetrivalMode, LineWidth, LineSymbol, ColorPalette } from "../constants/Constants"
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer"
import CommonUtils from '../commonutils/CommonUtils'
import TagBrowserSearchBox from './TagBrowserSearchBox'
import TagBrowserList from './TagBrowserList'
import { connect } from 'react-redux'
import * as addSeriesActions from '../addSeries/addSeriesActions';
import * as shortid from 'shortid';
import * as MenuActions from '../actions/index';
import { _ } from 'underscore';
import * as  tagBrowserActions from '../tagBrowser/TagBrowserActions';
import Fuse from "fuse.js";
// import _ from "lodash/fp";
//import PouchDB from 'pouchdb';
/**library import section Begin*/
import axios from 'axios';
var ColorPaletteSortedbyPreference = _.sortBy(ColorPalette, "colorId");

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
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

class TagBrowserContainer extends Component {
  tagListDb = null
  constructor(props) {
    super(props);
   // this.tagListDb = new PouchDB('tagListDb', { skip_setup: true });

  }


  state = {
    tagBrowserListData: [],
    tagList: [],
    searchName: "",
    searchDesc: "",
    colorSelected: '',
    hasError: false,
    isLoading: false,
    emptyTagBrowserMsg: DefaultValue.EmptyTagBrowserMsg,
    emptyTagBrowserMsgHeader: DefaultValue.EmptyTagBrowserMsgHeader
  }


  /**Life Cycle Hook Section Start*/
  componentDidMount() {
    $("#txtsearch").focus();
    let self = this
    //this.loadTagList();

    // setTimeout(function () {

    //   self.setState({ tagBrowserListData: self.props.tagList[0].data, tagList: self.props.tagList[0].data });
    // }, 1000)

  }

  componentDidUpdate() {

  }
  /**Life Cycle Hook Section End*/

  /**Event Section Begin */





  //this function call by search change which helps to fetch tag list
  
  // selfEvent= e;
  onSelect = debounce((e) => {
    this.setState({
      emptyTagBrowserMsg: "No Signals are found",
      emptyTagBrowserMsgHeader: ""
    });
    //if searching is done by search button click
    if (e.target.value == undefined) {

      this.eventHandler(this.state.tagValueData, "")



    }

    //if length becomes zero
    else if (e.target.value.length == 0) {
      this.setState({
        searchName: e.target.value,
        tagBrowserListData: []
      });
    }



    //if searching is done on onchange
    else if (e.target.value.length > 0) {
      this.setState({ searchName: e.target.value })
      this.eventHandler(e.target.value, this.state.searchDesc)
      // this.setState({
      //   searchName: e.target.value,
      //   tagBrowserListData: [],
      //   emptyTagBrowserMsg: DefaultValue.EmptyTagBrowserMsg,
      //   emptyTagBrowserMsgHeader: DefaultValue.EmptyTagBrowserMsgHeader
      // },()=> {
      //   this.eventHandler(e.target.value, this.state.searchDesc) 
      // });
      //for elastic search
    
      
      this.setState({ typedData: e.target.value });
    }

    else {

      this.setState({ tagBrowserListData: [] });
    }
  }, 500)

  // onSelect = (e) => {

  //   var options = {
  //     shouldSort: true,
  //     threshold: 0.2,
  //     location: 0,
  //     distance: 100,
  //     maxPatternLength: 32,
  //     minMatchCharLength: 1,
  //     keys: [
  //       "name",
  //       "description"
  //     ]
  //   };
  //   var fuse = new Fuse(this.state.tagList, options); // "list" is the item array

  //   var result = fuse.search(e.target.value);
  //   if (e.target.value.length > 0)
  //     this.setState({ tagBrowserListData: result })
  //   else
  //     this.setState({ tagBrowserListData: this.state.tagList })
  // }

  // loadTagList() {
  //   let self = this
  //   this.tagListDb.info()
  //     .then((result) => {

  //       if (result.doc_count === 0) {
          

  //         self.props.getTagList();

  //         setTimeout(function () {
         
  //           self.tagListDb.bulkDocs(self.props.tagList[0].data).then(function (response) {
  //             self.setState({ tagBrowserListData: self.props.tagList });
  //             self.setState({ tagBrowserListData: self.props.tagList[0].data, tagList: self.props.tagList[0].data });
  //           }).then(function (err) {
  //             console.log("Error", err)
  //           });

  //         }, 2000)
  //       } else {
  //         self.tagListDb
  //           .allDocs({ include_docs: true })
  //           .then(function (docs) {
  //             //console.log(docs.rows)
  //             let tagListdata = self.formattedsignalData(docs.rows)
  //             self.setState({ tagBrowserListData: tagListdata });
  //             self.setState({ tagBrowserListData: tagListdata, tagList: tagListdata });
              
  //           })
  //       }
  //     })
  //     .catch(e => {
  //       alert("service error");
  //       // No database found and it was not created.
  //       // Do something else...
  //     });

  //   //this.setState({ tagBrowserListData: this.props.tagList });
  // }
  /*
    onSelectDesc = (e) =>{
      var options = {
        shouldSort: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "description"
        ]
      };
      var fuse = new Fuse(this.state.tagList, options); // "list" is the item array
  
      var result = fuse.search(e.target.value);
     
      if (e.target.value.length > 0)
        this.setState({ tagBrowserListData: result })
      else
        this.setState({ tagBrowserListData: this.state.tagList })
    }
  
    onSelectDesc1 = debounce((event) => {
      //if searching is done by search button click
      if (event.target.value == undefined) {
  
        this.eventHandler(this.state.tagValueData, "")
  
  
  
      }
  
      //if length becomes zero
      else if (event.target.value.length == 0) {
        this.setState({
          searchDesc: event.target.value,
          tagBrowserListData: [],
          emptyTagBrowserMsg: DefaultValue.EmptyTagBrowserMsg,
          emptyTagBrowserMsgHeader: DefaultValue.EmptyTagBrowserMsgHeader
        });
      }
  
  
      //if searching is done on onchange
      else if (event.target.value.length > 0) {
        this.setState({ searchDesc: event.target.value })
        this.eventHandler(this.state.searchName, event.target.value)
  
        this.setState({ typedData: event.target.value });
      }
  
      else {
  
        this.setState({ tagBrowserListData: [] });
      }
  
    }, 500)
  
  */

  formattedsignalData(tagDataListsource) {
    let tagdataList = [];
    for (let i = 0; i < tagDataListsource.length - 1; i++) {
      let tagData = {};
      tagData.description = tagDataListsource[i].doc.description
      tagData.name = tagDataListsource[i].doc.name
      tagData.source = tagDataListsource[i].doc.source
      tagData.type = tagDataListsource[i].doc.type
      tagData.unit = tagDataListsource[i].doc.unit
      
      tagData.tagPath = tagDataListsource[i].doc.tagPath 
 
      tagData._id = tagDataListsource[i].doc._id
      tagdataList.push(tagData);
    }
    return tagdataList;
  }

  eventHandler = (eventValue, eventDescription) => {
    let dataItem = {};
    dataItem.tagID = eventValue != "" ? eventValue : "NA";
    dataItem.tagDescription = eventDescription != "" ? eventDescription : "NA";
    //this.gettagBrowserDatabyTagID(dataItem.tagID, dataItem.tagDescription);
    this.gettagBrowserDatabyTagIDElastic(dataItem.tagID, dataItem.tagDescription);
    this.setState({ tagValueData: eventValue });
  }

  //copy tagdata by click coppy button
  onCopyTagbrowserData = (index) => {
    // this.props.CopyTagbrowserData(this.state.tagBrowserListData[index]);
    this.props.copytoClipBoard(this.state.tagBrowserListData[index]);
  }

  // Suggests color in Hexadecimal for a signal according to predifined color preference order
  // Ignores colors that are already used in the Trend
  suggestColorHex = () => {
    var currentTrendColors = this.props.ChartConfig.map(a => a.colorCode);

    var suggestedColor = "";
    var unusedPalette = "";

    // 
    if (currentTrendColors && currentTrendColors.length === 0) {
      suggestedColor = ColorPaletteSortedbyPreference[0].colorHex;

    } else {
      unusedPalette = ColorPaletteSortedbyPreference.filter(a => currentTrendColors.indexOf(a.colorHex) < 0);

      var suggestedcolorIndex = unusedPalette.findIndex(
        a => a.colorId == Math.min.apply(Math, unusedPalette.map(a => a.colorId)));
      suggestedColor = unusedPalette[suggestedcolorIndex].colorHex;
    }


    return (
      suggestedColor
    );
  }

  handleAddSignal = (index) => {
    this.setState({
      // colorSelected: this.state.colors[this.state.counter],
      colorSelected: this.suggestColorHex()
      // counter:(this.state.counter)+1
    }, () => {
      this.props.addSeries(this.mapToDefaultSeriesValues(this.state.tagBrowserListData[index]));
      $("#page-container").removeClass("tab-sb-2-open");
    });
  }

  copyTags = (index) => {

    var temp = document.createElement("input");

    // Assign it the value of the specified element

    var tempObj = this.props.copytoClipBoard(this.state.tagBrowserListData[index].tagPath).payload
    temp.setAttribute("value", tempObj)

    // Append it to the body
    document.body.appendChild(temp);
    // Highlight its content
    temp.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(temp);

  }

  shouldComponentUpdate(nextProps, nextState) {

    if ((nextState.tagBrowserListData.length !== this.state.tagBrowserListData.length)) {

      return true;
    }
    else { return false; }
  }


  onBackClick = (e) => {
    this.props.setMenuStore({
      isShowSignalPropertiesContainer: false,
      isShowSignalFunctionsContainer: false,
      isShowTagBrowserContainer: false,
      isClearContainer: true
    })
  }
  mapToDefaultSeriesValues(series) {
    let _id = shortid.generate();
    return {
      name: series.tagName,
      description: series.description,
      unit: series.unit,
      tagPath:series.tagPath, 
      colorCode: this.state.colorSelected,
      lineWidth: LineWidth["LineBig"],
      lineSymbol: LineSymbol["LineCircle"],
      retrivalMode: RetrivalMode["RAW"],
      enableSubmit: "",
      visible: true,
      id: _id,
      isExpression: false,
      source: series.source,
      type: series.type
    }
  }
  //copy tagdata and add series by click coppyandaddseries button


  onCopyTagbrowserDataandAddSeries = (index) => {
    this.showInfoNotification();
    this.props.CopyTagbrowserData(this.state.tagBrowserListData[index]);

  }


 
  /**Function Section Begin */
  //get taglist from APP service by enter search
  gettagBrowserDatabyTagID = (tagID, tagDescription) => {
    let url = '';

    const httpClient = new HttpClient();
    if (tagDescription == 'NA') {

    
      url = apiURL.API_TAGBROWSER + "?" + "name=" + tagID;

    }
    else if (tagID == 'NA') {

      
      url = apiURL.API_TAGBROWSER + "?" + "description=" + tagDescription;

    }
    else {

     
      url = apiURL.API_TAGBROWSER + "?" + "description=" + tagDescription + "&" + "name=" + tagID;

    }


    httpClient.get(url)
      .then(response => {

        if (!CommonUtils.isEmpty(response.data.payload.data)) {
          if (response.data.payload.data.length > 0) {

            this.setState({ tagBrowserListData: response.data.payload.data });
          }
          else {
            this.setState({ tagBrowserListData: [], emptyTagBrowserMsg: AlertMessage.EmptyTagBrowserMsg, emptyTagBrowserMsgHeader: AlertMessage.EmptyTagBrowserMsgHeader });
          }
        }
        else {
          this.setState({ tagBrowserListData: [], emptyTagBrowserMsg: AlertMessage.EmptyTagBrowserMsg, emptyTagBrowserMsgHeader: AlertMessage.EmptyTagBrowserMsgHeader });
        }
      })
      .catch(error => {
        this.setState({
          hasError: true,
          isLoading: false
        }, () => {
          //this.showPopUpNotification(AlertMessage.Error, Status.Error)
        })
      });
  }


  gettagBrowserDatabyTagIDElastic = (tagID, tagDescription) => {
    //let url =apiURL.BASE_URL + apiURL.API_TAGBROWSERELASTIC;

    let url = '';

    const httpClient = new HttpClient();
    if (tagDescription == 'NA') {

      //url = apiURL.API_TAGBROWSER + "?" + "name=%"+tagID+"%";
      url = apiURL.API_TAGBROWSERELASTIC + "?" + "tagName=" + tagID;

    }
    else if (tagID == 'NA') {

      // url = apiURL.API_TAGBROWSER + "?" + "description=%" +tagDescription+"%";
      url = apiURL.API_TAGBROWSERELASTIC + "?" + "description=" + tagDescription;

    }
    else {

      //  url = apiURL.API_TAGBROWSER + "?" + "description=%" +tagDescription + "%&" + "name=%" +tagID+"%" ;
      url = apiURL.API_TAGBROWSERELASTIC + "?" + "tagPath=" + tagDescription + "&" + "tagName=" + tagID;

    }


    httpClient.get(url)
      .then(response => {

        if (!CommonUtils.isEmpty(response.data.payload.data)) {
 
          if (response.data.payload.data.length > 0) {

            this.setState({ tagBrowserListData: response.data.payload.data });
          }
          else {
 
           
            this.setState({ tagBrowserListData: [], emptyTagBrowserMsg: AlertMessage.EmptyTagBrowserMsg, emptyTagBrowserMsgHeader: AlertMessage.EmptyTagBrowserMsgHeader });
          }
        }
        else {
          
         
          
          this.setState({ tagBrowserListData: [], emptyTagBrowserMsg: AlertMessage.EmptyTagBrowserMsg, emptyTagBrowserMsgHeader: AlertMessage.EmptyTagBrowserMsgHeader });
     
          this.forceUpdate();
        }
      })
      .catch(error => {
        this.setState({
          hasError: true,
          isLoading: false
        }, () => {
          //this.showPopUpNotification(AlertMessage.Error, Status.Error)
        })
      });
  }


  showInfoNotification(message, type) {
    this.notification.showPopUpNotification(message, type);
  }

  /**Function Section End */
  render() {
    return (
      <Fragment>
        <a href="javascript:;" className="back-btn mobile-none" onClick={this.onBackClick}><i className="ti-angle-left"></i></a><h3 className="column-heading text-blue mobile-none">Signal Browser</h3>
        <div className="search-box">
          <TagBrowserSearchBox searchBoxChange={this.onSelect} searchBoxDesc={this.onSelectDesc} />
          <TagBrowserList
            onCopyTagbrowserData={this.onCopyTagbrowserData}
            tagBrowserListData={this.state.tagBrowserListData}
            emptyTagBrowserMsg={this.state.emptyTagBrowserMsg}
            emptyTagBrowserMsgHeader={this.state.emptyTagBrowserMsgHeader}
            onAddSignal={this.handleAddSignal}
            copyTags={this.copyTags}
          />
        </div>



        <NotificationContainer width={1000}
          height={50}
          position={{ top: 0, left: 500 }}
          stacking={'down'}
          ref={a => this.notification = a} />
      </Fragment>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addSeries: series => dispatch(addSeriesActions.addSeries(series)),
    copytoClipBoard: series => dispatch(addSeriesActions.addTagInfoToClipBoard(series)),
    setMenuStore: menuState => dispatch(MenuActions.setSignalMenuState(menuState)),
    getTagList: () => dispatch(tagBrowserActions.getTagList())
  };
};

function mapStateToProps(state) {
  return {
    // data: Object.assign([], state.addSeriesReducer.ChartConfig),
    ChartConfig: state.addSeriesReducer.ChartConfig,
    tagList: state.tagBrowserReducer.tagList
  };
}

export default connect(
  // null,
  mapStateToProps,
  mapDispatchToProps
)(TagBrowserContainer)