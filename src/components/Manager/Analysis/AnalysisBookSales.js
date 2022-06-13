import React from 'react';
import {List, Card, Statistic, Row, Col, DatePicker, Divider} from 'antd';
import {analysisBookSales} from "../../../services/orderService";
import {DATE_FORMAT} from "../../../utils/constant";

const { RangePicker } = DatePicker;

export class AnalysisBookSales extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data: null,
            dateString: [ "", "" ],
        }
    }

    componentDidMount() {
        this.updateData(this.state.dateString);
    }

    updateData(dateString){
        const callback = (data) => {
            // data.sort((a, b) => {  // tot price
            //     return a.total_price < b.total_price ? 1 : -1;
            // })
            data.sort((a, b) => {  // sales num
                return a.num_sales < b.num_sales ? 1 : -1;
            })
            let i = 0;
            console.log("AnalysisBookSales:",data);
            this.setState({data:data.map((b)=>{++i; return {...b,rank:i,} })})
        }
        // TODO 传入日期设置为后一天 以包含end当日
        analysisBookSales(dateString[0], dateString[1], callback);
    }

    onDateRangeChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.updateData(dateString);
        this.setState({dateString:dateString});
    };

    render(){
        const {data} = this.state;
        return (data === null) ? (<></>) : (
            <div>
                <div  style={{clear:"both", paddingTop:"20px",paddingLeft:"20px",paddingBottom:"5px",}}>
                    <h1 style={{textAlign:"left", fontSize:"28px",fontFamily:"Arial",fontWeight:"Bold", float:'left'}}>Best Sales List</h1>
                    <RangePicker
                        format={DATE_FORMAT}
                        allowEmpty={[false,false]}
                        onChange={this.onDateRangeChange.bind(this)}
                        style={{marginLeft:"70px",marginTop:'2px'}}
                    />
                </div>
                <Divider />
                <List
                    style={{clear:"both"}}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            key={item.book.id}
                            extra={
                                <img
                                    width={200}
                                    alt="logo"
                                    src={item.book.image}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={item.book.name}
                                description={item.book.description}
                            />
                            <Row gutter={16}>
                                <Col span={2}>
                                    <Card>
                                        <Statistic
                                            title="Rank"
                                            value={item.rank}
                                            valueStyle={{ color: '#cf1322' }}
                                            // prefix={<ArrowDownOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card>
                                        <Statistic
                                            title="Sales num"
                                            value={item.num_sales}
                                            valueStyle={{ color: '#cf1322' }}
                                            // prefix={<ArrowDownOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Statistic
                                            title="Total price"
                                            value={item.total_price}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            // prefix={<ArrowDownOutlined />}
                                            suffix="￥"
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
