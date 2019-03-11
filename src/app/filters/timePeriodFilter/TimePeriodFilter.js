import React, { Component } from "react";
import DateRangePickerSingleFrom from '../../controls/dateRangePickerSingle/DateRangePickerSingleFrom';
import DateRangePickerSingleTo from '../../controls/dateRangePickerSingle/dateRangePickerSingleTo';

const TimePeriodFilters = props => {
  
  return (
    <div className="time-btns mobile-drop filter-radio-btns">


        <div className="drop-down d-block">
         <div id="timeFilterDropDown" className="drop-down__button">
           <span className="drop-down__name">{props.updatedLabel}</span>
           <span className="dd-pointer dd-pointer-down"></span>
         </div>
         
         <div className="drop-down__menu-box time-dropdown">
         <div className="filter-dropdown-title mobile-none">Custom Range</div>
          <div className="custom-range-filters mobile-none" >
          <div className="row mobile-none">
          <div className="col"><span className="d-block custom-range">From</span> <DateRangePickerSingleFrom value={props.valueBtn} startDate={props.startDate} datePickerValuesFrom={props.datePickerFrom} ></DateRangePickerSingleFrom></div>
          <div className="col"><span className="d-block custom-range">To</span> <DateRangePickerSingleTo datePickerValuesTo={props.datePickerTo} startDate={props.startDate} endDate={props.endDate}></DateRangePickerSingleTo></div>
          </div>
           
          </div>
          <div className="filter-separator mobile-none" />
          <div className="filter-dropdown-title">Quick Range</div>
          <div className="pre-time-filters bdr">
            <div className="filter-btn-box">
              <button id='button_1'
              
            className={
              props.currentTimePeriod == 5
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(5); props.valueBtn("Last 15 minutes");$('#daterangevaluefrom').hide();$('#daterangevaluefrom_1').show();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show()}}><span className='mobile-none'>Last</span> 15 Minutes</button>
            </div>
            <div className="filter-btn-box">
              <button  id='button_2'
              
            className={
              props.currentTimePeriod == 8
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(8);  props.valueBtn("Last 6 hours");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 6 Hours</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_3'
          
            className={
              props.currentTimePeriod == 11
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(11); props.valueBtn("Last 7 days");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 7 Days</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_4'
              
            className={
              props.currentTimePeriod == 6
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() =>{ props.timePeriodBtn(6);  props.valueBtn("Last 30 minutes");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 30 Minutes</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_5'
             
            className={
              props.currentTimePeriod == 9
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(9);  props.valueBtn("Last 12 hours");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 12 Hours</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_6'
                
            className={
              props.currentTimePeriod == 12
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(12);  props.valueBtn("Last 30 days");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 30 Days</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_7'
              
            className={
              props.currentTimePeriod == 7
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(7);  props.valueBtn("Last 60 Minutes");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 60 Minutes</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_8'
              
            className={
              props.currentTimePeriod == 10
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(10);  props.valueBtn("Last 24 Hours");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 24 Hours</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_9'
              
            className={
              props.currentTimePeriod == 13
                ? "time-filter-btn active"
                : "time-filter-btn"
            }
            onClick={() => {props.timePeriodBtn(13);  props.valueBtn("Last 90 Days");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}><span className='mobile-none'>Last</span> 90 Days</button>
            </div>
          </div>
          <div className="filter-separator" />
          <div className="pre-time-filters">
            <div className="filter-btn-box">
              <button id='button_10'
              
              className={
                props.currentTimePeriod == 14
                  ? "time-filter-btn active"
                  : "time-filter-btn"
              }
            onClick={() => {props.timePeriodBtn(14);  props.valueBtn("Today");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}>Today</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_11'
              
              className={
                props.currentTimePeriod == 15
                  ? "time-filter-btn active"
                  : "time-filter-btn"
              }
            onClick={() => {props.timePeriodBtn(15);  props.valueBtn("This Week");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}>This Week</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_12'
              
              className={
                props.currentTimePeriod == 16
                  ? "time-filter-btn active"
                  : "time-filter-btn"
              }
            onClick={() => {props.timePeriodBtn(16);  props.valueBtn("This Year");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}>This Year</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_13'
              
              className={
                props.currentTimePeriod == 17
                  ? "time-filter-btn active"
                  : "time-filter-btn"
              }
            onClick={() => {props.timePeriodBtn(17);  props.valueBtn("Yesterday");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}>Yesterday</button>
            </div>
            <div className="filter-btn-box">
              <button id='button_14'
              
              className={
                props.currentTimePeriod == 18
                  ? "time-filter-btn active"
                  : "time-filter-btn"
              }
            onClick={() => {props.timePeriodBtn(18);  props.valueBtn("This Month");$('#daterangevaluefrom').hide();$('#daterangevalueto').hide(); $('#daterangevalueto_1').show(); $('#daterangevaluefrom_1').show()}}>This Month</button>
            </div>
          </div>
          <div className="pre-time-filters">
         
          <div className="btns-row">
          <button  onClick={() => props.cancel()} className="btn btn-outline-primary btn-rounded">Cancel</button>
          <button  
          className="btn btn-primary btn-rounded ml-3"  
        
            onClick={() => props.timePeriod()}>Apply</button>
          </div>
          </div>
         </div>
       </div>
      
      <span className="filter-name">Time Period</span>
    </div>
  );
};
export default TimePeriodFilters;
