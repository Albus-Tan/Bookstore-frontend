import React from 'react';

import {HeaderInfo} from "./HeaderInfo";
import {SearchBar} from "../../SearchBar";
import {HeadBar} from "./HeadBar";

export class HeaderAll extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <div id="upper-head">
                    <HeaderInfo />
                    <SearchBar />
                </div>
                <HeadBar />
            </div>
        );
    }
}
