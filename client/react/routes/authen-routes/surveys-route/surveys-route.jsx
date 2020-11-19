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
import StarIcon from '@material-ui/icons/Star';
import moment from "moment";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContentText from '@material-ui/core/DialogContentText';
import Rating from "@material-ui/lab/Rating";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {locationApi} from "../../../../api/common/location";
import {serviceApi} from "../../../../api/common/service";
const ratingMatch = {
    1: "Chưa tốt",
    2: "Tạm ổn",
    3: "Hài lòng",
    4: "Rất hài lòng"
}
const columns = [
    {
        key: "customer",
        label: "Mã khách hàng",
        render: row => row.customer.customerID
    }, {
        key: "rating",
        label: "Đánh giá",
        render: row => <span className={classnames("rating-count")}>{ratingMatch[row.rating]}</span>,
        sortable: true
    }, {
        key: "service",
        label: "Dịch vụ",
        render: row => row.service.name
    }, {
        key: "location",
        label: "Cơ sở",
        render: row => row.location.name
    }, {
        key: "text",
        label: "Ý kiến",
        render: row => <div className="ellipse-text">{row.text}</div>
    }, {
        key: "createdAt",
        label: "Ngày đánh giá",
        render: row => moment(row.createdAt).format("H:mm DD/MM/YYYY"),
        sortable: true
    },
];

const SurveysRoute = () => {
    useDocumentTitle("Danh sách khảo sát");
    const [detail, setDetail] = React.useState(null);
    let [loading, setLoading] = React.useState(false);
    let [keyword, setKeyword] = React.useState("");
    let [rating, setRating] = React.useState(0);
    let [location, setLocation] = React.useState({_id: 1, name: "Tất cả"});
    let [service, setService] = React.useState({_id: 1, name: "Tất cả"});
    let [locations, setLocations] = React.useState([]);
    let [services, setServices] = React.useState([]);
    React.useEffect(() => {
        Promise.all([locationApi.getLocations(), serviceApi.getServices()])
            .then(([locations, services]) => {
                setLocations([{_id: 1, name: "Tất cả"}].concat(locations));
                setServices([{_id: 1, name: "Tất cả"}].concat(services));
                setLoading(false);
            })
    }, [])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const api = React.useCallback(({ service, location, ...rest}) => {
        return customerApi.getCustomerSurveys({service: service._id, location: location._id, ...rest})
    }, [])
    let filter = React.useMemo(() => ({keyword, rating, service, location}), [keyword, rating, service, location]);
    let handleClickRow = React.useCallback((row) => {
        setDetail(row)
    }, []);

    console.log(location)
    const handleChangeLocation = (event) => {

        setLocation(locations.find(each => each._id === event.target.value));
    };

    const handleChangeService = (event) => {

        setService(services.find(each => each._id === event.target.value));
    };

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
                                <span className={classnames("rating-count")}>{ratingMatch[detail?.rating]}</span>
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
                        <Typography variant="h6" id="tableTitle" component="div">
                            Danh sách khảo sát
                        </Typography>
                    </div>
                    <div className="route-body">
                        <div className="common-table-container">
                            <div className="ctc-toolbar">

                                <Grid container  alignItems={"center"}>
                                    <Grid item xs={12} md={4} lg={3} className={"search"}>
                                        <SearchInput
                                            placeholder={"Tìm kiếm theo Sđt hoặc Mã khách hàng..."}
                                            onChange={keyword => setKeyword(keyword)}
                                        />
                                    </Grid>



                                </Grid>
                                <div style={{marginTop: "12px"}}>
                                    {!loading && (
                                        <Grid spacing={2} alignItems={"center"}
                                              justify={"flex-start"} container>
                                            <Grid item xs={6} sm={4}>
                                                <FormControl variant="outlined" fullWidth size={'small'}>
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Đánh giá
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={rating}
                                                        renderValue={value => {

                                                            return ((value === 0 ) ? "Tất cả" : <span>{ratingMatch[each]}</span>)
                                                        }}
                                                        onChange={e => setRating(e.target.value)}
                                                        label="Đánh giá"
                                                    >
                                                        {[0, 1,2,3,4].map(each => (
                                                            <MenuItem key={each}
                                                                      value={each}>{each === 0 ? "Tất cả" : <span>{ratingMatch[each]}</span>}</MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <FormControl variant="outlined" fullWidth size={'small'}>
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Cơ sở
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={location._id}
                                                        onChange={handleChangeLocation}
                                                        label="Cơ sở"
                                                    >
                                                        {locations.map(each => (
                                                            <MenuItem key={each._id}
                                                                      value={each._id}>{each.name}</MenuItem>
                                                        ))}


                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormControl variant="outlined" fullWidth size={'small'}>
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Dịch vụ
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={service._id}
                                                        onChange={handleChangeService}
                                                        label="Cơ sở"
                                                    >
                                                        {services.map(each => (
                                                            <MenuItem key={each._id}
                                                                      value={each._id}>{each.name}</MenuItem>
                                                        ))}


                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" fullWidth size={'small'}>
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Dịch vụ
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={service._id}
                                                        onChange={handleChangeService}
                                                        label="Cơ sở"
                                                    >
                                                        {services.map(each => (
                                                            <MenuItem key={each._id}
                                                                      value={each._id}>{each.name}</MenuItem>
                                                        ))}


                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    )}
                                </div>
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