import React from 'react';
import classnames from "classnames";
import {customerApi} from "../../../../../api/common/customer";

export const SurveyBtn = ({content, onClick, disabled}) => {

    return (
        <div className={classnames("survey-btn", {disabled})} onClick={onClick}>
            {content}
        </div>
    );
};

