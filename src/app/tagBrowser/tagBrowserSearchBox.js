
/*/#region Copyright(c) 2018 D-Driven All rights are reserved
* =============================================================================================================================================
* <copyright company="D-Driven">
* COPYRIGHT (c) 2018 D-Driven (P) Ltd.
* ALL RIGHTS ARE RESERVED. REPRODUCTION OR TRANSMISSION IN WHOLE OR IN PART,
* ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL OR OTHERWISE,
* WITHOUT THE PRIOR PERMISSION OF THE COPYRIGHT OWNER.
* </copyright>
* =============================================================================================================================================
* Created By :
* Module :  TagBrowserSearchBox dump Component (dump Component)
* Description : it is a dump component which helps to search tags from api
* Date:01-AUG-2018.
* =============================================================================================================================================
 *
 * #endregion
*/
/**library import section Begin*/
import React, { Fragment } from 'react'
/**library import section End*/



const TagBrowserSearchBox = (props) => {
    return (<Fragment>
        <div className="search-form mb-2">
            <div className="custom-search-input">
                    <input
                        id="txtsearch"
                        type="text"
                        className="form-control input-lg"
                        placeholder="Search for tagname or description"
                         onChange={(event) => { event.persist();
                         props.searchBoxChange(event)}}
                        onKeyPress= {(event)=>{ event.persist(); props.searchBoxChange(event)}}
                    />
                        <button className="btn btn-info btn-lg hvr-grow" type="button" onClick={(event) => { event.persist();
                        props.searchBoxChange(event)}}>
                            <i className="ti-search" />
                        </button>
            </div>
            
        </div>
    </Fragment>)
}


export default TagBrowserSearchBox
