import React, {useState} from 'react';
import {Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classnames from "classnames";
import {userInfo} from "../../../lib/states/common";
import {StarRating} from "../star-rating/star-rating";
import {mainApi} from "../../../api/common/main";
import {appCred} from "../../../app-loader";

export const Survey = ({setNewMode}) => {
    let [rating, setRating] = useState(5);
    let [text, setText] = useState("");
    let [loading, setLoading] = useState(false);
    let [fakeRating, setFakeRating] = useState(5);
    let {customerID} = userInfo.getState();
    const [modal, setModal] = useState(false);

    const submit = () => {
        setLoading(true);
        mainApi.submitSurvey({
            customerID,
            rating,
            text
        }).then(() => {
            setLoading(false);
            setFakeRating(5);
            setRating(5);
            setText("");
            setModal(true);
        });

    };
    const toggle = () => {
        setModal(!modal);
        userInfo.setState(null);
        appCred.set(null, "token");
        setNewMode("LOGIN");
    };
    return (
        <>
        <div className={"survey-form"}>
            <div className="white-box">
                <div className="box-header">
                    Khảo sát khách hàng
                </div>
                <div className="box-body">
                    <div className="survey-row">
                        <div className="survey-label">
                            Khách hàng:
                        </div>
                        <div className="survey-value">
                            {customerID}
                        </div>
                    </div>
                    <div className="survey-row">
                        <div className="survey-label">
                            Đánh giá của bạn: <span className={classnames("rating-count",{low: fakeRating <= 2, avg: fakeRating > 2 && fakeRating <=4, high: fakeRating > 4})}>{fakeRating}/5</span>
                        </div>
                        <div className="survey-rating">
                            <StarRating
                                rating={rating}
                                editable={true}
                                onChange={rating => setRating(rating)}
                                onMouseOverStars={rating => setFakeRating(rating)}
                                onMouseLeaveStars={() => setFakeRating(rating)}
                            />
                        </div>
                    </div>
                    <div className="survey-row">
                        <div className="survey-label">
                            Đóng góp ý kiến
                        </div>
                        <div className="survey-text">
                            <Input type="textarea"
                                   name="text"
                                   placeholder={"Nhập ý kiến của bạn..."}
                                   value={text}
                                   onChange={e => setText(e.target.value)}
                            />
                        </div>
                    </div>

                </div>
                <div className="box-footer">
                    <Button color="primary" block disabled={loading} onClick={submit}>
                        {loading ? "Đang gửi..." : "Gửi đánh giá"} <i className="fab fa-telegram-plane"></i>
                    </Button>
                </div>
            </div>
        </div>
            <Modal isOpen={modal} toggle={toggle} className={"success-modal"}>
                <ModalHeader toggle={toggle}>Gửi thành công</ModalHeader>
                <ModalBody>
                    <div className="success-text">
                        <i className="success-icon fas fa-check-circle"></i>  <span>Cảm ơn bạn đã tham gia đánh giá chất lượng dịch vụ của chúng tôi!</span>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Kết thúc</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
