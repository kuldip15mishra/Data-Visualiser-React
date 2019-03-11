
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
* Module :  TagBrowserList Series dump Component (dump Component)
* Description : it is a dump component which helps to show tag information into list
* Date:01-AUG-2018.
* =============================================================================================================================================
 *
 * #endregion
*/
/**library import section Begin*/
import React, { Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-patched';
/**library import section End*/



const TagBrowserList = (props) => {
    const uiTagBrowserList = props.tagBrowserListData.map((tagBrowserData, index) => {
        return <li key={index}>
         <span className="tag-name" title={tagBrowserData.tagName}>{tagBrowserData.tagName}</span>
         <span className="tag-desc">{tagBrowserData.tagPath.split(':')[0]}</span>
            <span className="tag-desc">{tagBrowserData.description}</span>
            {/* <span className="tag-name" title={tagBrowserData.name}>{tagBrowserData._source.tagName}</span>
            <span className="tag-desc">{tagBrowserData._source.description}</span> */}
            <ul className="copy-add-icons">
                <li>
                <a href="javascript:;" style={{'marginRight':'4px'}} >
                <i id="copypasteIcon" className="icon dd-copy" name={tagBrowserData.tagName}  onClick={(e) => { e.preventDefault();
                // <i id="copypasteIcon" className="icon dd-copy" name={tagBrowserData._source.tagName}  onClick={(e) => { e.preventDefault();

                  e.target.className="icon dd-tick text-success";
                  var eventTarget = e.target;
                 
                  

                  setTimeout(function(){
                     eventTarget.className="icon dd-copy";
                 }, 2000);
                  props.copyTags(index) }}
                  ></i>


            </a>

                </li>
                <li><a href="javascript:;" onClick={(e) => { e.preventDefault(); props.onAddSignal(index) }}><i className="icon dd-plus" ></i></a></li>

            </ul>

        </li>
    })


    let uiEmptyTagBrowserList = null
    
    if (props.tagBrowserListData.length == 0) {
        
        uiEmptyTagBrowserList =
            <div className="empty-area" id="tag-empty-area">
            <div>
                <img src="src/assets/images/icons/tag.svg" />
                <span className="empty-area-heading">{props.emptyTagBrowserMsg}</span>
                <span className="empty-area-text">
                    {props.emptyTagBrowserMsgHeader}
        </span>
        </div>
            </div>;
    }
    return (
        
        <div className="search-area">
        <hr className="tag-list-hr"/>
            {uiEmptyTagBrowserList}
            <div className="tag-list">
            <Scrollbars>
                <ul>
                    {uiTagBrowserList}
                </ul>
                </Scrollbars>
            </div>
        </div>
    )
}


export default TagBrowserList
