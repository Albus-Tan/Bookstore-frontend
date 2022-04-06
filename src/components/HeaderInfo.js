import React from "react";
import '../css/head.css'

export class HeaderInfo extends React.Component {
    render() {
        return (
            <div className="header-title" id="J_miniHeaderTitle">
                <h2 style={{fontSize: "32px", color : "#696969", fontFamily : "Arial", fontWeight:"Bold"}}>Bookstore</h2>
            </div>
        );
    }
}