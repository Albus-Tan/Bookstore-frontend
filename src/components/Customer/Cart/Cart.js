import React from "react";
import '../../../css/cart.css'

import {CartItem} from "./CartItem";
import { Link } from 'react-router-dom';
import {Decimal} from 'decimal.js'
import {getAllBooksInUserCart} from "../../../services/cartService";
import {createOrderFromUserCart} from "../../../services/orderService";
import {message} from "antd";
import {NOT_LOGIN, SUCCESS} from "../../../utils/constant";
import config from "../../../utils/config";
import localStorage from "../../../utils/localStorage";
import webSocket from "../../../utils/webSocket";

export class Cart extends React.Component{

    socket = null

    constructor(props) {
        super(props);
        this.state={
            cartData:[],
            total: 0,
            webSocketHadOpen: false,
            //重试次数
            websocketConnectedCount: 0,
        }
        this.updateCart=this.updateCart.bind(this);
    }

    openWebSocket = () => {

        console.log("start to openWebSocket");
        let head = config.websocketUrl;
        const user_id = localStorage.getUserId();
        if(user_id === NOT_LOGIN) {
            console.log("openWebSocket failed: haven't login");
            return;
        }
        let url =  head + "/websocket/" + user_id;

        console.log(url);

        this.socket = new webSocket(url, this.onmessageCallback);

        //重试创建socket连接
        try {
            this.socket.connection();
        } catch (e) {
            console.log(e);
            // 捕获异常，防止js error
        }
        this.setState({
            webSocketHadOpen: true,
        })
    };

    onmessageCallback = (msg) => {
        console.log(msg);
        console.log("WebSocket onmessageCallback msg: " + msg.data);
        // pass orderId to cartView, and it will navigate to order detail page
        message.success("订单创建成功，order id " + msg.data)
        this.props.onOrderGenerate(Number(msg.data));
    }

    closeWebSocket = () => {

        if (this.state.webSocketHadOpen === true){
            this.socket.closeSocket();
            console.log("closeWebSocket success");
        }
    };


    componentDidMount() {
        this.updateCart();
        this.openWebSocket();
    }

    componentWillUnmount() {
        this.closeWebSocket();
    }

    updateCart = () => {
        const callback = (data) => {
            console.log("Get Cart data: ", data);
            let total = new Decimal(0);
            data.map((item) => {
                let p = new Decimal(item.num).mul(new Decimal(item.book.price))
                total = total.add(p);
            })
            this.setState({cartData: data, total: total,});
        }

        getAllBooksInUserCart(callback);
    }

    handleGenerateOrder = () => {
        // const callback = (orderId) => {
        //     // pass orderId to cartView, and it will navigate to order detail page
        //     this.props.onOrderGenerate(orderId);
        // }

        const callback = (res) => {
            if(res === SUCCESS) message.success("订单请求已发送");
        }

        const cartData = this.state.cartData;
        let legal = true;
        cartData.map((ci)=>{
            if(ci.book.inventory < ci.num){
                legal = false;
                message.error(`${ci.book.name}库存量${ci.book.inventory}本，不足购买量！`)
            }
        })
        if(legal) createOrderFromUserCart(callback);
    }

    render(){
        const {cartData, total} = this.state;
        return (
            <div>
                <div id="car" className="car">
                    <div className="head_row hid">
                        {/*<div className="check left"><i onClick="checkAll()">√</i></div>*/}
                        <div className="img left">&nbsp;&nbsp;&nbsp;&nbsp;Image</div>
                        <div className="name left">Book Name</div>
                        <div className="price left" style={{fontSize:"10px"}}>Price</div>
                        <div className="number left">Amount</div>
                        <div className="subtotal left">Subtotal</div>
                        <div className="ctrl left">Delete</div>
                    </div>
                    {
                        cartData.map((cartItem)=><CartItem cartItem={cartItem} onChange={this.updateCart.bind(this)}/>)
                    }
                </div>
                <div id="sum_area">
                    <div id="pay" onClick={()=>this.handleGenerateOrder()}>Pay</div>
                    <div id="pay_amout">Total: <span id="price_num">{total.toFixed(2)}</span>￥</div>
                </div>

            </div>
        )
    }
}
