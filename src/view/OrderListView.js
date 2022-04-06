import React from 'react';
import {Layout, Select, Input} from 'antd';

import {BookList} from "../components/BookList";
import {HeaderAll} from "../components/HeaderAll";
import {OrderList} from "../components/OrderList";
import '../css/orderList.css'
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Search } = Input;

export class OrderListView extends React.Component{

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
                    <div id="orderlist-content">
                        <div className="orderListCard-orderHead">
                            <h2 style={{fontSize: "30px", color : "#696969", fontFamily : "Arial", fontWeight:"Bold", float:"left"}}>My orders</h2>
                            <Select defaultValue="All" style={{ width: "160px", margin:"5px",paddingLeft:"30px", paddingTop:"2px", float:"left"}}>
                                <Option value="All">All</Option>
                                <Option value="Last 3 month">Last 3 month</Option>
                                <Option value="Last 6 month">Last 6 month</Option>
                                <Option value="Last year">Last year</Option>
                            </Select>
                            <Search placeholder="Search by book name..." allowclear style={{ width: "250px", margin:"5px",paddingLeft:"10px", paddingTop:"2px" }} />
                        </div>
                        <OrderList />
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
}

// export default withRouter(OrderListView);