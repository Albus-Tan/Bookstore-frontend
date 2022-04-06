import React from 'react';
import { Descriptions, Button, InputNumber } from 'antd';
import { ShoppingCartOutlined, PayCircleOutlined } from '@ant-design/icons';
import '../css/bookDetailCard.css'
import imgBook from '../assets/book.png'

export class BookDetailCard extends React.Component{
    render() {

        const info = {
            name: "A Good Book",
            author: "Bin yu Zang",
            image: imgBook,
            price: "200",
            description: "good！！good！！good！！good！！good！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！good！！！",
        };

        /*if(info == null){
            return null;
        }*/
        return (
            <div className={"book-detail"}>
                <div className={"book-image"}><img alt="image load error" src={info.image} style={{width:"100%", height:"100%"}}/></div>
                <div className={"descriptions"}>
                    <Descriptions>
                        <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                        <Descriptions.Item label={"Author"} span={3}>{info.author}</Descriptions.Item>
                        <Descriptions.Item span={3}>{info.description}</Descriptions.Item>
                        <Descriptions.Item label={"Price"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                        <Descriptions.Item label={"Num"} span={3}><InputNumber min={1} max={100000} defaultValue={3} /></Descriptions.Item>
                        {/*<Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>*/}
                    </Descriptions>
                    <div className={"button-groups"}>
                        <Button size={"large"} icon={<ShoppingCartOutlined />} style={{borderColor:'#ff6700',color:'#ff6700'}}>
                            Add to cart
                        </Button>
                        <Button type="primary" size={"large"} icon={<PayCircleOutlined />} style={{backgroundColor:'#ff6700',borderColor:'#ff6700', margin:'15px'}}>
                            Buy now
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
