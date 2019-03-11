
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
* Module :  Add Series dump Component (presentaion Component)
* Description : it is a dump component which helps to add series into grid
* Date:01-JUNE-2018.
* =============================================================================================================================================
 *
 * #endregion
*/
/**library import section Begin*/
import React, { Fragment } from 'react'
import idGenerator from 'react-id-generator';
import { RetrivalMode, LineWidth, LineSymbol, TimeInterval } from "../constants/Constants"

let colors = ['#262626', '#6F5032', '#C87D0D', '#AD4F00', '#C3260C', '#E90162', '#933275', '#17365D',
    , '#0D78C9', '#31859B', '#0B7F5A', '#76923C'];

let colorPalette = ['#BFBFBF', '#ECE1D6', '#FCECD5', '#FFD6B3', '#FCD9D3', '#FFD6E8', '#FFC2EC', '#D8C0F5', '#8CBFFF',
    '#B4DCFA', '#BCDDFF', '#ACE9F9', '#B9FEE8', '#E8FDBC', '#979797', '#DAC3AD', '#F9D9AB', '#FFA65C',
    '#FAB3A7', '#FFAFD1', '#F67ED1', '#A886D2', '#458BE3', '#8BC9F7', '#97B6D6', '#50B5CF', '#69F1C6', '#B4DA66',
    '#4C4C4C', '#C8A585', '#F6C781', '#E77A1E', '#F68D7B', '#FF87BA', '#B84B97', '#7D62A0', '#2A5C9B', '#4FACF3',
    '#6C849D', '#31859B', '#3AA281', '#8DAE4A', '#262626', '#6F5032', '#C87D0D', '#AD4F00', '#C3260C', '#E90162',
    '#933275', '#5F497A', '#17365D', '#0D78C9', '#4A5B6D', '#31859B', '#0B7F5A', '#76923C'];


export const FormTagElements = (props) => {
    return <div className="col">
        <div className="form-group">

            <label htmlFor="monitoredTag" className="required-field">Monitored Tag/Expression</label>
            <textarea className="form-control" id="monitoredTag" rows="3"
                onPaste={(e) => { e.preventDefault(); props.onPaste() }}
                name="name" value={props.name}
                onChange={props.onInputChange1}
            />
        </div>
        <div className="form-group mt-4">
            <label htmlFor="description" className="required-field">Description</label>
            <input className="form-control" id="description" type="text"
                placeholder="Enter a text"
                value={props.description}
                name="description"
                disabled={true}
                onChange={props.onInputChange1}
            />
        </div>
        <div className="form-group mt-4">
            <label htmlFor="uom" className="required-field">UOM</label>
            <input className="form-control" id="UOM"
                type="text"
                placeholder="Enter a text"
                value={props.unit}
                disabled={true}
                name="UOM"
                onChange={props.onInputChange1}
            />
        </div>
        <div className="form-group mt-4">
            <label htmlFor="color">Color</label>
          
            <div className="color-palette">
                {

                    colors.slice(0, 14).map((clr, index) => {
                        return (
                            <Fragment key={index}>
                                <input type="radio" checked={props.selected==clr} onChange={() => props.onSetColorCode(clr)}  name="color-palette"  id={clr} value={clr} />
                                <label htmlFor="clr"><span className={clr}  onClick={() => props.onSetColorCode(clr)} style={{ 'background': clr }}></span></label>
                            </Fragment>
                        );
                    })
                }
                <div className="dropdown color-btn-box">
                    <button type="button" data-toggle="dropdown">
                        <i className="ti-angle-down"></i>
                    </button>
                    <div className="dropdown-menu color-dropdown">
                        {

                            colorPalette.map((clr, index) => {
                                return (
                                    <Fragment key={index}>
                                        <input type="radio" checked={props.selected==clr} onChange={() => props.onSetColorCode(clr)} name="color-palette" id={clr} value={clr} />
                                        <label htmlFor="clr"><span className={clr} onClick={() => props.onSetColorCode(clr)} style={{ 'background': clr }}></span></label>
                                    </Fragment>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export const FormsChartConfigElements = (props) => {
    return (
        <div className="col">
            <div className="form-group">
                <label htmlFor="Retrival-Mode">Retrival Mode</label>
                <div className="img-radio">
                    <label>
                        <input type="radio" name="retrivalMode"
                            value="raw"
                            checked={props.retrivalMode == RetrivalMode["RAW"]}
                            onChange={props.onRetrivalModeInputChange} />
                        <img src="src/assets/images/icons/raw.svg" />

                        <span>Raw</span>
                    </label>

                    <label>
                        <input type="radio" name="retrivalMode"
                            value="interpolate"
                            checked={props.retrivalMode == RetrivalMode["INTERPOLATE"]}
                            onChange={props.onRetrivalModeInputChange} />
                        <img src="src/assets/images/icons/interpolated.svg" />
                        <span>Interpolated</span>
                    </label>

                    <label>
                        <input type="radio" name="retrivalMode"
                            value="min"
                            checked={props.retrivalMode == RetrivalMode["MIN"]}
                            onChange={props.onRetrivalModeInputChange} />
                        <img src="src/assets/images/icons/aggregate-min.svg" />
                        <span>Aggregate Min</span>
                    </label>

                    <label>
                        <input type="radio" name="retrivalMode"
                            value="avg"
                            checked={props.retrivalMode == RetrivalMode["AVG"]}
                            onChange={props.onRetrivalModeInputChange} />
                        <img src="src/assets/images/icons/aggregate-avg.svg" />
                        <span>Aggregate Avg</span>
                    </label>
                    <label>
                        <input type="radio" name="retrivalMode"
                            value="max"
                            checked={props.retrivalMode == RetrivalMode["MAX"]}
                            onChange={props.onRetrivalModeInputChange} />
                        <img src="src/assets/images/icons/aggregate-max.svg" />
                        <span>Aggregate Max</span>
                    </label>
                </div>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="Line-Symbol" className="mb-3">Time Interval</label>
                <div className="img-radio">

                    <label>
                        <input type="radio"
                            name="timeinterval"
                            value="15"
                            checked={props.timeinterval == TimeInterval["Min_15"]}
                            onChange={props.onTimeIntervalInputChange}
                            disabled={props.disabledtimeinterval}
                        />
                        <i className="img-radio-text">15 Min</i>

                    </label>

                    <label>
                        <input type="radio"
                            name="timeinterval"
                            value="30"
                            checked={props.timeinterval == TimeInterval["Min_30"]}
                            onChange={props.onTimeIntervalInputChange}
                            disabled={props.disabledtimeinterval}
                        />
                        <i className="img-radio-text">30 Min</i>

                    </label>

                    <label>
                        <input type="radio"
                            name="timeinterval"
                            value="60"
                            checked={props.timeinterval == TimeInterval["Hour_1"]}
                            disabled={props.disabledtimeinterval}
                            onChange={props.onTimeIntervalInputChange} />
                        <i className="img-radio-text">1 Hr</i>

                    </label>

                    <label>
                        <input type="radio"
                            name="timeinterval"
                            value="480"
                            checked={props.timeinterval == TimeInterval["Hour_8"]}
                            disabled={props.disabledtimeinterval}
                            onChange={props.onTimeIntervalInputChange}
                        />
                        <i className="img-radio-text">8 Hr</i>

                    </label>
                    <label>
                        <input type="radio"
                            name="timeinterval"
                            value="1440"
                            checked={props.timeinterval == TimeInterval["Day_1"]}
                            disabled={props.disabledtimeinterval}
                            onChange={props.onTimeIntervalInputChange}
                        />
                        <i className="img-radio-text">1 Day</i>

                    </label>

                </div>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="Line-Width" className="mb-3">Line Width</label>
                <div className="img-radio line-width-icon">

                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineSmall"
                            checked={props.lineWidth == LineWidth["LineSmall"]}
                            onChange={props.onLineWidthInputChange} />
                        <i className="icon dd-line1"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineBig"
                            checked={props.lineWidth == LineWidth["LineBig"]}
                            onChange={props.onLineWidthInputChange} />
                        <i className="icon dd-line2"></i>

                    </label>
                    <label>
                        <input
                            type="radio"
                            name="lineWidth"
                            value="LineMedium"
                            checked={props.lineWidth == LineWidth["LineMedium"]}
                            onChange={props.onLineWidthInputChange} />
                        <i className="icon dd-line3"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineLong"
                            checked={props.lineWidth == LineWidth["LineLong"]}
                            onChange={props.onLineWidthInputChange} />
                        <i className="icon dd-line4"></i>

                    </label>
                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineLargeLong"
                            checked={props.lineWidth == LineWidth["LineLargeLong"]}
                            onChange={props.onLineWidthInputChange} />
                        <i className="icon dd-line5"></i>
                    </label>

                </div>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="Line-Symbol" className="mb-3">Line Symbol</label>
                <div className="img-radio">

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineCircle"
                            checked={props.lineSymbol == LineSymbol["LineCircle"]}
                            onChange={props.onLineSymbolInputChange} />
                        <i className="icon dd-circle"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineTriangle"
                            checked={props.lineSymbol == LineSymbol["LineTriangle"]}
                            onChange={props.onLineSymbolInputChange} />
                        <i className="icon dd-triangle-up"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineSquare"
                            checked={props.lineSymbol == LineSymbol["LineSquare"]}
                            onChange={props.onLineSymbolInputChange} />
                        <i className="icon dd-square"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineTriangleDown"
                            checked={props.lineSymbol == LineSymbol["LineTriangleDown"]}
                            onChange={props.onLineSymbolInputChange} />
                        <i className="icon dd-triangle-down"></i>

                    </label>
                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineDiamond"
                            checked={props.lineSymbol == LineSymbol["LineDiamond"]}
                            onChange={props.onLineSymbolInputChange} />
                        <i className="icon dd-rhombus"></i>

                    </label>

                </div>
            </div>
        </div>
    )
}
