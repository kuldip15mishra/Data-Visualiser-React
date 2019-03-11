import React, { Component, Fragment } from 'react';
import { ColorPalette, LineWidth, LineSymbol } from "../constants/Constants"
import { _ } from 'underscore';

var ColorPaletteSortedbyDisplay = _.sortBy(ColorPalette, "displayId");

class EditSeriesPanel extends Component{

    render(){

        return(
        <div className="edit-series-panel">
        <div className="edit-series-panel-inner">
            <div className="edit-series-panel-content">
            <h3>Properties</h3>
             
        <label htmlFor="Line-Width">Line Width</label>
                <div className="img-radio line-width-icon">
                <form>
                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineSmall"
                            checked={this.props.lineWidth == LineWidth["LineSmall"]}
                            onChange={this.props.onLineWidthInputChange} />
                        <i className="icon dd-line1"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineBig"
                            checked={this.props.lineWidth == LineWidth["LineBig"]}
                            onChange={this.props.onLineWidthInputChange} />
                        <i className="icon dd-line2"></i>

                    </label>
                    <label>
                        <input
                            type="radio"
                            name="lineWidth"
                            value="LineMedium"
                            checked={this.props.lineWidth == LineWidth["LineMedium"]}
                            onChange={this.props.onLineWidthInputChange} />
                        <i className="icon dd-line3"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineLong"
                            checked={this.props.lineWidth == LineWidth["LineLong"]}
                            onChange={this.props.onLineWidthInputChange} />
                        <i className="icon dd-line4"></i>

                    </label>
                    <label>
                        <input type="radio"
                            name="lineWidth"
                            value="LineLargeLong"
                            checked={this.props.lineWidth == LineWidth["LineLargeLong"]}
                            onChange={this.props.onLineWidthInputChange} />
                        <i className="icon dd-line5"></i>
                    </label>
                    </form>
                </div>

                 <label htmlFor="Line-Symbol">Line Symbol</label>
                <div className="img-radio">
                <form>
                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineCircle"
                            checked={this.props.lineSymbol == LineSymbol["LineCircle"]}
                            onChange={this.props.onLineSymbolInputChange} />
                        <i className="icon dd-circle"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineTriangle"
                            checked={this.props.lineSymbol == LineSymbol["LineTriangle"]}
                            onChange={this.props.onLineSymbolInputChange} />
                        <i className="icon dd-triangle-up"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineSquare"
                            checked={this.props.lineSymbol == LineSymbol["LineSquare"]}
                            onChange={this.props.onLineSymbolInputChange} />
                        <i className="icon dd-square"></i>

                    </label>

                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineTriangleDown"
                            checked={this.props.lineSymbol == LineSymbol["LineTriangleDown"]}
                            onChange={this.props.onLineSymbolInputChange} />
                        <i className="icon dd-triangle-down"></i>

                    </label>
                    <label>
                        <input type="radio"
                            name="lineSymbol"
                            value="LineDiamond"
                            checked={this.props.lineSymbol == LineSymbol["LineDiamond"]}
                            onChange={this.props.onLineSymbolInputChange} />
                        <i className="icon dd-rhombus"></i>

                    </label>
                    </form>
                </div>
            <label>Colors</label>
        <div className="color-palette">
        {
           
            ColorPaletteSortedbyDisplay.map((clr, index) => {
                 return (
                     <Fragment key={index}>
                         <input type="radio" name="color-palette" checked={this.props.colorCode==clr.colorHex} id={clr.colorHex} value={clr.colorHex} />
                          <label htmlFor="clr"><span className={clr.colorHex} onClick={() => this.props.onColorInputChange(clr.colorHex)} style={{ 'background': clr.colorHex }}></span></label>
                    </Fragment>

                        );
                    })       
        }
                                
            </div>
            </div>
        </div>
        
        <div className="btns-area">
        <button id="save-properties" className="btn btn-primary btn-rounded" 
        onClick={() => this.props.onSaveCloseAction()} >Save & Close</button>
        <button id="cancel-properties" className="btn btn-outline-primary btn-rounded" 
        onClick={() => this.props.onCancelAction()} >Cancel</button></div>

        </div>
        );
    }
}

export default EditSeriesPanel;