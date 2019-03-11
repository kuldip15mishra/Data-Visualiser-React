
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
* Module :  Add Series Component (Container Component)
* Description : it is a component which helps to add series by coppy tag from tag browser and
  pase then after save added into the grid.user also remove the tage from the add series.
* Date:01-AUG-2018.
* =============================================================================================================================================
 *
 * #endregion
*/

/**library import section Begin*/
import React, { Component } from 'react'
import {  RetrivalMode, LineWidth, LineSymbol } from "../constants/Constants"
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer"
import { connect } from 'react-redux'
import * as addSeriesActions from './addSeriesActions';
import $ from 'jquery';
import AddSeriesForm from './addSeriesForm';
/**library import section End*/

/**need to optimize */
function validate(name, description) {
    // true means invalid, so our conditions got reversed
    return {
        name: name.length === 0,
        description: description.length === 0,
    };
}

class AddSeriesContainer extends Component {
    state = this.initialState(); //Initial default state at component load

    componentDidMount() {
        $("#addseriescancel").click(function () {
            $("#new-series-area").toggleClass("sform");
            $("#trender-area").toggleClass("hchart");
        });

        $("#addseriessave").click(function () {
            $("#new-series-area").toggleClass("sform");
            $("#trender-area").toggleClass("hchart");
        });
    }





    /**Event Setion Begin */
    /**reset state for user so user can add new series */
    onReset = (e) => {
        e.preventDefault();
        this.reset();
    }

    /*updated state of tags information on paste event which user copied
    from tag list(tagbrowser component)*/
    //edit  series and populated selected data on series added fields
    onRowEdit = (seriesData) => {
        let index = this.state.seriesListData.indexOf(seriesData);
        if (index > -1) {
            this.setState({
                UOM: this.state.seriesListData[index].UOM,
                name: this.state.seriesListData[index].name,
                description: this.state.seriesListData[index].description,
                tagPath:this.state.seriesListData[index].tagPath,
                colorCode: this.state.seriesListData[index].colorCode,
                lineWidth: this.state.seriesListData[index].lineWidth,
                lineSymbol: this.state.seriesListData[index].lineSymbol,
                retrivalMode: this.state.seriesListData[index].retrivalMode
            });
        }
    }

    //remove  series from series grid
    onRowDelete = (seriesData) => {
        let index = this.state.seriesListData.indexOf(seriesData);
        this.state.seriesListData.splice(index, 1);
        this.setState(this.state.seriesListData);
    }


    onUpdateShowArea = (isShow) => {
        this.reset();
        this.props.UpdateShowArea(isShow);
    }

   
    /**Functions Section Begin*/
    //reset default state.user can save then new series
    reset() {
        this.setState(Object.assign({}, this.state, {
            name: "",
            description: "",
            UOM: "",
            tagPath:"",
            colorCode: "",
            lineWidth: LineWidth["LineBig"],
            lineSymbol: LineSymbol["LineCircle"],
            retrivalMode: RetrivalMode["RAW"],
            timeinterval: "",
            disabledtimeinterval: true,
            enableSubmit: true
        }));
    }

    //Initial default values into the state
    initialState() {
        return {
            name: "",
            description: "",
            UOM: "",
            colorCode: "",
            tagPath:"",
            lineWidth: LineWidth["LineBig"],
            lineSymbol: LineSymbol["LineCircle"],
            retrivalMode: RetrivalMode["RAW"],
            enableSubmit: "",
            seriesListData: [],/**Series data which user store and save in a db*/
        }
    }

    validate() {
        if (this.state.name != "" && this.this.state.description != "" && this.this.state.UOM != "") {
            this.setState({ UOM: this.state.seriesListData[index].UOM });
        }

    }

    canBeSubmitted() {
        const errors = validate(this.state.name, this.state.description);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }


    /**Functions Section End*/
    render() {
        const errors = validate(this.state.name, this.state.description);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return <div>
            <NotificationContainer width={1000}
            height={50}
            position={{ top: 0, left: 500 }}
            stacking={'down'}
            ref={a => this.notification = a} />
            <AddSeriesForm  {...this.props} />
            </div>
    }
}




const mapDispatchToProps = dispatch => {
    return {
        addSeries: series => dispatch(addSeriesActions.addSeries(series)),
        deleteSeries: series => dispatch(addSeriesActions.deleteSeries(series)),
        editSeries: () => dispatch(addSeriesActions.editCurrentSeries(-1)),
        updateSeries:(series) => dispatch(addSeriesActions.updateSeries(series))
    };
};
function mapStateToProps(state) {
    let currentEditingSeries =Object.assign ({},{
        name: "",
        description: "",
        unit: "",
        colorCode: "",
        lineWidth: LineWidth["LineBig"],
        lineSymbol: LineSymbol["LineCircle"],
        retrivalMode: RetrivalMode["RAW"],
        enableSubmit: "",
        seriesListData: [],/**Series data which user store and save in a db*/
    });
    if (state.addSeriesReducer.CurrentEditingSeriesIndex !== -1) {
        currentEditingSeries = Object.assign({}, state.addSeriesReducer.ChartConfig[state.addSeriesReducer.CurrentEditingSeriesIndex]);
    }
    return {
        data: currentEditingSeries,
        currentEditingIndex:state.addSeriesReducer.CurrentEditingSeriesIndex,
        clipboard: Object.assign([], state.addSeriesReducer.ClipBoardData),
        isupdate: state.addSeriesReducer.isupdate
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddSeriesContainer)
