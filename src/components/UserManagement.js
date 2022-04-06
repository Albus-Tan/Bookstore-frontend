import React from 'react';
import {List, Avatar, Tag, Button} from "antd";


let data = [];

for (let i = 0; i < 100; i++) {
    data.push({
        avatar: <Avatar src="https://joeschmoe.io/api/v1/random" />,
        key: i.toString(),
        name: `User ${i}`,
        description: "I am a user of the bookstore",
        status: 'normal'
    });
}

data[1].status = 'banned';
data[3].status = 'banned';


export class UserManagement extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: data,
        };
    }

    getStatusTag = (status) => {
        return status !== 'normal' ? (<Tag color="error" style={{marginLeft: 30}}>Disabled</Tag>) : (<Tag color="success" style={{marginLeft: 30}}>Normal</Tag>);
    };

    getStatusOperation = (status, key) => {
        return status !== 'normal' ? (<Button type="link" style={{marginLeft: 34}} onClick={()=>this.handleUnbanClicked(key)}>Unban</Button>)
            : (<Button type="link" style={{marginLeft: 30}} onClick={()=>this.handleDisableClicked(key)}>Disable</Button>);
    };

    handleDisableClicked = (key) => {
        const data = [...this.state.data];
        let newData = data.map((item)=>{
            if(item.key.toString() === key.toString()){
                item.status = 'banned'
                return item;
            } else return item;
        });
        this.setState({data:newData});
    }

    handleUnbanClicked = (key) => {
        const data = [...this.state.data];
        let newData = data.map((item)=>{
            if(item.key.toString() === key.toString()){
                item.status = 'normal'
                return item;
            } else return item;
        });
        this.setState({data:newData});
    }

    render(){
        return(
            <div>
                <List
                    style={{paddingBottom:30, paddingTop:5}}
                    pagination
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={item.avatar}
                            title={item.name}
                            description={item.description}
                            />
                            {this.getStatusTag(item.status)}
                            {this.getStatusOperation(item.status, item.key)}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
