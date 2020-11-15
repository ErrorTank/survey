
import {authenApi, guessApi} from "../api";


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

};
