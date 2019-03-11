import React, { Component } from "react";
import $ from 'jquery';
import 'ddSlick/src/jquery.ddslick';
import CommonUtils from '../../commonutils/CommonUtils'



class RendererFilter extends Component{
  state = {
    value:"line",
  }

  componentDidUpdate(prevProps, prevState){
    if (CommonUtils.isPropchange(prevProps.option, this.props.option)){
 
      if(this.props.option=='line'){
        this.setState({
          value: 'line'
        })
      }
      else if(this.props.option=='area'){
        this.setState({
          value: 'area'
        })
      }
      else{
        this.setState({
          value: 'column'
        })
      }
    }

    
  }





ddSlick=()=>{
  let  self=this;
  $('#renderDropdown').ddslick({
    
    imagePosition:"left",
    onSelected: function(selected){
      self.props.renderSelected(selected.selectedData.value)
     
        
    }   
});
}



  render(){
    this.ddSlick();
    return(
      
      <div className=" filter-radio-btns mobile-none">
     
      <select id="renderDropdown" value={this.state.value} >
        <option value="line"  data-imagesrc="src/assets/images/icons/renderer-line.svg"  onClick={() => this.props.chartType("line")}
          >Line Chart</option>
        <option value="column"  data-imagesrc="src/assets/images/icons/renderer-bar.svg"   onClick={() => this.props.chartType("column")}
            >Bar Chart</option>
        <option value="area" data-imagesrc="src/assets/images/icons/renderer-area.svg"    onClick={() => this.props.chartType("area")}
            >Area Chart</option>
    </select>
    <span className="filter-name">Renderer</span>
    </div>
    
    );   
  }
}

export default RendererFilter;
