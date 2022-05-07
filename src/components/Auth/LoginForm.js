import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import '../../css/login.css'
import * as userService from '../../services/userService'

export const LoginForm = ({onLoginClicked}) => {

    let navigate = useNavigate();

    const loginCallback = (isAuthed) => {
        console.log("LoginForm isAuthed: " , isAuthed);
        if(isAuthed) {
            // 登陆成功，回传状态
            onLoginClicked(isAuthed);
            // 跳转回首页
            navigate("/");
        }
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        userService.login(values.username, values.password, loginCallback);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    {/*<Link to="/">Log in</Link>*/}
                    Log in
                </Button>
                Or <a href=""><Link to="/register">register now!</Link></a>
            </Form.Item>
        </Form>
    );
};



