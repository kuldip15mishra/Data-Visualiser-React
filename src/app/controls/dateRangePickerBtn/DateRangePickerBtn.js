import React, { Component } from "react";
const $ = window.$;
import moment from 'moment';
class DateRangePicker extends Component {
  
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.startDate !== this.props.startDate) {
      this.initialize(this.props.startDate,this.props.endDate);
    }
  }

  initialize(startDate,endDate){
    let self = this;
    //Date Range picker jQuery Executions starts
    $("#daterangevaluebtn").daterangepicker({
      showDropdowns: true,
      startDate:startDate,
      endDate:endDate,
      timePicker: true,
      linkedCalendars: false,
      autoUpdateInput: true,
      applyButtonClasses: "btn-info btn-lg btn-rounded",
      cancelClass: "btn-outline-info btn-lg btn-rounded ml-4 mr-3",
      locale: {
        cancelLabel: "Clear",
        format: "DD MMM YYYY  h:mm A",
        separator: "    -  "
      },
      opens: "center"
    });
    $('#daterangevaluebtn').on('apply.daterangepicker', function (ev, picker) {
      const startDate = picker.startDate.format('DD MMM YYYY  h:mm A');
      const endDate = picker.endDate.format('DD MMM YYYY  h:mm A');
      self.props.datePickerValues(startDate, endDate);

    });

  }
  componentDidMount() {
    let startDate = moment().subtract(1, 'months').format('DD MMM YYYY  h:mm A');
  let endDate = moment();
  this.initialize(1,1);
  }
  render() {
    return <i className={this.props.currentTimePeriod == -1 ? 'fa fa-calendar date-picker-color active' : "fa fa-calendar date-picker-color"} onClick={() => this.props.timePeriodBtn(-1) } id="daterangevaluebtn" />

  }
}
export default DateRangePicker;
