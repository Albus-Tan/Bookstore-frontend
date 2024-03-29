import React from 'react';
import {Layout} from 'antd';

import {BookList} from "../components/Customer/BookList";
import {HeaderAll} from "../components/Customer/Header/HeaderAll";
import {Cart} from "../components/Customer/Cart/Cart";

import '../css/cartPage.css'
import {useNavigate} from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const CartView = () => {

    let navigate = useNavigate();

    const generateOrderCallback = (orderId) => {
        console.log("CartView orderId: " , orderId);
        // 跳转到对应订单详情页
        navigate(`/orderDetail/${orderId}`);
    }

    return(
        <Layout className="layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
                <HeaderAll />
            </Header>
            <Content>
                <div id="cart-content">
                    <h2 style={{fontSize: "30px", color : "#696969", fontFamily : "Arial", fontWeight:"Bold", borderBottom: "1px solid #ff6700"}}>My cart</h2>
                    <Cart onOrderGenerate={generateOrderCallback}/>
                    <div style={{paddingTop:"30px",paddingBottom:"5px"}}>
                        <h2 style={{textAlign:"center", fontSize:"30px",fontFamily:"Arial",fontWeight:"Bold", color:"gray", borderBottom: "2px solid #ff6700"}}>Book Recommendation</h2>
                    </div>
                    <BookList />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
        </Layout>
    );
}
