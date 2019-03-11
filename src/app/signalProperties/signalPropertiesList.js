

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
* Module : TagBrowserList Series dump Component (dump Component)
* Description : it is a dump component which helps to show tag information into list
* Date:01-AUG-2018.
* =============================================================================================================================================
*
* #endregion
*/
/**library import section Begin*/
import React, { Fragment } from 'react';

/**library import section End*/


const SignalPropertiesList = (props) => {
if (props.signalPropertiesListData.description ) {
return <div className="search-area">
<hr className="tag-list-hr" />
<div className="tag-data mt-4 h-51px">
<span className="tag-attr">Tag Name</span>
<span className="tag-name">{props.signalPropertiesListData.tagName ?props.signalPropertiesListData.tagName :props.signalPropertiesListData.name}</span>
</div>
<div className="tag-data h-100PX">
<span className="tag-attr">Description</span>
<span className="tag-desc">{props.signalPropertiesListData.description}
</span></div>
<div className="tag-data h-45px">
<span className="tag-attr">Unit</span>
<span className="tag-desc">{props.signalPropertiesListData.unit}
</span></div>

<div className="tag-data h-45px">
<span className="tag-attr">Type</span>
<span className="tag-desc">{props.signalPropertiesListData.type}
</span></div>

<div className="tag-data h-45px">
<span className="tag-attr">Source</span>
<span className="tag-desc">{props.connectionname}
</span></div>
<div className="tag-data h-45px">
<span className="tag-attr">Tag Path</span>
<span className="tag-path">{props.signalPropertiesListData.tagPath}
</span></div>
</div>

}

else{
let uiEmptyTagBrowserList = <div className="empty-area" id="tag-empty-area">
<div>
<img src="src/assets/images/icons/tag.svg" />
<span className="empty-area-heading">{props.emptySignalPropertiesMsg}</span>
<span className="empty-area-text">
{props.emptySignalPropertiesMsgHeader}
</span>
</div>
</div>;
return (

<div className="search-area">
<hr className="tag-list-hr"/>
{uiEmptyTagBrowserList}
</div>
)

}

}

export default SignalPropertiesList 
 
