import React, {
  Component
} from "react";
const $ = window.$;

class DateRangePickerSingleTo extends Component {


  componentDidUpdate(prevProps, prevState) {

    // only update chart if the data has changed
    if (prevProps.endDate !== this.props.endDate) {
      // this.cleanUp();

      if (this.props.endDate != "Invalid date")
        this.initialize(this.props.endDate);
      else
        this.initialize(prevProps.endDate);
    }
  }
  componentDidMount() {

    this.initialize();
    $('#daterangevalueto').hide();

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
  initialize = (start) => {
    let self = this;
    //Date Range picker jQuery Executions starts
    //alert(end);
    $('#daterangevalueto').daterangepicker({
      autoclose: true,
      singleDatePicker: true,
      startDate: start,
      autoUpdateInput: true,
      timePicker: true,
      isInvalidDate: function(date) {
        if (date.format('DD MMM YYYY  h:mm A') == '01 Feb 2019  12:00 AM') {
            return true; 
        }
    },
      // autoUpdateInput: true,
      autoApply: true,
      applyButtonClasses: "btn-info btn-rounded d-none",
      cancelClass: "btn-outline-info btn-rounded ml-4 mr-3 d-none",
      locale: {
        cancelLabel: "Clear",
        format: "DD MMM YYYY  h:mm A",
        separator: "    -  "
      },


    }, function (start, end) {
      const startDate = start.format('DD MMM YYYY  h:mm A');
      

      self.props.datePickerValuesTo(startDate);
    }).on('change', function (ev) {

      $('.datepicker').hide();
    });


  }




  render() {
    return <div className="input-group  datepickerinput" style={{ width: 'auto' }}>
      <input type="text" id="daterangevalueto" className="form-control date-range-picker-single" />
      <input type="text" placeholder="Select End Date"id="daterangevalueto_1" className="form-control date-range-picker-single" readOnly onClick={()=>{$('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevalueto_1').hide(); $('#daterangevaluefrom_1').hide();
     document.getElementById('button_1').className='time-filter-btn';
     document.getElementById('button_2').className='time-filter-btn';
     document.getElementById('button_3').className='time-filter-btn';
     document.getElementById('button_4').className='time-filter-btn';
     document.getElementById('button_5').className='time-filter-btn';
     document.getElementById('button_6').className='time-filter-btn';
     document.getElementById('button_7').className='time-filter-btn';
     document.getElementById('button_8').className='time-filter-btn';
     document.getElementById('button_9').className='time-filter-btn';
     document.getElementById('button_10').className='time-filter-btn';
     document.getElementById('button_11').className='time-filter-btn';
     document.getElementById('button_12').className='time-filter-btn';
     document.getElementById('button_13').className='time-filter-btn';
     document.getElementById('button_14').className='time-filter-btn'}}/>
      <div className="input-group-append">
        <span className="input-group-text">
          <i  className="icon dd-calender" />
        </span>
      </div>
    </div>
  }
}
export default DateRangePickerSingleTo;
