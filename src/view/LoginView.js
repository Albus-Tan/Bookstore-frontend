import React from "react";
import '../css/login.css'
import {LoginForm} from "../components/Auth/LoginForm";

export class LoginView extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            isAuthed: false,
        }
        this.handleLoginClicked2=this.handleLoginClicked2.bind(this);
    }

    handleLoginClicked2(isAuthed){
        console.log("LoginView handleLoginClicked isAuthed: ", isAuthed);
        this.setState({isAuthed: isAuthed}, ()=>{
            this.props.onLoginClicked(this.state.isAuthed);
        })
    }

    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Login Bookstore</h1>
                        <div className="login-content">
                            <LoginForm onLoginClicked={this.handleLoginClicked2}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


