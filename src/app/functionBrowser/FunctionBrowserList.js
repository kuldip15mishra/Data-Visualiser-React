import React, { Component, Fragment } from 'react';


const FunctionBrowserList = (props) => {
    const uiFunctionBrowserList = props.FunctionWikiList.map((functionWiki, index) => {
        return <li key={functionWiki.functionId}>
            <a href="javascript:;" onClick={() => props.SelectedFunctionWiki(functionWiki.functionId)}>
                <span className="function-name">{functionWiki.functionName}</span>
                <span className="function-desc">{functionWiki.Description}</span>
            </a></li>
    })



    return (
        <div className="function-list scrollbar-outer">
            <ul>
                {uiFunctionBrowserList}
            </ul>

        </div>

    );

}

export default FunctionBrowserList;