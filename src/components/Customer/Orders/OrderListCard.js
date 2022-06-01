import React from "react";
import {List, Card, Button} from 'antd';

import '../../../css/orderList.css'
import {EllipsisOutlined, PayCircleOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {
    filterOrderByBookName,
    filterOrderByTimeRange,
    getOrdersByUserIdAndStatus
} from "../../../services/orderService";
import {getCodeByText_ORDERSTATUS, getTextByCode_ORDERSTATUS} from "../../../utils/constant";
import {OrderOperation} from "./OrderOperation";

export class OrderListCard extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            listData: null,
        }
    }

    componentDidMount() {
        const callback = (data) => {
            console.log("OrderListCard: ", data);
            this.setState({
                listData: data.reverse(),
            })
        }

        getOrdersByUserIdAndStatus(this.props.status, callback);
    }

    render() {
        const {listData} = this.state;
        const {searchName,dateRange} = this.props;
        return (listData == null) ? (<></>) : (
            <div style={{marginTop:"10px", height:"100%",width:"100%"}}>
                <List
                    itemLayout="vertical"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={filterOrderByTimeRange(filterOrderByBookName(listData,searchName),dateRange)}
                    renderItem={item => (
                        <List.Item
                            key={item.order_id}
                        >
                            <List.Item.Meta
                                title={
                                <div>
                                    <div className="orderListCard-orderID">{`OrderID: ${item.order_id}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.time}</div>
                                    <div className="orderListCard-orderStatus">{getTextByCode_ORDERSTATUS(item.status)}</div>
                                </div>}
                                description={
                                <div>
                                    <Card size={"small"} style={{background:"#f8f8f8", width:"100%", marginTop:"35px"}}>
                                        {
                                            item.orderItemResultList.map((book) => (
                                                <div className="orderListCard-orderDescription-item">
                                                    <div className="orderListCard-orderDescription-itemName">{book.name}</div>
                                                    <div className="orderListCard-orderDescription-itemNum" > ×{book.num} </div>
                                                    <div className="orderListCard-orderDescription-itemPrice" > ￥{book.price.toFixed(2)} </div>
                                                </div>
                                            ))
                                        }
                                    </Card>
                                    <div>
                                        <div className="orderListCard-orderTotalHead">Total:</div>
                                        <div className="orderListCard-orderTotalNum" style={{marginTop:-25}}>
                                            ￥{item.totalPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <OrderOperation status={item.status} orderId={item.order_id}/>
                                </div>
                            }
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
