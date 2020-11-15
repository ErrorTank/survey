
import {authenApi, guessApi} from "../api";


export const locationApi = {
    getLocations(){
        return authenApi.get("/location/all")
    }
};
