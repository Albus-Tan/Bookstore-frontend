import React from "react";
import '../css/cart.css'

import {CartItem} from "./CartItem";
import { Link } from 'react-router-dom';

export class Cart extends React.Component{

    render(){
        return (
            <div>
                <div id="car" className="car">
                    <div className="head_row hid">
                        <div className="check left"><i onClick="checkAll()">√</i></div>
                        <div className="img left">&nbsp;&nbsp;Select All</div>
                        <div className="name left">Book Name</div>
                        <div className="price left" style={{fontSize:"10px"}}>Price</div>
                        <div className="number left">Amount</div>
                        <div className="subtotal left">Subtotal</div>
                        <div className="ctrl left">Delete</div>
                    </div>
                    <CartItem />
                    <CartItem />
                </div>
                <div id="sum_area">
                    <Link to={'/orderDetail'}><div id="pay">Pay</div></Link>
                    <div id="pay_amout">Total: <span id="price_num">0</span>￥</div>
                </div>

            </div>
        )
    }
}
