import React from 'react';
import {locationApi} from "../../../../../api/common/location";
import CircularProgress from '@material-ui/core/CircularProgress';
import {userInfo} from "../../../../../lib/states/common";
import {serviceApi} from "../../../../../api/common/service";
import classnames from "classnames";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {StarRating} from "../../../../components/star-rating/star-rating";
import Button from "@material-ui/core/Button";
import {customerApi} from "../../../../../api/common/customer";

export const SurveyStep = ({customer, handleBack, handleNext}) => {
    let [locations, setLocations] = React.useState([]);
    let [services, setServices] = React.useState([]);
    let [loading, setLoading] = React.useState(true);
    let [saving, setSaving] = React.useState(false);
    let [service, setService] = React.useState('');
    let [location, setLocation] = React.useState(userInfo.getState().location);
    let [rating, setRating] = React.useState(5);
    let [fakeRating, setFakeRating] = React.useState(5);
    let [text, setText] = React.useState('');
    React.useEffect(() => {
        Promise.all([locationApi.getLocations(), serviceApi.getServices()])
            .then(([locations, services]) => {
                setLocations(locations);
                setServices(services);
                setLoading(false);
            })
    }, [])

    const handleChangeLocation = (event) => {

        setLocation(locations.find(each => each._id === event.target.value));
    };

    const handleChangeService = (event) => {

        setService(services.find(each => each._id === event.target.value));
    };

    const submit = () => {
        setSaving(true);
        let data = {
            location: location._id,
            service: service._id,
            rating,
            text: text.trim()
        }
        customerApi.submitSurvey(data)
            .then(() => handleNext())
    }

    return (
        <div className="survey-step s-step">
            {loading ? (

                <CircularProgress className="load-location" color={"default"}/>
            ) : (
                <>
                    <div className="s-step-content">

                        <div className="survey-row">
                            <div className="survey-label">Chọn cơ sở</div>
                            <div className="survey-content">
                                <FormControl variant="outlined" style={
                                    {display: "flex"}
                                }>
                                    <InputLabel id="location">Cơ sở</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={location._id}
                                        onChange={handleChangeLocation}
                                        label="Cơ sở"
                                    >
                                        {locations.map(each => (
                                            <MenuItem key={each._id} value={each._id}>{each.name}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                        <div className="survey-row">
                            <div className="survey-label">Chọn dịch vụ</div>
                            <div className="survey-content">
                                <FormControl variant="outlined" style={
                                    {display: "flex"}
                                }>
                                    <InputLabel id="location">Dịch vụ</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={service._id}
                                        onChange={handleChangeService}
                                        label="Cơ sở"
                                    >
                                        {services.map(each => (
                                            <MenuItem key={each._id} value={each._id}>{each.name}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                        <div className="survey-row">

                            <div className="survey-label">Mức độ hài lòng <span className={classnames("rating-count", {
                                low: fakeRating <= 2,
                                avg: fakeRating > 2 && fakeRating <= 4,
                                high: fakeRating > 4
                            })}>{fakeRating}/5</span></div>
                            <div className="survey-content" style={{textAlign: "center"}}>
                                <StarRating
                                    rating={rating}
                                    editable={true}
                                    onChange={rating => setRating(rating)}
                                    onMouseOverStars={rating => setFakeRating(rating)}
                                    onMouseLeaveStars={() => setFakeRating(rating)}
                                />
                            </div>
                        </div>
                        <div className="survey-row">

                            <div className="survey-label-light">Cảm thấy chưa hài lòng với dịch vụ? <span>Hãy đóng góp ý kiến cho chúng tôi.</span>
                            </div>
                            <div className="survey-content">
                                <TextField
                                    label="Ý kiến của bạn"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="s-step-actions">
                        <Button onClick={handleBack} variant="outlined">
                            Quay lại
                        </Button>
                        <Button disabled={!location || !service || saving} style={{marginLeft: "10px"}} onClick={submit} variant="contained" color="primary">
                            Đánh giá <i className="fab fa-telegram-plane"></i>{saving &&
                        <CircularProgress size={20} style={{marginLeft: "10px"}} color="primary"/>}
                        </Button>
                    </div>
                </>
            )}

        </div>
    );
};
