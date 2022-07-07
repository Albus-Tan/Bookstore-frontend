import React from 'react';
import {List, Card, Statistic, Row, Col, DatePicker, Divider} from 'antd';
import {getUserConsumeResultByUserId, getUserConsumeTotalResultByUserId} from "../../../services/orderService";
import {DATE_FORMAT} from "../../../utils/constant";

const {RangePicker} = DatePicker;

export class BookConsumeAnalysis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null, dateString: ["", ""], tot_num: -1, tot_price: -1,
        }
    }

    componentDidMount() {
        this.updateData(this.state.dateString);
    }

    updateData(dateString) {
        const callback = (data) => {
            // data.sort((a, b) => {  // tot price
            //     return a.total_price < b.total_price ? 1 : -1;
            // })
            data.sort((a, b) => {  // sales num
                return a.num_sales < b.num_sales ? 1 : -1;
            })
            let i = 0;
            console.log("getUserConsumeResultByUserId:", data);
            const processed = data.map((b) => {
                ++i;
                return {...b, rank: i,}
            })
            this.setState({
                data: processed.filter((b) => b.num_sales > 0),
            });
        }

        const tot_callback = (data) => {
            this.setState({
                tot_num: data.num, tot_price: data.total_price,
            });
        }

        // TODO 传入日期设置为后一天 以包含end当日
        getUserConsumeResultByUserId(dateString[0], dateString[1], callback);
        getUserConsumeTotalResultByUserId(dateString[0], dateString[1], tot_callback);
    }

    onDateRangeChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.updateData(dateString);
        this.setState({dateString: dateString});
    };

    render() {
        const {data, tot_num, tot_price} = this.state;
        return (data === null) ? (<></>) : (<div>
            <div style={{clear: "both", paddingTop: "30px", paddingLeft: "20px",}}>
                <h1 style={{
                    float: 'left',
                    textAlign: "left",
                    fontSize: "28px",
                    fontFamily: "Arial",
                    fontWeight: "Bold",
                    color: "#696969",
                }}>My Book Consume Analysis</h1>
                {/*borderBottom: "1px solid #ff6700"*/}
                <RangePicker
                    format={DATE_FORMAT}
                    allowEmpty={[false, false]}
                    onChange={this.onDateRangeChange.bind(this)}
                    style={{marginLeft: "70px", marginTop: '2px'}}
                />
            </div>
            <Divider/>
            {(tot_num !== -1) ? <div style={{clear: "both", paddingLeft: "20px",}}>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="Total num"
                                value={tot_num}
                                valueStyle={{color: '#cf1322'}}
                                // prefix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="Total price"
                                value={tot_price}
                                precision={2}
                                valueStyle={{color: '#cf1322'}}
                                // prefix={<ArrowDownOutlined />}
                                suffix="￥"
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider/>
            </div> : <>
            </>}
            <List
                style={{clear: "both"}}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    }, pageSize: 10,
                }}
                dataSource={data}
                renderItem={(item) => (<List.Item
                    key={item.book.id}
                    extra={<img
                        width={200}
                        alt="logo"
                        src={item.book.image}
                    />}
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
                                    valueStyle={{color: '#cf1322'}}
                                    // prefix={<ArrowDownOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <Statistic
                                    title="Buy num"
                                    value={item.num_sales}
                                    valueStyle={{color: '#cf1322'}}
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
                                    valueStyle={{color: '#cf1322'}}
                                    // prefix={<ArrowDownOutlined />}
                                    suffix="￥"
                                />
                            </Card>
                        </Col>
                    </Row>
                </List.Item>)}
            />
        </div>);
    }
}
