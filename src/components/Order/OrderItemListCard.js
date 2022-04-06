import React from 'react';
import {Card} from "antd";
import '../../css/orderList.css'

export class OrderItemListCard extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="Items List"
            >
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
                <div className="orderListCard-orderTotalNum" style={{float:"right", marginRight:'-2px'}}>
                    <a style={{color:"black", fontSize:"13px", fontFamily:"Microsoft YaHei", marginRight:'5px'}}>Total:</a>
                    ￥1200
                </div>
            </Card>
        );
    }
}
