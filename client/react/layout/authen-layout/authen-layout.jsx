import React from 'react';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {authenCache} from "../../../lib/cache/common/authentication";
import {userInfo} from "../../../lib/states/common";
import {customHistory} from "../../app";

export const AuthenLayout = ({children}) => {
    const signout = () => {
        authenCache.setAuthen(null);
        userInfo.setState(null).then(() => customHistory.push("/login"));
    }
    return (
        <div className="authen-layout">
            <div className="al-navbar">
                <Container maxWidth={"lg"}>
                    <div  className="al-container">
                        <div className="app-logo">
                            Spa
                        </div>
                        <Button
                            className={"signout-btn"}
                            variant="contained"
                            color="secondary"
                            onClick={signout}
                            startIcon={<ExitToAppIcon />}
                        >
                            Đăng xuất
                        </Button>
                    </div>

                </Container>
            </div>
            <div className="al-content">
                <Container maxWidth={"lg"} className="al-container" style={{position: "relative"}}>
                    {children}
                </Container>

            </div>
        </div>
    );
};
