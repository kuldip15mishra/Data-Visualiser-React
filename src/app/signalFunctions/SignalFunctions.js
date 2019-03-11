import React, { Component, Fragment } from "react";
import AceEditor from "react-ace";
import "brace/theme/terminal";
import "brace/mode/javascript";
import FunctionBrowserContainer from "../functionBrowser/FunctionBrowserContainer";

//export const  SignalFunctions =(props) =>{

export class SignalFunctions extends Component {
  state = {
    editorvalue: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.expression !== this.props.expression) {
      this.setState({ editorvalue: this.props.expression });
    }
  }

  render() {
    var button;
    if (!this.props.isEditing) {
      button = (
        <button
          onClick={this.props.OnAddToTrend}
          className="btn btn-info btn-rounded float-right mt-3"
        >
          {this.props.buttonCaption}
        </button>
      );
    } else {
      button = (
        <button
          onClick={this.props.onUpdateTrend}
          className="btn btn-info btn-rounded float-right mt-3"
        >
          Update To Trend
        </button>
      );
    }
    return (
      <div className="function-column">
        <div className="function-row">
          <a
            href="javascript:;"
            className="back-btn"
            onClick={this.props.onBackClick}
          >
            <i className="ti-angle-left" />
          </a>{" "}
          <h3 className="text-blue column-heading">Signal From Expressions</h3>
          <AceEditor
            mode="none"
            width="100%"
            height="25vh"
            fontSize="14px"
            theme="terminal"
            id="signal-function-ace"
            name="signal-function"
            onChange={this.props.onChangeHandle}
            value={this.state.editorvalue}
            editorProps={{ $blockScrolling: true }}
            // value={

            //   this.props.expression
            //     ? this.props.expression
            //     : this.props.SelectedTagData
            //       ? this.props.SelectedTagData.expressionValue
            //       : ""
            // }
          />
          <button
            onClick={this.props.OnConfigureClick}
            style={{
              display: this.props.isShowConfigureButton ? "block" : "none"
            }}
            className="btn btn-outline-info btn-rounded float-right mt-3"
            id="config-signal"
          >
            Configure Signal
          </button>
          <div
            className="function-config-form"
            style={{ display: this.props.isShowForm ? "block" : "none" }}
          >
            <div className="form-group">
              <label className="w-100">
                Tag Name (Required){" "}
                {/* <span className="float-right">
                  <a href="javascript:;" className="generate-btn">Generate</a>
                </span> */}
              </label>
              <input
                type="text"
                value={this.props.name}
                onChange={this.props.onTagNameChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea
                value={this.props.description}
                onChange={this.props.onDescriptionChange}
                className="form-control"
                rows="2"
              />
            </div>
            <div className="form-group">
              <label>UOM (Optional)</label>
              <input
                value={this.props.unit}
                onChange={this.props.onUOMChange}
                type="text"
                className="form-control"
              />
            </div>
           
              {button}
           
          </div>
        </div>
        <FunctionBrowserContainer />
      </div>
    );
  }
}
