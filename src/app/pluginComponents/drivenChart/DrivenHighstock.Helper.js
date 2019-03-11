import Highcharts from 'highcharts/highstock';

class DrivenHighstockUtility {
    static defaultID = "";
    static defaultColorAxis = "#313131";
    /**
     * Tells if the provided object is empty
     * @param {mixed} obj
     */
    static isEmpty(obj) {
        let isEmpty = false;
        const type = typeof obj;

        isEmpty = isEmpty || !obj;
        isEmpty = isEmpty || (type === 'undefined'); // if it is undefined
        isEmpty = isEmpty || (obj === null); // if it is null
        isEmpty = isEmpty || (type === 'string' && (obj === '')); // if the string is empty
        isEmpty = isEmpty || (obj === false || obj === 0); // if boolean value returns false
        isEmpty = isEmpty || (Array.isArray(obj) && obj.length === 0); // if array is empty
        isEmpty = isEmpty || (type === 'object' && Object.keys(obj).length === 0); // if object is empty

        return isEmpty;
    }


    static generateAxis(seriesName, seriesColor, yAxisSwitchValue, chart, lineWidth, id, SeriesVisible, chartType, jointype) {
       
       
        if (SeriesVisible == 1) {
            yAxisSwitchValue = true;
            seriesColor = DrivenHighstockUtility.defaultColorAxis;
            DrivenHighstockUtility.defaultID = DrivenHighstockUtility.PrefixChartwithID(id);

        }
        
     
        let IsInterpolate = DrivenHighstockUtility.IsInterpolate(chartType);
        if (jointype == true) {
            IsInterpolate = false;
        }
        let yAxis = {}
        console.log(IsInterpolate)
        console.log(jointype)
        yAxis.id = DrivenHighstockUtility.PrefixChartwithID(id),
            yAxis.opposite = false,
            yAxis.showEmpty = false
        yAxis.lineColor = seriesColor,
            yAxis.lineWidth = lineWidth,
            yAxis.title = {
                text: null
            },
            yAxis.crosshair = {
                snap: false,
                interpolate: IsInterpolate,
                label: {
                    enabled: false,
                    format: '{value:.3f}' // 3 decimal
                }
            }
        yAxis.labels = {
            style: {
                color: seriesColor
            }
        },
            yAxis.visible = yAxisSwitchValue

        return yAxis;
    }


    static generateSeries(currentSeriesMetaData, jointype, isDataLable, isEnableLable, yAxisSwitchValue, chartType) {
        let series = {};
        let seriesMetaWithData;
        if (Object.prototype.toString.call(currentSeriesMetaData) === '[object Array]') {
            seriesMetaWithData = currentSeriesMetaData[0];
        } else {
            seriesMetaWithData = currentSeriesMetaData;
        }


        series.color = seriesMetaWithData.color;
        series.name = seriesMetaWithData.name;
        series.data = DrivenHighstockUtility.getData(seriesMetaWithData.data, seriesMetaWithData.color, jointype, chartType);
        series.marker = DrivenHighstockUtility.getMarker(seriesMetaWithData, jointype, isDataLable);
        series.dataLabels = {
            enabled: isEnableLable == undefined ? false : isEnableLable,

        }
        // series.showInNavigator = seriesMetaWithData.showInNavigator,
        series.step = jointype

        if (yAxisSwitchValue)
            series.yAxis = DrivenHighstockUtility.PrefixChartwithID(seriesMetaWithData.id);
        else
            series.yAxis = DrivenHighstockUtility.defaultID;

        series.id = DrivenHighstockUtility.PrefixChartwithID(seriesMetaWithData.id);

        //series.enableMouseTracking= false
        return series;
    }

    static updategenerateAxis(seriesColor, yAxisSwitchValue, plotSplitSwitch) {
      
        let yAxis = {}
        yAxis.lineColor = seriesColor,
            yAxis.lineWidth = 2,
            yAxis.labels = {
                style: {
                    color: seriesColor,

                }
            },
            yAxis.visible = yAxisSwitchValue,
            yAxis.offset = plotSplitSwitch ? 0 : null
        return yAxis;
    }


    static generateSeriesForPlotOptions(seriesList, isDataLable, isEnableLable) {
        let series = []
        for (let i = 0; i < seriesList.length; i++) {
            let seriesobj = {}
            seriesList[i].marker.enabled = isDataLable
            seriesobj.marker = seriesList[i].marker;
            seriesobj.cropThreshold = 9e9,
                // seriesobj.dataGrouping = {
                //     // groupPixelWidth: 10,
                //     // enabled: false
                // },
                seriesobj.dataLabels = {
                    enabled: isEnableLable,
                }

            series.push(seriesobj);
        }

        return series;
    }

    static generateSeriesForJoinType(seriesList, isJoinType, chartType) {
        
        let series = []
        for (let i = 0; i < seriesList.length; i++) {
            let seriesobj = {}
            seriesobj.step = isJoinType
            seriesobj.data = DrivenHighstockUtility.getData(seriesList[i].data, seriesList[i].color, isJoinType, chartType);
            series.push(seriesobj);
        }

        return series;
    }

    static generateSeriesForChartType(seriesList, isJoinType, chartType) {
        let series = []
        for (let i = 0; i < seriesList.length; i++) {
            let seriesobj = {}

            seriesobj.step = isJoinType
            seriesobj.data = DrivenHighstockUtility.getData(seriesList[i].data, "", isJoinType, chartType);
            series.push(seriesobj);


        }

        return series;
    }
    static generateSeriesForUpdateData(seriesList, isJoinType, isDataLable, seriesMeta, chartType) {
        let series = []
        for (let i = 0; i < seriesList.length; i++) {
            let seriesobj = {}
            seriesobj.data = DrivenHighstockUtility.getData(seriesList[i], seriesMeta[i].color, isJoinType, chartType);
            seriesobj.marker = DrivenHighstockUtility.getMarker(seriesMeta[i], isJoinType, isDataLable)
            // seriesobj.animation = true
            series.push(seriesobj);
        }
        return series;
    }

    static generateSeriesForYaxis(seriesMetaWithDataList, yAxisSwitchValue, isJoinType, chartType) {
       
        let series = []

        for (let i = 0; i < seriesMetaWithDataList.length; i++) {
            let seriesobj = {}
            if (yAxisSwitchValue)
                seriesobj.yAxis = DrivenHighstockUtility.PrefixChartwithID(seriesMetaWithDataList[i].id)
            else
                seriesobj.yAxis = DrivenHighstockUtility.defaultID;


            seriesobj.data = DrivenHighstockUtility.getData(seriesMetaWithDataList[i].data, seriesMetaWithDataList[i].color, isJoinType, chartType)

            series.push(seriesobj);
        }

        return series;
    }

    static GenerationYAxis(plotSplitSwitch, seriesMetaWithDataList, yAxisSwitchValue, chartType,jointype) {
        let yAxis = []
        
        let NoofSeries = seriesMetaWithDataList.filter(v => v.visible === true).length;
        let toplength = NoofSeries;
        let height = plotSplitSwitch ? 100 / NoofSeries : 100;
        let top = height;

        let topCount = 1;
        let n = 0;
        for (let i = 0; i < seriesMetaWithDataList.length; i++) {

            if (seriesMetaWithDataList[i].visible) {
                let yAxisobj = {}

                yAxisobj = this.YAxis(seriesMetaWithDataList[i], n, plotSplitSwitch, yAxisSwitchValue, height, top, chartType,jointype);

                yAxis.push(yAxisobj)
                top = height * (n + 1);
                n++;
            }
        }
        return yAxis;
    }

    static YAxis(seriesMeta, index, plotSplitSwitch, yAxisSwitchValue, height, top, chartType,jointype) {

        let color = seriesMeta.colorCode;
        let _top = top;
        let _height = height - 5;
        let _offset = 0;
        if (!plotSplitSwitch) {
            _offset = null;
            _top = 0;
            _height = _height + 5;
            //yAxisSwitchValue = false;
        }

        if (!plotSplitSwitch && index == 0 && !yAxisSwitchValue) {
            yAxisSwitchValue = true;
            color = "#313131";
        }
        else if (plotSplitSwitch && index == 0) {
            _top = 0;
        }

        // if (!seriesMeta.visible)
        //     yAxisSwitchValue = false;
        let interpolate = DrivenHighstockUtility.IsInterpolate(chartType)

        if(jointype == true){
         
          interpolate = false
        }
       
        
        let yAxis = {}
       
        yAxis.id = DrivenHighstockUtility.PrefixChartwithID(seriesMeta.id),
            yAxis.lineColor = color,
            // yAxis.lineWidth = 2,
            yAxis.opposite = false,
            yAxis.showEmpty = false,
            yAxis.crosshair = {
                snap: false,
                interpolate: interpolate,
                label: {
                    enabled: false,
                    format: '{value:.3f}' // 3 decimal
                }
            }
        yAxis.labels = {
            style: {
                color: color
            }
        },
            yAxis.visible = yAxisSwitchValue
        yAxis.offset = _offset,
            yAxis.top = _top + '%',
            yAxis.height = _height + '%'
        return yAxis;
    }

    static resetYAxis(yaxislength, visible) {
        let yAxisList = []
        for (let i = 0; i < yaxislength; i++) {
            let yAxis = {}
            yAxis.visible = visible
            yAxisList.push(yAxis)
        }
        return yAxisList;
    }

    static formatterlabel(formatType) {
        if (formatType == 0)
            return "HH:MM"
        else if (formatType == 1) {
            return "HH:MM";
        }
        else if (formatType == 2) {
            return "HH:MM";
        }
        else if (formatType == 3) {
            return "lll";
        }
        else if (formatType == 4) {
            return "MMMM-DD HH";
        }
        else {
            return "MM-DD-YYYY";
        }
    }

    static PrefixChartwithID(id) {
        return "S_" + id
    }


    static getData(seriesData, color, jointype, chartType) {
        if (jointype == undefined)
            jointype = false

        if (jointype) {
            // if (chartType == "column")
            return seriesData;
            // else
            //     return DrivenHighstockUtility.interpolate(seriesData, color, "left");
        }
        else {
            // if (chartType == "column")
            return seriesData;
            // else
            //     return DrivenHighstockUtility.interpolate(seriesData, color, "");
        }
    }

    static getMarker(seriesMeta, jointype, isDataLable) {
        if (DrivenHighstockUtility.isEmpty(seriesMeta)) return null;
        if (jointype == undefined)
            jointype = false

        if (isDataLable == undefined)
            isDataLable = false;

        //seriesMeta.marker.enabled = isDataLable == undefined ? false : isDataLable;

        if (jointype) {
            //   seriesMeta.marker.fillColor = "none"
            seriesMeta.marker.enabled = isDataLable
            return seriesMeta.marker
        }
        else {
            // seriesMeta.marker.fillColor = "none"
            seriesMeta.marker.enabled = isDataLable
            return seriesMeta.marker
        }

    }

    static showNoData(strMessage) {

        return strMessage
    }

    static ISData(series) {
        let isData = true;
        if (series && series.length > 0) {
            for (let i = 0; i < series.length; i++) {
                if (series[i].data.length == 0) {
                    isData = false;
                    return isData;
                }
            }
        }

        return isData;
    }

    static IsInterpolate(chartType) {
        let isInterpolate = true;
        if (chartType === "column")
            isInterpolate = true;
        return isInterpolate;
    }

    static interpolate(data, color, step) {


        if (!data) return [];

        var resolution = 0,
            interpolatedData = [];

        //  console.log('data len: ', data.length);

        data.forEach(function (point, i) {
            var x, y;
            if (i > 0) {
                // console.log(data[i - 1][0]);
                // console.log(data[i][0]);

                if (data[i][0] - data[i - 1][0] <= 60 * 60) {
                    resolution = (data[i][0] - data[i - 1][0]) / 60;//interpolation for hourly gap
                    //} else if (data[i][0] - data[i - 1][0] < 60 * 60) {
                    //  resolution = (data[i][0] - data[i - 1][0]) / 60 * 60;
                } else if (data[i][0] - data[i - 1][0] < 1440 * 60) { //daily data
                    resolution = (data[i][0] - data[i - 1][0]) / 1440 * 60;
                } else { //if (data[i][0] - data[i - 1][0] < 10080 * 60) { //weekly data
                    resolution = (data[i][0] - data[i - 1][0]) / 10080 * 60;
                }

                // console.log(data);
                // console.log('resolution: ', resolution);
                // console.log(data[i - 1][0] + resolution < point[0]);

                for (x = data[i - 1][0] + resolution; x < point[0]; x += resolution) {
                    if (step) {
                        if (step === 'left') {
                            y = data[i - 1][1];
                        }
                        // add support for other step values here
                    } else {
                        y = data[i - 1][1] + (point[1] - data[i - 1][1]) *
                            ((x - data[i - 1][0]) / (point[0] - data[i - 1][0]));
                    }

                    interpolatedData.push([
                        Highcharts.correctFloat(x),
                        Highcharts.correctFloat(y)
                    ]);
                }
            }
            //console.log(interpolatedData);

            interpolatedData.push({
                x: point[0],
                y: point[1],
                marker: {
                    fillColor: color
                }
            });

        });

        // console.log('interpolatedData len: ', interpolatedData.length);

        return interpolatedData;
    }
}
export default DrivenHighstockUtility;