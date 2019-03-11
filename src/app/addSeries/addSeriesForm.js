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
* Module :  Add Series Component (Container Component)
* Description : it is a component which helps to add series by coppy tag from tag browser and
  pase then after save added into the grid.user also remove the tage from the add series.
* Date:01-JUNE-2018.
* =============================================================================================================================================
 *
 * #endregion
*/

/**library import section Begin*/
import React, {
  Component,
  Fragment
} from 'react'
import {
  RetrivalMode,
  LineWidth,
  LineSymbol
} from "../constants/Constants";
import {
  FormTagElements,
  FormsChartConfigElements
} from './addSeries';

/**library import section End*/



class AddSeriesForm extends Component {
  state = this.initialState(); //Initial default state at component load
  //update selected color on state
  onSetColorCode = (selectedColor) => {

    this.setState({
      colorCode: selectedColor,
      selected:selectedColor,
    });
  }

  
  componentWillReceiveProps(nextProps, nextState) {

    if (nextProps.data) {
      this.setState(nextProps.data);
    }

  }

  /*updated state of tags information on paste event which user copied
   from tag list(tagbrowser component)*/
  onPaste = () => {
    if (this.props.clipboard && this.props.clipboard.length > 0) {
      this.setState(this.props.clipboard[0]);
    }

  }

  //update selected color on state
  onSetColorCode = (selectedColor) => {
   
    let color = {}
    color.hex = selectedColor.hex;
    color.rgb = selectedColor.rgb;
    this.setState({ color: color.rgb, hex: color.hex, colorCode: selectedColor, selected:selectedColor })

  }
  //update state on change of input controls
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onUpdateShowArea = (isShow) => {
    this.reset();
    this.props.UpdateShowArea(isShow);
  }

  reset() {
    this.setState(Object.assign({}, this.state, {
      name: "",
      description: "",
      UOM: "",
      colorCode: "",
      tagPath:"",
      lineWidth: LineWidth["LineBig"],
      lineSymbol: LineSymbol["LineCircle"],
      retrivalMode: RetrivalMode["RAW"],
      timeinterval: "",
      disabledtimeinterval: true,
      displayColorPicker: false,
      color: {
        r: '71',
        g: '198',
        b: '215',
        a: '100',
      }, hex: '#47c6d7',
      enableSubmit: true
    }), () => {
    });
  }

  //update state on change of RetrivalMode input controls
  onRetrivalModeInputChange = (e) => {
    if (e.target.value != RetrivalMode.RAW)
      this.setState({ [e.target.name]: e.target.value, disabledtimeinterval: false })
    else
      this.setState({ [e.target.name]: e.target.value, disabledtimeinterval: true, timeinterval: "" })
  }

  //update state on change of LineWidth input controls
  onLineWidthInputChange = (e) => {
    this.setState({
      [e.target.name]: LineWidth[e.target.value]
    });
  }

  //update state on change of LineSynbol input controls
  onLineSymbolInputChange = (e) => {
    this.setState({
      [e.target.name]: LineSymbol[e.target.value]
    });
  }

  initialState() {
    return {
      name: "",
      description: "",
      unit: "",
      colorCode: "",
      lineWidth: LineWidth["LineBig"],
      lineSymbol: LineSymbol["LineCircle"],
      retrivalMode: RetrivalMode["RAW"],
      timeinterval: "",
      enableSubmit: "",
      disabledtimeinterval: true,
      displayColorPicker: false,
      visible:true,
      color: {
        r: '71',
        g: '198',
        b: '215',
        a: '100',
      }, hex: '#47c6d7',
      seriesListData: [],
      selected:'#262626'/**Series data which user store and save in a db*/
    }
  }

  //added  series from series grid
  onSave = (e) => {
    e.preventDefault();
   
    const seriesData = { ...this.state }
    this.props.addSeries(seriesData);

    setTimeout(this.reset(), 1000)
  }

  //update state on change of TimeInterval input controls
  onTimeIntervalInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
    });
  }

  onOpenColorPicker = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  onCloseColorPicker = () => {
    this.setState({ displayColorPicker: false })
  }
  onUpdate=()=>{

    this.props.updateSeries(this.state,this.props.currentEditingIndex);
  }
  render() {
    const isDisabled = false;
    let index=this.props.currentEditingIndex;
let button;
if (index !==-1) {
  button =  <button id="addseriessave" disabled={isDisabled} onClick={this.onUpdate} className="btn btn-outline-info btn-rounded" >Update</button>

} else {
  button =  <button id="addseriessave" disabled={isDisabled} onClick={this.onSave} className="btn btn-outline-info btn-rounded" >Save</button>
}

    return (<Fragment>
      <div className="row" >
        <FormTagElements
          onPaste={this.onPaste}
          onSetColorCode={this.onSetColorCode}
          openColorPicker={this.onOpenColorPicker}
          closeColorPicker={this.onCloseColorPicker}
          onInputChange1={this.onInputChange}
          {...this.state} />
        <FormsChartConfigElements {...this.state}
          onLineSymbolInputChange={this.onLineSymbolInputChange}
          onLineWidthInputChange={this.onLineWidthInputChange}
          onRetrivalModeInputChange={this.onRetrivalModeInputChange}
          onTimeIntervalInputChange={this.onTimeIntervalInputChange}
        />
      </div>
      <div className="btns-area">
      {button}

        <button id="addseriescancel" onClick={this.props.editSeries} className="btn btn-outline-info btn-rounded">Cancel</button>
      </div></Fragment>);

  }

}

export default AddSeriesForm;
