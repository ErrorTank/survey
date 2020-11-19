import {Cache} from "../cache"
import Cookies from "js-cookie";
import {authApi} from "../../../api/common/auth";
import {userInfo} from "../../states/common";

const cookiesEngine = {
    getItem: Cookies.get,
    setItem: Cookies.set,
    removeItem: Cookies.remove
};


export const authenCache = (() => {
    const cache = new Cache(cookiesEngine);
    const listeners = [];

    const setAuthen = (authen, options) => {

        cache.set(authen, "token", options);
        Promise.all(listeners.map((l) => l(authen)))
    }

    return {
        onChange: (listener) => {
            listeners.push(listener);

            return () => {
                let i = listeners.indexOf(listener);
                listeners.splice(i, 1);
            };
        },
        clearAuthen() {
            setAuthen(null)
        },
        loadAuthen() {
            return new Promise((resolve, reject) => {
                let authen = cache.get("token");
                if (!authen) {
                    reject();
                } else {
                    authApi.auth().then((user) => {
                        if (!user && !user._id) {
                            reject();
                        } else {
                            userInfo.setState(user).then(() => {
                                return resolve();
                            });

                        }
                    }).catch(err => {
                        setAuthen(null)
                    });

                }
            });

        },
        getAuthen() {
            return cache.get("token")
        },
        setAuthen
    }
})();
