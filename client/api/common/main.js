
import {authenApi, guessApi} from "../api";


export const mainApi = {
    login(data){
        return guessApi.post("/login", data)
    },
    submitSurvey(data){
        return authenApi.post("/submit-survey", data)
    }
};
