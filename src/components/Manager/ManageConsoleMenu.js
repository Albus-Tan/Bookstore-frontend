import React from "react";
import '../../css/head.css'
import { Menu } from "antd";
import {
    BookOutlined,
    ContainerOutlined,
    PieChartOutlined,
    ReadOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export class ManageConsoleMenu extends React.Component {
    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={[this.props.selectedKey]} mode="inline">
                <Menu.Item key="1" icon={<BookOutlined />}>
                    <Link to="/bookManage">Books Management</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<TeamOutlined />}>
                    <Link to="/userManage">User Management</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<PieChartOutlined />} title="Statistic analysis">
                    <Menu.Item key="3" icon={<ReadOutlined />}>Book sales</Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>User consume</Menu.Item>
                </SubMenu>
                <Menu.Item key="5" icon={<ContainerOutlined />}>
                    <Link to="/orderManage">Orders Management</Link>
                </Menu.Item>
            </Menu>
        );
    }
}