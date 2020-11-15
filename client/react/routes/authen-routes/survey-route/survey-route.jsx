import React from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import {CustomerIdStep} from "./steps/customer-id-step";
import {CustomerInfoStep} from "./steps/customer-info-step";
import {SurveyStep} from "./steps/survey-step";
import {Button} from "@material-ui/core";

function getSteps() {
    return ['Nhập mã khách hàng', 'Thông tin khách hàng', 'Đánh giá'];
}

function getStepContent(step, props) {
    switch (step) {
        case 0:
            return (
                <CustomerIdStep
                    {...props}
                />
            );
        case 1:
            return (
                <CustomerInfoStep
                    {...props}
                />
            );
        case 2:
            return (
                <SurveyStep
                    {...props}
                />
            );
        default:
            return 'Unknown step';
    }
}

const SurveyRoute = () => {
    useDocumentTitle("Khảo sát khách hàng");
    const [activeStep, setActiveStep] = React.useState(3);
    const [customer, setCustomer] = React.useState({});
    const [isExisted, setIsExisted] = React.useState(false);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setCustomer({});
        setIsExisted(false);
        setActiveStep(0);
    };
    return (
        <AuthenLayout>
            <div className="survey-route">
                <Paper elevation={3} className="survey-container">
                    <div className="survey-header">
                        <div className="sh-title">
                            Khảo sát nhanh
                        </div>

                    </div>
                    <div className="survey-body">
                        <Stepper style={{padding: 0}} activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {getStepContent(index, {
                                            isExisted,
                                            customer,
                                            handleNext,
                                            handleBack,
                                            handleReset,
                                            setCustomer: customer => setCustomer(customer),
                                            setIsExisted: existed => setIsExisted(existed)
                                        })}

                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <div className="finish-dialog">
                                <div className="success-text">
                                    <i className="success-icon fas fa-check-circle"></i>  <span>Cảm ơn bạn đã tham gia đánh giá chất lượng dịch vụ của chúng tôi!</span>
                                </div>
                                <div style={{textAlign: "center", marginTop: "12px"}}>
                                    <Button variant="contained"  color={"primary"} onClick={handleReset}>Bắt đầu lại</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Paper>
            </div>
        </AuthenLayout>
    );
};

export default SurveyRoute;