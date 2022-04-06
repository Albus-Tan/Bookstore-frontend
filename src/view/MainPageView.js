import React from 'react';
import {Layout} from 'antd';

import '../css/mainPage.css'

import {HeaderAll} from "../components/HeaderAll";
import {BookCarousel} from "../components/BookCarousel";
import {BestSellerList} from "../components/BestSellerList";
import {BookList} from "../components/BookList";

const { Header, Content, Footer } = Layout;

export class MainPageView extends React.Component{

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
                    <div id="mainpage-content">
                        <div id="mainpage-recommend">
                            <BookCarousel />
                            <BestSellerList />
                        </div>
                        <div style={{paddingLeft:"8px"}}>
                            <h2 style={{font:"16px",fontFamily:"Arial",fontWeight:"Bold", color:"gray", borderBottom: "1px solid #ff6700"}}>Book Recommendation</h2>
                        </div>
                        <BookList />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
            </Layout>
        );
    }
}

// export default withRouter(MainPageView);