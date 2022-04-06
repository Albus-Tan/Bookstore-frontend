import React from 'react';
import {Layout} from 'antd';

import {BookList} from "../components/BookList";
import {HeaderAll} from "../components/HeaderAll";
import {BookDetailCard} from "../components/BookDetailCard"
import {CommentList} from "../components/CommentList";

import '../css/bookDetail.css'

const { Header, Content, Footer } = Layout;

export class BookDetailView extends React.Component{

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
                    <div id="bookdetail-content">
                        <div style={{float:"left"}}>
                            <BookDetailCard />
                            <CommentList />
                        </div>
                        <div  style={{clear:"both", paddingTop:"30px",paddingBottom:"5px"}}>
                            <h2 style={{textAlign:"center", font:"18px",fontFamily:"Arial",fontWeight:"Bold", color:"gray", borderBottom: "1px solid #ff6700"}}>Book Recommendation</h2>
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