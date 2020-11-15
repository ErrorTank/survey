import React, {useState} from 'react';
import {FormGroup, Label, Input, Button} from 'reactstrap';
import {LoadingInline} from "../loading-inline/loading-inline";
import {mainApi} from "../../../api/common/auth";
import {appCred} from "../../../app-loader";
import {userInfo} from "../../../lib/states/common";

export const Login = ({setNewMode}) => {
    let [customerID, setCustomerID] = useState("");
    let [loading, setLoading] = useState(false);
    const login = () => {
        setLoading(true);
        mainApi.login({
            customerID
        }).then(data => {
            appCred.set(data.token, "token", {expires: 7});
            userInfo.setState({customerID: data.customerID})
                .then(() => setNewMode("SURVEY"));

        })
    };
    return (
        <div className="login-form">
            <div className="white-box">
                <div className="box-header">
                    Khảo sát khách hàng
                </div>
                <div className="box-body">
                    <FormGroup>
                        <Label for="customerID">Mã khách hàng</Label>
                        <Input type="text"
                               name="customerID"
                               id="customerID"
                               placeholder="VD: ABCDXYZ..."
                               value={customerID}
                               onKeyDown={e => {
                                   if(e.keyCode === 13 && customerID && !loading){
                                       login();
                                   }
                               }}
                               onChange={e => setCustomerID(e.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className="box-footer">
                    <Button color="primary" block disabled={loading || !customerID} onClick={login}>
                        Tiếp tục
                        {loading && <LoadingInline/>}
                    </Button>
                </div>

            </div>
        </div>

    );
};
