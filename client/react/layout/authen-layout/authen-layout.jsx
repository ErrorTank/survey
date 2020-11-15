import React from 'react';
import Container from '@material-ui/core/Container';

export const AuthenLayout = ({children}) => {
    return (
        <div className="authen-layout">
            <div className="al-navbar">
                <Container maxWidth={"lg"} className="al-container" style={{position: "relative"}}>
                    <div className="app-logo">
                        Spa
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
