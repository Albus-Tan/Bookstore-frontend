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

export const getByOrderId = (order_id, callback) => {
    const data = {order_id: order_id};
    const url = `${orderServiceApiUrl}/getByOrderId`;
    postRequest_v2(url, data, callback);
}

export const getOrderStatusById = (order_id, callback) => {
    const data = {order_id: order_id};
    const url = `${orderServiceApiUrl}/getOrderStatusById`;
    postRequest_v2(url, data, callback);
}

export const getItemsAndTotalByOrderId = (order_id, callback) => {
    const data = {order_id: order_id};
    const url = `${orderServiceApiUrl}/getItemsAndTotalByOrderId`;
    postRequest_v2(url, data, callback);
}

export const getOrdersByUserIdAndStatus = (status, callback) => {
    // TODO !!!!!!!!! check is authed or not
    const user_id = localStorage.getUserId();

    const data = {status: status, user_id: user_id};
    const url = `${orderServiceApiUrl}/getByUserIdAndStatus`;
    postRequest_v2(url, data, callback);
}

export const changeOrderStatusById = (order_id, status, callback) => {
    const data = {order_id: order_id, status: status};
    const url = `${orderServiceApiUrl}/changeOrderStatusById`;
    postRequest_v2(url, data, callback);
}