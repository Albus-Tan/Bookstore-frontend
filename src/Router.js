import React from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
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
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPageView />}/>
                    <Route path="/login" element={<LoginView />}/>
                    <Route path="/register" element={<RegisterView />}/>
                    <Route path="/books" element={<BooksView />}/>
                    <Route path="/bookDetail" element={<BookDetailView />}/>
                    <Route path="/cart" element={<CartView />}/>
                    <Route path="/orderList" element={<OrderListView />}/>
                    <Route path="/bookManage" element={<BookManageView />}/>
                    <Route path="/userManage" element={<UserManageView />}/>
                    <Route path="/orderManage" element={<OrderManageView />}/>
                    <Route path="/orderDetail" element={<OrderDetailView />} />
                </Routes>
            </BrowserRouter>
        );
    }
}