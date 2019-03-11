import React, { Component } from 'react';
import CommonUtils from '../../commonutils/CommonUtils';
import * as $ from 'jquery';
class MobileFilterSidebar extends Component {
  state = {
    isShowDataLable: false,
    isEnabledDataLable: false,
    selectedInterpolate: "Linear"
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({ isShowDataLable: this.props.isShowDataLable, isEnabledDataLable: this.props.isEnabledDataLable })
  }

  componentDidUpdate(prevProps, prevState) {
  
    $("#linear").click(function () {
      $("#lInterpolate").text('Linear');
    })
    $("#step").click(function () {
      $("#lInterpolate").text('Step');
    })
    

    $("#line").click(function () {
      $("#lRenderer").text('Line');
    })
    $("#bar").click(function () {
      $("#lRenderer").text('Bar');
    })
    $("#area").click(function () {
      $("#lRenderer").text('Area');
    })

    if (CommonUtils.isPropchange(prevProps.isShowDataLable, this.props.isShowDataLable) || CommonUtils.isPropchange(prevProps.isEnabledDataLable, this.props.isEnabledDataLable)) {
      this.setState({
        isShowDataLable: this.props.isShowDataLable,
        isEnabledDataLable: this.props.isEnabledDataLable
      });
    }
  }
  handleDataLableChange = () => {
    if (this.state.isShowDataLable == true) {
      this.setState({ isShowDataLable: !this.state.isShowDataLable, isEnabledDataLable: false }, () => {
        this.props.filterChange(this.state);
      });
    }
    else {
      this.setState({ isShowDataLable: !this.state.isShowDataLable, isEnabledDataLable: this.state.isEnabledDataLable }, () => {
        this.props.filterChange(this.state);

      });
    }
  }

  handleEnabledDataLableChange = () => {
    this.setState({ isEnabledDataLable: !this.state.isEnabledDataLable }, () => {
      if (this.state.isEnabledDataLable == true) {
        this.props.filterChange(this.state);
      }
      else if (this.state.isEnabledDataLable == false) {
        this.props.filterChange(this.state);
      }
    });
  }


  onSetInterpolate = (interpolateType) => {
    this.setState({ selectedInterpolate: interpolateType })
  }




  render() {
    return (
      <div className="mobile-setting-sidebar">
        <div className="mobile-topbar">
          <a href="javascript:;" className="settings-hide"><i className="ti-arrow-left"></i></a>
          <p>Settings</p>
        </div>
        <div className="mobile-settings-container">

          <label className="filter-heading">PLOT</label>
          <div className="row mb-2">
            <span className="col-8 switch-label">Plot Split</span>
            <span className="col-4 switch-container">
              <label className="switch">
                <input type="checkbox" name="plotSplit"
                 
                  value="true"
                
                  onChange={this.props.plotSplitChange} />
                <span className="slider round" ></span>
              </label>
            </span>
          </div>
          <div className="row accordion-row">
            <span className="col-8 switch-label accor-btn accordion-label">Interpolate</span>
            <span className="col-4 switch-label accor-btn accordion-value" id="lInterpolate"> Linear <i className="fa fa-angle-right"></i></span>
            <div className="accordion-body">
              <input type="radio" id="linear"
                name="joinType" value="linear"
                onChange={this.props.joinTypeChange}
                onClick={() => this.props.joinType(false)}
                checked={this.props.option == 'option1'} />
              <label for="linear"><i className="icon dd-tick"></i> Linear</label>

              <input type="radio" id="step" name="joinType" value="step"
                checked={this.props.option == 'option2'}
                onClick={() => this.props.joinType(true)}
                onChange={this.props.joinTypeChange}
              />
              <label for="step"><i className="icon dd-tick"></i> Step</label>
            </div>
          </div>
          <div className="row accordion-row">
            <span className="col-8 switch-label accor-btn accordion-label">Renderer</span>
            <span className="col-4 switch-label accor-btn accordion-value" id="lRenderer"> Line <i className="fa fa-angle-right"></i></span>
            <div className="accordion-body">
              
              <input type="radio" name="renderer"
               
                id="line"
                value="line"
                checked={this.props.optionforrender == 'line'}
                onChange={() => this.props.renderSelected("line")}
                onClick={() => this.props.chartType("line")} />
              <label htmlFor="line"><i className="icon dd-tick"></i> Line</label>

              <input type="radio" name="renderer"
               
                id="bar"
                value="bar"
                checked={this.props.optionforrender == 'column'}
                onChange={() => this.props.renderSelected("column")}
                onClick={() => this.props.chartType("column")} />

      
              <label htmlFor="bar"><i className="icon dd-tick"></i> Bar</label>
            

              <input type="radio" name="renderer"
                id="area"
                value="area"
                
                checked={this.props.optionforrender == 'area'}
                onChange={() => this.props.renderSelected("area")}
                onClick={() => this.props.chartType("area")} />

              <label htmlFor="area"><i className="icon dd-tick"></i> Area</label>
            </div>
          </div>
          <label className="filter-heading">SCALE</label>
          <div className="row mb-2">
            <span className="col-8 switch-label">Use Common</span>
            <span className="col-4 switch-container">
              <label className="switch">
                <input type="checkbox" name="yScale"
                
                  value="true" checked={this.props.option == 'enable'}
                  onChange={this.props.YscaleChange} />
                <span className="slider round" ></span>
              </label>
            </span>
          </div>
          <label className="filter-heading">DATA</label>
          <div className="row mb-2">
            <span className="col-8 switch-label">Show data points</span>
            <span className="col-4 switch-container">
              <label className="switch">
                <input type="checkbox" checked={this.props.isShowDataLable} onChange={this.handleDataLableChange} />
                <span className="slider round" ></span>
              </label>
            </span>
          </div>
          <div className="row mb-2">
            <span className="col-8 switch-label" >Show data label</span>
            <span className="col-4 switch-container">
              <label className="switch">
                <input type="checkbox" checked={this.state.isEnabledDataLable} disabled={!this.state.isShowDataLable} onChange={this.handleEnabledDataLableChange} />
                <span className="slider round" ></span>
              </label>
            </span>
          </div>
          <div className="row">
            <span className="col-8 switch-label" >Use Server Timezone</span>
            <span className="col-4 switch-container">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round" ></span>
              </label>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileFilterSidebar;