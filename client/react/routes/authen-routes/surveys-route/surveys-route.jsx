import React from 'react';
import {useDocumentTitle} from "../../../hooks/use-document-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import {SearchInput} from "../../../common/search-input/search-input";
import {PaginationDataTable} from "../../../common/pagination-data-table/pagination-data-table";
import {customerApi} from "../../../../api/common/customer";
import classnames from "classnames";
import moment from "moment";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContentText from '@material-ui/core/DialogContentText';
import Rating from "@material-ui/lab/Rating";

const columns = [
    {
        key: "customer",
        label: "Mã khách hàng",
        render: row => row.customer.customerID
    },{
        key: "rating",
        label: "Đánh giá",
        render: row => <span className={classnames("rating-count", {
            low: row.rating <= 2,
            avg: row.rating > 2 && row.rating <= 4,
            high: row.rating > 4
        })}>{row.rating}/5</span>,
        sortable: true
    },{
        key: "service",
        label: "Dịch vụ",
        render: row => row.service.name
    },{
        key: "location",
        label: "Cơ sở",
        render: row => row.location.name
    },{
        key: "text",
        label: "Ý kiến",
        render: row => <div className="ellipse-text">{row.text}</div>
    },{
        key: "createdAt",
        label: "Ngày đánh giá",
        render: row => moment(row.createdAt).format("H:mm DD/MM/YYYY"),
        sortable: true
    },
];

const SurveysRoute = () => {
    useDocumentTitle("Danh sách khảo sát");
    const [detail, setDetail] = React.useState(null);
    let [keyword, setKeyword] = React.useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const api = React.useCallback((config) => {
        return customerApi.getCustomerSurveys(config)
    }, [])
    let filter = React.useMemo(() => ({keyword}), [keyword]);
    let handleClickRow = React.useCallback((row) => {
        setDetail(row)
    }, []);




    const handleClose = () => {
        setDetail(null);
    };

    return (
        <AuthenLayout>
            <div className="surveys-route">
                <Dialog
                    className={"survey-modal"}
                    fullScreen={fullScreen}
                    aria-labelledby="confirmation-dialog-title"
                    open={!!detail}
                    fullWidth={true}
                    onClose={() => {
                        setDetail(null);
                    }}
                >
                    <DialogTitle id="confirmation-dialog-title">Chi tiết đánh giá</DialogTitle>
                    <DialogContent dividers>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Mã khách hàng
                            </div>
                            <div className="sir-value highlight">
                                {detail?.customer.customerID}
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Tên khách hàng
                            </div>
                            <div className="sir-value">
                                {detail?.customer.name}
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Số điện thoại
                            </div>
                            <div className="sir-value">
                                {detail?.customer.phone}
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Đánh giá
                            </div>
                            <div className="sir-value highlight">
                                <Rating name="size-large" value={Number(detail?.rating)} size="medium" readOnly />
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Góp ý
                            </div>
                            <div className="sir-value opinion">
                                {detail?.text}
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Dịch vụ
                            </div>
                            <div className="sir-value opinion">
                                {detail?.service.name}
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Cở sở
                            </div>
                            <div className="sir-value opinion">
                                {detail?.location.name}
                            </div>
                        </div>
                        <div className="survey-info-row">
                            <div className="sir-label">
                                Ngày đánh giá
                            </div>
                            <div className="sir-value opinion">
                                {moment(detail?.createdAt).format("H:mm DD/MM/YYYY")}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={() => {
                            setDetail(null);
                        }} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
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
                                    <Grid item xs={12} md={4} lg={3}>
                                        <SearchInput
                                            placeholder={"Tìm kiếm theo Sđt hoặc Mã khách hàng..."}
                                            onChange={keyword => setKeyword(keyword)}
                                        />
                                    </Grid>
                                    {/*<Grid item xs={12} md={4} lg={3}>*/}
                                    {/*    <SearchInput*/}
                                    {/*        placeholder={"Tìm kiếm theo Sđt hoặc Mã khách hàng..."}*/}
                                    {/*        onChange={keyword => setKeyword(keyword)}*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                </Grid>
                            </div>
                            <div className="ctc-table">
                                <PaginationDataTable
                                    filter={filter}
                                    size={8}
                                    api={api}
                                    columns={columns}
                                    onClickRow={handleClickRow}
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