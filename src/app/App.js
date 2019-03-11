
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
* Module :  App (Starter component)
* Description : it is a entry component which loads first at the time application load
* Date:31-JULY-2018.
* =============================================================================================================================================
 * 
 * #endregion
*/

/**library import section Begin*/
import React, { Fragment, Component } from "react";
import Header from "./base/Header";
import MainBody from "./base/MainBody";
import '../assets/scss/main.scss';
import HttpClient from "./services/apiService";
import { apiURL, RouteParams, LicenceTime, AppId } from "./constants/Constants";
import * as mytrendActions from './mytrends/mytrendActions';
import * as TrenderAreaActions from './trenderArea/action';
import * as addSeriesActions from './addSeries/addSeriesActions';
import * as  tagBrowserActions from './tagBrowser/TagBrowserActions';
import Loader from '../components/ui/loader/Loader';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-confirmation2/dist/bootstrap-confirmation.js';
import { connect } from 'react-redux';
import Login from './login/Login';
import FloatingMenuButton from '../components/ui/FloatingMenuButton/FloatingMenuButton';
import Modal from 'react-responsive-modal';
import * as Actions from './actions/index';
import  ErrorBoundary from './errorHandler/ErrorBoundary'
/**library import section End*/


class App extends Component {
    /**variable initalize */
    constructor(props) {
        super(props);
        this.httpClient = new HttpClient();

        const queryParams = this.props.location.search;
        if (queryParams) {
            if (queryParams.split('?')[1].split('=')[0] != "trendid") {
                let param = queryParams.split('=');
                localStorage.setItem("userID", param[5].split('&')[0]);
                localStorage.setItem("sessionID", param[3].split('&')[0]);
                localStorage.setItem("resource", param[4].split('&')[0]);
            }
        }

    }

    state = {
        isShowSignalPropertiesContainer: false,
        isShowSignalFunctionsContainer: false,
        isShowTagBrowserContainer: false,
        isClearContainer: false,
        open: false,
        modalError: "",
        isCall: 0
    }


    onOpenModal = (description) => {
        this.setState({ open: true });
        this.setState({ modalError: description })
    };

    onCloseModal = () => {
        this.setState({ open: false });

    };

  

    componentDidMount() {
        const queryParams = this.props.location.search;
        if (queryParams) {
            let param = queryParams.split('=');

            if (this.checkParamType(param[0]) === RouteParams.TagName) {
                this.props.fetchMetaByTagName(param[1].split('&')[0], param[2]);
            } else if (this.checkParamType(param) === RouteParams.TrendID) {
                this.props.fetchTrendForID({ id: param[1].split('&')[0] }, null);
            }
        }
    }

    componentDidUpdate() {
        if (this.state.isCall == 0) {
            if (localStorage.getItem("userID") != null) {
                this.setState({ isCall: 1 })
                let self = this
                setInterval(function () {
                    self.checkLicence(AppId.id)
                }, LicenceTime.time);
            }
        }

    }



    checkLicence(appID) {
        this.httpClient.get(apiURL.LICENCE)
            .then(response => {
                if (response.data.status != 200) {
                    this.onOpenModal(response.data.message);
                }

            })
            .catch(error => {
                this.onOpenModal("Error");
            });
    }


    checkParamType(param) {
        if (param) {
            var index = param.indexOf("tagName");
            if (index !== -1) {
                return RouteParams.TagName;
            } else {
                return RouteParams.TrendID;
            }
        }
    }

    handleOnClickAddSignal = () => {
        this.setState({
            isShowSignalFunctionsContainer: false,
            isShowTagBrowserContainer: true,
            isShowSignalPropertiesContainer: false,
            isClearContainer: false
        }, () => {
            this.props.setMenuStore(this.state)
        })
    }

   

    /**Life Cyele Hooks Section End*/

    resetExplorer = () => {
        document.getElementById("new-trend-name").innerHTML = "";
        this.props.resetMyTrend();
        this.props.newTrend();
        this.props.resetTrenderAreaStore();
    }
    render() {

        if (localStorage.getItem("userID") == null) {
            return (
                <Fragment>
                    <Login></Login>
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                    <ErrorBoundary>
                    <Modal open={this.state.open} onClose={this.onCloseModal}
                        classNames={{
                            modal: "login-modal"
                        }} center>
                        <div className="circle-error">
                            <i className="fa fa-exclamation"></i>
                        </div>
                        <h4>{this.state.modalError}</h4>

                    </Modal>
                    <Loader isloading={this.props.loading} />
                    <Header></Header>

                    <MainBody></MainBody>
                    <FloatingMenuButton
                        handleOnClickAddSignal={this.handleOnClickAddSignal}
                        resetExplorer={this.resetExplorer}></FloatingMenuButton>
                   
                    </ErrorBoundary>
                </Fragment>
            );
        }


    }

    //initialize connectonstring for the application.
    initConnectionString() {
        this.httpClient.get(apiURL.API_CONNECTION_STRING)
            .then(response => {
                localStorage.removeItem('connectionString');
                localStorage.setItem('connectionString', response);
            })
            .catch(error => {
            });
    }

    loadTagList() {
        this.props.getTagList();
    }
}


function mapStateToProps(state) {
    return {
        series: Object.assign([], state.addSeriesReducer.config.series),
        loading: state.loader.fetching
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTrendForID: (id, series) => dispatch(mytrendActions.GetSelectedSavedTrend(id, series)),
        fetchMetaByTagName: (tagName, tagPath) => dispatch(addSeriesActions.fetchTagMeta(tagName, tagPath)),
        getTagList: () => dispatch(tagBrowserActions.getTagList()),
        newTrend: () => dispatch(addSeriesActions.resetStore()),
        resetMyTrend: () => dispatch(mytrendActions.resetMyTrendStore()),
        resetTrenderAreaStore: () => dispatch(TrenderAreaActions.resetTrendAreaStore()),
        setMenuStore: currentMenuState => dispatch(Actions.setSignalMenuState(currentMenuState))
    };
};


export default connect(
    mapStateToProps, mapDispatchToProps

)(App)