import React from 'react';
import {Layout} from 'antd';

import {BookList} from "../components/Customer/BookList";
import {HeaderAll} from "../components/Customer/Header/HeaderAll";
import {BookDetailCard} from "../components/Customer/BookDetail/BookDetailCard"
import {CommentList} from "../components/Customer/CommentList";

import {useParams} from "react-router-dom";

import '../css/bookDetail.css'

const { Header, Content, Footer } = Layout;

export const BookDetailView = () => {

    const params = useParams();

    return <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
            <HeaderAll />
        </Header>
        <Content>
            <div id="bookdetail-content">
                <div style={{float:"left"}}>
                    <BookDetailCard id={params.id}/>
                    <CommentList />
                </div>
                <div  style={{clear:"both", paddingTop:"30px",paddingBottom:"5px"}}>
                    <h2 style={{textAlign:"center", font:"18px",fontFamily:"Arial",fontWeight:"Bold", color:"gray", borderBottom: "1px solid #ff6700"}}>Book Recommendation</h2>
                </div>
                <BookList />
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
    </Layout>;
}

// export default withRouter(MainPageView);