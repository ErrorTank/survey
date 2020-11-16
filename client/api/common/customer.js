
import {authenApi, guessApi} from "../api";
import {urlUtils} from "../../lib/utils/url-utils";


export const customerApi = {
    checkCustomer(data){
        return authenApi.post("/customer/check-customer", data)
    },
    createNewCustomer(data){
        return authenApi.post("/customer/create-customer", data)
    },
    submitSurvey(data){
        return authenApi.post("/customer/submit-survey", data)
    },
    getCustomerSurveys(filter){
        let queryString = urlUtils.buildParams(filter);
        return authenApi.get(`/customer/surveys${queryString}`);
    }
};
