import React from "react";
import { List, Avatar, Space, Rate } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 12; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `User Comment ${1+i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
            'A great book! Need to recommend this, learn a lot after reading.',
        rate: <Rate disabled defaultValue={4} style={{float:'right'}} />,
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export class CommentList extends React.Component{
    render() {
        return (
            <div style={{marginTop:"10px", float:"right", height:"100%",width:"27%"}}>
                <List
                    itemLayout="vertical"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={listData}

                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}{item.rate}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
    )
    }
}
