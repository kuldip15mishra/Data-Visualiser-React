import React, { Component } from "react";

const FullScreen = (props) => {
  return (
    <div className="full-screen-btn mr-3">
    
      <a href="javascript:;" className="hvr-grow" onClick={ props.screenType}>
        <i className="icon dd-expand" />
      </a>

    </div>
  );
};

export default FullScreen;
