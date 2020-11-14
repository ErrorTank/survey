import React, {useState, useCallback} from 'react';
import {Login} from "./components/login/login";
import {Survey} from "./components/survey/survey";

const MODES = {
  "LOGIN": {
      component: Login
  } ,
  "SURVEY": {
      component: Survey
  }
};

export const App = () => {
    let [mode, setMode] = useState(MODES.LOGIN);
    let Component = mode.component;
    let setNewMode = useCallback((key) => {
        setMode(MODES[key]);
    }, []);
    return (
        <Component setNewMode={setNewMode}/>
    )
};
