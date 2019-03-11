
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
* Module :  App (Starter component)
* Description : it is a entry component which loads first at the time application load
* Date:31-JULY-2018.
* =============================================================================================================================================
 * 
 * #endregion
*/

import React, { Component } from "react";
import MytrendContainer from "../myTrends/MyTrendContainer";
import TrenderAreaContainer from "../trenderArea/trenderAreaContainer";
import DataExplorerContainer from "../dataexplorer/dataexplorerContainer";
import SignalMenu from "../signalMenu/SignalMenu";

export const AppContext = React.createContext();

class MainBody extends Component {
  state = {
    TagBrowserContext: {},
    tagsData: []
  };

  //copy tag info from tagbrowsercomponent by calling method.
  onCopyTagbrowserData = (tagBrowserListData) => {
    document.addEventListener('copy', function (e) {
      e.preventDefault();
    });
    this.setState(Object.assign({}, this.state, { TagBrowserContext: tagBrowserListData }));
  }

  getTagsData = (tagsDataFromTrenderArea) => {
    this.setState({ tagsData: tagsDataFromTrenderArea }, () => {
    });
  }



  detectBrowser() {


    var alterClass = function () {
      var ww = document.body.clientWidth;
      var wh = document.body.clientHeight;
      if (ww < 1050) {
        $('#page-container').removeClass('sb-1-open sb-2-open');
        $('#page-container').addClass('tablet-menu');
        console.log("tablet class");
      } else if (ww >= 1050 && wh <= 1020) {
        $('#page-container').addClass('sb-1-open sb-2-open');
        $('#page-container').removeClass('tablet-menu');
        console.log("laptop view");
      }
      else if (ww <= 1370 && wh >= 1020) {
        $('#page-container').removeClass('sb-1-open sb-2-open');
        $('#page-container').addClass('tablet-menu');
        console.log("pro view");
      }
    };
    $(window).resize(function (e) {
     
      if(e.target.className !== "trender-chart-area ui-resizable ui-resizable-resizing"){
        alterClass();
      }
    
    });
    alterClass();

  }


  componentDidMount() {
    this.detectBrowser();
  }

  render() {

    return (<div className="page-container" id="page-container">
      <MytrendContainer />
      <SignalMenu />
      <div className="content-area">
        <TrenderAreaContainer />
        <DataExplorerContainer />

      </div>
    </div>);
  }
}

export default MainBody;
