
import React, { Component } from "react";

const Loader = (props) => {
  return (<div className="loader-area" style={{display :(props.isloading ? '' : 'none')}}> <img src="/src/assets/images/driven-loader.svg" />
   </div>
  );
};

export default Loader;