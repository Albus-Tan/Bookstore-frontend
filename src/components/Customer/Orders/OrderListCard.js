import React from "react";
import {List, Card, Button} from 'antd';

import '../../../css/orderList.css'
import {EllipsisOutlined, PayCircleOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {getOrdersByUserIdAndStatus} from "../../../services/orderService";
import {getCodeByText_ORDERSTATUS, getTextByCode_ORDERSTATUS} from "../../../utils/constant";

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
                listData: data,
            })
        }

        getOrdersByUserIdAndStatus(this.props.status, callback);
    }

    render() {
        const {listData} = this.state;
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
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.order_id}
                        >
                            <List.Item.Meta
                                title={<div><div className="orderListCard-orderID">{`OrderID: ${item.order_id}`}</div><div className="orderListCard-orderStatus">{getTextByCode_ORDERSTATUS(item.status)}</div></div>}
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
                                    <div className="orderListCard-orderButtons">
                                        {
                                            (item.status === getCodeByText_ORDERSTATUS("Cancelled")) ? <></> :
                                                <>
                                                    {
                                                        (item.status === getCodeByText_ORDERSTATUS("Finish")) ? <></> :
                                                            <Button icon={<CloseOutlined />} style={{marginRight:'10px'}}>
                                                                Cancel
                                                            </Button>
                                                    }
                                                    {
                                                        (item.status === getCodeByText_ORDERSTATUS("To Confirm")) ? <Button type="primary" icon={<CheckOutlined />} style={{marginRight:'10px'}}>
                                                            Confirm receipt
                                                        </Button> : <></>
                                                    }
                                                    {
                                                        (item.status === getCodeByText_ORDERSTATUS("Finish")) ? <Button type="primary" disabled icon={<CheckOutlined />} style={{marginRight:'10px'}}>
                                                            Confirmed
                                                        </Button> : <></>
                                                    }
                                                    {
                                                        (item.status === getCodeByText_ORDERSTATUS("Unpaid")) ? <Button type="primary" icon={<PayCircleOutlined />} style={{marginRight:'10px'}}>
                                                            Pay
                                                        </Button> : <Button type="primary" disabled icon={<PayCircleOutlined />} style={{marginRight:'10px'}}>
                                                            Paid
                                                        </Button>
                                                    }
                                                </>
                                        }
                                        <Button icon={<EllipsisOutlined />}>
                                            Detail
                                        </Button>
                                    </div>
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
