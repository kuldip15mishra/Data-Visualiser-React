import React, {
  Component,
  Fragment
} from 'react'
import SeriesGridView from './seriesGridView';
import {
  connect
} from 'react-redux'
import * as seriesGridViewActions from '../addSeries/addSeriesActions';
import CommonUtils from "../commonutils/CommonUtils"
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer";
import {
  AlertMessage,
  Status
} from "../constants/Constants"
import * as addSeriesActions from '../addSeries/addSeriesActions';
import $ from 'jquery';
import * as MenuActions from '../actions/index';
import EditSeriesContainer from "../editSeriesPanel/EditSeriesContainer";
import PopConfirm from '../pluginComponents/ui/react-popconfirm';

class SeriesGridViewContainer extends Component {
  state = {
    visible: true,
    seriesList: [],
    isEditing: false
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.seriesListData !== this.props.seriesListData) {

      this.setState({
        seriesList: this.props.seriesListData
      });
    }

    if (prevState.isEditing !== this.state.isEditing) {
      $(".edit-series-panel").toggleClass('opened');
      $(".overlay").toggle();

    }
  }

  //edit  series and populated selected data on series added fields
  handleRowEdit = (seriesData) => {

    this.setState({
      isEditing: true
    });

    this.props.editSeries(seriesData)
  }

  updateEditingState = (newState) => {
    this.setState({
      isEditing: newState
    });
  }

  showInfoNotification(message, type) {
    this.notification.showPopUpNotification(message, type);
  }

  //tag copy
  copyTagsValue = (index) => {

    var temp = document.createElement("input");

    // Assign it the value of the specified element

    var tempObj = this.props.copytoClipBoard(this.state.seriesList[index].tagPath).payload
    temp.setAttribute("value", tempObj)

    // Append it to the body
    document.body.appendChild(temp);
    // Highlight its content
    temp.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(temp);


  }

  //on click of eye icon
  onEyeClick = (index, seriesData, event) => {
    this.props.hideSeriesIndex(index);

  }

  //remove  series from series grid

  showPopup = (e, seriesData) => {

    PopConfirm({
      confirmation: 'Are you sure?',
      okLabbel: 'Delete',
      cancelLabel: 'Cancel',
      placement: 'top-left',
      height:'85',
      width:'200',
      okStyle : 'btn btn-sm btn-outline-primary btn-rounded',
      cancelStyle : 'btn btn-sm btn-outline-primary btn-rounded',
      element: e.target	// target is the element you clicked
    }).then(
      (result) => {
        // `proceed` callback
        if (CommonUtils.isEmpty(seriesData)) {
          this.showPopUpNotification("you cannot remove this series, it is aceess by other thread", Status.Info)
          return false;
        }
        let index = this.props.seriesListData.indexOf(seriesData);
        if (index != -1) {
          this.props.deleteSeries(index)

        }
      },
      (result) => {
        // `cancel` callback
        alert("cancel");
      }
    )
   


  }
  onInfoIconClick = (index, series, e) => {
    e.preventDefault();

    if (series && series.isExpression) {
      this.props.setMenuStore({
        isShowSignalPropertiesContainer: false,
        isShowSignalFunctionsContainer: true,
        isShowTagBrowserContainer: false,
        isClearContainer: true,
        isEdit: true
      });

      this.props.setMenuSelectedTagData({
        data: series,
        isShowConfigureButton: false,
        isShowForm: true
      });
    }
    else {
      this.props.setMenuStore({
        isShowSignalPropertiesContainer: true,
        isShowSignalFunctionsContainer: false,
        isShowTagBrowserContainer: false,
        isClearContainer: true
      });

      this.props.setMenuSelectedTagData({
        data: series,
        isShowConfigureButton: true,
        isShowForm: false
      });
    }
  }
  onRowDelete = (seriesData) => {
    if (CommonUtils.isEmpty(seriesData)) {
      this.showPopUpNotification("you cannot remove this series, it is aceess by other thread", Status.Info)
      return false;
    }
    let index = this.props.seriesListData.indexOf(seriesData);
    if (index != -1) {
      this.props.deleteSeries(index)

    }
  }
  render() {
    let editSeriesDiv;
    if (this.state.isEditing) {
      editSeriesDiv = <EditSeriesContainer updateEditingState={this.updateEditingState} />
    } else {
      editSeriesDiv = <div></div>
    }
    return <Fragment>
      <NotificationContainer width={1000}
        height={50}
        position={{ top: 0, left: 500 }}
        stacking={'down'}
        ref={a => this.notification = a} />

      <SeriesGridView  {...this.props}
        showPopup={this.showPopup}
        onRowEdit={this.handleRowEdit}
        onEyeClick={this.onEyeClick}
        copyTagsValue={this.copyTagsValue}
        onInfoIconClick={this.onInfoIconClick}
      />
      {editSeriesDiv}
    </Fragment>
  }
  showPopUpNotification(message, type) {
    this.notification.showPopUpNotification(message, type);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSeries: series => dispatch(seriesGridViewActions.deleteSeries(series)),
    editSeries: series => dispatch(seriesGridViewActions.editCurrentSeries(series)),
    hideSeriesIndex: index => dispatch(seriesGridViewActions.hideSeriesIndex(index)),
    copytoClipBoard: series => dispatch(addSeriesActions.addTagInfoToClipBoard(series)),
    setMenuStore: menuState => dispatch(MenuActions.setSignalMenuState(menuState)),
    setMenuSelectedTagData: menuData => dispatch(MenuActions.setSignalMenuData(menuData))
  };
};

function mapStateToProps(state) {
  return {
    seriesListData: Object.assign([], state.addSeriesReducer.ChartConfig),
    currentTagNameValues: Object.assign([], state.addSeriesReducer.currentTagNameValues),
    TagSummary: Object.assign([], state.addSeriesReducer.TagSummary)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesGridViewContainer)