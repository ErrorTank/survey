import React from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import {SearchInput} from "../../../common/search-input/search-input";
import {PaginationDataTable} from "../../../common/pagination-data-table/pagination-data-table";
import {customerApi} from "../../../../api/common/customer";

const columns = [

];

const SurveysRoute = () => {
    useDocumentTitle("Danh sách khảo sát");

    let [keyword, setKeyword] = React.useState("");
    const api = React.useCallback((config) => {
        return customerApi.getCustomerSurveys(config)
    }, [])

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
                        <div className="common-table-container">
                            <div className="ctc-toolbar">
                                <Grid container spacing={3} >
                                    <Grid item xs={12} md={6} lg={4}>
                                        <SearchInput
                                            placeholder={"Tìm kiếm theo Tên, Sđt khách hàng..."}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="ctc-table">
                                <PaginationDataTable
                                    filter={{
                                        keyword
                                    }}
                                    size={10}
                                    api={api}
                                    columns={columns}
                                />
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>

        </AuthenLayout>
    );
};

export default SurveysRoute;