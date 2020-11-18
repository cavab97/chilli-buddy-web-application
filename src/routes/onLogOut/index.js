import store from "../../redux/store";

import { removeNotificationTokenFromDatabase } from "../../redux/auth/action";

import * as systemAction from "../../redux/system/action";

export default onLogOut = () => {
    return new Promise(async (resolve, reject) => {

        await Promise.all([])
            .then(() => {
                resolve({ status: "success" });
            })
            .catch(error => {
                reject(error);
            });
    });
};
