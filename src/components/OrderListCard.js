import React from "react";
import {List, Card, Button} from 'antd';

import '../css/orderList.css'
import {EllipsisOutlined, PayCircleOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";

const listData = [];
for (let i = 0; i < 12; i++) {
    listData.push({
       /* href: ,*/
        orderID: <div className="orderListCard-orderID">OrderID: 12344333</div>,
        orderStatus: <div className="orderListCard-orderStatus">Not Yet Shipped</div>,
        description:
            <Card size={"small"} style={{background:"#f8f8f8", width:"100%", marginTop:"35px"}}>
                <div className="orderListCard-orderDescription-item">
                    <div className="orderListCard-orderDescription-itemName">Book name 1</div>
                    <div className="orderListCard-orderDescription-itemNum"> ×1 </div>
                    <div className="orderListCard-orderDescription-itemPrice"> ￥200 </div>
                </div>
                <div className="orderListCard-orderDescription-item">
                    <div className="orderListCard-orderDescription-itemName">Book name 1</div>
                    <div className="orderListCard-orderDescription-itemNum"> ×1 </div>
                    <div className="orderListCard-orderDescription-itemPrice"> ￥200 </div>
                </div>
                <div className="orderListCard-orderDescription-item">
                    <div className="orderListCard-orderDescription-itemName">Book name 1</div>
                    <div className="orderListCard-orderDescription-itemNum"> ×1 </div>
                    <div className="orderListCard-orderDescription-itemPrice"> ￥200 </div>
                </div>
            </Card>,
        payButton:
            <div className="orderListCard-orderButtons">

                <Button icon={<CloseOutlined />} style={{marginRight:'10px'}}>
                    Cancel
                </Button>
                <Button type="primary" icon={<CheckOutlined />} style={{marginRight:'10px'}}>
                    Confirm receipt
                </Button>
                <Button type="primary" disabled icon={<PayCircleOutlined />} style={{marginRight:'10px'}}>
                    Paid
                </Button>
                <Button icon={<EllipsisOutlined />}>
                    Detail
                </Button>
            </div>,
        orderTotal:
            <div>
                <div className="orderListCard-orderTotalHead">Total:</div>
                <div className="orderListCard-orderTotalNum">
                    ￥1200
                </div>
            </div>
        ,
    });
}

export class OrderListCard extends React.Component{
    render() {
        return (
            <div style={{marginTop:"10px", height:"100%",width:"100%"}}>
                <List
                    itemLayout="vertical"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={listData}

                    renderItem={item => (
                        <List.Item
                            key={item.orderID}
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.orderID}{item.orderStatus}</a>}
                                description={<div>{item.description}{item.orderTotal}{item.payButton}</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
