import React, { Component, Fragment } from 'react';

const FunctionBrowserSearch = (props) => {

    return (
        <div className="custom-search-input">
            <input
                id="txtsearch"
                type="text"
                className="form-control input-lg"
                placeholder="Type a Fucntion Name"
                onChange={(e) => props.SelectWikiFunctionChange(e)}
            />
            <button className="btn btn-info btn-lg hvr-grow" type="button">
                <i className="ti-search" />
            </button>
        </div>
    );

}

export default FunctionBrowserSearch;