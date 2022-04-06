import React from "react";
import '../css/cart.css'
import bookImg from '../assets/book.png'

export class CartItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            deleted: false,
            selected: false,
        }
    }

    handleSelectClicked = () => {
        const selected = !this.state.selected;
        this.setState({selected: selected});
    };

    handleNumDecreaseClicked = () => {
        const num = this.state.num - 1;
        if(num === 0) return;
        this.setState({num: num});
    };

    handleNumIncreaseClicked = () => {
        const num = this.state.num + 1;
        this.setState({num: num});
    };

    render(){
        const num = this.state.num;
        return (
            <div className="row hid">
                <div className="check left"> <i className="i_check" id="i_check" onClick={this.handleSelectClicked}>√</i></div>
                <div className="img left"><img src={bookImg} style={{width: "80px", height: "80px"}}/></div>
                <div className="name left"><span>Book 1</span></div>
                <div className="price left"><span>200￥</span></div>
                <div className="item_count_i">
                    <div className="num_count">
                        <div className="count_d" onClick={this.handleNumDecreaseClicked}>-</div>
                        <div className="c_num">{num}</div>
                        <div className="count_i" onClick={this.handleNumIncreaseClicked}>+</div>
                    </div>
                </div>
                <div className="subtotal left"><span>200￥</span></div>
                <div className="ctrl left"><a>×</a></div>
            </div>
        )
    }
}
