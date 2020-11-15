import React from 'react';
import {Route, Redirect} from "react-router-dom"
import {authenCache} from "../../../lib/cache/common/authentication";
import {userInfo} from "../../../lib/states/common";
import {roleMap} from "../role-map";

export const GuessRoute = ({render, component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
            render={props => !authenCache.getAuthen() ? render ? render(props) : (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: roleMap[userInfo.getState().role].defaultPath,
                    }}
                />
            )}
        />
    );
};

