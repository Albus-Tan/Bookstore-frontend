import React from 'react';
import {Card, Layout} from "antd";
import {OrderUserInfoCard} from "../components/Order/OrderUserInfoCard";
import {OrderItemListCard} from "../components/Order/OrderItemListCard";
import {OrderInfoCard} from "../components/Order/OrderInfoCard";
import {OrderOperation} from "../components/Order/OrderOperation";
import {HeaderAll} from "../components/HeaderAll";

import '../css/bookDetail.css'

const { Header, Content, Footer } = Layout;

export class OrderDetailView extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
                    <HeaderAll />
                </Header>
                <Content>
                    <div id="bookdetail-content" style={{width:"65%"}}>
                        <Card title="Order Detail" style={{marginTop:"10px"}}>
                            <OrderInfoCard />
                            <OrderUserInfoCard />
                            <OrderItemListCard />
                            <OrderOperation />
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
            </Layout>
        );
    }
}
