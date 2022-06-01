import React from 'react';
import {List, Avatar, Tag, Button} from "antd";
import {getAllUsers, modifyUserStatusById} from "../../../services/userService";
import {SUCCESS, USER_STATUS_BANNED, USER_STATUS_NORMAL} from "../../../utils/constant";


let data = [];

for (let i = 0; i < 100; i++) {
    data.push({
        avatar: <Avatar src="https://joeschmoe.io/api/v1/random" />,
        key: i.toString(),
        name: `User ${i}`,
        description: "I am a user of the bookstore",
        status: USER_STATUS_NORMAL
    });
}

data[1].status = USER_STATUS_BANNED;
data[3].status = USER_STATUS_BANNED;


export class UserManagement extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        this.updateUserData();
    }

    modifyStatus(user_id, user_status){
        const callback = (res) => {
            if(res === SUCCESS) this.updateUserData();
        }

        modifyUserStatusById(user_id, user_status, callback);
    }

    updateUserData(){
        const callback = (data) => {
            const newData = data.map((item)=>({
                    ...item,
                    avatar: <Avatar src="https://joeschmoe.io/api/v1/random" />,
                    key: item.user_id.toString(),
                    description: "I am a user of the bookstore",
            }))
            this.setState({
                data: newData,
            })
        }
        getAllUsers(callback);
    }

    getStatusTag = (status) => {
        return status !== USER_STATUS_NORMAL ? (<Tag color="error" style={{marginLeft: 30}}>Disabled</Tag>) : (<Tag color="success" style={{marginLeft: 30}}>Normal</Tag>);
    };

    getStatusOperation = (status, key) => {
        return status !== USER_STATUS_NORMAL ? (<Button type="link" style={{marginLeft: 34}} onClick={()=>this.handleUnbanClicked(key)}>Unban</Button>)
            : (<Button type="link" style={{marginLeft: 30}} onClick={()=>this.handleDisableClicked(key)}>Disable</Button>);
    };

    handleDisableClicked = (key) => {
        const data = [...this.state.data];
        data.map((item)=>{
            if(item.key.toString() === key.toString()){
                this.modifyStatus(item.user_id, USER_STATUS_BANNED);
            }
        });
    }

    handleUnbanClicked = (key) => {
        const data = [...this.state.data];
        data.map((item)=>{
            if(item.key.toString() === key.toString()){
                this.modifyStatus(item.user_id, USER_STATUS_NORMAL);
            }
        });
    }

    render(){
        const {data} = this.state;
        return (data === null) ? <></> : (
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
                            {this.getStatusTag(item.userAuth.user_status)}
                            {this.getStatusOperation(item.userAuth.user_status, item.key)}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
