import React from "react";
import '../css/login.css'
import {LoginForm} from "../components/LoginForm";

export class LoginView extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Login Bookstore</h1>
                        <div className="login-content">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


