import React from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const SurveysRoute = () => {
    useDocumentTitle("Danh sách khảo sát");
    let [keyword, setKeyword] = React.useState("");
    return (
        <AuthenLayout>
            <div className="surveys-route">
                <Paper elevation={3}>
                    <div className="route-name">
                        <Typography  variant="h6" id="tableTitle" component="div">
                            Danh sách khảo sát
                        </Typography>
                    </div>
                    <div className="route-body">

                    </div>
                </Paper>
            </div>
        </AuthenLayout>
    );
};

export default SurveysRoute;