import React from 'react';
import {Card, Col, List, Row, Statistic, Avatar} from "antd";
import {analysisUserConsume} from "../../../services/orderService";
import {Link} from "react-router-dom";

export class AnalysisUserConsume extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data: null,
            dateString: [ "", "" ],
        }
    }

    componentDidMount() {
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
        analysisUserConsume(callback);
    }

    render(){
        const {data} = this.state;
        return (data === null) ? (<></>) : (
            <div>
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
