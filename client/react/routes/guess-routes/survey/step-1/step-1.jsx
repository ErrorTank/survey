import React from 'react';
import {SurveyInput} from "../survey-input/survey-input";
import {SurveyBtn} from "../survey-btn/survey-btn";
import {customerApi} from "../../../../../api/common/customer";
import {SurveySelect} from "../survey-select/survey-select";
import {userInfo} from "../../../../../lib/states/common";
import {locationApi} from "../../../../../api/common/location";
import {serviceApi} from "../../../../../api/common/service";

export const Step1 = ({setCustomer, handleNext}) => {
    let [customerID, setCustomerID] = React.useState('');
    let [saving, setSaving] = React.useState(false);


    const checkCustomer = () => {
        setSaving(true);
        if(customerID){
            return customerApi.checkCustomer({
                customerID
            }).then((data) => {
                setSaving(false);
                if(!data){
                    setCustomer(null);


                }else{
                    setCustomer(data);

                }
                handleNext();
            })
        }else{
            handleNext();
        }

    };
    return (
        <div className="survey-step-1">
            <div className="survey-header">
                Thông tin khách hàng
            </div>
            <div className="survey-body">
                <SurveyInput
                    value={customerID}
                    onChange={e => setCustomerID(e.target.value)}
                    type={'text'}
                    label={"Mã KH"}
                />



            </div>

            <div className="survey-actions">
                <SurveyBtn
                    disabled={saving}
                    content={(
                        <span>{saving ? "Đang kiểm tra..." : <>Tiếp tục <i className="far fa-long-arrow-alt-right"></i></>}</span>
                    )}
                    onClick={checkCustomer}
                />



            </div>
        </div>
    );
};
