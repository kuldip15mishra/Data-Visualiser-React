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
import DrivenHighstock from '../pluginComponents/drivenChart/DrivenHighstock';
import {
  config
} from './TrendPloatArea.Model'
import {
  connect
} from 'react-redux'
import * as addSeriesActions from '../addSeries/addSeriesActions';
import * as actions from '../trenderArea/action';
import CommonUtils from '../commonutils/CommonUtils';
import * as  _ from 'lodash';
import DrivenHighstockUtility from '../pluginComponents/drivenChart/DrivenHighstock.Helper';
import * as $ from 'jquery';
/**library import section End*/


class TrendPlotAreaContainer extends Component {
  //It should be used in driven chart for config for a now we have write direct config in driven chart inside componentdidmount

  state = {
    config: config(this.updateStoreWithTimeperiod.bind(this))
  }

  count = 0;
  componentDidUpdate(prevProps, prevState) {
    if (CommonUtils.isPropchange(prevProps.isReset, this.props.isReset)) {
      if (this.props.isReset) {
        let config = { ...this.state.config };
        delete config.yAxis;
        config.chart.type = "line"
        this.setState({ config: config }, () => {
          this.drivenHighstock.reinitializeHighCharts(this.state.config, null, null, null, this.props.timePeriodFromStore);
        })
      }
    }
    else {

      if (CommonUtils.isPropchange(prevProps.currentUpdatedSeries, this.props.currentUpdatedSeries)) {
        let index = this.props.currentSeries.findIndex(r => r.id == this.props.currentUpdatedSeries.id)

        this.drivenHighstock.updateSeriesByID(this.props.currentUpdatedSeries, index, this.props.isShowDataLable, this.props.isEnabledDataLable)
      } else {
        if (CommonUtils.isPropchange(prevProps.isEnabledDataLable, this.props.isEnabledDataLable)) {
          this.drivenHighstock.updatechartSetting(this.props.currentSeries, this.props.isShowDataLable, this.props.isEnabledDataLable)
        }
        if (CommonUtils.isPropchange(prevProps.isShowDataLable, this.props.isShowDataLable)) {
          this.drivenHighstock.updatechartSetting(this.props.currentSeries, this.props.isShowDataLable, this.props.isEnabledDataLable)
        }

        if (CommonUtils.isPropchange(prevProps.hideSeriesIndex, this.props.hideSeriesIndex) && this.props.hideSeriesIndex !== -1)
          this.hideSeriesOnEyeClick(this.props.hideSeriesIndex, this.props.currentSeries[this.props.hideSeriesIndex]);

        if (CommonUtils.isPropchange(prevProps.plotSplit, this.props.plotSplit)) { this.updateplotSplit(this.props.plotSplit) }

        //if (CommonUtils.isPropchange(prevProps.timeperiod, this.props.timeperiod)) { this.updateTimePeriod(this.props.timeperiod) }

        if (CommonUtils.isPropchange(prevProps.updatedseriesdata, this.props.updatedseriesdata)) {
          if (this.props.updatedseriesdata.length > 0) {
            this.updateSeriesAuto(this.props.updatedseriesdata)
            
          }
        }


        if (CommonUtils.isPropchange(prevProps.jointype, this.props.jointype)) {

          this.updateJoinType(this.props.jointype) }

        if (CommonUtils.isPropchange(prevProps.renderer, this.props.renderer))
          this.updateChartType(this.props.renderer)

        if (CommonUtils.isPropchange(prevProps.yAxis, this.props.yAxis)) {
          if (prevProps.plotSplit === this.props.plotSplit) { this.updateAxis(this.props.yAxis) }
        }

        if (CommonUtils.isPropchange(prevProps.isTrendLoadedFromSaveTrends) && CommonUtils.isPropchange(prevProps.series, this.props.series) && this.props.currentActionFired !== 'ADD_SERIES') {
          this.updateJoinType(this.props.jointype)
          if (!CommonUtils.isEmpty(this.props.series) && this.props.isTrendLoadedFromSaveTrends) {
            this.reinitializeHighCharts(this.props.series, this.props.plotSplit, this.props.yAxis, this.props.renderer, this.props.jointype, this.props.timePeriodFromStore, this.props.isShowDataLable);
            this.props.deleteAddSeries();
          }
        }

        if (CommonUtils.isPropchange(prevProps.series, this.props.series)) {
          if (!CommonUtils.isEmpty(this.props.series) && this.props.currentActionFired === 'ADD_SERIES') {
            this.addSeries(this.props.series[0]);
            this.props.deleteAddSeries();
            this.props.resetAction();
          }


          // if (this.count == 0) {

          //   this.reinitializeHighCharts(this.props.series)
          //   this.count = 1;
          // }
        }

        if (CommonUtils.isPropchange(prevProps.deletedSeries, this.props.deletedSeries)) {
          if (!CommonUtils.isEmpty(this.props.deletedSeries)) {
            this.removeSeries(this.props.deletedSeries[0], this.props.currentdeletedIndex);
            this.props.deleteCurrentSeries();
          }
        }

        if (CommonUtils.isPropchange(prevProps.deletedallseries, this.props.deletedallseries)) {
          if (!CommonUtils.isEmpty(this.props.deletedallseries)) {
            this.removeAllSeries();
          }
        }
      }
    }
  }
  //it is a function which add the series into driven chart
  addSeries(seriesMetaWithData) {
    this.drivenHighstock.addSeries(seriesMetaWithData, this.props.plotSplit, this.props.currentSeries, this.props.yAxis, this.props.jointype, this.props.isShowDataLable, this.props.isEnabledDataLable, this.props.timePeriodFromStore,this.props.renderer);
  }

  //it is a function which update the series into driven chart
  updateSeries(seriesMetaWithData, index) {
    this.drivenHighstock.updateSeries(seriesMetaWithData, index);
  }

  updateSeriesAuto(seriesMetaWithData) {
    this.drivenHighstock.updateSeriesAuto(seriesMetaWithData, this.props.timePeriodFromStore, this.props.jointype, this.props.isShowDataLable, this.props.currentSeries,this.props.renderer);
  }


  //it is a function which navigate the series data by setextreme
  updateTimePeriod(selectedRange) {
    this.drivenHighstock.updateTimePeriod(selectedRange);
  }

  //it is a function to update the chart type like Line, Bar, Area
  updateChartType(chartTypeValue) {
    this.drivenHighstock.updateChartType(chartTypeValue, this.props.currentSeries, this.props.jointype,this.props.plotSplit,this.props.yAxis);
  }

  //it is a function to update teh Join type like step or linear
  updateJoinType(type) {
    this.drivenHighstock.updateJoinType(type, this.props.currentSeries,this.props.renderer,this.props.plotSplit,this.props.yAxis);
  }

  updateplotSplit(plotSplitSwitch) {
    //this.props.setYAxis(plotSplitSwitch);
    this.drivenHighstock.updateplotSplit(plotSplitSwitch, this.props.currentSeries, this.props.yAxis, this.props.jointype,this.props.renderer);
  }

  //Hide Series On Eye Click
  hideSeriesOnEyeClick(index, hideSeriesData) {
    this.drivenHighstock.hideSeriesOnEyeClick(index, hideSeriesData, this.props.currentSeries, this.props.yAxis, this.props.plotSplit, this.props.jointype);
    this.props.onEyeClickSethideSeriesIndex(-1);
  }

  removeSeries(seriesName, index) {
    
    this.drivenHighstock.removeSeries(seriesName, index, this.props.yAxis, this.props.currentSeries, this.props.plotSplit, this.props.jointype);
  }
  removeAllSeries() {
    this.drivenHighstock.removeAllSeries();
  }


  updateAxis(yAxisSwitchValue) {
    this.drivenHighstock.updateAxis(yAxisSwitchValue, this.props.currentSeries, this.props.plotSplit, this.props.jointype,this.props.renderer);
  }

  updateSeriesData(data, serieMeta) {
    this.drivenHighstock.updateSeriesData(data, serieMeta);
  }

  reinitializeHighCharts(seriesMeta, plotSplit, yAxis, renderer, jointype, timePeriodFromStore, isShowDataLable) {
    document.getElementById("new-trend-name").innerHTML = this.props.currentTrendName;


    let seriesList = this.seriesGeneration(seriesMeta, jointype, isShowDataLable);
    let yAxisList = this.GenerationYAxis(seriesMeta, plotSplit, yAxis,renderer,jointype);

    const configMeta = this.state.config;
    configMeta.series = seriesList
    configMeta.yAxis = yAxisList
    configMeta.chart.type = renderer
    this.setState({ config: configMeta }, () => {
      console.log(this.state.config)
      this.drivenHighstock.reinitializeHighCharts(this.state.config, seriesList, plotSplit, yAxis, timePeriodFromStore);
    })
  }


  seriesGeneration(seriesMetaWithDataList, jointype, isShowDataLable) {
    let series = []
    if (seriesMetaWithDataList && seriesMetaWithDataList.length > 0 && seriesMetaWithDataList[0] && seriesMetaWithDataList[0].length > 0) {
      for (let i = 0; i < seriesMetaWithDataList[0].length; i++) {
        let seriesMetaWithData = {}
        seriesMetaWithData.color = seriesMetaWithDataList[0][i].color;
        seriesMetaWithData.name = seriesMetaWithDataList[0][i].name;

        if (jointype)
          seriesMetaWithData.data = DrivenHighstockUtility.getData(seriesMetaWithDataList[0][i].data, seriesMetaWithDataList[0][i].color, "left");
        else
          seriesMetaWithData.data = DrivenHighstockUtility.getData(seriesMetaWithDataList[0][i].data, seriesMetaWithDataList[0][i].color, "");

        seriesMetaWithData.marker = DrivenHighstockUtility.getMarker(seriesMetaWithDataList[0][i], jointype, isShowDataLable);
        seriesMetaWithData.showInNavigator = seriesMetaWithDataList[0][i].showInNavigator;
        seriesMetaWithData.step = jointype;
        seriesMetaWithData.yAxis = "S_" + seriesMetaWithDataList[0][i].id;
        seriesMetaWithData.id = "S_" + seriesMetaWithDataList[0][i].id;
        seriesMetaWithData.visible = true;
        seriesMetaWithData.lineWidth = seriesMetaWithDataList[0][i].lineWidth;
        series.push(seriesMetaWithData)
      }
    }
    return series;
  }

  GenerationYAxis(seriesMetaWithDataList, plotSplitSwitch, yAxisSwitchValue,chartType,jointype) {
    let yAxis = []
    if (seriesMetaWithDataList && seriesMetaWithDataList.length > 0 && seriesMetaWithDataList[0] && seriesMetaWithDataList[0].length > 0) {
      let NoofSeries = seriesMetaWithDataList[0].length;
      let toplength = NoofSeries;
      let height = plotSplitSwitch ? 100 / NoofSeries : 100;
      let top = height;

      let topCount = 1;
      let n = 0;
      for (let i = 0; i < seriesMetaWithDataList[0].length; i++) {
        let yAxisobj = {}
        yAxisobj = this.YAxis(seriesMetaWithDataList[0][i], n, yAxisSwitchValue, plotSplitSwitch, height, top,chartType,jointype);
        yAxis.push(yAxisobj)

        top = height * (n + 1);
        n++;
      }
    }
    return yAxis;
  }

  YAxis(seriesMeta, index, yAxisSwitchValue, plotSplitSwitch, height, top,chartType,jointype) {

    //let yAxisSwitchValue = seriesMeta.yAxisSwitchValue
    let color = seriesMeta.color;
    // if (yAxisSwitchValue == false && index == 0) {
    //   yAxisSwitchValue = true;
    //   color = "#313131";
    // }
    let _top = top;
    let _height = height - 5;
    let _offset = 0;
    if (!plotSplitSwitch) {
      _offset = null;
      _top = 0;
      //yAxisSwitchValue = false;
    }

    if (!plotSplitSwitch && index == 0 && !yAxisSwitchValue) {
      yAxisSwitchValue = true;
      color = "#313131";
    }
    else if (plotSplitSwitch && index == 0) {
      _top = 0;
    }
    let interpolate = DrivenHighstockUtility.IsInterpolate(chartType)
    
    if(jointype != true){
      interpolate = false
    }
    let yAxis = {}
    yAxis.id = "S_" + seriesMeta.id,
      yAxis.lineColor = color,
      yAxis.lineWidth = 2,
      yAxis.opposite = false
    yAxis.labels = {
      style: {
        color: color
      }
    },
      yAxis.visible = yAxisSwitchValue
    yAxis.offset = _offset,
      yAxis.top = _top + '%',
      yAxis.height = _height + '%'

      yAxis.crosshair = {
        snap: false,
        interpolate: interpolate,
        label: {
            enabled: false,
            format: '{value:.3f}' // 3 decimal
        }
    }
    return yAxis;
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
      timePeriod: -1,
      periodInMillisecond: periodInMillisecond,
      caption: caption
    })
  }

  updateSeriesData = (startTimeStamp, endTimeStamp) => {
    let timeStamps = {};
    timeStamps.timeStamp1 = startTimeStamp
    timeStamps.timeStamp2 = endTimeStamp

    this.setState({
      timeStamps: timeStamps
    }, () => {
      //time-filter-btn active
      var element = $("#trender-area").find('.active');
      $(element).removeClass("active");
  //     var element = document.getElementsByClassName("time-filter-btn");
  //     debugger;
  // element.classList.remove("active");
      this.props.fetchSeriesDataforCustomData(this.state.timeStamps.timeStamp1, this.state.timeStamps.timeStamp2)
    })

  }

  render() {
    return <DrivenHighstock configData={
      this.state.config
    }
      ref={
        a => this.drivenHighstock = a
      }
    />
  }
}

function mapStateToProps(state) {
  return {
    series: Object.assign([], state.addSeriesReducer.config.series),
    currentSeries: Object.assign([], state.addSeriesReducer.ChartConfig),
    deletedSeries: Object.assign([], state.addSeriesReducer.config.deletedseries),
    currentdeletedIndex: state.addSeriesReducer.config.currentIndex,
    deletedallseries: state.addSeriesReducer.deletedallseries,
    MetaConfig: state.addSeriesReducer.MetaConfig,
    jointype: state.trenderArea.jointype,
    renderer: state.trenderArea.renderer,
    yAxis: state.trenderArea.yAxis,
    timeperiod: state.trenderArea.timeperiod,
    plotSplit: state.trenderArea.plotSplit,
    updatedseriesdata: [...state.addSeriesReducer.updatedseriesdata],
    isTrendLoadedFromSaveTrends: state.mytrendReducer.isTrendLoadedFromSaveTrends,
    isReset: state.addSeriesReducer.isReset,
    hideSeriesIndex: state.addSeriesReducer.hideSeriesIndex,
    isShowDataLable: state.trenderArea.isShowDataLable,
    isEnabledDataLable: state.trenderArea.isEnabledDataLable,
    currentUpdatedSeries: state.addSeriesReducer.currentUpdatedSeries,
    currentActionFired: state.addSeriesReducer.action,
    timePeriodFromStore: {
      startTime: state.addSeriesReducer.startTime,
      endTime: state.addSeriesReducer.endTime,
      timePeriod: state.addSeriesReducer.timePeriod,
      periodInMillisecond: state.addSeriesReducer.periodInMillisecond,
      caption: state.addSeriesReducer.caption
    },
    currentTrendName: state.addSeriesReducer.trendName,
    currentTrendID: state.mytrendReducer.trendShareID
  };
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCurrentSeries: series => dispatch(addSeriesActions.emptyDeleteBucket()),
    deleteAddSeries: series => dispatch(addSeriesActions.emptyAddBucket()),
    setYAxis: isyAxis => dispatch(actions.setYAxis(isyAxis)),
    onEyeClickSethideSeriesIndex: index => dispatch(addSeriesActions.hideSeriesIndex(index)),
    resetAction: () => dispatch(addSeriesActions.resetAction()),
    setTimePeriod: timeperiodVal => dispatch(actions.setTimePeriod(timeperiodVal)),
    fetchSeriesDataforCustomData: (t1, t2) => dispatch(addSeriesActions.fetchSeriesDataCustomDateRange(t1, t2)),
    setTimePeriodInStore: (timeperiod) => dispatch(addSeriesActions.setTimePeriod(timeperiod))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrendPlotAreaContainer)
