import React, {useState} from 'react';
import {customerApi} from "../../../../../api/common/customer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

export const CustomerIdStep = ({customer, setCustomer, handleNext, handleAdd}) => {
    let {customerID = ""} = customer;
    let [cID, setCID] = React.useState(customerID);
    let [loading, setLoading] = useState(false);
    let [isExisted, setIsExisted] = useState(true);
    const checkCustomer = () => {
        setLoading(true);
        customerApi.checkCustomer({
            customerID: cID
        }).then(data => {
            if(!data){
                setCustomer({});
                setIsExisted(false);
                setLoading(false);
            }else{
                setCustomer(data);
                handleNext();
            }

        })
    };
    return (
        <div className="customer-id-step s-step">
            {!isExisted && (
                <Alert style={{marginBottom: "10px"}} severity="info">Mã khách hàng không tồn tại! Vui lòng <span onClick={handleAdd} style={{textDecoration: "underline", fontWeight: "bold", cursor: "pointer"}}>tạo khách mới</span>.</Alert>
            )}
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
                    Xác minh {loading && <CircularProgress size={20} style={{marginLeft: "10px"}} color="primary" />}
                </Button>


                <Button startIcon={<AddIcon/>} onClick={handleAdd} style={{marginLeft: "10px"}} variant="outlined" color="primary">
                    Khách mới
                </Button>
            </div>
        </div>
    );
};

