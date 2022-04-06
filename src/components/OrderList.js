import React from 'react';
import { Tabs } from 'antd';

import '../css/orderList.css'
import {OrderListCard} from "./OrderListCard";
const { TabPane } = Tabs;

export class OrderList extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="All Orders" key="1">
                        <OrderListCard />
                    </TabPane>
                    <TabPane tab="Unpaid Orders" key="2">
                        <OrderListCard />
                    </TabPane>
                    <TabPane tab="Not Yet Shipped" key="3">
                        <OrderListCard />
                    </TabPane>
                    <TabPane tab="Cancelled Orders" key="4">
                        <OrderListCard />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
