
import {authenApi, guessApi} from "../api";


export const authApi = {
    login(data){
        return guessApi.post("/login", data)
    },
    auth(){
        return authenApi.get("/auth")
    }
};
