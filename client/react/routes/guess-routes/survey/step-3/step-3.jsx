import React from 'react';
import {SurveyBtn} from "../survey-btn/survey-btn";
import {customerApi} from "../../../../../api/common/customer";
import classnames from "classnames";

const ratings = [
    {
        value: 1,
        icon: ({onClick}) => <i className="fas fa-angry" onClick={onClick}></i>,
        label: "Chưa tốt"
    }, {
        value: 2,
        icon: ({onClick}) =>  <i className="fas fa-meh" onClick={onClick}></i>,
        label: "Tạm ổn"

    },{
        value: 3,
        icon: ({onClick}) => <i className="fas fa-smile-beam" onClick={onClick}></i>,
        label: "Hài lòng"

    },{
        value: 4,
        icon: ({onClick}) => <i className="fas fa-grin-hearts" onClick={onClick}></i>,
        label: "Rất hài lòng"

    },
]

export const Step3 = ({customer, setCustomer, handleNext, locationProp, serviceProp}) => {
    let [rating, setRating] = React.useState(null);
    let [text, setText] = React.useState('');
    let [saving, setSaving] = React.useState(false);

    const submit = () => {
        setSaving(true);
        let data = {
            location: locationProp._id,
            service: serviceProp._id,
            rating,
            text: text.trim(),
            customer: customer._id
        }
        customerApi.submitSurvey(data)
            .then(() => handleNext())
    }


    return (
        <div className="survey-step-3">
            <div className="survey-header">
                Đánh giá dịch vụ
            </div>
            <div className="survey-body">
                <div className="survey-rating">
                    {ratings.map((each) => {
                        return (
                            <div className={classnames("rating", {active: rating === each.value})} key={each.value}>
                                <div className="rating-icon">
                                    {each.icon({onClick: () => setRating(each.value), current: rating})}
                                </div>
                                <div className="rating-label">
                                    {each.label}
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className="survey-text">
                    <div className={"st-container"}>
                        <div className="st-label">
                            Góp ý thêm
                        </div>
                        <div className="st-input">
                            <textarea
                                placeholder={"Bấm để góp ý"}
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="survey-actions">
                <SurveyBtn
                    disabled={!rating}
                    content={(
                        <span>{saving ? "Đang tải..." : <>Hoàn thành <i className="far fa-long-arrow-alt-right"></i></>}</span>
                    )}
                    onClick={submit}
                />

            </div>
        </div>
    );
};
