import React, {useState} from 'react';
import {customerApi} from "../../../../../api/common/customer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export const CustomerIdStep = ({customer, setIsExisted, setCustomer, handleNext}) => {
    let {customerID = ""} = customer;
    let [cID, setCID] = React.useState(customerID);
    let [loading, setLoading] = useState(false);
    const checkCustomer = () => {
        setLoading(true);
        customerApi.checkCustomer({
            customerID: cID
        }).then(data => {
            if(!data){
                setIsExisted(false);
                setCustomer({});
            }else{
                setIsExisted(true);
                setCustomer(data);
            }
            handleNext();
        })
    };
    return (
        <div className="customer-id-step s-step">
            <div className="s-step-content">
                <TextField
                    label="Mã khách hàng"
                    variant="outlined"
                    fullWidth
                    value={cID}
                    onChange={e => setCID(e.target.value.trim())}
                    onKeyDown={e => {
                        if(e.keyCode === 13 && cID && !loading){
                            checkCustomer();
                        }
                    }}
                />
            </div>
            <div className="s-step-actions">
                <Button disabled={!cID || loading} onClick={checkCustomer} variant="contained" color="primary">
                    Tiếp theo {loading && <CircularProgress size={20} style={{marginLeft: "10px"}} color="primary" />}
                </Button>
            </div>
        </div>
    );
};

