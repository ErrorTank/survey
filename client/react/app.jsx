import React from 'react';
import {Router, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";
export const customHistory = createBrowserHistory();

export const App = () => {

    return (
        <Router  history={customHistory}>
            <Switch>

            </Switch>
        </Router>
    )
};
