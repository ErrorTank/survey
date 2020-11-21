import React from "react";
import ReactDOM from "react-dom";
import {App} from "./app";
import {appLoader} from "../app-loader";

export const registerServiceWorker = () => {

    if ('serviceWorker' in navigator) {
        let swDir = "./sw.js";
        return navigator.serviceWorker
            .register(swDir)
            .then(function () {
                console.log('Service worker registered!');
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    console.log("Service worker is not supported!");
    return Promise.resolve();
};


// registerServiceWorker().then(() =>
    appLoader.init().then(() => {
    ReactDOM.render(<App/>, document.getElementById("app"));})
// )

