import React from 'react';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const AuthenLayout = ({children}) => {
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
