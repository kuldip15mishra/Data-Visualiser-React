
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
* Module :  index.js
* Description : it is a entry js file which loads component into dom html page
* Date:31-JULY-2018.
* =============================================================================================================================================
 * 
 * #endregion
*/

import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import rootSaga from './app/sagas';
import configureStore from './app/store/configureStore.dev';
import './assets/js/custom';
//import { history } from './app/services';
import { InitialState } from './app/store/initialState';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line
store.runSaga(rootSaga);
import registerServiceWorker from './registerServiceWorker';

/**library import section Begin*/
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
                <Route path="/tagName" component={App} />
                <Route path="/login" component={App} />

            </Switch>
        </Router>
    </Provider>
    , document.getElementById("root"));
    registerServiceWorker();

/**library import section End*/
