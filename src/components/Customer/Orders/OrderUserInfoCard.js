import React from 'react';
import {Card, Descriptions} from "antd";
import {getByOrderId} from "../../../services/orderService";

export class OrderUserInfoCard extends React.Component{

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
        const {orderData} = this.state;
        return (orderData == null) ?
            <Card style={{ marginTop: 16 }} type="inner" title="Consignee information " extra={<a>More</a>} />
            :(
            <Card style={{ marginTop: 16 }} type="inner" title="Consignee information " extra={<a>More</a>}>
                <Descriptions title={orderData.user.name}>
                    <Descriptions.Item label="Telephone">{orderData.user.tel}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {orderData.user.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nickname">
                        {orderData.user.nickname}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        );
    }
}
