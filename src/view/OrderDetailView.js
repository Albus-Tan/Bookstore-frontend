import React from 'react';
import {Card, Layout} from "antd";
import {OrderUserInfoCard} from "../components/Customer/Orders/OrderUserInfoCard";
import {OrderItemListCard} from "../components/Customer/Orders/OrderItemListCard";
import {OrderInfoCard} from "../components/Customer/Orders/OrderInfoCard";
import {OrderOperation} from "../components/Customer/Orders/OrderOperation";
import {HeaderAll} from "../components/Customer/Header/HeaderAll";

import '../css/bookDetail.css'
import {useParams} from "react-router-dom";

const { Header, Content, Footer } = Layout;

export const OrderDetailView = () => {

    const params = useParams();

    return(
        <Layout className="layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
                <HeaderAll />
            </Header>
            <Content>
                <div id="bookdetail-content" style={{width:"65%"}}>
                    <Card title="Order Detail" style={{marginTop:"10px"}}>
                        <OrderInfoCard orderId={params.orderId}/>
                        <OrderUserInfoCard orderId={params.orderId}/>
                        <OrderItemListCard orderId={params.orderId}/>
                        <OrderOperation orderId={params.orderId} status={-1}/>
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
        </Layout>
    );
}
