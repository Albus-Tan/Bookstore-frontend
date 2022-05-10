import React from 'react';
import {Button, Modal} from "antd";
import {CheckOutlined, CloseOutlined, EllipsisOutlined, PayCircleOutlined} from "@ant-design/icons";
import '../../../css/orderList.css'
import {changeOrderStatusById, getOrderStatusById} from "../../../services/orderService";
import {getCodeByText_ORDERSTATUS, SUCCESS} from "../../../utils/constant";

export class OrderOperation extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            paid: false,
            status: this.props.status,
        }
    }

    componentDidMount() {

        const callback = (status) => {
            this.setState({
                status: status,
            })
        }

        if(this.state.status === -1){
            getOrderStatusById(this.props.orderId, callback);
        }
    }


    handlePay = () => {
        const callback = (res) => {
            if(res === SUCCESS) {
                this.handlePaySuccess();
            }
            else this.handlePayFail();
        }

        changeOrderStatusById(this.props.orderId, getCodeByText_ORDERSTATUS("Paid"), callback);
    }

    handlePayFail = () => {
        let secondsToGo = 3;
        const modal = Modal.error({
            title: 'Order pay FAILED, please try again later !',
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
    }

    handlePaySuccess = () => {
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

        this.setState({status: getCodeByText_ORDERSTATUS("Paid"),})
    };

    render(){
        const {status} = this.state;
        return (status === -1) ? <></> : (
            <div className="orderListCard-orderButtons">
                {
                    (status === getCodeByText_ORDERSTATUS("Cancelled")) ? <></> :
                        <>
                            {
                                (status === getCodeByText_ORDERSTATUS("Finish")) ? <></> :
                                    <Button icon={<CloseOutlined />} style={{marginRight:'10px'}}>
                                        Cancel
                                    </Button>
                            }
                            {
                                (status === getCodeByText_ORDERSTATUS("To Confirm")) ? <Button type="primary" icon={<CheckOutlined />} style={{marginRight:'10px'}}>
                                    Confirm receipt
                                </Button> : <></>
                            }
                            {
                                (status === getCodeByText_ORDERSTATUS("Finish")) ? <Button type="primary" disabled icon={<CheckOutlined />} style={{marginRight:'10px'}}>
                                    Confirmed
                                </Button> : <></>
                            }
                            {
                                (status === getCodeByText_ORDERSTATUS("Unpaid")) ? <Button type="primary" icon={<PayCircleOutlined />} style={{marginRight:'10px'}} onClick={this.handlePay}>
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
        );
        // return paid ? (
        //     <div className="orderListCard-orderButtons">
        //         <Button icon={<CloseOutlined />} style={{marginRight:'10px'}}>
        //             Cancel
        //         </Button>
        //         <Button type="primary" disabled icon={<PayCircleOutlined />} style={{marginRight:'10px'}}>
        //             Paid
        //         </Button>
        //     </div>
        // ) : (
        //     <div className="orderListCard-orderButtons">
        //         <Button icon={<CloseOutlined />} style={{marginRight:'10px'}}>
        //             Cancel
        //         </Button>
        //         <Button type="primary"icon={<PayCircleOutlined />} style={{marginRight:'10px'}} onClick={this.handlePay}>
        //             Pay now
        //         </Button>
        //     </div>
        // );
    }
}
