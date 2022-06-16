import localStorage from "../utils/localStorage";
import config from "../utils/config";
import {postRequest_v2, postRequestNoPara} from "../utils/ajax";
import moment from "moment";
import {SECOND_SUF} from "../utils/constant";

const root = "/order";
const orderServiceApiUrl = config.apiUrl + root;

export const filterOrderByTimeRange = (data, dateRange) => {
    if(dateRange === [ "", "" ]) return data;
    if(dateRange[0] === "" && dateRange[1] === "") return data;
    if(dateRange[0] === "") {
        const end = moment(dateRange[1]).add(1,'days');
        console.log(end);
        const newData =  data.filter((or)=>{
            if(moment(or.time).isBefore(end)) return or;
        })
        console.log("filterOrderByTimeRange ",newData);
        return newData;
    }
    if(dateRange[1] === "") {
        const start = moment(dateRange[0]);
        console.log(start);
        const newData =  data.filter((or)=>{
            if(moment(or.time).isAfter(start)) return or;
        })
        console.log("filterOrderByTimeRange ",newData);
        return newData;
    }
    const start = moment(dateRange[0]);
    const end = moment(dateRange[1]).add(1,'days');
    console.log(start,end);
    const newData =  data.filter((or)=>{
        if(moment(or.time).isBetween(start,end)) return or;
    })
    console.log("filterOrderByTimeRange ",newData);
    return newData;
}

export const filterOrderByBookName = (data, name) => {
    if(name === "") return data;
    const needle = name.toLowerCase();
    const newData =  data.filter((or)=>{
        let hasName = false;
        or.orderItemResultList.map((oi)=>{
            if(oi.name.toString().toLowerCase().indexOf(needle) > -1) hasName = true;
        })
        if(hasName) return or;
    })
    console.log("filterOrderByBookName ",newData);
    return newData;
}

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

export const getAllOrders = (callback) => {
    const url = `${orderServiceApiUrl}/getAllOrders`;
    postRequestNoPara(url, callback);
}

export const getAllOrdersWithItems = (callback) => {
    const url = `${orderServiceApiUrl}/getAllOrdersWithItems`;
    postRequestNoPara(url, callback);
}

export const analysisBookSales = (startDate, endDate, callback) => {
    const url = `${orderServiceApiUrl}/analysisBookSales`;
    console.log("analysisBookSales startDate, endDate",startDate, endDate);
    if(startDate === "" && endDate === ""){
        postRequestNoPara(url, callback);
    } else {
        const data = {startDate:startDate + SECOND_SUF, endDate:endDate + SECOND_SUF};
        postRequest_v2(url, data, callback);
    }
}

export const analysisUserConsume = (startDate, endDate, callback) => {
    const url = `${orderServiceApiUrl}/analysisUserConsume`;
    console.log("analysisUserConsume startDate, endDate",startDate, endDate);
    if(startDate === "" && endDate === ""){
        postRequestNoPara(url, callback);
    } else {
        const data = {startDate:startDate + SECOND_SUF, endDate:endDate + SECOND_SUF};
        postRequest_v2(url, data, callback);
    }
}

export const getUserConsumeResultByUserId = (startDate, endDate, callback) => {
    const url = `${orderServiceApiUrl}/getUserConsumeResultByUserId`;
    console.log("getUserConsumeResultByUserId startDate, endDate", startDate, endDate);
    // TODO !!!!!!!!! check is authed or not
    const user_id = localStorage.getUserId();
    if(startDate === "" && endDate === ""){
        const data = {user_id: user_id,};
        console.log("startDate === \"\" && endDate === \"\", uid", user_id);
        postRequest_v2(url, data, callback);
    } else {
        const data = {user_id: user_id, startDate:startDate + SECOND_SUF, endDate:endDate + SECOND_SUF};
        console.log("uid", user_id);
        postRequest_v2(url, data, callback);
    }
}
