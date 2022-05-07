import React from 'react';
import {Card} from "antd";
import '../../../css/orderList.css'
import {getItemsAndTotalByOrderId} from "../../../services/orderService";

export class OrderItemListCard extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            orderItemData: null,
        }
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({
                orderItemData: data,
            })
        }

        getItemsAndTotalByOrderId(this.props.orderId, callback);
    }

    render(){
        const {orderItemData} = this.state;
        return (orderItemData == null) ? <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Items List"
        /> : (
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="Items List"
            >
                {
                    orderItemData.orderItemResultList.map((item)=>(
                        <div className="orderListCard-orderDescription-item">
                            <div className="orderListCard-orderDescription-itemName">{item.name}</div>
                            <div className="orderListCard-orderDescription-itemPrice"> ￥{item.price.toFixed(2)} </div>
                            <div className="orderListCard-orderDescription-itemNum"> ×{item.num} </div>
                        </div>
                    ))
                }
                <div className="orderListCard-orderTotalNum" style={{float:"right", }}>
                    <a style={{color:"black", fontSize:"13px", fontFamily:"Microsoft YaHei", marginRight:'5px'}}>Total:</a>
                    ￥{orderItemData.totalPrice.toFixed(2)}
                </div>
            </Card>
        );
    }
}
