import config from '../utils/config';
import localStorage from "../utils/localStorage";
import {message} from "antd";
import {postRequest_v2} from "../utils/ajax";

const root = "/user";
const userServiceApiUrl = config.apiUrl + root;

export const register = (data, callback) => {
    const url = `${userServiceApiUrl}/register`;
    postRequest_v2(url, data, callback);
};

export const login = (username, password, oriCallback) => {

    const data = {username: username, password: password};
    const url = `${userServiceApiUrl}/login`;
    const callback = (data) => {
        if(data.user_id >= 0) {
            localStorage.setUser(data);
            // login success
            message.success("Login Success");
            oriCallback(true);
        }
        else{
            // login fail
            message.error("Login Failed");
            oriCallback(false);
        }
    };

    postRequest_v2(url, data, callback);
};