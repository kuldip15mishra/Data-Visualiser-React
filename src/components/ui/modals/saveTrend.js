import React from 'react';


export const SaveTrend = (props)=>{

    return(<div id="save-trend" className="modal fade" role="dialog">
      <div className="modal-dialog pop-up-position">
        <div className="modal-content">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <i className="ti-close" aria-hidden="true"></i>
          </button>
          <div className="modal-body">
          <span className="heading">Save Trend</span>
            <span className="sub-heading">Save your trend to view it later</span>
            <div className="input-box">
            <input id="savetrendInputField" onBlur={props.saveTrendNameToStore} type="text" name="save-trend" className="form-control trend-name" />
            </div>
            <p className="text-center mt-4"> <button type="button" onClick={props.SaveTrend} className="btn btn-default save">Save</button></p>
          </div>
        </div>
      </div>
    </div>
    );
}
export const UpdateTrend = (props)=>{

    return(<div id="save-trend" className="modal fade" role="dialog">
      <div className="modal-dialog pop-up-position">
        <div className="modal-content">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <i className="ti-close" aria-hidden="true"></i>
          </button>
          <div className="modal-body">
          <span className="heading">Update Trend</span>
            <span className="sub-heading">Update your trend to view it later</span>
           
             <p className="text-center mt-4"> <button type="button" onClick={props.UpdateTrend} className="btn btn-default save">Update</button></p>
          </div>
        </div>
      </div>
    </div>
    );
}
 