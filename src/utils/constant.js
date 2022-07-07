import {CheckCircleOutlined, CloseCircleOutlined, DeliveredProcedureOutlined, SyncOutlined, WalletOutlined, SaveOutlined} from "@ant-design/icons";
import {Tag} from "antd";
import React from "react";

// 设置常量

// 操作返回值
export const SUCCESS = 0;
export const FAIL = -1;

// Order status
// 订单状态
export const ORDER_STATUS = [
    {value: -1, text: "All",},  // -1 全部
    {value: 0, text: "Unpaid", tag: <Tag icon={<WalletOutlined/>} color="gold">Unpaid</Tag>},  // 0 已下单未付款 UNPAID
    {value: 1, text: "Paid", tag: <Tag icon={<SyncOutlined spin />} color="processing">Paid</Tag>},  // 1 下单已付款 PAID
    {value: 2, text: "Not Yet Shipped", tag: <Tag icon={<DeliveredProcedureOutlined />} color="blue">Delivering</Tag>},  // 2 配送中 ON_SHIP
    {value: 3, text: "To Confirm", tag: <Tag icon={<SaveOutlined />} color="geekblue">To Confirm</Tag>},  // 3 待签收 TO_CONFIRM
    {value: 4, text: "Finish", tag: <Tag icon={<CheckCircleOutlined />} color="green">Completed</Tag>},  // 4 已完成 FINISH
    {value: 5, text: "Cancelled", tag: <Tag icon={<CloseCircleOutlined />} color="error">Cancelled</Tag>},  // 5 已取消 CANCEL
];

export const getTextByCode_ORDERSTATUS = (code) => {
    let text = "STATUS NOT EXIST";
    ORDER_STATUS.map((item)=>{
        if(item.value === code) text = item.text;
    });
    return text;
}

export const getTagByCode_ORDERSTATUS = (code) => {
    let tag = <Tag icon={<CloseCircleOutlined />} color="error">STATUS NOT EXIST</Tag>;
    ORDER_STATUS.map((item)=>{
        if(item.value === code) tag = item.tag;
    });
    return tag;
}

export const getCodeByText_ORDERSTATUS = (text) => {
    let code = -1;
    ORDER_STATUS.map((item)=>{
        if(item.text === text) code = item.value;
    });
    return code;
}

// User status
// 用户状态
export const USER_STATUS_NORMAL = 0; // 0 正常
export const USER_STATUS_BANNED = 1; // 1 被禁用

// User type
// 用户类型
export const  NO_SUCH_USER = -1;
export const  MANAGER = 1;
export const  CUSTOMER = 0;

// 时间格式
export const DATE_FORMAT = "YYYY-MM-DD"
export const SECOND_SUF = " 00:00:00"

// 注册
export const ALREADY_EXIST = -2;

// 未登录
export const NOT_LOGIN = -3;