
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
import React, { Fragment } from 'react'
import 'bootstrap-confirmation2/dist/bootstrap-confirmation.js';
import Hammer from 'react-hammerjs/dist/react-hammerjs';
/**library import section End*/

function filterbyKeyandTagName(tagname, searchkey, array) {
    var result = [];
    if (array && array.length > 0) {
        result = array.filter(x => {
            return (x.tagName === tagname && x.key === searchkey)
        });
        if (result && result.length > 0) {
            return result[0].value;
        } else {
            return "";
        }
    }
}

function filterbyTagName(tagname, array) {
    var filtereddata = [];
    if (array && array.length > 0) {
        filtereddata = array.filter(x => {
            return (x.tagName === tagname)
        });
        if (filtereddata && filtereddata.length > 0) {
            return filtereddata[0].currentValue;
        } else {
            return "";
        }
    }
}

function legendAreaHide() {

    if ($("#page-container").hasClass("tablet-menu")) {

        if ($(".legend-area-tab").hasClass("open")) {

            $(".legend-area-tab").removeClass("open");
            $(".dark-overlay").toggle();
            $(".container-floating").show();
        }
    }
}

function onPinchStart(e) {


    var ele = e.target;

    if (e.direction === 2) {
        if (!$(ele).parents(".swipe-list-item")[0]) {
            e.preventDefault();
        }
        else {
            $(ele).parents(".swipe-list-item").addClass("swiped-left");
        }
    }
    else if (e.direction === 4) {
        if (!$(ele).parents(".swipe-list-item")[0]) {
            e.preventDefault();
        }
        else {
            $(ele).parents(".swipe-list-item").removeClass("swiped-left");
        }
    }

}


const SeriesGridView = (props) => {
    const rightAlign = {
        textAlign: 'left',
    };

    const uiTr = props.seriesListData.map((seriesData, index) =>

        <tr key={index} className={seriesData.visible === false ? 'disabled ' : ""}>
            <td>
                <ul className="icons-link">
                    <li><a href="javascript:;"><i className="icon dd-eye show-trend" onClick={(event) => props.onEyeClick(index, seriesData, event)}></i></a></li>
                    <li><i className="icon dd-trend" style={{ color: seriesData.colorCode }}></i></li>
                    <li><a href="javascript:;"><i id="copyIcon" className="icon dd-copy" onClick={(e) => {
                        e.preventDefault();
                        e.target.className = "icon dd-tick text-success";
                        var eventTarget = e.target;

                        setTimeout(function () {
                            eventTarget.className = "icon dd-copy";
                        }, 2000);
                        props.copyTagsValue(index)
                    }}></i></a></li>
                    <li><a href="javascript:;"><i className={seriesData.isExpression === false ? 'icon dd-info-text ' : 'icon dd-fx-series'} onClick={(event) => props.onInfoIconClick(index, seriesData, event)}></i></a></li>


                </ul>

            </td>
            <td>{seriesData.unit}</td>
            <td>{seriesData.name}</td>

            <td className="text-right">{
                props.currentTagNameValues && props.currentTagNameValues.length > 0 ? filterbyTagName(seriesData.name, props.currentTagNameValues) : '-'

            }</td>

            <td> {

                props.TagSummary && props.TagSummary.length > 0 ? filterbyKeyandTagName(seriesData.name, 'MIN', props.TagSummary) : '-'

            } </td>
            <td>{

                props.TagSummary && props.TagSummary.length > 0 ? filterbyKeyandTagName(seriesData.name, 'MAX', props.TagSummary) : '-'

            } </td>
            <td>{

                props.TagSummary && props.TagSummary.length > 0 ? filterbyKeyandTagName(seriesData.name, 'AVG', props.TagSummary) : '-'

            } </td>
            <td>
                <span className="edit-delete-btns">
                    <a href="javascript:;" onClick={() => props.onRowEdit(seriesData)}><i className="icon dd-edit mr-3 edit-icon" ></i></a>
                    <a href="javascript:;" onClick={(e) => props.showPopup(e, seriesData)}><i className="icon dd-trash delete-icon" ></i></a>
                </span></td>
        </tr>
    );

    const uiHammer = props.seriesListData.map((seriesData, index) =>
        <Hammer onSwipe={onPinchStart} key={index}>
            <li className="swipe-list-item">
                <div className="legend-row">
                    <div className="legend-icon"><i className="icon dd-trend"  style={{ color: seriesData.colorCode }}></i></div>
                    
                    <div className="legend-name">{seriesData.name}</div>
                    <div className="legend-current">{
                        props.currentTagNameValues && props.currentTagNameValues.length > 0 ? filterbyTagName(seriesData.name, props.currentTagNameValues) : '-'

                    }</div>
                    <div className="legend-uom">{seriesData.unit}</div>
                    <div className="legend-min">{

                        props.TagSummary && props.TagSummary.length > 0 ? filterbyKeyandTagName(seriesData.name, 'MIN', props.TagSummary) : '-'

                    }</div>
                    <div className="legend-max">{

                        props.TagSummary && props.TagSummary.length > 0 ? filterbyKeyandTagName(seriesData.name, 'MAX', props.TagSummary) : '-'

                    }</div>
                    <div className="legend-avg">{

                        props.TagSummary && props.TagSummary.length > 0 ? filterbyKeyandTagName(seriesData.name, 'AVG', props.TagSummary) : '-'

                    } </div>
                    <div className="legend-info"><button className="legend-delete-btn"><i className="icon dd-info-circle" onClick={(event) =>
                         {$("#page-container").addClass("tab-sb-2-open")
                        props.onInfoIconClick(index, seriesData, event)}}></i></button></div>
                    <div className="legend-delete"><button onClick={(e) => props.showPopup(e, seriesData)} className="legend-delete-btn"><i className="icon dd-delete"></i></button></div>
                </div>
            </li>
        </Hammer>
    );

    return (
        <Fragment>
            <div className="legend-area">
                <table className="series-table" width="100%">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Current</th>
                            <th>MIN</th>
                            <th>MAX</th>
                            <th>AVG</th>
                            <th></th>
                        </tr>
                    </thead>

                </table>
                <div className="signal-grid signal-grid-area scrollbar-outer" >
                    <table className="series-table" width="100%">
                        <tbody>
                            {uiTr}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="legend-area-tab">
                <a className="legend-close-btn" href="javascript:;" onClick={legendAreaHide}><i className="ti-angle-down"></i></a>
                <div className="legend-list-headings">
                    <div className="legend-icon"></div>
                    <div className="legend-name">Name</div>
                    <div className="legend-current">Current</div>
                    <div className="legend-uom">UOM</div>
                    <div className="legend-min">Min</div>
                    <div className="legend-max">Max</div>
                    <div className="legend-avg">Avg</div>
                </div>
                <ul className="legend-list-swipe">
                    {uiHammer}
                </ul>
            </div>
        </Fragment>);

}

export default SeriesGridView;
