import React, { Component, Fragment } from 'react';
import SignalFunctionDetails from '../signalFunctionDetails/SignalFunctionDetails';
import FunctionBrowserList from './FunctionBrowserList'
import FunctionBrowserSearch from './FunctionBrowserSearch'
import { FunctionWikiList } from '../constants/Constants'
class FunctionBrowserContainer extends Component {
  state = {
    functionWikiList: FunctionWikiList,
    selectedFunctionWiki: {},
    isSignalFunctionDetailEnable: false
  }

  onSelectWikiFunctionChange = (e) => {
    this.searchWikifunctionbyInput(e.target.value);
  };

  onWikiFunctionSelection = (id) => {
    this.setselectedFunctionWiki(id);
  }


  onbackWikiFunction = () => {
    this.setState({
      isSignalFunctionDetailEnable: false
    })
  }
  setselectedFunctionWiki(id) {
    let selectedFunctionWikibyid = FunctionWikiList.filter((functionwiki) => functionwiki.functionId == id)[0];
    this.setState({
      selectedFunctionWiki: selectedFunctionWikibyid,
      isSignalFunctionDetailEnable: true
    }, () => {
      document.getElementById("signalfunctionsyntax").innerHTML = this.state.selectedFunctionWiki.Syntax
      document.getElementById("signalfunctionremarks").innerHTML = this.state.selectedFunctionWiki.Remarks
      document.getElementById("signalfunctionusage").innerHTML = this.state.selectedFunctionWiki.Usage
    })
  }


  searchWikifunctionbyInput(searchText) {
    let searchfunctionlist = [];
    for (let i = 0; i <= FunctionWikiList.length - 1; i++) {
      if (FunctionWikiList[i].functionName.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
        searchfunctionlist.push(FunctionWikiList[i]);
      }
    }

    this.setState({
      functionWikiList: searchfunctionlist
    })
  }



  render() {
    return (
      <div className="function-wiki">
        <h3>Function Wiki</h3>
        <div className="search-box">
          <div className="search-form mb-2">
            <FunctionBrowserSearch SelectWikiFunctionChange={this.onSelectWikiFunctionChange}></FunctionBrowserSearch>
          </div>
          <div className="search-area">
            <FunctionBrowserList FunctionWikiList={this.state.functionWikiList}
              SelectedFunctionWiki={this.onWikiFunctionSelection}
            ></FunctionBrowserList>
            <SignalFunctionDetails SelectedFunctionWiki={this.state.selectedFunctionWiki}
              isEnable={this.state.isSignalFunctionDetailEnable}
              BackWikiFunction={this.onbackWikiFunction}
            ></SignalFunctionDetails>
          </div>
        </div>
      </div>

    );
  }
}

export default FunctionBrowserContainer;