import React,{Component,Fragment} from 'react';
import {  LineWidth, LineSymbol, AlertMessage, TimeInterval } from "../constants/Constants"
import EditSeriesPanel from '../editSeriesPanel/EditSeriesPanel';
import { connect } from 'react-redux'
import * as addSeriesActions from '../addSeries/addSeriesActions';

class EditSeriesContainer extends Component {

  state = this.props.seriesListData[this.props.CurrentEditingSeriesIndex];

  handleLineWidthInputChange = (e) => {
    this.setState({
        [e.target.name]: LineWidth[e.target.value]
      });
  }

  handleLineSymbolInputChange = (e) => {
    this.setState({
        [e.target.name]: LineSymbol[e.target.value]
      });
  }
  
  handleColorInputChange = (colorHex) => {
    this.setState({
        "colorCode": colorHex,
        "color": colorHex
      });
  }  

  handleSaveCloseAction=()=>{
    this.props.updateSeries(this.state,this.props.CurrentEditingSeriesIndex);
    this.props.updateEditingState(false);
  }

  handleCancelAction=()=>{
    
    this.props.updateEditingState(false);
  }
    
  render(){
    return (
      <EditSeriesPanel {...this.state} onCancelAction={this.handleCancelAction} 
      onSaveCloseAction={this.handleSaveCloseAction}   
      onLineWidthInputChange = {this.handleLineWidthInputChange} 
      onLineSymbolInputChange = {this.handleLineSymbolInputChange} 
      onColorInputChange = {this.handleColorInputChange}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateSeries:(series) => dispatch(addSeriesActions.updateSeries(series))
  };
};

function mapStateToProps(state) {
  return {
      seriesListData: Object.assign([], state.addSeriesReducer.ChartConfig),
      CurrentEditingSeriesIndex: state.addSeriesReducer.CurrentEditingSeriesIndex
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSeriesContainer)