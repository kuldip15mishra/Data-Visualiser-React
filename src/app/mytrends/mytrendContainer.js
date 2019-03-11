import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as mytrendActions from './mytrendActions';
import * as addSeriesActions from '../addSeries/addSeriesActions';
import * as TrenderAreaActions from '../trenderArea/action';
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer";
import { Status, AlertMessage } from "../constants/Constants";
import { Scrollbars } from 'react-custom-scrollbars-patched';
class MytrendContainer extends Component {

  componentWillMount() {
    this.props.fetchSaveTrends();
  }
  componentDidMount() {
    $("#sb-1-toggle-btn").click(function () {
      // $("#page-container").toggleClass("sb-1-open");
    });
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isdelete !== this.props.isdelete) {
        this.showInfoNotification(AlertMessage.DeleteTrend, Status.Success);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
   
    if(nextProps.trends.length !== this.props.trends.length){ 
      
      return true}
    else {return false;}
  }
  showInfoNotification(message, type) {
    this.notification.showPopUpNotification(message, type);
  }


  resetStore = () => {
    document.getElementById("new-trend-name").innerHTML = "";
    this.props.resetMyTrend();
    this.props.newTrend();
    this.props.resetTrenderAreaStore();
  }

  handleOnClickSaveTrend =(item, event)=>{
    $(".dark-overlay").hide();
    $(".white-overlay").hide();
    $("#page-container").removeClass("tab-sb-1-open");
    this.props.onSaveTrendClick(item, event);
  }
  render() {
   let t=this;
    let onDeleteTrendClick = this.props.onDeleteTrendClick;
    var newTrend = this.props.newTrend;
    const trendlist = this.props.trends.map(function (item, index) {

      return <li key={index}>
        <div title={item.name} className="trend-name">{item.name}</div>
        <a onClick={(event) => t.handleOnClickSaveTrend(item, event)} href="javascript:;" />
        <button className="delete-trend" onClick={(event) => onDeleteTrendClick(item)}><i className="icon dd-trash"></i></button>
      </li>;
    })


    return <div>
      <NotificationContainer width={1000}
        height={50}
        position={{ top: 0, left: 500 }}
        stacking={'down'}
        ref={a => this.notification = a} />
      <div className="sb-1">
      <div className="mobile-topbar">
      <a href="javascript:;" className="mytrend-hide"><i className="ti-arrow-left"></i></a>
      <p>My Trends</p>
      </div>

        <a href="javascript:;" id="reset-trender" className="new-trend" onClick={this.resetStore}>
          <i className="icon dd-browse" /> <span>Explore</span>
        </a>

        <h3 className="text-white mt-3 mb-3">My Trends</h3>
        <ul className="trend-list">
     
        {trendlist} 
       
        </ul>
        <div className="sb-1-toggle-btn">
          <a id="sb-1-toggle-btn" href="javascript:;">
            <i className="fa fa-angle-left"></i>
          </a>
        </div>
      </div>
    </div>


  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchSaveTrends: () => dispatch(mytrendActions.GetAllSavedTrends()),
    onSaveTrendClick: (idx, item) => dispatch(mytrendActions.GetSelectedSavedTrend(idx, item)),
    onDeleteTrendClick: (idx) => dispatch(mytrendActions.OnDeleteSavedTrend(idx)),
    newTrend: () => dispatch(addSeriesActions.resetStore()),
    resetMyTrend: () => dispatch(mytrendActions.resetMyTrendStore()),
    resetTrenderAreaStore: () => dispatch(TrenderAreaActions.resetTrendAreaStore()),
  };
};
function mapStateToProps(state) {
  if (state.mytrendReducer && !state.mytrendReducer.fetching) {
    return {
      trends: Object.assign([], state.mytrendReducer.SaveTrends),
      isdelete: state.mytrendReducer.isdelete
    };
  }
  else {
    return {
      trends: Object.assign([], state.mytrendReducer.SaveTrends),
      isdelete: state.mytrendReducer.isdelete
    };
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MytrendContainer)
