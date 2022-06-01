import React from 'react';
import { Tabs } from 'antd';

import '../../../css/orderList.css'
import {OrderListCard} from "./OrderListCard";
import {getCodeByText_ORDERSTATUS} from "../../../utils/constant";
const { TabPane } = Tabs;

export class OrderList extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        const {searchName,dateRange} = this.props;
        return(
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="All Orders" key="1">
                        <OrderListCard searchName={searchName} dateRange={dateRange} status={getCodeByText_ORDERSTATUS("All")}/>
                    </TabPane>
                    <TabPane tab="Unpaid Orders" key="2">
                        <OrderListCard searchName={searchName} dateRange={dateRange} status={getCodeByText_ORDERSTATUS("Unpaid")}/>
                    </TabPane>
                    <TabPane tab="Not Yet Shipped" key="3">
                        <OrderListCard searchName={searchName} dateRange={dateRange} status={getCodeByText_ORDERSTATUS("Not Yet Shipped")}/>
                    </TabPane>
                    <TabPane tab="To Confirm" key="4">
                        <OrderListCard searchName={searchName} dateRange={dateRange} status={getCodeByText_ORDERSTATUS("To Confirm")}/>
                    </TabPane>
                    <TabPane tab="Finished" key="5">
                        <OrderListCard searchName={searchName} dateRange={dateRange} status={getCodeByText_ORDERSTATUS("Finish")}/>
                    </TabPane>
                    <TabPane tab="Cancelled" key="6">
                        <OrderListCard searchName={searchName} dateRange={dateRange} status={getCodeByText_ORDERSTATUS("Cancelled")}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
