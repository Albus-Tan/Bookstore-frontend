import React from 'react';
import {Card, Col, List, Row, Statistic, Avatar, Divider, DatePicker} from "antd";
import {analysisUserConsume} from "../../../services/orderService";
import {DATE_FORMAT} from "../../../utils/constant";

const { RangePicker } = DatePicker;


export class AnalysisUserConsume extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data: null,
            dateString: [ "", "" ],
        }
    }

    componentDidMount() {
        this.updateData(this.state.dateString)
    }

    updateData(dateString){
        const callback = (data) => {
            // data.sort((a, b) => {  // tot price
            //     return a.total_price < b.total_price ? 1 : -1;
            // })
            data.sort((a, b) => {  // sales num
                return a.num < b.num ? 1 : -1;
            })
            let i = 0;
            console.log("AnalysisUserConsume:",data);
            this.setState({data:data.map((b)=>{++i; return {...b,rank:i,} })})
        }
        // TODO 传入日期设置为后一天 以包含end当日
        analysisUserConsume(dateString[0], dateString[1], callback);
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
                    <h1 style={{textAlign:"left", fontSize:"28px",fontFamily:"Arial",fontWeight:"Bold", float:'left'}}>User Consume List</h1>
                    <RangePicker
                        format={DATE_FORMAT}
                        allowEmpty={[false,false]}
                        onChange={this.onDateRangeChange.bind(this)}
                        style={{marginLeft:"70px",marginTop:'2px'}}
                    />
                </div>
                <Divider />
                <List
                    style={{paddingBottom:30, paddingTop:5}}
                    pagination
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
                                title={item.user.name}
                                description={item.user.address}
                            />
                            <Row gutter={16} >
                                <Col flex={8}/>
                                <Col flex={3}>
                                    <Card>
                                        <Statistic
                                            title="Rank"
                                            value={item.rank}
                                            valueStyle={{ color: '#cf1322' }}
                                            // prefix={<ArrowDownOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col flex={8}>
                                    <Card>
                                        <Statistic
                                            title="Buy num"
                                            value={item.num}
                                            valueStyle={{ color: '#cf1322' }}
                                            // prefix={<ArrowDownOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col flex={8}>
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
