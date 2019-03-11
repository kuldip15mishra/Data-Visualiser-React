import React from "react";



const SignalFunctionDetails = (props) => {

  return (

    <div  className={props.isEnable == false ? 'function-details-container' : "function-details-container enabled"}>
   
      <div className="function-name-box">
        <a href="javascript:;">
          <i className="ti-angle-left" onClick={() => props.BackWikiFunction()}/>
        </a>
        <span className="function-name">{props.SelectedFunctionWiki.functionName}</span>
      </div>
      <div className="function-details-box scrollbar-outer">
        <div className="function-property">Function Name</div>
        <div className="function-data">{props.SelectedFunctionWiki.functionName}</div>
        <div className="function-property">Function Description</div>
        <div className="function-data">{props.SelectedFunctionWiki.Description}</div>
        <div className="function-property">Function Syntax</div>
        <div className="function-data" id="signalfunctionsyntax">{props.SelectedFunctionWiki.Syntax}</div>
        <div className="function-property">Function Remarks</div>
        <div className="function-data" id="signalfunctionremarks">{props.SelectedFunctionWiki.Remarks}</div>
        <div className="function-property">Function Usage</div>
        <div className="function-code-box" id="signalfunctionusage">{props.SelectedFunctionWiki.Usage}</div>
        <div className="function-code-box">
          {props.SelectedFunctionWiki.example}
        </div>
      </div>
      
    </div>
  );

}

export default SignalFunctionDetails;
