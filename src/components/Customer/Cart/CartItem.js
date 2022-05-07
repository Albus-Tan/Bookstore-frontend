import React from "react";
import '../../../css/cart.css'
import {deleteCartItem, modifyCartItemNum} from "../../../services/cartService";


export class CartItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleDeleteClicked = () => {

        const callback = (info) => {
            this.props.onChange();
            console.log("Cart item deleted");
        }


        deleteCartItem(this.props.cartItem.book.id, callback);

    }


    // handleSelectClicked = () => {
    //     const selected = !this.state.selected;
    //     this.setState({selected: selected});
    // };

    modifyNumCallback = (num) => {
        this.props.onChange();
    }


    handleNumDecreaseClicked = () => {
        const num = this.props.cartItem.num - 1;
        if(num === 0) return;
        modifyCartItemNum(this.props.cartItem.book.id, num, this.modifyNumCallback);
    };

    handleNumIncreaseClicked = () => {
        const num = this.props.cartItem.num + 1;
        modifyCartItemNum(this.props.cartItem.book.id, num, this.modifyNumCallback);
    };

    render(){
        const {cartItem} = this.props;
        return (
            <div className="row hid">
                {/*<div className="check left"> <i className="i_check" id="i_check" onClick={this.handleSelectClicked}>√</i></div>*/}
                <div className="img left"><img src={cartItem.book.image} style={{width: "80px", height: "80px"}}/></div>
                <div className="name left"><span>{cartItem.book.name}</span></div>
                <div className="price left"><span>{cartItem.book.price.toFixed(2)}￥</span></div>
                <div className="item_count_i">
                    <div className="num_count">
                        <div className="count_d" onClick={this.handleNumDecreaseClicked}>-</div>
                        <div className="c_num">{cartItem.num}</div>
                        <div className="count_i" onClick={this.handleNumIncreaseClicked}>+</div>
                    </div>
                </div>
                <div className="subtotal left"><span>{(cartItem.book.price * cartItem.num).toFixed(2)}￥</span></div>
                <div className="ctrl left" onClick={this.handleDeleteClicked}><a>×</a></div>
            </div>
        )
    }
}
