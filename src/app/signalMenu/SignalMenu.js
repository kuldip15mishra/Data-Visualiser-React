import React, {
  Component
} from "react";
import {
  SignalMenuList
} from './SignalMenuList';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
class SignalMenu extends Component {

  state = {
    isShowSignalPropertiesContainer: false,
    isShowSignalFunctionsContainer:false,
    isShowTagBrowserContainer:false,
    isClearContainer: false
  }
 
  componentDidUpdate(prevProps,prevState){


     if(prevProps.currentMenuState.isShowSignalPropertiesContainer !== this.props.currentMenuState.isShowSignalPropertiesContainer ){
      this.setState({
        isShowSignalPropertiesContainer: this.props.currentMenuState.isShowSignalPropertiesContainer,
       
      })}
       
      if(prevProps.currentMenuState.isShowSignalFunctionsContainer !== this.props.currentMenuState.isShowSignalFunctionsContainer){
        this.setState({
          
          isShowSignalFunctionsContainer:this.props.currentMenuState.isShowSignalFunctionsContainer,
         
        })
      }
       if(prevProps.currentMenuState.isShowTagBrowserContainer !== this.props.currentMenuState.isShowTagBrowserContainer){
        this.setState({
          
          isShowTagBrowserContainer:this.props.currentMenuState.isShowTagBrowserContainer,
         
        })
      }
    }
  

  onSignalExpressionClick = (e) => {
    e.preventDefault()
    this.setState({
      isShowSignalFunctionsContainer: true,
      isShowTagBrowserContainer :false,
      isShowSignalPropertiesContainer:false,
      isClearContainer: false
    },()=>{
      this.props.setMenuStore(this.state)
    })
  }
  
  onSignalPropertiesClick = (e) => {
    e.preventDefault()
    this.setState({
      isShowSignalFunctionsContainer: false,
      isShowTagBrowserContainer :false,
      isShowSignalPropertiesContainer:true,
      isClearContainer: false
    },()=>{
      this.props.setMenuStore(this.state)
    })
    
  }
  onSignalBrowserClick = (e) => {
    e.preventDefault()
    this.setState({
      isShowSignalFunctionsContainer: false,
      isShowTagBrowserContainer :true,
      isShowSignalPropertiesContainer:false,
      isClearContainer: false
    },()=>{
      this.props.setMenuStore(this.state)
    })
    
  }
  render() {
    
    return (
<div className="sb-2">
<div className="mobile-topbar">
      <a href="javascript:;" className="add-signal-hide"><i className="ti-arrow-left"></i></a>
      <p>Signal Browser</p>
      </div>
     
      <SignalMenuList 
      isShowSignalFunctionsContainer={this.state.isShowSignalFunctionsContainer}
      isShowSignalPropertiesContainer={this.state.isShowSignalPropertiesContainer}
      isShowTagBrowserContainer={this.state.isShowTagBrowserContainer}
      onSignalBrowserClick ={this.onSignalBrowserClick}
      onSignalPropertiesClick ={this.onSignalPropertiesClick}
      onSignalExpressionClick={this.onSignalExpressionClick}/> 
    
      <div className="sb-2-toggle-btn">
        <a id="sb-2-toggle-btn" href="javascript:;">
          <i className="fa fa-angle-left"></i>
        </a>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentMenuState :state.menu}
}

const mapDispatchToProps = dispatch => {
  return {
      setMenuStore: currentMenuState => dispatch(Actions.setSignalMenuState(currentMenuState)),
     
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignalMenu)
