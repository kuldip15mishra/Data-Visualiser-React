import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
const ShareTrend = (props)=>{
    return(
        <div id="share-trend" className="modal fade" role="dialog">
      <div className="modal-dialog pop-up-position">
      <div className="modal-content">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <i className="ti-close" aria-hidden="true"></i>
          </button>
          <div className="modal-body">
          <span className="heading">Share Trend Name</span>
            <span className="sub-heading">Share chart using the link below</span>
            <div className="input-group mb-3 mt-3">

  <input disabled type="text" id="url" className="form-control" value={props.shareurl} />
  <div className="input-group-append">
    <button  className="copy-btn" type="button" onClick={props.copyLink}>COPY</button>
  </div>
</div>

            <span className="sub-heading mt-4">Or send an email</span>
            <p className="text-center mt-3"> <button onClick={props.emailLink} type="button" className="btn btn-default save">Email Link</button></p>

          </div>
        </div>

      </div>
    </div>
    );
}

export default ShareTrend;
