import React from 'react';
import {Layout} from 'antd';

import {HeaderAll} from "../components/Customer/Header/HeaderAll";
import '../css/bookDetail.css'
import {BookConsumeAnalysis} from "../components/Customer/Analysis/BookConsumeAnalysis";

const { Header, Content, Footer } = Layout;

export class BookConsumeAnalysisView extends React.Component{

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

                        <BookConsumeAnalysis/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
            </Layout>
        );
    }
}

// export default withRouter(MainPageView);