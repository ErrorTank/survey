import React, {useState} from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {authApi} from "../../../../api/common/auth";
import {userInfo} from "../../../../lib/states/common";
import {authenCache} from "../../../../lib/cache/common/authentication";

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
            <div  className="login-box">
                <div className="lb-header">
                    <div className='lb-logo'>

                    </div>
                    <div className='lb-title'>
                        Đăng nhập
                    </div>

                </div>
            </div>
            {serverError && (
                <div style={{padding: "1.25rem"}}>
                    Tài khoản hoặc mật khẩu không chính xác!

                </div>
            )}
            <div className="lb-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên đăng nhập"
                        ref={register}
                        style={{ marginBottom: "1rem" }}

                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        style={{ marginBottom: "1rem" }}
                        ref={register}
                    />
                    <button style={{ marginTop: "0.6rem" }} disabled={Object.keys(errors).length || loading} type={"submit"}>
                        Đăng nhập
                    </button>


                </form>
            </div>


        </div>
    );
};
export default LoginRoute;

