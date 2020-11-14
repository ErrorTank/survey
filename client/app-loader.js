
import {authenApi} from "./api/api";
import Cookies from "js-cookie";
import {Cache} from "./lib/cache";

const cookiesEngine = {
    getItem: Cookies.get,
    setItem: Cookies.set,
    removeItem: Cookies.remove
};
export const appCred = new Cache(cookiesEngine);
export const appLoader = {
    init() {


        authenApi.addHeader("Authorization", () => {
            let token = appCred.get("token");
            return token ? `Bearer ${token}` : null;
        });

        appCred.set(null, "token");
        return Promise.resolve();

    }
};
