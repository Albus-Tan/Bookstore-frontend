import React from 'react';
import {Card, Descriptions} from "antd";
import '../../../css/orderList.css'
import {getByOrderId} from "../../../services/orderService";
import {getTextByCode_ORDERSTATUS} from "../../../utils/constant";

export class OrderInfoCard extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            orderData: null,
        }
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({
                orderData: data,
            })
        }
        getByOrderId(this.props.orderId, callback);
    }

    render(){
        const {orderId} = this.props;
        const {orderData} = this.state;
        return (orderData == null) ?
            <Card type="inner" title={`Order ID: ${orderId}`} />
            :(
            <Card type="inner" title="Order Info" extra={<div className="orderListCard-orderStatus">{getTextByCode_ORDERSTATUS(orderData.status)}</div>}>
                <Descriptions title={`Order ID: ${orderData.order_id}`}>
                    <Descriptions.Item label="Order time">
                        {orderData.time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Item num">{orderData.num}</Descriptions.Item>
                </Descriptions>
            </Card>
        );
    }
}
