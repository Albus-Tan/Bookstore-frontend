import localStorage from "localStorage";
import {message} from "antd";
import {NOT_LOGIN} from "./constant";

export default {
    hasLogin(){
        return localStorage.hasOwnProperty('user');
    },
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    },
    clearUser() {
        localStorage.removeItem("user");
    },
    getUserId() {
        if(!localStorage.hasOwnProperty('user')){
            console.log("localStorage.getUserId(): Not login!!!")
            message.warning('Please log in first !');
            return NOT_LOGIN;
        } else {
            return JSON.parse(localStorage.getItem("user")).user_id;
        }
    },
}

