import React from 'react';
import {Table, Button, Tag, DatePicker, notification, Popconfirm } from 'antd';
import {EllipsisOutlined, QuestionCircleOutlined,CheckCircleOutlined,CloseOutlined, SyncOutlined,DeliveredProcedureOutlined,CloseCircleOutlined} from "@ant-design/icons";
import {BooksListSearch} from "../../BooksListSearch";
import {Link} from "react-router-dom";
import {
    DATE_FORMAT,
    getCodeByText_ORDERSTATUS,
    getTagByCode_ORDERSTATUS,
    getTextByCode_ORDERSTATUS
} from "../../../utils/constant";
import {filterOrderByTimeRange, getAllOrders, getAllOrdersWithItems} from "../../../services/orderService";

const { RangePicker } = DatePicker;

export class OrdersManagement extends React.Component{
    constructor(props) {
        super(props);
        this.columns =  [
            {
                title: 'Order ID',
                dataIndex: 'order_id',
                width: '7%',
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
                dataIndex: 'totalNum',
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
            data: null,
            dateString: [ "", "" ],
        }
        this.handleSearchDataChange =
            this.handleSearchDataChange.bind(this);
    }

    componentDidMount() {
        this.updateOrderData();
    }

    handleCancelClicked = (key) => {
        const dataSource = [...this.state.data];
        let newData = dataSource.filter((item) => {
            if(item.key === key){
                let newItem = item;
                // TODO
                newItem.status = getCodeByText_ORDERSTATUS("Cancelled");
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

    updateOrderData = () => {
        const callback = (data) => {
            console.log("all orders", data);
            let i = -1;
            const processedData = data.map((o)=>{
                const oi_name = o.orderItemResultList.map((oi)=>oi.name);
                ++i;
                return {
                    key: i.toString(),
                    name: oi_name.join('；'),
                    statusTag: getTagByCode_ORDERSTATUS(o.status),
                    ...o,
                }
            });

            console.log("processedData", processedData);
            this.setState({
                data:processedData.reverse(),
            })
        }

        getAllOrdersWithItems(callback);
    }

    handleSearchDataChange(data){
        this.setState({ data: data, });
    }

    onDateRangeChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.setState({dateString:dateString});
    };

    render(){
        const columns = this.columns;
        if(this.state.data === null) return <></>;
        const {data} = this.state;
        const processedData = filterOrderByTimeRange(data,this.state.dateString);
        console.log(data);
        return (
            <div>
                <div style={{ marginBottom: 16, paddingTop: 15, float:"left" }}>
                    <RangePicker
                        format={DATE_FORMAT}
                        allowEmpty={[true,true]}
                        onChange={this.onDateRangeChange.bind(this)}
                    />
                </div>
                <BooksListSearch dataSource={data} onSearchDataChange={this.handleSearchDataChange}/>
                <Table bordered dataSource={processedData} columns={columns} rowKey={processedData.key}/>
            </div>

        );
    }
}
