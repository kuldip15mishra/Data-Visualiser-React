import React, { Component, Fragment } from "react";

const SignalProperties = (props) => {
  
    return (
      <Fragment>
        
        
          <div className="search-form mb-2">
            <div className="custom-search-input"> 
              <input
                id="txtsearch"
                type="text"
                className="form-control input-lg"
                placeholder="Name of Tag"
                
                onChange={(event) => {
                  event.persist();
                          props.handleChange(event)}}

                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    props.searchBoxChange()
                  }}}
              />
              <button className="btn btn-info btn-lg hvr-grow" type="button" onClick={props.searchBoxChange}  >
                <i className="ti-search" />
              </button>
            </div>
          </div>
          
      </Fragment>
    );
  }


export default SignalProperties;
