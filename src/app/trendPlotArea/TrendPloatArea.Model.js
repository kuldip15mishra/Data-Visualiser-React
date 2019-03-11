import { getTagValue } from "./TrendPloatArea.Helper"
import moment from 'moment';

export const config = (callback) => {
  return {
    noData: {
      useHTML: true
    },
    chart: {
      reflow: true,
      zoomType: 'x',
      marginTop: -25,
      alignTicks: false,
      // resetZoomButton: {
      //   position: {
      //     // align: 'right', // by default
      //     // verticalAlign: 'top', // by default
      //     x: 10,
      //     y: 130
      //   }
      // },
      events: {
        selection: function (event) {
          if (typeof event.xAxis !== "undefined") {
            if (event.xAxis[0].min > event.xAxis[0].axis.dataMin ||
              event.xAxis[0].max < event.xAxis[0].axis.dataMax) {
              callback(parseInt(event.xAxis[0].min) / 1000, parseInt(event.xAxis[0].max) / 1000);
              $('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevaluefrom_1').hide(); $('#daterangevalueto_1').hide();
            }
          }
          // } else {

          // }

          return false;
        }
      }
      // margin: [-25, 25, 50, 50]
    },
    // boost: {
    //       enabled:true,
    //     //  useGPUTranslations: true,
    //     //  usePreAllocated: true,
    //      seriesThreshold :0

    // },
    // lang: {
    //   noData: '<img src="https://www.highcharts.com/samples/graphics/sun.png"></img>'
    // },
    xAxis: {
      //minRange: 3600 * 1000, // one hour
      //gridLineColor: '#d8d8d8',

      crosshair: {
        snap: false,
      },
      type: 'datetime',
      //minRange: 1000 * 60 * 60 * 24,
      // tickInterval: 1000 * 60 * 60 * 60,
      ordinal: false,
      gridLineWidth: 1,
      lineWidth: 1,
      title: {
        text: ''
      },
      //minRange: 3600 * 1000 // one hour
      // labels: {
      //   formatter: function(){
      //     let labelText = moment.unix(this.value/1000).format("MMMM/DD");

      //     return labelText // example for moment.js date library

      //     //return this.value;
      //   },
      //}
      // events: {
      //   setExtremes: function (e) {
      //    // getTagValue(e);
      //   }
      // }
      
      labels: {
        style: {
            color: '#99a4ac',
            fontSize:'12px'
        }
    }
    },
    //   yAxis: {
    //     title: {
    //         text: 'values'
    //     },
    //     opposite:false,
    //     lineWidth: 2,
    //     lineColor: '#F33'
    // },
    navigator: {
      enabled: false
      // xAxis: {
      //   dateTimeLabelFormats: {
      //     // day: '%Y',
      //     // week: '%Y',
      //     month: '%b \'%y'
      //     // year: '%Y'
      //   }
      // }
    },
    scrollbar: {
      liveRedraw: true,
      enabled: false
    },
    tooltip: {
      valueDecimals: 2,
      shared: false,
      split: true,
      backgroundColor: '#FFF',
      backgroundColor: "#FFF",
      style: {
        "fontWeight": "bold",
        "fontFamily": "Roboto",
        "paddingLeft": 10,
        "paddingRight": 10,
        "paddingTop": 5,
        "paddingBottom": 5,
        "fontSize": 14
      },
      headerFormat: '{point.x:%d.%b.%Y %H:%M:%S}', 
      shadow: false
    },

    plotOptions: {
      series: {
        //threshold: null,
        turboThreshold:0,
        marker: {
          enabled: true
        },
        // dataGrouping: {
        //   //groupPixelWidth: 10,
        //   enabled: false
        // },
        dataLabels: {
          enabled: false,
          formatter: function () {
            return this.y.toFixed(2);
          }
        },
        tooltip: {
          pointFormat: '{point.y}'
        }
      }
    },
    // rangeSelector: {
    //   selected: 1
    // },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    rangeSelector: {
      buttons: [
        {
          count: 1,
          type: "hour",
          text: "1H"
        },
        {
          count: 8,
          type: "hour",
          text: "8H"
        },
        {
          count: 1,
          type: "day",
          text: "1D"
        },
        {
          count: 1,
          type: "week",
          text: "1W"
        },
        {
          count: 1,
          type: "month",
          text: "1M"
        }
      ],
      inputEnabled: false,
      _selected: 0
    },
    legend: {
      enabled: false
      // floating: true,
      // verticalAlign: 'bottom',
      // align:'left',
      // y:42,
      // x:30
    },
    series: []
  }

}
