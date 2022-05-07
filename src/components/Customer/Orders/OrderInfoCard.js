import React from 'react';
import {Card} from "antd";
import '../../../css/orderList.css'

export class OrderInfoCard extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Card type="inner" title="Order ID: " extra={<div className="orderListCard-orderStatus">Not Yet Shipped</div>}>
                Total num:  2
            </Card>
        );
    }
}
