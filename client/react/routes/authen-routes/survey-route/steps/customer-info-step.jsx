import React, {useState} from 'react';
import {customerApi} from "../../../../../api/common/customer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const customerSchema = yup.object().shape({
    name: yup.string().noSpecialChar("Không được chứa kí tự đặc biệt").min(5, "Phải lớn hơn 4 kí tự").required("Không được để trống"),
    phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ")
});

export const CustomerInfoStep = ({customer, setIsExisted, setCustomer, handleNext, isExisted, handleBack}) => {
    const {register, handleSubmit, errors,} = useForm({
        resolver: yupResolver(customerSchema),
        mode: "onChange"
    });
    let [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);

        customerApi.createNewCustomer({
            ...data
        }).then(data => {
            setIsExisted(true);
            setCustomer(data);
            handleNext(true);
        })
    };
    console.log(isExisted)
    return (
        <div className="customer-info-step s-step">
            {isExisted ? (
                <>
                    <div className="s-step-content">
                        <div className="info-row">
                            <div className="info-label">Mã khách hàng</div>
                            <div className="info-value">{customer.customerID}</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Tên khách hàng</div>
                            <div className="info-value">{customer.name}</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">Số điện thoại</div>
                            <div className="info-value">{customer.phone}</div>
                        </div>
                    </div>
                    <div className="s-step-actions">
                        <Button variant="outlined" onClick={handleBack}>
                            Quay lại
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} style={{marginLeft: "10px"}}>
                            Tiếp theo
                        </Button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="s-step-content">
                        <TextField
                            fullWidth
                            type="text"
                            name="name"
                            label="Tên khách hàng"
                            inputRef={register}
                            variant="outlined"
                            style={{marginBottom: "1rem"}}
                            error={errors.name}
                            size="small"
                            helperText={errors.name?.message}
                        />

                        <TextField
                            fullWidth
                            type="text"
                            name="phone"
                            variant="outlined"
                            size="small"
                            label="Số điện thoại"
                            inputRef={register}
                            error={errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </div>
                    <div className="s-step-actions">
                        <Button variant="outlined" onClick={handleBack}>
                            Quay lại
                        </Button>
                        <Button disabled={Object.keys(errors).length || loading} style={{marginLeft: "10px"}}
                                type={"submit"} variant="contained" color="primary">
                            Tạo mới {loading &&
                        <CircularProgress size={20} style={{marginLeft: "10px"}} color="primary"/>}
                        </Button>
                    </div>
                </form>
            )}


        </div>
    );
};

