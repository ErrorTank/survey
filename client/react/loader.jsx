import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {App} from "./app";
import {appLoader} from "../app-loader";

appLoader.init().then(() => {
    ReactDOM.render(<App/>, document.getElementById("app"));
});

