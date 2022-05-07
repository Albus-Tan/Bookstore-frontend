import React from 'react';
import {Button, Modal} from "antd";
import {CheckOutlined, CloseOutlined, PayCircleOutlined} from "@ant-design/icons";
import '../../../css/orderList.css'

export class OrderOperation extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            paid: false,
        }
    }

    handlePay = () => {
        let secondsToGo = 3;
        const modal = Modal.success({
            title: 'Order paid successfully!',
            content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `This modal will be destroyed after ${secondsToGo} second.`,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);

        this.setState({paid:true,})
    };

    render(){
        const paid = this.state.paid;
        return paid ? (
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
            </div>
        ) : (
            <div className="orderListCard-orderButtons">
                <Button icon={<CloseOutlined />} style={{marginRight:'10px'}}>
                    Cancel
                </Button>
                <Button type="primary"icon={<PayCircleOutlined />} style={{marginRight:'10px'}} onClick={this.handlePay}>
                    Pay now
                </Button>
            </div>
        );
    }
}
