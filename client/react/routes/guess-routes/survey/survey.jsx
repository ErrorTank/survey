import React from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {Step1} from "./step-1/step-1";
import {Step2} from "./step-2/step-2";
import {Container} from "@material-ui/core";
import {Step3} from "./step-3/step-3";
import {userInfo} from "../../../../lib/states/common";
import {SurveyBtn} from "./survey-btn/survey-btn";

const modes = [
    {
        Comp: Step1
    }, {
        Comp: Step2
    },{
        Comp: Step3
    },
]

const Survey = () => {
    useDocumentTitle("Khảo sát khách hàng");
    let [mode, setMode] = React.useState(0);
    let [customer, setCustomer] = React.useState(null);
    let [service, setService] = React.useState(null);
    let [location, setLocation] = React.useState(userInfo.getState().location);
    let Component = modes[mode]?.Comp;
    return (
        <div className="survey">
            <Container maxWidth={"lg"}>
                <div className="survey-container">
                    {mode === 3 ? (
                        <div className="end-step">
                            <div className="thank-text">
                                Thanks You!
                            </div>
                            <div className="thank-box">
                                <div className="inner-box">
                                    <p style={{textIndent: "20px"}}>
                                        Cảm ơn anh/chị: <span className="highlight">{customer.name}</span> đã tham gia đánh giá và sử dụng dịch vụ của chúng tôi!
                                    </p>
                                    <p style={{marginTop: "15px", textAlign: "center"}}>Chúc anh/chị một ngày tốt lành.</p>
                                </div>
                            </div>
                            <div style={{textAlign: "center", marginTop: "50px"}}>
                                <SurveyBtn
                                    content={(
                                        <span>Đánh giá lại</span>
                                    )}
                                    onClick={() => {
                                        setCustomer(null);
                                        setService(null);
                                        setLocation(userInfo.getState().location);
                                        setMode(0);
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <Component
                            customer={customer}
                            setCustomer={customer => setCustomer(customer)}
                            locationProp={location}
                            serviceProp={service}
                            setStep2Data={({location, service}) => {
                                setLocation(location);
                                setService(service);
                                setMode(mode + 1);
                            }}
                            handleNext={
                                () => setMode(mode + 1)
                            }
                        />
                    )}

                </div>
            </Container>
        </div>
    );
};

export default Survey;