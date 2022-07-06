import config from '../utils/config';
import localStorage from "../utils/localStorage";
import {message} from "antd";
import {postRequest_v2, postRequestNoPara} from "../utils/ajax";
import {CUSTOMER, USER_STATUS_BANNED, USER_STATUS_NORMAL} from "../utils/constant";

const root = "/user";
const userServiceApiUrl = config.apiUrl + root;

export const register = (_data, callback) => {
    const url = `${userServiceApiUrl}/register`;
    const data = {user_type:CUSTOMER, ..._data};
    console.log("register data",data);
    postRequest_v2(url, data, callback);
};

export const login = (username, password, oriCallback) => {

    const data = {username: username, password: password};
    const url = `${userServiceApiUrl}/login`;
    const callback = (data) => {
        if(data.user_id >= 0) {
            if(data.user_status === USER_STATUS_NORMAL){
                localStorage.setUser(data);
                // login success
                message.success("Login Success");
                oriCallback(true, data.user_type);
            } else {
                if(data.user_status === USER_STATUS_BANNED){
                    // banned
                    message.error("You are BANNED ! Login Failed");
                    oriCallback(false, data.user_type);
                }
            }

        }
        else{
            // login fail
            message.error("Login Failed, wrong username or password");
            oriCallback(false, data.user_type);
        }
    };

    postRequest_v2(url, data, callback);
};

export const getAllUsers = (callback) => {
    const url = `${userServiceApiUrl}/getAll`;
    postRequestNoPara(url,callback);
}

export const modifyUserStatusById = (user_id, user_status, callback) => {
    const url = `${userServiceApiUrl}/modifyStatusById`;
    const data = {user_id: user_id, user_status: user_status};
    postRequest_v2(url, data, callback);
}