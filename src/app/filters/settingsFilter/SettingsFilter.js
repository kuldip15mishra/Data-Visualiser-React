import React, { Component } from "react";
import NotificationContainer from "../../pluginComponents/ui/notification/NotificationContainer";
import { AlertMessage,Status } from "../../constants/Constants"
import CommonUtils from '../../commonutils/CommonUtils';
class SettingsFilter extends Component {
  state = {
    isShowDataLable: false,
    isEnabledDataLable: false
  }

  componentDidMount() {
    $(".settings-filter-toggle").click(function () {
      $(".overlay").toggle();
      $(".settings-filter").addClass("opened");
    });
    $("#close-settings").click(function () {
      $(".overlay").toggle();
      $(".settings-filter").removeClass("opened");
    });

    this.setState({ isShowDataLable: this.props.isShowDataLable, isEnabledDataLable: this.props.isEnabledDataLable })
  }


  componentDidUpdate(prevProps, prevState){
  }

  componentDidUpdate(prevProps, prevState) {
    if(CommonUtils.isPropchange(prevProps.isShowDataLable,this.props.isShowDataLable ) || CommonUtils.isPropchange(prevProps.isEnabledDataLable,this.props.isEnabledDataLable ) )
    {
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

  render() {

    return (<div>
      <NotificationContainer width={1000}
        height={50}
        position={{ top: 0, left: 500 }}
        stacking={'down'}
        ref={a => this.notification = a} />
      <div className="settings-filter">
        <div className="settings-filter-inner">
          <div className="settings-filter-toggle">
            <a href="javascript:;" >
              <i className="fa fa-gear" />
            </a>
          </div>
          <div className="settings-filter-content">
            <h3 >Settings</h3>
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
        <div className="btns-area">
          <button id="close-settings" className="btn btn-primary btn-rounded">Close</button>

        </div>
      </div>
    </div>
    );
  }
  showPopUpNotification(message, type) {
    this.notification.showPopUpNotification(message, type);
  }
}

export default SettingsFilter;
