import React, { Component } from "react";
import {
  connect
} from 'react-redux';
import $ from "jquery";
import "ion-rangeSlider/js/ion.RangeSlider.js";
import moment from "moment";
import CommonUtils from "../../../app/commonutils/CommonUtils";
import * as actions from '../../../app/actions/index';

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class RangeSlider extends Component {
  slider;
constructor(){
  super();
  this.state={
    min_1:0
  }
}

  componentDidMount() {
    let self = this;
    let start = moment("2015-01-01 00:00", "YYYY-MM-DD HH:mm");
    let end = moment();

    let periodStart = this.props.timePeriodStore.startTime;
    let periodEnd = this.props.timePeriodStore.endTime;

    let periodMs = CommonUtils.calculateTimePeriodInMilliSecond(
      periodStart,
      periodEnd
    );

    $("#dataslider").ionRangeSlider({
      type: "double",
      grid: true,
      // min: start.format("x"),
      min: periodStart * 1000 - 3 * periodMs,
     
      //   max: end.format("x"),
      max: periodEnd * 1000,
      step: 1000, // in ms
      from: periodStart * 1000 - 3 * periodMs,
      force_edges: true,
      to: periodEnd * 1000,
      drag_interval: true,
      hide_from_to:true,
      prettify: function (num) {
        return moment(num, "x").format("DD.MMM.YYYY hh:mm");

        //return moment(num, "X").format("MMM Do, hh:mm A");
      },

      onChange: function (values) {
        var from = values.from,
          to = values.to;
        $("#lblfrom").text(moment(from, "x").format("DD.MMM.YYYY HH:mm"))
        $('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevaluefrom_1').hide(); $('#daterangevalueto_1').hide();

        $("#lblto").text(moment(to, "x").format("DD.MMM.YYYY HH:mm"))
        // self.props.onUpdateSeriesOnRange(from, to)

      },
      onFinish: function (values) {
        var from = values.from,
          to = values.to;
          var element = $("#trender-area").find('.active');
          $(element).removeClass("active");
        self.props.isEventRangSliderTrigger(true);
        debounce(self.props.onUpdateSeriesOnRange(from, to), 5000);
        // document.getElementsByClassName('irs-from')[0].innerHTML="hi";
      }
    });

    self.slider = $("#dataslider").data("ionRangeSlider");
    self.setState({
      min_1:periodStart * 1000 - 3 * periodMs
    })

  
  }

  componentDidUpdate() {
    let self=this;
    let periodStart = this.props.timePeriodStore.startTime;
    let periodEnd = this.props.timePeriodStore.endTime;
    let periodMs = CommonUtils.calculateTimePeriodInMilliSecond(
      periodStart,
      periodEnd
    );



    if (this.props.isEventRangSlider) {
      console.log(this.state.min_1);
      // this.slider.update({
      //   min: this.props.timePeriodStore.startTime,
      //   max: this.props.timePeriodStore.endTime

      // });
    }
    else {
      console.log(this.state.min_1);
      if (this.props.timePeriodStore.startTime * 1000<self.state.min_1) {
        this.slider.update({
        min:this.props.timePeriodStore.startTime * 1000,
        })
        self.setState({
          min_1: this.props.timePeriodStore.startTime * 1000
        })
      } else {
        this.slider.update({
        min:self.state.min_1
        })
      }
      this.slider.update({
        max: this.props.timePeriodStore.endTime * 1000,
        from: this.props.timePeriodStore.startTime * 1000,
        to: this.props.timePeriodStore.endTime * 1000,
        prettify: function (num) {
          if (moment.duration(periodMs).asHours() < 24)
            return moment(num, "x").format("DD.MMM HH:mm:ss");
          else if (moment.duration(periodMs).asHours() <= 720)
            return moment(num, "x").format("DD.MMM");
          else if (moment.duration(periodMs).asHours() > 720 && moment.duration(periodMs).asHours() < 8760)
            return moment(num, "x").format("DD.MMM.YYYY");
          else
            return moment(num, "x").format("MMM.YYYY");
        },
      });
      console.log(moment(this.props.timePeriodStore.startTime * 1000, "x").format("DD.MMM.YYYY"));
      console.log(self.state.min_1);
    }
   
    
  }

  render() {
    return (
      <div
        style={{ paddingLeft: "50px", paddingRight: "10px", height: "80px" }}
      >

        <label id="lblfrom">{
          
          moment(this.props.timePeriodStore.startTime * 1000, "x").format("DD.MMM.YYYY HH:mm")
         
      }</label>
        
        <label id="lblto">{moment(this.props.timePeriodStore.endTime * 1000, "x").format("DD.MMM.YYYY HH:mm")}</label>

        <input type="text" id="dataslider" name="example_name" value="" />
      </div>
    );
  }
}



//export default TrenderAreaContainer;
const mapDispatchToProps = dispatch => {
  return {
    isEventRangSliderTrigger: iseventtrigger => dispatch(actions.isEvent_RangeSlider_Trigger(iseventtrigger))
  };
};
function mapStateToProps(state) {
  return {
    isEventRangSlider: state.utlity.isEventRangSlider,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RangeSlider)
