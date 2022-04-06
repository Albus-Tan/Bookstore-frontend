import React from "react";
import { Input, Space } from 'antd';// import 'https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css'

const { Search } = Input;

const onSearch = value => console.log(value);

export class SearchBar extends React.Component {
    render() {
        return (
            <div style={{float:"right", margin:"25px", paddingRight:"250px"}}>
                <Space direction="vertical">
                    <Search
                        placeholder="Search..."
                        allowClear
                        size="large"
                        enterButton
                        onSearch={onSearch}
                    />
                </Space>
            </div>
        );
    }
}
