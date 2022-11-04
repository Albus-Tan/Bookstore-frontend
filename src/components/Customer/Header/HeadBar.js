import React from "react";
import {Link} from 'react-router-dom';
import '../../../css/head.css'
import localStorage from "../../../utils/localStorage";
import {logout} from "../../../services/userService";

export class HeadBar extends React.Component {

    render() {
        return (
            <div style={{paddingTop: "80px", height: "140px"}}>
                <div id="Bar">
                    <bar_ul>
                        <Link to="/">
                            <bar_li>
                                <bar_h2>Home</bar_h2>
                            </bar_li>
                        </Link>
                        <Link to="/books">
                            <bar_li>
                                <bar_h2>Books</bar_h2>
                            </bar_li>
                        </Link>
                        <Link to="/cart">
                            <bar_li>
                                <bar_h2>Cart</bar_h2>
                            </bar_li>
                        </Link>
                        <Link to="/orderList">
                            <bar_li>
                                <bar_h2>Orders</bar_h2>
                            </bar_li>
                        </Link>
                        <Link to="/analysis">
                            <bar_li>
                                <bar_h2>Analysis</bar_h2>
                            </bar_li>
                        </Link>
                        <Link to="/search">
                            <bar_li>
                                <bar_h2>Detail Search</bar_h2>
                            </bar_li>
                        </Link>
                        <Link to="/login" onClick={() => {
                            localStorage.clearUser();
                            logout();
                        }}>
                            <bar_li style={{float: 'right'}}>
                                <bar_h2>{localStorage.hasLogin() ? 'Log out' : 'Log in'}</bar_h2>
                            </bar_li>
                        </Link>
                    </bar_ul>
                </div>
            </div>
        );
    }
}