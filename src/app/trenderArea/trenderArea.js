
import React from "react";
import JoinTypeFilter from '../filters/joinType/JoinTypeFilter';
import YScaleFilter from '../filters/yScale/YScaleFilter';
import PlotSplitFilter from '../filters/plotSplit/PlotSplitFilter';
import RendererFilter from '../filters/renderer/RendererFilter';
import TimePeriodFilter from '../filters/timePeriodFilter/TimePeriodFilter';
import DateRangePickerBtn from '../controls/dateRangePickerBtn/DateRangePickerBtn';
import FullScreen from '../../components/ui/fullScreen/FullScreen';
import SettingsFilter from '../filters/settingsFilter/SettingsFilter';
import CommonUtils from '../commonutils/CommonUtils';
import $ from 'jquery';
import MobileFilterSidebar from '../filters/mobileFilterSidebar/MobileFilterSidebar';


function editNewTrendName() {
  let trendName = document.getElementById("new-trend-name");
  trendName.contentEditable = true;
  trendName.focus();
  document.getElementById("trend-name-edit-btn").style.display = 'none';
  document.getElementById("trend-name-save-btn").style.display = 'inline-block';
}

function saveNewTrendName() {
  let trendName = document.getElementById("new-trend-name");
  trendName.contentEditable = false;
  document.getElementById("trend-name-edit-btn").style.display = 'inline-block';
  document.getElementById("trend-name-save-btn").style.display = 'none';
}




export const NewTrend = (props) => {
  return (
    <div className="row white-control-area tb-no-mrg-r">
      <div className="col">
        <h3 className="text-blue">
          {/* <span className="tab-sb-1-btn"><a href="javascript:;" id="tab-sb-1-btn" onClick={myTrendMenuShowHide}><i className="icon dd-menu text-info"></i></a></span> */}
          <span className="new-trend-name test" placeholder='Untitled' contentEditable={false} id="new-trend-name"></span>
          <button className="new-edit-trend-btn" id="trend-name-edit-btn" onClick={editNewTrendName} style={{ 'display': 'inline-block' }}><i id="new-edit-trend" className="icon dd-pencil-only edit-trend"></i></button>
          <button className="new-edit-trend-btn" id="trend-name-save-btn" onClick={props.updatetrendName} style={{ 'display': 'none' }}><i id="new-save-trend" className="icon dd-tick text-success"></i></button>
        </h3>
      </div>
      <div className="col">
        <div className="save-btns-area float-right">
          {/* <button className="hvr-grow add-signal-btn" onClick={signalMenuShowHide}><i className="icon dd-plus"></i> <span>Add Signal</span></button> */}
          <button className="hvr-grow" disabled={props.visibleCalendar == true} onClick={props.goToDataExplorer}><i className="icon dd-calender"></i></button>
          <button className="hvr-grow pl-7px" disabled={props.visibleShare == true} onClick={props.shareTrendModal}><i className="icon dd-share"></i></button>
          {/* <button className="hvr-grow" disabled={props.visibleSave==true} onClick={ props.saveTrendModal}><i className="icon dd-save"></i></button> */}
          <button className="hvr-grow" disabled={props.visibleSave == true} onClick={props.saveTrendModal}><i className="icon dd-save"></i></button>
        </div>
      </div>

    </div>
  );
}

export const FilterArea = (props) => {

  let startTime = CommonUtils.UnixToDateTimePickerFormat(props.timePeriodFromStore.startTime);
  
  let endTime = CommonUtils.UnixToDateTimePickerFormat(props.timePeriodFromStore.endTime);
  return (
    <div className="chart-filter-area">
      <button className="mobile-setting-btn"><i className="fa fa-gear"></i></button>
      <TimePeriodFilter disabledTime={props.visibleTime} currentTimePeriod={props.timePeriod}
      datePickerFrom={props.startTimeValue} datePickerTo={props.endTimeValue} cancel={props.cancelDiv}  startDate={startTime} endDate={endTime} timePeriodBtn={props.timePeriodValues} timePeriodSpan={props.timePeriodSpan} updatedLabel={props.updatedLabel} valueBtn={props.labelValue} timePeriod={props.timePeriodSelector} />
  
     
      <PlotSplitFilter disabledPlot={props.visiblePlot} option={props.selectedPlot} plotSplitChange={props.plotSplitChange} plotSplitSelector={props.plotSplitSelector} />
      <YScaleFilter disabledYscale={props.visibleYscale} option={props.selectedOption} YscaleChange={props.YscaleChange} yScaleSwitch={props.yScaleSelector} />
      <JoinTypeFilter disabledJoin={props.visibleJoin} option={props.selectedType} joinTypeChange={props.joinTypeChange} joinType={props.joinTypeSelector} />
      <RendererFilter disabledRender={props.visibleRender} option={props.selectedRender} renderSelected={props.renderSelector} chartType={props.renderSelector} />
      <FullScreen screenType={props.screenType} />
      <SettingsFilter filterChange={props.filterChange} isShowDataLable={props.isShowDataLable} isEnabledDataLable={props.isEnabledDataLable} />
      <MobileFilterSidebar {...props} option={props.selectedType} joinTypeChange={props.joinTypeChange} joinType={props.joinTypeSelector}
      disabledRender={props.visibleRender} optionforrender={props.selectedRender} renderSelected={props.renderSelector} chartType={props.renderSelector}
      />
    </div>

  )
}
