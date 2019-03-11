import React, { Component } from 'react';

const NavigationButtons = (props) => {
    return (
        <div className="navigation-buttons">
            <ul>
                <li><button onClick={(e) => {props.onRangNavigation("leftOuterPagination");$('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevaluefrom_1').hide(); $('#daterangevalueto_1').hide()}}><i className="icon dd-previous1"></i></button></li>
                <li><button onClick={(e) => {props.onRangNavigation("leftPagination");$('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevaluefrom_1').hide(); $('#daterangevalueto_1').hide()}}><i className="icon dd-play rotate-180"></i></button></li>
                <li><span>{props.rangeInfo}</span></li>
                <li><button onClick={(e) => {props.onRangNavigation("rightPagination");$('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevaluefrom_1').hide(); $('#daterangevalueto_1').hide()}}><i className="icon dd-play"></i></button></li>
                <li><button onClick={(e) => {props.onRangNavigation("rightOuterPagination");$('#daterangevaluefrom').show();$('#daterangevalueto').show();$('#daterangevaluefrom_1').hide(); $('#daterangevalueto_1').hide()}}><i className="icon dd-next1"></i></button></li>
            </ul>
        </div>
    );
}

export default NavigationButtons;