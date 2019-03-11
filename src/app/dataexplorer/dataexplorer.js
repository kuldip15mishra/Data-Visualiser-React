
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
* Module :  Add Series dump Component (presentaion Component)
* Description : it is a dump component which helps to add series into grid
* Date:01-JUNE-2018.
* =============================================================================================================================================
 *
 * #endregion
*/
/**library import section Begin*/
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-patched';
import Dotdotdot from 'react-dotdotdot'


export const TagGridView = (props) => {
    const tagli =props.currentSeries.map(function(item,index){
        return <li id="list" key={index} >
        <a className ={index === 0 ? "active" :""} href="javascript:;"   onClick={(event)=> props.onTagClick(event,item)}>
        <span className="tag-name">{item.name}</span>
        <span className="tag-desc">
        <Dotdotdot clamp={1}>
        {item.description}
        {/* he text below will be truncated with an ellipsis in all browsers. This relies on a bit of Javascript and some CSS to set the number of lines to hide. The Javascript for this pen will loop through all instances on a page but if you only need to handle one instance, you can remove the <code>.forEach</code> and just have it check one. */}
        </Dotdotdot>
        
        </span>
        <span className="tag-unit">{item.unit}</span>
        </a>
      </li>;
      })


  return (

     <div className="col-3 tag-button-col">
     <Scrollbars>
    <ul className="tag-button-list">
      {tagli}
    </ul>
    </Scrollbars></div>

);
}


export const Buttons= (props)=>{

  return (<div className="btns-area">
    <a
      href="javascript:void()"
      className="btn btn-outline-info btn-rounded"
      onClick={props.exportData}
    >
      <i className="fa fa-file-excel-o" /> Export
    </a>
    <a
      href="javascript:;"
      className="btn btn-info btn-rounded"
      onClick={props.cancelDataExplorer}
    >
      Cancel
    </a>
  </div>)
}
