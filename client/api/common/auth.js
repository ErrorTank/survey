
import {authenApi, guessApi} from "../api";


export const authApi = {
    login(data){
        return guessApi.post("/auth/login", data)
    },
    auth(){
        return authenApi.get("/auth/check-auth")
    }
};
