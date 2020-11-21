import React, {useState} from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {TextField, Button, Paper, Container} from "@material-ui/core";

import {Alert} from "@material-ui/lab"
import {authApi} from "../../../../api/common/auth";
import {userInfo} from "../../../../lib/states/common";
import {authenCache} from "../../../../lib/cache/common/authentication";
import CircularProgress from "@material-ui/core/CircularProgress";
import {customHistory} from "../../../app";
import {roleMap} from "../../role-map";
const loginSchema = yup.object().shape({
    username: yup.string().required("Tên đăng nhập không được để trống"),
    password: yup.string().min(4, "Mật khẩu phải nhiều hơn 4 kí tự").noSpecialChar("Mật khẩu không được chứa kí tự đặc biệt")
});

const LoginRoute = () => {
    useDocumentTitle("Đăng nhập");
    const { register, handleSubmit, errors,  } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    });
    let [loading, setLoading] = useState(false);
    let [serverError, setServerError] = useState(false);
    const onSubmit = (data) => {
        setLoading(true);
        setServerError(false);
        authApi.login({
            ...data
        }).then(data => {
            authenCache.setAuthen(data.token, { expires: 7 });
            userInfo.setState(data.user).then(() => {
                customHistory.push(roleMap[data.user.role].defaultPath);
            });
        }).catch((error) => {

            setServerError(true);
            setLoading(false);
        })
    };


    return (
        <div className="login-route">
            <Container maxWidth={"lg"}>
                <Paper elevation={3} className="login-box">
                    <div className="lb-header">
                        <div className='lb-logo'>

                        </div>
                        <div className='lb-title'>
                            Đăng nhập
                        </div>

                    </div>
                    {serverError && (
                        <div style={{padding: "1.25rem"}}>
                            <Alert severity="error" >Tài khoản hoặc mật khẩu không chính xác!</Alert>

                        </div>
                    )}


                    <div className="lb-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                type="text"
                                name="username"
                                label="Tên đăng nhập"
                                inputRef={register}
                                variant="outlined"
                                style={{ marginBottom: "1rem" }}
                                error={errors.username}
                                helperText={errors.username?.message}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                variant="outlined"
                                style={{ marginBottom: "1rem" }}
                                label="Mật khẩu"
                                inputRef={register}
                                error={errors.password}
                                helperText={errors.password?.message}
                            />
                            <Button disabled={Object.keys(errors).length || loading} fullWidth type={"submit"} style={{ marginTop: "0.6rem" }} variant="contained" color="primary">
                                Đăng nhập {loading && <CircularProgress size={20} style={{marginLeft: "10px"}} color="primary" />}
                            </Button>

                        </form>
                    </div>
                </Paper>
            </Container>

        </div>
    );
};
export default LoginRoute;

