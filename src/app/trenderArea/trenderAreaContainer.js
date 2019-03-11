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
 * Module :  TrenderPloatArea Component
 * Description :
 * Date:08-AUG-2018.
 * =============================================================================================================================================
 *
 * #endregion
 */

/**library import section Begin*/
import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux';
import AddSeriesContainer from '../addSeries/addSeriesContainer';
import SeriesGridViewContainer from '../seriesGridView/seriesGridViewContainer';
import * as addSeriesActions from '../addSeries/addSeriesActions';
import * as myTrendActions from '../mytrends/mytrendActions';

import TrendPlotAreaContainer from '../trendPlotArea/TrendPlotAreaContainer';
import { FilterArea, NewTrend } from './trenderArea';
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer";
import * as TrenderAreaActions from '../trenderArea/action';
import { css } from 'react-emotion';
import * as actions from './action';
import * as actionUtility from '../../app/actions/index';
import ShareTrend from '../../components/ui/modals/ShareTrend';
import { SaveTrend, UpdateTrend } from '../../components/ui/modals/SaveTrend';
import CommonUtils from '../commonutils/CommonUtils';
import RangeSlider from '../../components/ui/rangeSlider/RangeSlider';
import NavigationButtons from '../filters/navigationButtons/NavigationButtons';
import moment from 'moment';

import {  Status, AlertMessage, DefaultValue,  EmailBody, RangeList, NavigatorButtonAction } from "../constants/Constants"
import Highcharts from 'highcharts/highstock';

import * as $ from 'jquery';
/**library import section End*/

const override = css`
display: block;
margin: -100 auto;
border-color: red;
`;

function saveNewTrendName() {
  let trendName = document.getElementById("new-trend-name");
  trendName.contentEditable = false;
  document.getElementById("trend-name-edit-btn").style.display = 'inline-block';
  document.getElementById("trend-name-save-btn").style.display = 'none';
}
class TrenderAreaContainer extends Component {

  state = {
    TagBrowserContext: {},
    tagsData: [],
    timePeriod: "0",
    selectedOption: 'disable',
    selectedType: 'option1',
    selectedPlot: 'disable',
    selectedRender: 'line',
    periodValue: 7,
    span: 0,
    label: "Last 60 Minutes",
    calendarStartTime: '',
    calendarEndTime: new Date(),
    trendName: '',
    visibleJoin: true,
    visiblePlot: true,
    visibleRender: true,
    visibleYscale: true,
    visibleTime: true,
    visibleCalendar: true,
    visibleShare: true,
    visibleSave: true,
    isShowDataLable: DefaultValue.isShowDataLable,
    isEnabledDataLable: DefaultValue.isEnabledDataLable,
    NavigatorButtonAction: NavigatorButtonAction[0],
    rangeInfo: RangeList[0],
    timeStamps: {
      timeStamp1: CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), RangeList[0].leftOuterPagination)),
      timeStamp2: CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0))
    }
  };

  saveTrendModal = () => {
   

    saveNewTrendName();
    let trendName = document.getElementById("new-trend-name").innerText;
    let trend = "";

    if (this.props.currentTrendID) {
      this.saveTrendNameToStorewithoutevent(trendName);
      this.props.UpdateTrendDB();
      

    } else {

      var name = this.props.currentTrendID ? this.props.currentTrendID : this.props.currentTrendName;
      $('#savetrendInputField').val(name);
      this.saveTrendNameToStorewithoutevent(trendName);
      this.saveTrendToDbDirect(trendName);
    }

    $('#savetrendInputField').val('');
  }


  updatetrendName = () => {
    let trendName = document.getElementById("new-trend-name");
    trendName.contentEditable = false;
    document.getElementById("trend-name-edit-btn").style.display = 'inline-block';
    document.getElementById("trend-name-save-btn").style.display = 'none';

    if (this.props.currentTrendID != undefined && this.props.currentTrendID != "")
      this.saveTrendModal()
  }


  shareTrendModal = () => {


    if (this.props.currentTrendName) {
      $("#share-trend").modal("show");
      $(".trender-area").addClass("after_modal_appended");
      //appending modal background inside the blue div
      $('.modal-backdrop').appendTo('.trender-area');

      //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
      $('body').removeClass("modal-open")
      $('body').css("padding-right", "");
      this.shareTrend()
    }
    else {
      this.showInfoNotification("Please save Trend Before sharing", Status.warning);
    }
  }




  componentDidUpdate(prevProps, prevState) {
   

    if (CommonUtils.isPropchange(prevProps.isShowDataLable, this.props.isShowDataLable) || CommonUtils.isPropchange(prevProps.isEnabledDataLable, this.props.isEnabledDataLable)) {
      this.setState({
        isShowDataLable: this.props.isShowDataLable,
        isEnabledDataLable: this.props.isEnabledDataLable
      });
    }
    if (CommonUtils.isPropchange(prevProps.data, this.props.data)) {
      if (this.props.data && this.props.data.length > 0) {


        this.setState({ visibleJoin: false, visiblePlot: false, visibleRender: false, visibleYscale: false, visibleTime: false, visibleCalendar: false, visibleShare: false, visibleSave: false })
      }
      else {
        $(".chart-filter-area").toggleClass("disabled");
        $(".save-btns-area").toggleClass("disabled");
        this.setState({ visibleJoin: true, visiblePlot: true, visibleRender: true, visibleYscale: true, visibleTime: true, visibleCalendar: true, visibleShare: true, visibleSave: true })
      }
    }

    if (prevProps.loading !== this.props.loading) {
      //$("#save-trend").modal("hide");
    }
    if (CommonUtils.isPropchange(prevProps.timePeriodFromStore.timePeriod, this.props.timePeriodFromStore.timePeriod)) {
      this.setState({ trendName: this.props.currentTrendName })
    }
    if (prevProps.currenterror !== this.props.currenterror || prevProps.istrendsave !== this.props.istrendsave) {
      if (this.props.currenterror === 'Duplicate Name') {
        this.showInfoNotification(AlertMessage.Duplicate, Status.Info);
        this.props.clearerror();
      }
      else if (this.props.istrendsave == true) {
        this.showInfoNotification(AlertMessage.SaveTrend, Status.Success);
      }
    }


    if (prevProps.currenterror !== this.props.currenterror || prevProps.istrendupdate !== this.props.istrendupdate) {
      if (this.props.istrendupdate == true) {
        this.showInfoNotification(AlertMessage.UpdateTrend, Status.Success);
      }
    }

    if (prevProps.isShowAddSeriesForm !== this.props.isShowAddSeriesForm) {
      if (!this.props.isShowAddSeriesForm) {
        $("#new-series-area").toggleClass("sform");
        $("#trender-area").toggleClass("hchart");
      } else {
        $("#new-series-area").toggleClass("sform");
        $("#trender-area").toggleClass("hchart");
      }

    }

    if (CommonUtils.isPropchange(prevProps.timePeriodFromStore.timePeriod, this.props.timePeriodFromStore.timePeriod)) {
      this.setState({ timePeriod: this.props.timePeriodFromStore.timePeriod });
      if (this.props.timePeriodFromStore.timePeriod == -1) {
        this.setState({ tempLabel: "Custom" })
        this.setState({ label: "Custom" })
      }
    }
    if (CommonUtils.isPropchange(prevProps.yAxis, this.props.yAxis)) {
      this.yScaleSelector(this.props.yAxis);
    }
    if (CommonUtils.isPropchange(prevProps.plotSplit, this.props.plotSplit)) {
      this.plotSplitSelector(this.props.plotSplit);
    }
    
    if (CommonUtils.isPropchange(prevProps.jointype, this.props.jointype)) {
      if (this.props.jointype == true) {
        this.setState({ selectedType: 'option2' })
      }
      else {
        this.setState({ selectedType: 'option1' })
      }
    }
    if (CommonUtils.isPropchange(prevProps.renderer, this.props.renderer)) {
      this.setState({ selectedRender: this.props.renderer })
    }


    if (CommonUtils.isPropchange(prevProps.currentfilter, this.props.currentfilter)) {

      
    console.log(this.props.currentfilter.jointype)

      if (this.props.currentfilter.jointype == true) {
        this.setState({ selectedType: 'option2' })
      }
      else {
        this.setState({ selectedType: 'option1' })
      }
      if (this.props.currentfilter.renderer == "column") {
        this.setState({ selectedRender: 'column' })
      }
      else if (this.props.currentfilter.renderer == "area") {
        this.setState({ selectedRender: 'area' })
      }
      else if (this.props.currentfilter.renderer == "line") {
        this.setState({ selectedRender: 'line' })
      }

    }
  }





  /**Life Cycle Hook Section Begin */
  componentDidMount() {
    document.addEventListener('click', this.resetDropdown)
    this.setState({
      isShowDataLable: this.props.isShowDataLable,
      isEnabledDataLable: this.props.isEnabledDataLable
    });

    //toggle addseries/trenderarea
    let self = this;
    $("#addSeries").click(function () {
      // self.props.updateCurrentEditingSeries();
      $("#new-series-area").toggleClass("sform");
      $("#trender-area").toggleClass("hchart");
    });

    this.setState({ timePeriod: this.props.timePeriodFromStore.timePeriod });
    let defaultState={...this.state};
    let defaultTimeStamp1=CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), RangeList[0].leftOuterPagination));
    let defaultTimeStamp2=CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), 0));
    
    $("#reset-trender").click(function () {
      self.setState(
        defaultState
      );
        
        
     
     
    });
  }

  resetDropdown = (e) => {
 
    let iscalander = $(".drop-down").hasClass("drop-down--active")
    if (iscalander) {
    
    }

  }
  //go to data explorer function
  goToDataExplorer = () => {
    $(".trender-container").toggleClass("d-block d-none");
    $("#data-explorer").toggleClass("d-none d-block");
  }



  //it is a method which helps to select Time Period of chart by user

  timePeriodValues = (selectedPeriod) => {


    this.setState({ periodValue: selectedPeriod })
  }

  cancelDiv = () => {
    $('.drop-down').toggleClass('drop-down--active');
  }

  labelValue = (selectedLabel) => {
   
    this.setState({ tempLabel: selectedLabel });
  }

  startTimeValue = (startTime) => {
    this.setState({ calendarStartTime: startTime, periodValue: 0 })
  }



  endTimeValue = (endTime) => {
    this.setState({ calendarEndTime: endTime })
  }

  //to convert the selected time to milliseconds and updating store with new time period
  timePeriodSelector = () => {
    this.setState({ label: this.state.tempLabel })
    $(".dropdown").removeClass("show");
    $(".time-dropdown").removeClass("show");
    $('.drop-down').toggleClass('drop-down--active');


    this.setState({ timePeriod: this.state.periodValue, span: this.state.span });
    if (this.state.periodValue != -1) {
      this.props.setTimePeriod(this.state.periodValue);
      this.setState({
        rangeInfo: RangeList[this.state.periodValue]
      }, () => {



        if (this.state.periodValue == 0) {

          this.props.isEventRangSliderTrigger(false);
          this.datePickerSelector(this.state.calendarStartTime, this.state.calendarEndTime)
        }
        else {
          if (this.state.periodValue == 17) {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            d.setHours(23, 59, 59, 999);
            this.props.isEventRangSliderTrigger(false);
            this.updateStoreWithTimeperiod(CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), RangeList[this.state.periodValue].leftOuterPagination)), CommonUtils.covertDateToTimeStamps(d));

          }
          else {
            this.props.isEventRangSliderTrigger(false);
            this.updateStoreWithTimeperiod(CommonUtils.covertDateToTimeStamps(CommonUtils.addMinutes(new Date(), RangeList[this.state.periodValue].leftOuterPagination)), CommonUtils.covertDateToTimeStamps(CommonUtils.addMilliseconds(new Date(), 0)));
          }
        }


            })
    }

  }



  updateStoreWithTimeperiod(startTime, endTime) {
    let startTimeStamp = startTime;
    let endTimeStamp = endTime;
    let periodInMillisecond = CommonUtils.calculateTimePeriodInMilliSecond(startTimeStamp, endTimeStamp)
    let caption = CommonUtils.CreateCaptionForNavigator(periodInMillisecond);
    this.updateSeriesData(startTimeStamp, endTimeStamp);

    this.props.setTimePeriodInStore({
      startTime: startTimeStamp,
      endTime: endTimeStamp,
      timePeriod: this.state.timePeriod,
      periodInMillisecond: periodInMillisecond,
      caption: caption
    })
    console.log("new values  "+startTimeStamp);
    
  }
  onRangNavigation = (navagationType) => {
    this.setState({ timePeriod: -1 });
    let periodInMillisecond = this.props.timePeriodFromStore.periodInMillisecond * NavigatorButtonAction[0][navagationType];

    let startTimeStamp = CommonUtils.covertDateToTimeStamps(CommonUtils.addMilliseconds(moment.unix(this.props.timePeriodFromStore.startTime).format(), periodInMillisecond))
    let endTimeStamp = CommonUtils.covertDateToTimeStamps(CommonUtils.addMilliseconds(moment.unix(this.props.timePeriodFromStore.endTime).format(), periodInMillisecond));
    //this.updateSeriesData(startTimeStamp, endTimeStamp);
    var element = $("#trender-area").find('.active');
    $(element).removeClass("active");
    this.setState({ tempLabel: "Custom" })
        this.setState({ label: "Custom" })
    this.updateStoreWithTimeperiod(startTimeStamp, endTimeStamp);
  }

  updateSeriesData = (startTimeStamp, endTimeStamp) => {

    let timeStamps = {};
    timeStamps.timeStamp1 = startTimeStamp
    timeStamps.timeStamp2 = endTimeStamp

    this.setState({
      timeStamps: timeStamps
    }, () => {
      this.props.fetchSeriesDataforCustomData(this.state.timeStamps.timeStamp1, this.state.timeStamps.timeStamp2)
    })

  }



  //it is a method which helps to select Renderer of chart by user
  renderSelector = (chartType) => {
    this.setState({ selectedRender: chartType })
    this.props.setRenderer(chartType);
  }

  plotSplitSelector = (plotSplitValue) => {
    this.props.setPlotSplit(plotSplitValue);

    if (plotSplitValue) {
      this.yScaleSelector(plotSplitValue);
      this.setState({ selectedPlot: 'enable' })
    }
    else if (!plotSplitValue) {
      this.setState({ selectedPlot: 'disable' })
    }
  }

  //it is a method which helps to get Time Range from calender Button
  datePickerSelector = (startTime, endTime) => {

    let startTimeStamp = parseInt(Date.parse(startTime)) / 1000;
    let endTimeStamp = parseInt(Date.parse(endTime)) / 1000;
    //this.updateSeriesData(startTimeStamp, endTimeStamp)


    this.updateStoreWithTimeperiod(startTimeStamp, endTimeStamp);
  }

  goToFullScreen = () => {
    /**It should be go on highstock wrapper */
    let chart = Highcharts.find(Highcharts.charts, function (chart) { return chart.renderTo.id === 'container'; });
    let defaultHeight = localStorage.getItem("defaultHeight");
    setTimeout(function () {
      let currentHeight = $(".trender-chart-area").height();

      var contHeight = currentHeight - 210;
      $(".trend-chart").height(contHeight);
      var containerWidth = $("#container").width();
      var containerHeight = $("#container").height();
      chart.setSize(containerWidth, containerHeight, false);
    }, 500)


  }

  exitFromFullScreen = () => {

    /**It should be go on highstock wrapper */
    let chart = Highcharts.find(Highcharts.charts, function (chart) { return chart.renderTo.id === 'container'; });
    let defaultHeight = localStorage.getItem("defaultHeight");
    setTimeout(function () {
      let currentHeight = $(".trender-chart-area").height();

      var contHeight = defaultHeight - 210;
      $(".trend-chart").height(contHeight);
      var containerWidth = $("#container").width();
      var containerHeight = $("#container").height();
      chart.setSize(containerWidth, containerHeight, false);
    }, 500);

  }

  screenType = () => {



    $('.trender-chart-area').toggleClass('fullscreen');

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.exitFromFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        this.exitFromFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        this.exitFromFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        this.exitFromFullScreen();
      }
    } else {
      let element = $('.trender-chart-area').get(0);
      if (element.requestFullscreen) {
        element.requestFullscreen();
        // $("#container").css({ 'position': 'relative', 'height': '81vh' });
        this.goToFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        // $("#container").css({ 'position': 'relative', 'height': '81vh' });
        this.goToFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        // $("#container").css({ 'position': 'relative', 'height': '81vh' });
        this.goToFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        // $("#container").css({ 'position': 'relative', 'height': '81vh' });
        this.goToFullScreen();
      }


    }
  }


  //it is a method which helps to select Renderer of chart by user
  joinTypeSelector = (step) => {
   

    this.props.SetJointype(step);
   
   

  }



  //it is a method which helps to get multiple yAxis values as enable or disable
  yScaleSelector = (yScaleValue) => {
    this.props.setYAxis(yScaleValue);
    if (yScaleValue) {
      this.setState({ selectedOption: 'enable' })
    }
    else if (!yScaleValue) {
      this.plotSplitSelector(yScaleValue);
      this.setState({ selectedOption: 'disable' })
    }
  }

  YscaleChange = (e) => {
    let yScaleValue = CommonUtils.convertStringToBoolean(e.target.value);

    if (this.state.selectedOption == 'enable') {
      yScaleValue = false
    }
    else {
      yScaleValue = true
    }
    this.yScaleSelector(yScaleValue)
  }

  plotSplitChange = (e) => {
    let plotSplitValue = CommonUtils.convertStringToBoolean(e.target.value);

    if (this.state.selectedPlot == 'enable') {
      plotSplitValue = false
    }
    else {
      plotSplitValue = true
    }

    this.plotSplitSelector(plotSplitValue);
  }

  joinTypeChange = () => {
    console.log(this.state.selectedType)
    if (this.state.selectedType == 'option1') {
      this.setState({ selectedType: 'option2' })
    }
    else {
      this.setState({ selectedType: 'option2' })
    }
  }



  renderSwitch = (renderSelected) => {
  

    this.setState({ selectedRender: renderSelected })

  }


  saveTrendNameToStore = (trendName) => {
    // this.props.setTrendName(trendName.target.value);
    this.saveTrendNameToStorewithoutevent(trendName.target.value)
  }

  saveTrendNameToStorewithoutevent(trendName) {
    this.props.setTrendName(trendName);
  }

  shareTrend = () => {

    this.props.shareTrend(this.props.currentTrendName);

  }


  /*
  **Email trend link functions
  */
  emailLinkShare = () => {

    let params = {
      email: '',
      subject: '',
      body: this.props.shareurl
    };

    this.composemail(params);
  }

  composemail = (params) => {
    let link = this.mailbody(params);
    link = this.url(link)

    window.location.href = link;
  }


  showInfoNotification(message, type) {
    this.notification.showPopUpNotification(message, type);
  }


  mailbody = (linkInfo) => {
    var link = linkInfo;
    link.email = ''
    link.subject = EmailBody.Subject
    link.body = EmailBody.Body1 + this.props.shareurl + EmailBody.Body2
    this.setState({ link })
    return link
  }

  url(link) {
    let emaillink = "mailto:" + link.email + "?subject=" + link.subject + "&body=" + link.body;
    return emaillink
  }


  filterChange = (labelValues) => {
    this.setState({
      isShowDataLable: labelValues.isShowDataLable,
      isEnabledDataLable: labelValues.isEnabledDataLable
    }, () => {
      this.props.setPointLable(labelValues.isShowDataLable);
      this.props.setDataLable(labelValues.isEnabledDataLable);
    })
  }

  /* Save Trend To DB */
  saveTrendToDbDirect = (trendName) => {
    if (this.validate(trendName)) {
      this.props.SaveTrend();
    }
    else {
      this.showInfoNotification(AlertMessage.EmptyTrendName, Status.Info);
    }
  }

  saveTrendToDb = () => {
    if (this.validate(this.props.currentTrendName)) {
      this.props.SaveTrend();
    }
    else {
      this.showInfoNotification(AlertMessage.EmptyTrendName, Status.Info);
    }
  }

  validate(val) {
    if (val === "Trend Name")
      val = "";

    if (val && val !== null && val !== undefined) return true;
    else return false;
  }
  /*
  code to copy trend link
  */
  copyLink = () => {

    var temp = document.createElement("input");

    // Assign it the value of the specified element
    temp.setAttribute("value", document.getElementById("url").value);

    // Append it to the body
    document.body.appendChild(temp);
    // Highlight its content
    temp.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(temp);


  }

  updateSeriesOnRange = (startTimeStamp, endTimeStamp) => {
    this.setState({ timePeriod: -1 });
    this.updateStoreWithTimeperiod(startTimeStamp / 1000, endTimeStamp / 1000)
  }

  render() {

    let trend = "";

    if (this.props.currentTrendID) {
      var name = this.props.currentTrendID ? this.props.currentTrendID : this.props.currentTrendName;
      trend = <UpdateTrend id={name} trendName={name} UpdateTrend={this.props.UpdateTrendDB}
        SaveTrend={this.saveTrendToDb} saveTrendNameToStore={this.saveTrendNameToStore} />

    } else {
      var name = this.props.currentTrendID ? this.props.currentTrendID : this.props.currentTrendName;
      trend = <SaveTrend id={this.props.currentTrendID} trendName={this.props.currentTrendName}
        UpdateTrend={this.props.UpdateTrendDB} SaveTrend={this.saveTrendToDb}
        saveTrendNameToStore={this.saveTrendNameToStore} />
    }

    return (<div className="trender-container d-block">

      <NotificationContainer width={1000}
        height={50}
        position={{ top: 0, left: 500 }}
        stacking={'down'}
        ref={a => this.notification = a} />

      <NewTrend {...this.props}
        {...this.state}
        shareTrendModal={this.shareTrendModal}
        saveTrendModal={this.saveTrendModal}
        goToDataExplorer={this.goToDataExplorer}
        updatetrendName={this.updatetrendName}
        {...this.props} />
      <div className="trender-area">

        {/* Trender layout starts here */}
        <div className="trender-chart-area " id="trender-area" >

          {/* Trender filter starts here */}
          <FilterArea {...this.props}
            {...this.state}
            yScaleSelector={this.yScaleSelector}
            datePickerSelectorFrom={this.datePickerSelectorFrom}
            joinTypeSelector={this.joinTypeSelector}
            renderSelector={this.renderSelector}
            timePeriod={this.state.periodValue}
            timePeriodValues={this.timePeriodValues}
            cancelDiv={this.cancelDiv}
            startTimeValue={this.startTimeValue}
            endTimeValue={this.endTimeValue}
            timePeriodSelector={this.timePeriodSelector}
            labelValue={this.labelValue}
            updatedLabel={this.state.label}
            plotSplitSelector={this.plotSplitSelector}
            screenType={this.screenType}
            YscaleChange={this.YscaleChange}
            joinTypeChange={this.joinTypeChange}
            plotSplitChange={this.plotSplitChange}
            renderSwitch={this.renderSwitch}
            filterChange={this.filterChange}
          />

          {/* Trender chart starts here */}
          <div className="trend-chart" >

            <TrendPlotAreaContainer timePeriodValue={this.state.timePeriod} seriesListData={this.state.seriesListData} ref={a => this.trendPlotAreaContainer = a} />

          </div>
          {trend}
          <ShareTrend emailLink={this.emailLinkShare} copyLink={this.copyLink} {...this.props} />
          <div className="range-slider-box">
            <RangeSlider onUpdateSeriesOnRange={this.updateSeriesOnRange} timePeriodStore={this.props.timePeriodFromStore} />

          </div>
          <NavigationButtons rangeInfo={this.props.timePeriodFromStore.caption} onRangNavigation={this.onRangNavigation} />


          { /* trend area collapsible button */}
          <div className="chart-height-btn">
            <a id="chart-height-btn" href="javascript:;">
              <i className="fa fa-angle-down"></i>
            </a>
          </div>
        </div>




        <div className="new-series-area show-series-form" id="new-series-area">
          <AddSeriesContainer />
        </div>

      </div>
    
      {/* Add series form starts here */}
      <SeriesGridViewContainer />
    </div>);
  }

}

//export default TrenderAreaContainer;
const mapDispatchToProps = dispatch => {
  return {
    addSeries: series => dispatch(addSeriesActions.addSeries(series)),
    deleteSeries: series => dispatch(addSeriesActions.deleteSeries(series)),
    SaveTrend: () => dispatch(addSeriesActions.addSeriesToDb()),
    SetJointype: isjointype => dispatch(actions.setJoinType(isjointype)),
    setRenderer: renderer => dispatch(actions.setRenderer(renderer)),
    setYAxis: isyAxis => dispatch(actions.setYAxis(isyAxis)),
    setTrendName: trendName => dispatch(addSeriesActions.setTrendName(trendName)),
    setTimePeriod: timeperiodVal => dispatch(actions.setTimePeriod(timeperiodVal)),
    fetchSeriesDataforCustomData: (t1, t2) => dispatch(addSeriesActions.fetchSeriesDataCustomDateRange(t1, t2)),
    setPlotSplit: isplotSplit => dispatch(actions.setPlotSplit(isplotSplit)),
    shareTrend: (name) => dispatch(myTrendActions.shareTrend(name)),
    editSeries: series => dispatch(addSeriesActions.editCurrentSeries(-1)),
    setPointLable: isShowDataLable => dispatch(actions.setPointLable(isShowDataLable)),
    setDataLable: isEnabledDataLable => dispatch(actions.setDataLable(isEnabledDataLable)),
    clearerror: () => dispatch(addSeriesActions.clearerror()),
    setTimePeriodInStore: (timeperiod) => dispatch(addSeriesActions.setTimePeriod(timeperiod)),
    UpdateTrendDB: () => dispatch(addSeriesActions.updateSeriesToDb()),
    isEventRangSliderTrigger: iseventtrigger => dispatch(actionUtility.isEvent_RangeSlider_Trigger(iseventtrigger)),
    newTrend: () => dispatch(addSeriesActions.resetStore()),
    resetMyTrend: () => dispatch(myTrendActions.resetMyTrendStore()),
    resetTrenderAreaStore: () => dispatch(TrenderAreaActions.resetTrendAreaStore()),
  };
};
function mapStateToProps(state) {
  return {
    data: Object.assign([], state.addSeriesReducer.ChartConfig),
    isShowAddSeriesForm: state.addSeriesReducer.isShowAddSeriesForm,
    loading: state.addSeriesReducer.fetching,
    shareurl: state.mytrendReducer.trendShareLink,
    yAxis: state.trenderArea.yAxis,
    plotSplit: state.trenderArea.plotSplit,
    currenterror: state.addSeriesReducer.error,
    currentfilter: state.trenderArea,
    istrendsave: state.addSeriesReducer.istrendsave,
    currentTrendName: state.addSeriesReducer.trendName,
    istrendupdate: state.addSeriesReducer.istrendupdate,
    currentTrendID: state.mytrendReducer.trendShareID,
    renderer: state.trenderArea.renderer,
    timePeriodFromStore: {
      startTime: state.addSeriesReducer.startTime,
      endTime: state.addSeriesReducer.endTime,
      timePeriod: state.addSeriesReducer.timePeriod,
      periodInMillisecond: state.addSeriesReducer.periodInMillisecond,
      caption: state.addSeriesReducer.caption
    },
    isTrendSaved: state.mytrendReducer.isTrendSaved,
    isShowDataLable: state.trenderArea.isShowDataLable,
    isEnabledDataLable: state.trenderArea.isEnabledDataLable,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrenderAreaContainer)
