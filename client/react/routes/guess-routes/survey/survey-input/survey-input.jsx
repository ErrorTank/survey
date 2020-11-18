import React from 'react';
import classnames from "classnames";

export const SurveyInput = ({value, onChange, label, type, disabled}) => {
    return (
        <div className={classnames("survey-input", {disabled})}>
            <div className="si-label">
                {label}
            </div>
            <input

                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

