import React from "react";
import '../../../css/cart.css'

import {CartItem} from "./CartItem";
import { Link } from 'react-router-dom';
import {getAllBooksInUserCart} from "../../../services/cartService";
import {createOrderFromUserCart} from "../../../services/orderService";

export class Cart extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            cartData:[],
            total: 0,
        }
        this.updateCart=this.updateCart.bind(this);
    }

    componentDidMount() {
        this.updateCart();
    }

    updateCart = () => {
        const callback = (data) => {
            console.log("Get Cart data: ", data);
            let total = 0;
            data.map((item) => {
                total = total + Number((item.num * item.book.price).toFixed(2));
            })
            this.setState({cartData: data, total: total,});
        }

        getAllBooksInUserCart(callback);
    }

    handleGenerateOrder = () => {
        const callback = (orderId) => {
            // pass orderId to cartView, and it will navigate to order detail page
            this.props.onOrderGenerate(orderId);
        }
        createOrderFromUserCart(callback);
    }

    render(){
        const {cartData, total} = this.state;
        return (
            <div>
                <div id="car" className="car">
                    <div className="head_row hid">
                        {/*<div className="check left"><i onClick="checkAll()">√</i></div>*/}
                        <div className="img left">&nbsp;&nbsp;Image</div>
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
