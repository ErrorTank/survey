import React from 'react';
import {SurveyBtn} from "../survey-btn/survey-btn";
import {SurveyInput} from "../survey-input/survey-input";
import {SurveySelect} from "../survey-select/survey-select";
import {userInfo} from "../../../../../lib/states/common";
import {customerApi} from "../../../../../api/common/customer";
import {locationApi} from "../../../../../api/common/location";
import {serviceApi} from "../../../../../api/common/service";

export const Step2 = ({customer, setCustomer, locationProp, serviceProp, setStep2Data}) => {
    let [name, setName] = React.useState(customer?.name || '');
    let [phone, setPhone] = React.useState(customer?.phone || '');
    let [locations, setLocations] = React.useState([]);
    let [services, setServices] = React.useState([]);
    let [service, setService] = React.useState(serviceProp);
    let [location, setLocation] = React.useState(locationProp);
    let [loading, setLoading] = React.useState(true);
    let [saving, setSaving] = React.useState(false);
    React.useEffect(() => {
        Promise.all([locationApi.getLocations(), serviceApi.getServices()])
            .then(([locations, services]) => {
                setLocations(locations);
                setServices(services);
                setLoading(false);
            })
    }, [])
    const onSubmit = () => {
        setSaving(true);
        if(!customer){
            customerApi.createNewCustomer({
                name,
                phone,
            }).then(data => {
                setCustomer(data);
                setStep2Data({
                    location,
                    service
                });
            })
        }else{
            setStep2Data({
                location,
                service
            });
        }

    };

    return (
        <div className="survey-step-2">
            <div className="survey-header">
                Thông tin khách hàng
            </div>
            <div className="survey-body">
                {!loading && (
                    <>
                        {customer && (
                            <SurveyInput
                                value={customer.customerID}
                                type={'text'}
                                label={"Mã KH"}
                                disabled={true}
                            />
                        )}
                        <SurveyInput
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type={'text'}
                            label={"Họ tên"}
                            disabled={customer}
                        />
                        <SurveyInput
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            type={'text'}
                            label={"SĐT"}
                            disabled={customer}
                        />
                        <SurveySelect
                            value={location}
                            onChange={e => setLocation(e)}
                            label={"Cơ sở"}
                            placeholder={"Chọn cơ sở"}
                            displayAs={item => item.name}
                            list={locations}

                        />
                        <SurveySelect
                            value={service}
                            onChange={e => setService(e)}
                            label={"Dịch vụ"}
                            placeholder={"Chọn dịch vụ"}
                            displayAs={item => item.name}
                            list={services}
                        />
                    </>
                )}


            </div>
            <div className="survey-actions">
                <SurveyBtn
                    disabled={!name || !phone || !location || !service || saving}
                    content={(
                        <span>{saving ? "Đang tải..." : <>Tiếp tục <i className="far fa-long-arrow-alt-right"></i></>}</span>
                    )}
                    onClick={onSubmit}
                />

            </div>
        </div>
    );
};
