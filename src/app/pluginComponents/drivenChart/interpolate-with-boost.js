
import $ from "jquery";
export const InterpolateModule = $(function(H) {
  var Axis = H.Axis,
    noop = H.noop,
    wrap = H.wrap;

  wrap(Axis.prototype, 'drawCrosshair', function(proceed, e, point) {
    if (!this.isXAxis && e) {
      H.each([point] || this.chart.hoverPoints, function(point) {
        var series = point && point.series,
          points = series && series.points,
          axis = series && series.yAxis,
          prev,
          next,
          i,
          newX,
          interpolate,
          xAxisPos = series && series.xAxis.pos,
          pointProto = series.pointClass.prototype;

        if (axis && series && axis.options.crosshair && axis.options.crosshair.interpolate) {
          for (i = 0; i < points.length; i++) {
            if (points[i].plotX + xAxisPos > e.chartX) {
              prev = points[i - 1];
              next = points[i];
              break;
            }
          }

          if (prev && next) {
            if (series.options.step === 'left') {
              interpolate = function(prop) {
                return prev[prop];
              };
            } else {
              interpolate = function(prop) {
                var factor = (e.chartX - prev.plotX - xAxisPos) / (next.plotX - prev.plotX);
                return prev[prop] + (next[prop] - prev[prop]) * factor;
              };
            }

            newX = interpolate('x');
            
            point = {
              series: series,
              x: newX,
              category: newX,
              y: H.defined(prev.y) ?
              	interpolate('y') :
                axis.toValue(interpolate('plotY'), true),
              plotX: interpolate('plotX'),
              plotY: interpolate('plotY'),

              // for tooltip
              setState: noop,
              getLabelConfig: prev.getLabelConfig || pointProto.getLabelConfig,
              tooltipFormatter: prev.tooltipFormatter || pointProto.tooltipFormatter,
              colorIndex: prev.colorIndex,
              color: prev.color
            };

            if (!this.chart.customPointsFinished) {
              this.chart.customPoints = this.chart.customPoints || [];
              this.chart.customPoints.push(point);
            }
          }
        }

        proceed.call(axis, e, point);
      });
      this.chart.customPointsFinished = true;
    } else {
      proceed.call(this, e, point);
    }
  });


  wrap(H.Tooltip.prototype, 'refresh', function(proceed, pointOrPoints) {
    // use customPoints if available
    if (this.chart.customPoints) {
      pointOrPoints = this.chart.customPoints;
      this.chart.customPoints = false;
    }

    proceed.apply(this, [].slice.call(arguments, 1));
  });

  //runPointActions
  wrap(H.Pointer.prototype, 'runPointActions', function(proceed, e, p) {
    // clear customPoints if available
    this.chart.customPoints = false;
    this.chart.customPointsFinished = false;

    proceed.apply(this, [].slice.call(arguments, 1));
    // recall tooltip with new points
    var chart = this.chart,
      tooltip = chart.tooltip && chart.tooltip.options.enabled ?
      chart.tooltip : undefined;
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

  H.Tooltip.prototype.renderSplit = function(labels, points) {
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
    each(labels.slice(0, points.length + 1), function(str, i) {
      if (str !== false) {
        var point = points[i - 1] ||
          // Item 0 is the header. Instead of this, we could also
          // use the crosshair label
          {
            isHeader: true,
            plotX: points[0].plotX
          },
          owner = point.series || tooltip,
          tt = owner.tt,
          series = point.series || {},
          colorClass = 'highcharts-color-' + pick(
            point.colorIndex,
            series.colorIndex,
            'none'
          ),
          target,
          x,
          bBox,
          boxWidth;

        // Store the tooltip referance on the series
        if (!tt) {
          owner.tt = tt = ren.label(
              null,
              null,
              null,
              'callout',
              null,
              null,
              options.useHTML
            )
            .addClass(
              'highcharts-tooltip-box ' + colorClass +
              (point.isHeader ? ' highcharts-tooltip-header' : '')
            )
            .attr({
              'color': 'red', // (point.isHeader ? '#fff' : undefined),
              'padding': options.padding,
              'r': options.borderRadius,

              'fill': (point.isHeader ? '#FFF' : options.backgroundColor),
              'stroke': (
                options.borderColor ||
                point.color ||
                series.color ||
                '#333333'
              ),
              'stroke-width': options.borderWidth

            })
            .add(tooltipLabel);
        }

        tt.isActive = true;
        tt.attr({
          text: str
        });

        tt.css(options.style)
          .css(point.isHeader ? {
            color: 'black'
          } : {});
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
              (
                // Scrollable plot area
                chart.scrollablePixels ?
                chart.scrollablePixels - chart.marginRight :
                0
              ) -
              boxWidth
            )
          );
        } else {
          x = point.plotX + chart.plotLeft -
            pick(options.distance, 16) - boxWidth;
        }


        // If overflow left, we don't use this x in the next loop
        if (x < 0) {
          rightAligned = false;
        }

        // Prepare for distribution
        target = (point.series && point.series.yAxis &&
          point.series.yAxis.pos) + (point.plotY || 0);
        target -= distributionBoxTop;

        if (point.isHeader) {
          target = headerTop ?
            -headerHeight :
            chart.plotHeight + headerHeight;
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
    each(boxes, function(box) {
      var point = box.point,
        series = point.series;

      // Put the label in place
      box.tt.attr({
        visibility: box.pos === undefined ? 'hidden' : 'inherit',
        x: (rightAligned || point.isHeader ?
          box.x :
          point.plotX + chart.plotLeft + pick(options.distance, 16)),
        y: box.pos + distributionBoxTop,
        anchorX: point.isHeader ?
          point.plotX + chart.plotLeft : point.plotX + series.xAxis.pos,
        anchorY: point.isHeader ?
          chart.plotTop + chart.plotHeight / 2 : point.plotY + series.yAxis.pos
      });
    });
  };

}(Highcharts));