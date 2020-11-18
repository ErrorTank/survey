import React from 'react';
import {ClickOutside} from "../../../../common/click-outside/click-outside";
import classnames from "classnames"

export const SurveySelect = ({value, onChange, label, displayAs, placeholder = "Nhấp chọn", list}) => {
    let [show, setShow] = React.useState(false);

    return (
        <div className="survey-select">
            <ClickOutside onClickOut={() => setShow(false)}>
                <div className="select-wrapper">
                    <div className="sl-label">
                        { label}
                    </div>
                    <div className="sl-container">

                        <div className={classnames("sl-display", {"no-value": !value})} onClick={() => setShow(!show)}>
                            {value ? displayAs(value) : placeholder}
                            <i className="fas fa-caret-down"></i>
                        </div>


                    </div>
                    {show && (
                        <div className="sl-items">
                            {list.map(each => (
                                <div className={classnames("sl-item", {active: each._id === value?._id})}
                                     onClick={() => {
                                         onChange(each)
                                         setShow(false);
                                     }}
                                >
                                    {displayAs(each)}
                                </div>
                            ))}
                        </div>

                    )}
                </div>

            </ClickOutside>
        </div>
    );
};

