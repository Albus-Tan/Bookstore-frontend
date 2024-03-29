import React from "react";
import '../css/manageConsolePage.css'

import { Layout, Breadcrumb, Button } from 'antd';
import {
    LogoutOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import {ManageConsoleMenu} from "../components/Manager/ManageConsoleMenu";
import {BooksManagementEditableTable} from "../components/Manager/Books/BooksManagementEditableTable";
import {AnalysisBookSales} from "../components/Manager/Analysis/AnalysisBookSales";

const { Header, Content, Footer, Sider } = Layout;

export class AnalysisBookSalesView extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <ManageConsoleMenu selectedKey={'1'} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <h1 style={{ paddingLeft:'20px', fontSize:'20px', fontWeight:"Bold", float:"left" }}>Bookstore Manage Console</h1>
                        <Link to={"/login"}><Button  icon={<LogoutOutlined />} style={{float:"right", marginTop:"1%", marginRight:"1%"}}>Log out</Button></Link>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ marginTop: '25px', marginLeft:'5px' }}>
                            <Breadcrumb.Item>Manage Console</Breadcrumb.Item>
                            <Breadcrumb.Item>Statistic analysis</Breadcrumb.Item>
                            <Breadcrumb.Item>Book Sales</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background">
                            <div className="site-layout-container">
                                <AnalysisBookSales/>
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Bookstore Manage Console ©2022 Created by Albus Tan</Footer>
                </Layout>
            </Layout>
        );
    }
}


