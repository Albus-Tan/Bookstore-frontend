import React from 'react';
import { Descriptions, Button, InputNumber } from 'antd';
import { ShoppingCartOutlined, PayCircleOutlined } from '@ant-design/icons';
import '../../../css/bookDetailCard.css'
import {getBookById} from "../../../services/bookService";
import {addCartItem} from "../../../services/cartService";

export class BookDetailCard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            info:null,
            buyNum: 1,
        }
    }

    updateInfo(book_id){
        const callback = (data) => {
            this.setState({info: data});
        }
        getBookById(book_id, callback);

    }


    componentDidMount(){
        this.updateInfo(this.props.id);
    }

    handleAddToCart(){
        addCartItem( Number(this.props.id), this.state.buyNum);
    }

    handleInputNumChange(value){
        this.setState({buyNum:value,})
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any) {
        this.updateInfo(nextProps.id);
    }

    render() {
        const {info, buyNum} = this.state;
        return info===null ?(<></>) :(
            <div className={"book-detail"}>
                <div className={"book-image"}><img alt="image load error" src={info.image} style={{width:"100%", height:"100%"}}/></div>
                <div className={"descriptions"}>
                    <Descriptions>
                        <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                        <Descriptions.Item label={"Author"} span={3}>{info.author}</Descriptions.Item>
                        <Descriptions.Item span={3}>{info.description}</Descriptions.Item>
                        <Descriptions.Item label={"Price"} span={3}>{<span className={"price"}>{'¥' + info.price.toFixed(2)}</span>}</Descriptions.Item>
                        <Descriptions.Item label={"Num"} span={3}>
                            <InputNumber min={1} max={100000} defaultValue={buyNum} onChange={this.handleInputNumChange.bind(this)} disabled={info.inventory <= 0}/>
                            {info.inventory !== 0? <span className={"status"}> 有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label={"Type"} span={3}>{info.type}</Descriptions.Item>
                    </Descriptions>
                    <div className={"button-groups"}>
                        <Button disabled={info.inventory <= 0} size={"large"} onClick={()=>this.handleAddToCart()} icon={<ShoppingCartOutlined />} style={{borderColor:'#ff6700',color:'#ff6700'}}>
                            Add to cart
                        </Button>
                        <Button disabled={info.inventory <= 0} type="primary" size={"large"} icon={<PayCircleOutlined />} style={{backgroundColor:'#ff6700',borderColor:'#ff6700', margin:'15px'}}>
                            Buy now
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
