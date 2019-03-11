import React, {
  Component
} from "react";
const $ = window.$;

class DateRangePicker extends Component {


  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.startDate !== this.props.startDate) {
      // this.cleanUp();
      this.initialize(this.props.startDate,this.props.endDate);
    }
  }
  componentDidMount() {

    this.initialize();
  }

//   cleanUp(){

//     var keep= $.cleanData;
// $.cleanData = function( elems ) {
// 	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
// 		try {
// 			$( elem ).triggerHandler( "remove" );
// 		// http://bugs.jquery.com/ticket/8235
// 		} catch( e ) {}
// 	}
// 	keep( elems );
// };
//   }
  initialize = (start = 1, end = 1) => {
    let self = this;
    //Date Range picker jQuery Executions starts

    $("#daterangevalue").daterangepicker({
      showDropdowns: true,
      startDate: start,
      endDate: end,
      timePicker: true,
      linkedCalendars: false,
      autoUpdateInput: true,
      pickTime:false,
      isInvalidDate: function(date) {
        if (date.format('DD MMM YYYY  h:mm A') == '01 Feb 2019  12:00 AM') {
            return true; 
        }
    },
      applyButtonClasses: "btn-info btn-rounded",
      cancelClass: "btn-outline-info btn-rounded ml-4 mr-3",
      locale: {
        cancelLabel: "Clear",
        format: "DD MMM YYYY  h:mm A",
        separator: "    -  "
      },
      opens: "center"
    });
    $('#daterangevalue').on('apply.daterangepicker', function (ev, picker) {

      const startDate = picker.startDate.format('DD MMM YYYY  h:mm A');
      const endDate = picker.endDate.format('DD MMM YYYY  h:mm A');

      self.props.datePickerValues(startDate, endDate);
    });

  }


  render() {
    return <div className="input-group  datepickerinput">
    <input type="text" id="daterangevalue"  className="form-control" />
    <div className="input-group-append">
      <span className="input-group-text">
        <i className="icon dd-calender" />
      </span>
    </div>
  </div>
  }
}
export default DateRangePicker;
