import React from 'react';
import {Card, Descriptions} from "antd";

export class OrderUserInfoCard extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Card style={{ marginTop: 16 }} type="inner" title="Consignee information: " extra={<a>More</a>}>
                <Descriptions title="User name">
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        );
    }
}
