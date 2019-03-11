import React, { Component } from "react";
import $ from 'jquery';
import 'ddSlick/src/jquery.ddslick';
import CommonUtils from '../../commonutils/CommonUtils'


class JoinTypeFilter extends Component{
 
  state = {
    type: 'linear'
  }

  componentDidUpdate(prevProps, prevState){
    if (CommonUtils.isPropchange(prevProps.option, this.props.option)){
 
      if(this.props.option=='option1'){
        this.setState({
          type: 'linear'
        })
      }
      else{
        this.setState({
          type: 'step'
        })
      }
    }


   
   
    
  }

ddSlick=()=>{
  let  self=this;
  $('#jointypedropdown').ddslick({
    imagePosition:"left",
    onSelected: function(selected){

        if(selected.selectedData.value==='linear'){
          self.props.joinTypeChange;
          self.props.joinType(false)
        }
        else{
          self.props.joinTypeChange;
          self.props.joinType(true)
        }
        
    }   
});
}

  render(){
    this.ddSlick();
   
  return (
    <div className=" filter-radio-btns mobile-none">
    
      <select id="jointypedropdown" value={this.state.type}>
        <option value="linear"   data-imagesrc="src/assets/images/icons/join-linear.svg"
          >Linear</option>
        <option value="step"   data-imagesrc="src/assets/images/icons/join-step.svg"
            >Step</option>
    </select>
    <span className="filter-name">Interpolate</span>
    </div>
  );
};
}

export default JoinTypeFilter;
