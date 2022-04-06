import React from 'react';
import {Table, Button, Tag, DatePicker, notification, Popconfirm } from 'antd';
import {EllipsisOutlined, QuestionCircleOutlined,CheckCircleOutlined,CloseOutlined, SyncOutlined,DeliveredProcedureOutlined,CloseCircleOutlined} from "@ant-design/icons";
import {BooksListSearch} from "./BooksListSearch";
import {Link} from "react-router-dom";

const { RangePicker } = DatePicker;

let dataSource = [];

for (let i = 0; i < 100; i++) {
    dataSource.push({
        key: i.toString(),
        orderID: `OD20ep0882sd${i}`,
        status: 'processing',
        time: `2022/3/26`,
        num: i+1,
        name: 'Book 0; Book 1; Book 2;',
        statusTag: '',
    });
}

dataSource[2].status = 'complete';
dataSource[3].status = 'delivering';
dataSource[4].status = 'cancel';

export class OrdersManagement extends React.Component{
    constructor(props) {
        super(props);
        this.columns =  [
            {
                title: 'Order ID',
                dataIndex: 'orderID',
                width: '18%',
            },
            {
                title: 'Status',
                dataIndex: 'statusTag',
                width: '10%',
            },
            {
                title: 'Order Time',
                dataIndex: 'time',
                width: '13%',
            },
            {
                title: 'Book Num',
                dataIndex: 'num',
                width: '7%',
            },
            {
                title: 'Books Name',
                dataIndex: 'name',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                width: '240px',
                render: (_, record) => {
                    return record.status === 'cancel' ? (
                        <span>
                            <Button style={{marginRight: 10, marginLeft:5}} icon={<CloseOutlined />} disabled>Cancel</Button>
                            <Link to={'/orderDetail'}><Button icon={<EllipsisOutlined />} onClick={() => this.handleDetailsClicked(record.key)}>Details</Button></Link>
                        </span>
                    ):(
                        <span>
                            <Popconfirm title="Sure to cancel this order ?" okText="Yes" cancelText="No" onConfirm={() => this.handleCancelClicked(record.key)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}><Button style={{marginRight: 10, marginLeft:5}} icon={<CloseOutlined />}>Cancel</Button></Popconfirm>
                            <Link to={'/orderDetail'}><Button icon={<EllipsisOutlined />} onClick={() => this.handleDetailsClicked(record.key)}>Details</Button></Link>
                        </span>
                    );
                },
            },
        ];
        this.state={
            data: dataSource,
        }
        this.handleSearchDataChange =
            this.handleSearchDataChange.bind(this);
    }


    handleCancelClicked = (key) => {
        const dataSource = [...this.state.data];
        let newData = dataSource.filter((item) => {
            if(item.key === key){
                let newItem = item;
                newItem.status = 'cancel';
                return newItem;
            }
            return item;
        })
        this.setState(()=>({ data: [...newData],}));
        notification.open({
            message: 'Order cancelled !',
            description: 'Notification message has been sent to customer',
            icon: <CheckCircleOutlined style={{ color: '#ff8f00' }} />,
            duration: 2,
        });
    };

    handleDetailsClicked = (key: React.Key) => {

    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    handleSearchDataChange(data){
        this.setState({ data: data, });
    }

    render(){
        const columns = this.columns;
        const data = [...this.state.data];
        let processedData = data.map((item) => {
            let newItem = item;
            if (item.status === 'delivering') {
                newItem.statusTag = <Tag icon={<DeliveredProcedureOutlined />} color="blue">Delivering</Tag>;
                return newItem;
            }
            if (item.status === 'complete') {
                newItem.statusTag = <Tag icon={<CheckCircleOutlined />} color="green">Completed</Tag>;
                return newItem;
            }
            if (item.status === 'processing') {
                newItem.statusTag = <Tag icon={<SyncOutlined spin />} color="processing">Processing</Tag>;
                return newItem;
            }
            if (item.status === 'cancel') {
                newItem.statusTag = <Tag icon={<CloseCircleOutlined />} color="error">Cancelled</Tag>;
                return newItem;
            }
        });
        console.log(data);
        return (
            <div>
                <div style={{ marginBottom: 16, paddingTop: 15, float:"left" }}>
                    <RangePicker />
                </div>
                <BooksListSearch dataSource={processedData} onSearchDataChange={this.handleSearchDataChange}/>
                <Table bordered dataSource={processedData} columns={columns} rowKey={processedData.key}/>
            </div>

        );
    }
}
