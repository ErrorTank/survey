import React from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";

const Survey = () => {
    useDocumentTitle("Khảo sát khách hàng");
    let [mode, setMode] = React.useState(1);
    return (
        <div className="survey">
            <AuthenLayout>

            </AuthenLayout>
        </div>
    );
};

export default Survey;