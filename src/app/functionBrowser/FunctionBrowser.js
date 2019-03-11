import React from 'react';
import SignalFunctionDetails from '../signalFunctionDetails/SignalFunctionDetails';
const  FunctionBrowser  = (props) => {
        return(
            <div className="function-wiki">
                <h3>Function Wiki</h3>
                <div className="search-box">
          <div className="search-form mb-2">
            <div className="custom-search-input">
              <input
                id="txtsearch"
                type="text"
                className="form-control input-lg"
                placeholder="Type a Fucntion Name"

                onChange={(event) => { 
                    props.onExpressionChange(event)}}
                 
       
              />
              <button className="btn btn-info btn-lg hvr-grow" type="button">
                <i className="ti-search" />
              </button>
            </div>
          </div>
          <div className="search-area">
          <div className="function-list scrollbar-outer">
          <ul><li> <a href="javascript:;">
          <span className="function-name">add()</span>
          <span className="function-desc">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
 sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</span>
 </a></li>
              <li> <a href="javascript:;">
          <span className="function-name">add()</span>
          <span className="function-desc">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
 sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</span>
 </a></li>
              </ul>
              
          </div>
          <SignalFunctionDetails></SignalFunctionDetails>
          </div>
          </div>
            </div>
    
        );
    
}

export default FunctionBrowser;