import config from '../utils/config';

import {postRequest_v2} from "../utils/ajax";
import {notification} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import React from "react";
import localStorage from "../utils/localStorage";
import {NOT_LOGIN} from "../utils/constant";

const root = "/cart";
const cartServiceApiUrl = config.apiUrl + root;

export const addCartItem = (book_id, num) => {

    const openAddSuccessNotification = (numInCart) => {
        notification.open({
            message: `Successfully add  ${num}  to cart !`,
            description: numInCart+' this item in cart now, check for other favours',
            icon: <CheckCircleOutlined style={{ color: '#ff8f00' }} />,
            duration: 2,
        });
    };

    const callback = (data) =>{
        if(data >= 0) openAddSuccessNotification(data);
    }

    const user_id = localStorage.getUserId();
    if(user_id === NOT_LOGIN) return;
    console.log("addCartItem uid: ", user_id);

    const data = {user_id: user_id, book_id: book_id, num: num};
    const url = `${cartServiceApiUrl}/add`;
    postRequest_v2(url, data, callback);
};

export const deleteCartItem = (book_id, callback) => {

    const user_id = localStorage.getUserId();
    if(user_id === NOT_LOGIN) return;

    console.log("deleteCartItem uid: ", user_id);

    const data = {user_id: user_id, book_id: book_id};
    const url = `${cartServiceApiUrl}/delete`;
    postRequest_v2(url, data, callback);
};

export const modifyCartItemNum = (book_id, num, callback) => {

    const user_id = localStorage.getUserId();
    if(user_id === NOT_LOGIN) return;
    console.log("modifyCartItemNum uid: ", user_id);

    const data = {user_id: user_id, book_id: book_id, num: num};
    const url = `${cartServiceApiUrl}/modifyNum`;
    postRequest_v2(url, data, callback);
};

export const getAllBooksInUserCart = (callback) => {
    const user_id = localStorage.getUserId();
    if(user_id === NOT_LOGIN) return;

    const data = {user_id: user_id};
    const url = `${cartServiceApiUrl}/getAllBooksInUserCart`;
    postRequest_v2(url, data, callback);
};

export const clearAllBooksInUserCart = (callback) => {
    const user_id = localStorage.getUserId();
    if(user_id === NOT_LOGIN) return;

    const data = {user_id: user_id};
    const url = `${cartServiceApiUrl}/clearAllBooksInUserCart`;
    postRequest_v2(url, data, callback);
};