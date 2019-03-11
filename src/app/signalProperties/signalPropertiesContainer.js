
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
* Module :  Signal Properties Component
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
import { apiURL, Status, AlertMessage, DefaultValue,RetrivalMode, LineWidth, LineSymbol } from "../constants/Constants"
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer"
import CommonUtils from '../commonutils/CommonUtils'
import SignalProperties from './signalProperties'
import SignalPropertiesList from './signalPropertiesList'
import * as MenuActions from '../actions/index';
import { connect } from 'react-redux'
import SignalMenu from '../signalMenu/SignalMenu';
/**library import section Begin*/



class SignalPropertiesContainer extends Component {
  state = {
    signalPropertiesListData: [],
    searchName:"",
    input:"",
    emptySignalPropertiesMsg: DefaultValue.EmptySignalPropertiesMsg,
    emptySignalPropertiesMsgHeader: DefaultValue.EmptySignalPropertiesMsgHeader,
    connectionname:""
    
  }
  /**Life Cycle Hook Section Start*/
  componentDidMount() {
    $("#tag-name").focus();

  }

  componentDidUpdate(Prevprops,Prevstate){
    if(CommonUtils.isPropchange(Prevprops.signalMenuSelectedTagData,this.props.signalMenuSelectedTagData)){
     
      var currentSelectedTagData ={
                          name:this.props.signalMenuSelectedTagData.name,
                          unit :this.props.signalMenuSelectedTagData.unit,
                          description :this.props.signalMenuSelectedTagData.description,
                          type:this.props.signalMenuSelectedTagData.type,
                          source :this.props.signalMenuSelectedTagData.source,
                          tagPath:this.props.signalMenuSelectedTagData.tagPath
                            }
                            this.setState({signalPropertiesListData :currentSelectedTagData});
  }
}

  onBackClick =(e)=>{
    this.props.setMenuStore({
      isShowSignalPropertiesContainer: false,
      isShowSignalFunctionsContainer:false,
      isShowTagBrowserContainer:false,
    isClearContainer: true
    });
    this.props.resetMenu();
  }

  handleChanged= (e)=> {
    this.setState({ input: e.target.value });
  }
  /**Life Cycle Hook Section End*/

  /**Event Section Begin */
  //this function call by search change which helps to fetch tag list
   // selfEvent= e;
  onSelect =() => {
    var inputs=this.state.input;
    //if searching is done by search button click
    if (inputs.length == undefined) {

      this.eventHandler(this.state.tagValueData,"")

    }

  

    //if length becomes zero
    else if(inputs.length==0){
        this.setState({searchName: inputs, signalPropertiesListData: [], emptySignalPropertiesMsg: DefaultValue.EmptySignalPropertiesMsg, emptySignalPropertiesMsgHeader:DefaultValue.EmptySignalPropertiesMsgHeader});
    }

  

    //if searching is done on onchange
    else if (inputs.length > 0) {
    
      this.setState({searchName: inputs})
      this.eventHandler(inputs,this.state.searchDesc)

      this.setState({ typedData: inputs });
    }

    else {

      this.setState({ signalPropertiesListData: [] });
    }
  }





  

  eventHandler = (eventValue, eventDescription) => {
    let dataItem = {};
    dataItem.tagID = eventValue != "" ? eventValue : "NA";
    dataItem.tagDescription = eventDescription!=""? eventDescription:"NA";
    this.gettagBrowserDatabyTagID(dataItem.tagID, dataItem.tagDescription);
    this.setState({ tagValueData: eventValue });
  }



  
  /**Function Section Begin */
  //get taglist from APP service by enter search
  gettagBrowserDatabyTagID = (tagID) => {
    let url='';

    const httpClient = new HttpClient();
    if(tagID!='NA'){
       
       url = "https://api.signal.ddriven.in:1111/trender/signals" + "?" + "tagPath="+tagID; 
        
       
    }
    
    httpClient.get(url)
      .then(response => {
        if (!CommonUtils.isEmpty(response.data.data)) {
          if (response.data.totalCount > 0) {
            let tagname = response.data.data[0].tagPath
            let str = tagname.split(':')[0];
            this.setState({ signalPropertiesListData: response.data.data[0], connectionname:str});
          }
          else {
            
            this.setState({ signalPropertiesListData: [], emptySignalPropertiesMsg: AlertMessage.EmptySignalPropertiesMsg, emptySignalPropertiesMsgHeader: AlertMessage.EmptySignalPropertiesMsgHeader });
          }
        }
        else {
          this.setState({ signalPropertiesListData: [], emptySignalPropertiesMsg: AlertMessage.EmptySignalPropertiesMsg, emptySignalPropertiesMsgHeader: AlertMessage.EmptySignalPropertiesMsgHeader });
          
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





  showInfoNotification(message,type) {
    this.notification.showPopUpNotification(message,type);
  }

  /**Function Section End */
  render() {
    return (
      <Fragment>
      <a href="javascript:void;" className="back-btn mobile-none" onClick={this.onBackClick}><i className="ti-angle-left"></i></a> <h3 className="text-blue column-heading mobile-none">Signal Properties</h3>
      <div className="search-box">
        <SignalProperties handleChange={this.handleChanged} searchBoxChange={this.onSelect} />
        
      </div>
      <SignalPropertiesList
          
          signalPropertiesListData={this.state.signalPropertiesListData}
          emptySignalPropertiesMsg={this.state.emptySignalPropertiesMsg}
          emptySignalPropertiesMsgHeader={this.state.emptySignalPropertiesMsgHeader}
          connectionname = {this.state.connectionname}
          />
    </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    
    signalMenuSelectedTagData: Object.assign({}, state.menu.signalMenuSelectedTagData),
  };
}


const mapDispatchToProps = dispatch => {
  return {
    setMenuStore: menuState => dispatch(MenuActions.setSignalMenuState(menuState)),
    resetMenu :()=> dispatch(MenuActions.resetMenu())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalPropertiesContainer)
