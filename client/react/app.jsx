import React, {Suspense} from 'react';
import {Router, Switch, Redirect} from "react-router-dom";
import {createBrowserHistory} from "history";
import {GuessRoute} from "./routes/types/guess-route";

import {a} from "./common/yup-config";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import {AuthenRoute} from "./routes/types/authen-route";
import {roleMap} from "./routes/role-map";
import {userInfo} from "../lib/states/common";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue["700"],
        },
        secondary: pink,
    },
});

const LoginRoute = React.lazy(() => import('./routes/guess-routes/login-route/login-route'));
const SurveysRoute = React.lazy(() => import('./routes/authen-routes/surveys-route/surveys-route'));
const Survey = React.lazy(() => import('./routes/guess-routes/survey/survey'));

export const customHistory = createBrowserHistory();

export const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <Router history={customHistory}>
                <Suspense fallback={null}>
                    <Switch>

                        <AuthenRoute
                            path={"/"}
                            exact
                            render={(props) =>
                                <Redirect
                                    to={{
                                        pathname: roleMap[userInfo.getState().role].defaultPath,
                                    }}
                                />
                            }
                            roles={[0]}
                        />
                        <AuthenRoute
                            path={"/survey"}
                            exact
                            render={(props) =>
                                <Survey {...props}/>
                            }
                            roles={[2]}
                        />
                        <AuthenRoute
                            path={"/surveys"}
                            exact
                            render={(props) =>
                                <SurveysRoute {...props}/>
                            }
                            roles={[0,1]}
                        />
                        <GuessRoute
                            path={"/login"}
                            exact
                            render={(props) =>
                                <LoginRoute {...props}/>
                            }

                        />
                    </Switch>
                </Suspense>
            </Router>
        </ThemeProvider>
    )
};
