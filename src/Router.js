import React from 'react';
import {BrowserRouter, Route, Router, Routes, Navigate} from 'react-router-dom';
import {MainPageView} from './view/MainPageView'
import {BookDetailView} from './view/BookDetailView'
import {CartView} from "./view/CartView";
import {LoginView} from "./view/LoginView";
import {OrderListView} from "./view/OrderListView";
import {RegisterView} from "./view/RegisterView";
import {BookManageView} from "./view/BookManageView";
import {UserManageView} from "./view/UserManageView";
import {OrderManageView} from "./view/OrderManageView";
import {BooksView} from "./view/BooksView";
import {OrderDetailView} from "./view/OrderDetailView";

export class BasicRoute extends React.Component{



    constructor(props) {
        super(props);
        this.state={
            isAuthed: false,
        }
        this.routes = [
            {
                element: <MainPageView />,
                path: "/",
                auth: false,
            },
            {
                element: <LoginView onLoginClicked={this.handleLoginClicked.bind(this)}/>,
                path: "/login",
                auth: false,
            },
            {
                element: <RegisterView />,
                path: "/register",
                auth: false,
            },
            {
                element: <BooksView />,
                path: "/books",
                auth: false,
            },
            {
                element: <BookDetailView />,
                path: "/bookDetail/:id",
                auth: false,
            },
            {
                element: <CartView />,
                path: "/cart",
                auth: true,
            },
            {
                element: <OrderListView />,
                path: "/orderList",
                auth: true,
            },
            {
                element: <BookManageView />,
                path: "/bookManage",
                auth: true,
            },
            {
                element: <UserManageView />,
                path: "/userManage",
                auth: true,
            },
            {
                element: <OrderManageView />,
                path: "/orderManage",
                auth: true,
            },
            {
                element: <OrderDetailView />,
                path: "/orderDetail",
                auth: true,
            },
        ]
        this.handleLoginClicked = this.handleLoginClicked.bind(this);

    }

    handleLoginClicked(isAuthed) {
        console.log("Router handleLoginClicked isAuthed: ", isAuthed);
        this.setState({
            isAuthed: isAuthed,
        });
    }

    render() {
        const {isAuthed} = this.state;
        console.log("Router isAuthed: ", isAuthed);
        return (
            <BrowserRouter>
                <Routes>
                    {
                        this.routes.map(item => {
                            //需要权限的路由组件，转到登录逻辑判断
                            //不需要权限的组件，直接匹配路由显示相应组件
                            if (item.auth) {
                                return isAuthed ? (
                                    <Route path={item.path} element={item.element} />
                                ) : (
                                    <Route path={item.path} element={<LoginView onLoginClicked={this.handleLoginClicked.bind(this)}/>}/>
                                );
                            } else {
                                return <Route path={item.path} element={item.element} />;
                            }
                        })
                    }
                    {/*<Route path="/" element={<MainPageView />}/>*/}
                    {/*<Route path="/login" element={<LoginView />}/>*/}
                    {/*<Route path="/register" element={<RegisterView />}/>*/}
                    {/*<Route path="/books" element={<BooksView />}/>*/}
                    {/*<Route path="/bookDetail" element={<BookDetailView />}/>*/}
                    {/*<Route path="/cart" element={<CartView />}/>*/}
                    {/*<Route path="/orderList" element={<OrderListView />}/>*/}
                    {/*<Route path="/bookManage" element={<BookManageView />}/>*/}
                    {/*<Route path="/userManage" element={<UserManageView />}/>*/}
                    {/*<Route path="/orderManage" element={<OrderManageView />}/>*/}
                    {/*<Route path="/orderDetail" element={<OrderDetailView />} />*/}
                </Routes>
                {/*<Navigate to="/login"/>*/}
            </BrowserRouter>
        );
    }
}