// 设置常量

// 操作返回值
export const SUCCESS = 0;
export const FAIL = -1;

// Order status
// 订单状态
export const ORDER_STATUS = [
    {value: -1, text: "All"},  // -1 全部
    {value: 0, text: "Unpaid"},  // 0 已下单未付款 UNPAID
    {value: 1, text: "Paid"},  // 1 下单已付款 PAID
    {value: 2, text: "Not Yet Shipped"},  // 2 配送中 ON_SHIP
    {value: 3, text: "To Confirm"},  // 3 待签收 TO_CONFIRM
    {value: 4, text: "Finish"},  // 4 已完成 FINISH
    {value: 5, text: "Cancelled"},  // 5 已取消 CANCEL
];

export const getTextByCode_ORDERSTATUS = (code) => {
    let text = "STATUS NOT EXIST";
    ORDER_STATUS.map((item)=>{
        if(item.value === code) text = item.text;
    });
    return text;
}

export const getCodeByText_ORDERSTATUS = (text) => {
    let code = -1;
    ORDER_STATUS.map((item)=>{
        if(item.text === text) code = item.value;
    });
    return code;
}