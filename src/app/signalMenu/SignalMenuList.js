
import React, { Component } from "react";
import TagBrowserContainer from "../tagBrowser/TagBrowserContainer";
import SignalPropertiesContainer from '../signalProperties/signalPropertiesContainer';
import SignalFunctionsContainer  from '../signalFunctions/SignalFunctionContainer';

export const SignalMenuList = (props) => {
    return  <ul  
    className={props.isShowSignalFunctionsContainer || props.isShowSignalPropertiesContainer || props.isShowTagBrowserContainer  ?'signal-menu sub-menu-open' :'signal-menu'}>
    <li className="mobile-none">
      <div className="link-home">
        <i className="icon dd-home" />
        <span>Home</span>
      </div>
    </li>
    <li>
      <a  href="javascript:void(0)" onClick={props.onSignalBrowserClick}>
        <div className="signal-menu-icon ">
          <i className="icon dd-signal-browser" />
        </div>
        <div className="signal-menu-item ">
          <span className="item-heading">Signal Browser</span>
          <span className="item-desc">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          </span>
        </div>
      </a>
      <div className="signal-sub-menu" className={props.isShowTagBrowserContainer ?'signal-sub-menu open':' signal-sub-menu '}>
      <TagBrowserContainer/>
      </div>
       </li>
    <li>
      <a href='javascript:void(0)' onClick={props.onSignalPropertiesClick}>
        <div className="signal-menu-icon">
          <i className="icon dd-signal-properties" />
        </div>
        <div className="signal-menu-item">
          <span className="item-heading">Signal Properties</span>
          <span className="item-desc">
            Laudantium, totam rem aperiam, eaque ipsa quae ab illo
          </span>
        </div>
      </a>
      <div className="signal-sub-menu" className={props.isShowSignalPropertiesContainer ?'signal-sub-menu open':' signal-sub-menu '}>
          <SignalPropertiesContainer/>
      </div>
    </li>
    <li>
      <a href='javascript:void(0)' onClick={props.onSignalExpressionClick}>
        <div className="signal-menu-icon">
          <i className="icon dd-signal-expression" />
        </div>
        <div className="signal-menu-item">
          <span className="item-heading">Signal From Expression</span>
          <span className="item-desc">
            Veritatis et quasi architecto beatae vitae dicta sunt explicabo.{" "}
          </span>
        </div>
      </a>
      <div className="signal-sub-menu"  className={props.isShowSignalFunctionsContainer ?'signal-sub-menu open':' signal-sub-menu '}>
      <SignalFunctionsContainer/>
         
      </div>
    </li>
  </ul>
}