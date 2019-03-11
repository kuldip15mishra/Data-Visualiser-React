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
 * Module :  DrivenHighchart
 * Description :
 * Date:07-AUG-2018.
 * =============================================================================================================================================
 *
 * #endregion
 */

/**library import section Begin*/
import React, {
    Component
} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts/highstock';

import * as hcnd from 'highcharts/modules/no-data-to-display';
import Boost from 'highcharts/modules/boost';
// import HttpClient from "../../services/apiService";
import DrivenHighstockUtility from './DrivenHighstock.Helper'
import {
    apiURL
} from "../../constants/Constants";
// import { connect } from 'react-redux';
/**library import section End*/
// import moment from 'moment';
// import interpolate from './interpolate';
//  import {InterpolateModule} from './interpolate-with-boost'
(function (H) {
    var Axis = H.Axis,
        noop = H.noop,
        wrap = H.wrap;

    if (!H.customNo1Added) {
        wrap(Axis.prototype, "drawCrosshair", function (proceed, e, point) {
            var chart = this.chart;
            if (!this.isXAxis && e) {
                H.each(chart.series, function (series) {
                    //console.log(series.visible);
                    if (series.visible) {
                        var points = series && series.points,
                            axis = series && series.yAxis,
                            prev,
                            next,
                            i,
                            newX,
                            interpolate,
                            xAxisPos = series && series.xAxis.pos,
                            pointProto = series.pointClass.prototype;

                        if (
                            axis &&
                            series &&
                            axis.options.crosshair &&
                            axis.options.crosshair.interpolate
                        ) {
                            for (i = 0; i < points.length; i++) {
                                if (points[i].plotX + xAxisPos > e.chartX) {
                                    prev = points[i - 1];
                                    next = points[i];
                                    break;
                                }
                            }

                            if (prev && next) {
                                if (series.options.step === "left") {
                                    interpolate = function (prop) {
                                        return prev[prop];
                                    };
                                } else {
                                    interpolate = function (prop) {
                                        var factor =
                                            (e.chartX - prev.plotX - xAxisPos) /
                                            (next.plotX - prev.plotX);
                                        return prev[prop] + (next[prop] - prev[prop]) * factor;
                                    };
                                }

                                newX = interpolate("x");

                                point = {
                                    series: series,
                                    x: newX,
                                    category: newX,
                                    y: H.defined(prev.y)
                                        ? interpolate("y")
                                        : axis.toValue(interpolate("plotY"), true),
                                    plotX: interpolate("plotX"),
                                    plotY: interpolate("plotY"),

                                    // for tooltip
                                    setState: noop,
                                    getLabelConfig:
                                        prev.getLabelConfig || pointProto.getLabelConfig,
                                    tooltipFormatter:
                                        prev.tooltipFormatter || pointProto.tooltipFormatter,
                                    colorIndex: prev.colorIndex,
                                    color: prev.color
                                };

                                if (!chart.customPointsFinished) {
                                    chart.customPoints = chart.customPoints || [];
                                    chart.customPoints.push(point);
                                }
                            }
                        }

                        proceed.call(axis, e, point);
                    }
                });
                this.chart.customPointsFinished = true;
            } else {
                proceed.call(this, e, point);
            }
        });

        wrap(H.Tooltip.prototype, "refresh", function (proceed, pointOrPoints, e) {
            // use customPoints if available
            if (this.chart.customPoints) {
                pointOrPoints = this.chart.customPoints;
                this.chart.customPoints = false;

            }

            proceed.call(this, H.splat(pointOrPoints), e);
        });

        //runPointActions
        wrap(H.Pointer.prototype, "runPointActions", function (proceed, e, p) {
            // clear customPoints if available
            this.chart.customPoints = false;
            this.chart.customPointsFinished = false;

            proceed.apply(this, [].slice.call(arguments, 1));
            //console.log("this.chart.customPoints? ", this.chart.customPoints);
            // recall tooltip with new points
            var chart = this.chart,
                tooltip =
                    chart.tooltip && chart.tooltip.options.enabled
                        ? chart.tooltip
                        : undefined;
            // if available
            if (tooltip && this.chart.customPoints) {
                tooltip.refresh(p, e);
            }
        });

        var doc = H.doc,
            each = H.each,
            extend = H.extend,
            format = H.format,
            isNumber = H.isNumber,
            map = H.map,
            merge = H.merge,
            pick = H.pick,
            splat = H.splat,
            syncTimeout = H.syncTimeout,
            timeUnits = H.timeUnits;

        H.Tooltip.prototype.renderSplit = function (labels, points) {
            var tooltip = this,
                boxes = [],
                chart = this.chart,
                ren = chart.renderer,
                rightAligned = true,
                options = this.options,
                headerHeight = 0,
                headerTop,
                tooltipLabel = this.getLabel(),
                distributionBoxTop = chart.plotTop;

            // Graceful degradation for legacy formatters
            if (H.isString(labels)) {
                labels = [false, labels];
            }
            // Create the individual labels for header and points, ignore footer
            each(labels.slice(0, points.length + 1), function (str, i) {
                if (str !== false) {
                    var point = points[i - 1] || {
                        // use the crosshair label // Item 0 is the header. Instead of this, we could also
                        isHeader: true,
                        plotX: points[0].plotX
                    },
                        owner = point.series || tooltip,
                        tt = owner.tt,
                        series = point.series || {},
                        colorClass =
                            "highcharts-color-" +
                            pick(point.colorIndex, series.colorIndex, "none"),
                        target,
                        x,
                        bBox,
                        boxWidth;

                    // Store the tooltip referance on the series
                    if (!tt) {
                        owner.tt = tt = ren
                            .label(null, null, null, "callout", null, null, options.useHTML)
                            .addClass(
                                "highcharts-tooltip-box " +
                                colorClass +
                                (point.isHeader ? " highcharts-tooltip-header" : "")
                            )
                            .attr({
                                color: "red", // (point.isHeader ? '#fff' : undefined),
                                padding: options.padding,
                                r: options.borderRadius,

                                fill: point.isHeader ? "#FFF" : options.backgroundColor,
                                stroke:
                                    options.borderColor ||
                                    point.color ||
                                    series.color ||
                                    "#333333",
                                "stroke-width": options.borderWidth
                            })
                            .add(tooltipLabel);
                    }

                    tt.isActive = true;
                    tt.attr({
                        text: str
                    });

                    tt.css(options.style).css(
                        point.isHeader
                            ? {
                                color: "#666"
                                // fontSize:"18px",
                                // "fontWeight": "bold",
                                // "fontFamily": "Roboto",
                                // "paddingLeft": 10,
                                // "paddingRight": 10,
                                // "paddingTop": 5,
                                // "paddingBottom": 5
                            }
                            : {}
                    );
                    //.shadow(options.shadow);

                    // Get X position now, so we can move all to the other side in
                    // case of overflow
                    bBox = tt.getBBox();
                    boxWidth = bBox.width + tt.strokeWidth();
                    if (point.isHeader) {
                        headerHeight = bBox.height;
                        if (chart.xAxis[0].opposite) {
                            headerTop = true;
                            distributionBoxTop -= headerHeight;
                        }
                        x = Math.max(
                            0, // No left overflow
                            Math.min(
                                point.plotX + chart.plotLeft - boxWidth / 2,
                                // No right overflow (#5794)
                                chart.chartWidth +
                                // Scrollable plot area
                                (chart.scrollablePixels
                                    ? chart.scrollablePixels - chart.marginRight
                                    : 0) -
                                boxWidth
                            )
                        );
                    } else {
                        x =
                            point.plotX +
                            chart.plotLeft -
                            pick(options.distance, 16) -
                            boxWidth;
                    }

                    // If overflow left, we don't use this x in the next loop
                    if (x < 0) {
                        rightAligned = false;
                    }

                    // Prepare for distribution
                    target =
                        (point.series && point.series.yAxis && point.series.yAxis.pos) +
                        (point.plotY || 0);
                    target -= distributionBoxTop;

                    if (point.isHeader) {
                        target = headerTop
                            ? -headerHeight
                            : chart.plotHeight + headerHeight;
                    }
                    boxes.push({
                        target: target,
                        rank: point.isHeader ? 1 : 0,
                        size: owner.tt.getBBox().height + 1,
                        point: point,
                        x: x,
                        tt: tt
                    });
                }
            });

            // Clean previous run (for missing points)
            this.cleanSplit();

            // Distribute and put in place
            H.distribute(boxes, chart.plotHeight + headerHeight);
            each(boxes, function (box) {
                var point = box.point,
                    series = point.series;

                // Put the label in place
                box.tt.attr({
                    visibility: box.pos === undefined ? "hidden" : "inherit",
                    x:
                        rightAligned || point.isHeader
                            ? box.x
                            : point.plotX + chart.plotLeft + pick(options.distance, 16),
                    y: box.pos + distributionBoxTop,
                    anchorX: point.isHeader
                        ? point.plotX + chart.plotLeft
                        : point.plotX + series.xAxis.pos,
                    anchorY: point.isHeader
                        ? chart.plotTop + chart.plotHeight / 2
                        : point.plotY + series.yAxis.pos
                });
            });
        };

        H.customNo1Added = true;
    }
})(Highcharts);

class DrivenHighstock extends Component {
    chartNoDataMessage;
    defaultColorAxis = "#313131";
    chart;
    isbutton = false




    /**Life Cycle Hook Section Start*/
    componentDidMount() {


        // Boost(Highcharts);
        let self = this;

        //getting height to subtract from whole trender container for highchart
        let negativeHeight = $(".chart-filter-area").height() + $(".navigation-buttons").height()
            + $(".navigation-buttons").height() + 80;


        function fixHighchartHeight() {
            let currentHeightNew = $(".trender-chart-area").height();
            var contHeight = currentHeightNew - negativeHeight;
            $(".trend-chart").height(contHeight);
            var containerWidth = $("#container").width();
            var containerHeight = $("#container").height();
            self.chart.setSize(containerWidth, containerHeight, false);
        }
        $(document).ready(function () {
            fixHighchartHeight();
        });







        $("#sb-1-toggle-btn").click(function () {
            $("#page-container").toggleClass("sb-1-open", function () {
                setTimeout(function () {
                    var containerWidth = $("#container").width();
                    self.chart.setSize(containerWidth);
                }, 500);

            });
            $("#sb-1-toggle-btn>i").toggleClass("rotate-180");
        });



        $("#sb-2-toggle-btn").click(function () {
            $("#page-container").toggleClass("sb-2-open", function () {

                setTimeout(function () {
                    var containerWidth = $("#container").width();
                    self.chart.setSize(containerWidth, null, false);
                }, 500);

            });
            $("#sb-2-toggle-btn>i").toggleClass("rotate-180");
        });

        // Chart Height button click code starts Here
        $("#chart-height-btn").click(function () {
            let defaultHeight = localStorage.getItem("defaultHeight");
            let currentHeight = $(".trender-chart-area").height();

            if (currentHeight <= defaultHeight) {
                $(".trender-chart-area").toggleClass("chart-full-height", function () {
                    let currentHeightNew = $(".trender-chart-area").height();
                    setTimeout(function () {
                        var contHeight = currentHeightNew - negativeHeight;
                        $(".trend-chart").height(contHeight);
                        var containerWidth = $("#container").width();
                        var containerHeight = $("#container").height();
                        self.chart.setSize(containerWidth, containerHeight, false);
                    }, 1);
                    window.isdivdrag=true;
                    window.gridContainerHeight();
                });
            }
            else {

                $(".trender-chart-area").toggleClass("chart-full-height", function () {
                    $(".trender-chart-area").height(defaultHeight);
                    let currentHeightNew = $(".trender-chart-area").height();
                    setTimeout(function () {
                        var contHeight = currentHeightNew - negativeHeight;
                        $(".trend-chart").height(contHeight);
                        var containerWidth = $("#container").width();
                        var containerHeight = $("#container").height();
                        self.chart.setSize(containerWidth, containerHeight, false);
                    }, 1);
                    window.gridContainerHeight();
                });

            }

            $("#chart-height-btn>i").toggleClass("rotate-180");

        });

        // Chart Height button click code End Here


        //Drag Resize Trend area Code Starts Here

        $('.trender-chart-area').resizable({
            handles: 's',
            resize: function () {
                var trendChart = $(".trender-chart-area").height();
                var contHeight = trendChart - negativeHeight;
                $(".trend-chart").height(contHeight);
                var containerWidth = $("#container").width();
                var containerHeight = $("#container").height();
                self.chart.setSize(undefined, contHeight, false);
                //    self.chart.setHeight(containerHeight);
                window.isdivdrag=true;
                window.gridContainerHeight();
            }

        });

        //Drag Resize Trend area Code Ends Here

        // //Window Resize Event  Code Starts Here
        $(window).resize(function () {
           
            let newScreenHeight = $(window).height() * 0.80;

            // let defaultHeight = $(".trender-chart-area").height();
            let currentHeightNew = $(".trender-chart-area").height();
            setTimeout(function () {
                var contHeight = currentHeightNew - negativeHeight;
                $(".trend-chart").height(contHeight);
                var containerWidth = $("#container").width();
                var containerHeight = $("#container").height();
                self.chart.setSize(containerWidth, containerHeight, false);
            }, 1);
            window.gridContainerHeight();
            
        });

        //Window Resize Event Code Ends Here


        this.initializeHighCharts(this.props.configData);

        let defaultHeight = $(".trender-chart-area").height();
        localStorage.setItem("defaultHeight", defaultHeight);
    }

    setHighChartsize(currentHeight) {
        var trendChart = currentHeight
        var contHeight = trendChart - 210;
        $(".trend-chart").height(contHeight);
        var containerWidth = $("#container").width();
        var containerHeight = $("#container").height();
        this.chart.setSize(undefined, contHeight, false);
    }

    initializeHighCharts(meta) {
        hcnd(Highcharts);
        Highcharts.setOptions({
            lang: {
                noData: '<img class="d-block text-center trend-dummy-img" src="src/assets/images/trender-filler.svg"></img><span class="d-block text-center mt-2">No Signal Added</span>'
            },
            noData: {
                position: {
                    align: 'center',
                    verticalAlign: 'middle'
                }
            },
            global: {
                useUTC: false
            }
        })

        Highcharts.stockChart('container', meta)
        this.chart = Highcharts.find(Highcharts.charts, function (chart) { return chart.renderTo.id === 'container'; });
    }

    reinitializeHighCharts(meta, seriesMeta, plotsplit, yAxis, timePeriodFromStore) {
       
        if (this.chart) {
            //this.chart.destroy();
        }
      
        localStorage.setItem("meta", meta);
        if (DrivenHighstockUtility.isEmpty(!seriesMeta)) {
            DrivenHighstockUtility.defaultID = seriesMeta[0].id;
        }


        this.chart = new Highcharts.stockChart('container', meta);
        this.chart.xAxis[0].setExtremes(timePeriodFromStore.startTime * 1000, timePeriodFromStore.endTime * 1000);

        //this.updateplotSplit(plotsplit, seriesMeta, yAxis);


        //DrivenHighstockUtility.defaultID = DrivenHighstockUtility.PrefixChartwithID(meta.series[0].id);
        this.chart.redraw(false);
    }
    /**Life Cycle Hook Section End*/

    hideSeriesOnEyeClick(index, hideSeriesData, seriesList, yAxisSwitchValue, plotSplitSwitch, isJoinType) {
        let yAxisID = DrivenHighstockUtility.defaultID;
        let yIndex;
        for (let i = 0; i < this.chart.yAxis.length; i++) {
            if (DrivenHighstockUtility.PrefixChartwithID(hideSeriesData.id) === this.chart.yAxis[i].userOptions.id) {
                yIndex = i
                break;
            }
        }
        let firstSeries = seriesList.filter(v => v.visible === true);
        if (!DrivenHighstockUtility.isEmpty(firstSeries)) {
            DrivenHighstockUtility.defaultID = DrivenHighstockUtility.PrefixChartwithID(firstSeries[0].id);
            yAxisID = DrivenHighstockUtility.defaultID
        }

        let currentVisible = !this.chart.yAxis[yIndex].visible;
        this.chart.yAxis[yIndex].update({
            visible: hideSeriesData.visible
        });

        let series = this.chart.series[index]
        series.setVisible(hideSeriesData.visible);


        //series.setVisible(currentVisible);



        this.chart.update({
            // tooltip: {
            //     split: plotSplitSwitch,
            //     distance: 30,
            //     padding: 5
            // },


            yAxis: DrivenHighstockUtility.GenerationYAxis(plotSplitSwitch, seriesList, yAxisSwitchValue, "line",isJoinType),
            series: DrivenHighstockUtility.generateSeriesForYaxis(seriesList, yAxisSwitchValue, isJoinType)
        });
        this.updateplotSplit(plotSplitSwitch, seriesList, yAxisSwitchValue, isJoinType);
    }



    //update series from chart
    updateSeriesAuto(seriesMetaWithData, rangeSelector, isJoinType, isDataLable, series, chartValue) {
        if (seriesMetaWithData && seriesMetaWithData.length > 0) {
            let isdatacount = 0;

            if (this.chart.series.length > 0) {
                this.chart.update({
                    series: DrivenHighstockUtility.generateSeriesForUpdateData(seriesMetaWithData, isJoinType, isDataLable, series, chartValue)
                });

                const isseriesData = [].concat(...seriesMetaWithData);

                this.chart.xAxis[0].setExtremes(rangeSelector.startTime * 1000, rangeSelector.endTime * 1000)

                // if (!DrivenHighstockUtility.isEmpty(rangeSelector) && !DrivenHighstockUtility.isEmpty(rangeSelector.timePeriod) && rangeSelector.timePeriod != -1)
                //     this.chart.rangeSelector.clickButton(rangeSelector.timePeriod, true);
               
                if (isseriesData && isseriesData.length == 0) {
                    this.chart.hideNoData(); 
                    this.chart.showNoData('<img class="d-block text-center trend-dummy-img" src="src/assets/images/trender-filler.svg"></img><span class="d-block text-center mt-2">No Data Available for the Signals</span>');
                    this.chart.xAxis[0].setExtremes(rangeSelector.startTime * 1000, rangeSelector.endTime * 1000);
                }
                this.chart.redraw(false);
            }
        }

    }

    //CheckSeriesExist

    isSeriesExist(series) {
        let newFilter = this.chart.series.filter(x => {
            return x.yAxis.userOptions.id === "S_" + series.id
        });
        if (newFilter && newFilter.length > 0) {
            return true;
        } else {
            return false;
        }

    }

    //add series from chart
    addSeries(seriesMetaWithData, plotSplitSwitch, series, yAxisSwitchValue, jointype, isDataLable, isEnableLable, timePeriodFromStore, chartValue) {
      
        if (DrivenHighstockUtility.isEmpty(seriesMetaWithData)) return null;
        //if(DrivenHighstockUtility.isEmpty(seriesMetaWithData)) return null;


        let self = this;
        if (this.isSeriesExist(seriesMetaWithData)) {
            this.updateSeriesByID(seriesMetaWithData);
            return true;
        }

        let NoofSeriesVisible = series.filter(v => v.visible === true).length;



        var a = function () {
            var a = $.Deferred();
            
            self.chart.addAxis(DrivenHighstockUtility.generateAxis(seriesMetaWithData.name, seriesMetaWithData.color, yAxisSwitchValue, self.chart, seriesMetaWithData.lineWidth, seriesMetaWithData.id, NoofSeriesVisible, chartValue,jointype));
            self.chart.addSeries(DrivenHighstockUtility.generateSeries(seriesMetaWithData, jointype, isDataLable, isEnableLable, yAxisSwitchValue, chartValue), true);

          
            let isData = DrivenHighstockUtility.ISData(series)
            if (!isData) {
                self.chart.hideNoData(); 
                self.chart.showNoData('<img class="d-block text-center trend-dummy-img" src="src/assets/images/trender-filler.svg"></img><span class="d-block text-center mt-2">No Data Available for the Signals</span>');
            }


            setTimeout(function () {
                a.resolve()
            }, 1);
            return a
        }, b = function () {
            self.chart.xAxis[0].setExtremes(timePeriodFromStore.startTime * 1000, timePeriodFromStore.endTime * 1000);

            if (plotSplitSwitch)
                self.updateplotSplit(plotSplitSwitch, series, yAxisSwitchValue, jointype);
        };
        a().done(b);
    }


    //update series from chart using id
    updateSeriesByID(seriesMetaWithData, index, isDataLable, isEnableLable) {
        if (seriesMetaWithData) {
            if (isDataLable == undefined)
                isDataLable = false;

            this.chart.series[index].update({
                color: seriesMetaWithData.colorCode,
                name: seriesMetaWithData.name,
                marker: {
                    symbol: seriesMetaWithData.lineSymbol,
                    radius: 4,
                    enabled: isDataLable
                },
                dataLabels: {
                    enabled: isEnableLable,
                },
                lineWidth: seriesMetaWithData.lineWidth
                // data: seriesMetaWithData.data
            }, true);
        }
        this.chart.redraw(false);
    }


    updatechartSetting(series, isDataLable, isEnableLable) {
        this.chart.update({
            series: DrivenHighstockUtility.generateSeriesForPlotOptions(series, isDataLable, isEnableLable)
        });
    }
    componentWillUnmount = () => {
        // this.chart.destroy();
    }


    goToFullScreen() {
        let defaultHeight = localStorage.getItem("defaultHeight");
        let currentHeight = $(".trender-chart-area").height();

        var contHeight = currentHeight - 210;
        $(".trend-chart").height(contHeight);
        var containerWidth = $("#container").width();
        var containerHeight = $("#container").height();
        this.chart.setSize(containerWidth, containerHeight, false);
    }

    //remove series from chart
    removeSeries(seriesName, index, yAxisSwitchValue, series, plotSplitSwitch) {

        if (DrivenHighstockUtility.isEmpty(this.chart)) return;
        if (DrivenHighstockUtility.isEmpty(seriesName)) return;
        let currentseries = this.chart.get(DrivenHighstockUtility.PrefixChartwithID(seriesName.id));
        let length = this.chart.series.length;
        let isData = DrivenHighstockUtility.ISData(series)
        if (series.length == 0) {
            this.chart.hideNoData(); 
            this.chart.showNoData('<img class="d-block text-center trend-dummy-img" src="src/assets/images/trender-filler.svg"></img><span class="d-block text-center mt-2">No Signal Added</span>');
        }
        if (DrivenHighstockUtility.isEmpty(currentseries)) return;

        if (!DrivenHighstockUtility.isEmpty(currentseries) && length !== 1) {
            // currentseries.remove();
            this.chart.series[index].remove();

            this.updateplotSplit(plotSplitSwitch, series, yAxisSwitchValue);
        } else {

            this.chart.series[0].remove();
            this.updateplotSplit(plotSplitSwitch, series, yAxisSwitchValue);


        }
    }


    findSeriesIndex(seriesName) {
        let index = this.chart.series.findIndex(x => {
            return x.id === 'S_' + seriesName.id
        })
        for (let i = 0; i < this.chart.series.length; i++) {
            if (this.chart.series[i].id === 'S_' + seriesName.id) {
                index = i;
            }
        }
        return index;
    }

    //call on yAxis switch
    updateAxis(yAxisSwitchValue, seriesListData, plotSplitSwitch, isJoinType, chartValue) {


        this.chart.update({
            // tooltip: {
            //     split: plotSplitSwitch,
            //     distance: 30,
            //     padding: 5
            // },
            series: DrivenHighstockUtility.generateSeriesForYaxis(seriesListData, yAxisSwitchValue, isJoinType, chartValue),
            yAxis: DrivenHighstockUtility.GenerationYAxis(plotSplitSwitch, seriesListData, yAxisSwitchValue, "line",isJoinType),
        });
    }






    //it is a function which navigate the series data by setextreme
    updateTimePeriod(selectedRange) {

    }

    //it is a function to update the chart type like Line, Bar, Area
    updateChartType(chartValue, series, isJoinType, plotSplitSwitch, yAxisSwitchValue) {
        this.chart.update({
            chart: {
                type: chartValue
            },
            series: DrivenHighstockUtility.generateSeriesForChartType(series, isJoinType, chartValue),
            yAxis: DrivenHighstockUtility.GenerationYAxis(plotSplitSwitch, series, yAxisSwitchValue, chartValue,isJoinType)
        });

    }

    //it is a function to update teh Join type like step or linear
    updateJoinType(joinValue, series, chartValue, plotSplitSwitch, yAxisSwitchValue) {
        
        this.chart.update({
            series: DrivenHighstockUtility.generateSeriesForJoinType(series, joinValue, chartValue),
            yAxis: DrivenHighstockUtility.GenerationYAxis(plotSplitSwitch, series, yAxisSwitchValue, chartValue,joinValue)
        });


    }

    updateplotSplit(plotSplitSwitch, seriesMeta, yAxisSwitchValue, isJoinType, chartValue) {
        this.chart.update({
            yAxis: DrivenHighstockUtility.GenerationYAxis(plotSplitSwitch, seriesMeta, yAxisSwitchValue, chartValue,isJoinType),
            series: DrivenHighstockUtility.generateSeriesForYaxis(seriesMeta, yAxisSwitchValue, isJoinType, chartValue)
        });


    }



    render() {
        return (

            <div id="container"> <img className="driven-loader" src="src/assets/images/driven-loader.svg" /> </div>

        )
    }
}
export default DrivenHighstock;