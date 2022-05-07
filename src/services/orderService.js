import localStorage from "../utils/localStorage";
import config from "../utils/config";
import {postRequest_v2} from "../utils/ajax";

const root = "/order";
const orderServiceApiUrl = config.apiUrl + root;

export const createOrderFromUserCart = (callback) => {
    // TODO !!!!!!!!! check is authed or not
    const user_id = localStorage.getUserId();
    console.log("createOrderFromUserCart ", user_id);

    const data = {user_id: user_id};
    const url = `${orderServiceApiUrl}/createOrderFromUserCart`;
    postRequest_v2(url, data, callback);
}