
import {authenApi, guessApi} from "../api";


export const serviceApi = {
    getServices(){
        return authenApi.get("/service/all")
    }
};
