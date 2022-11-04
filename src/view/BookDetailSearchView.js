import React from "react";
import {Layout} from "antd";
import {HeaderAll} from "../components/Customer/Header/HeaderAll";
import {BookDetailSearchTable} from "../components/Customer/Search/BookDetailSearchTable";

const { Header, Content, Footer } = Layout;

export class BookDetailSearchView extends React.Component{

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
                        <div  style={{clear:"both", paddingTop:"30px",paddingBottom:"5px",}}>
                            <h1 style={{textAlign:"left", fontSize:"28px",fontFamily:"Arial",fontWeight:"Bold", color:"gray", borderBottom: "1px solid #ff6700"}}>Detail Search</h1>
                        </div>
                        <BookDetailSearchTable/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bookstore ©2022 Created by Albus Tan</Footer>
            </Layout>
        );
    }
}