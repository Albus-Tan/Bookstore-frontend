import {Card, Button} from 'antd';
import { EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from "react";

import {addCartItem} from "../../services/cartService";

const { Meta } = Card;

export class BookCard extends React.Component {

    constructor(props) {
        super(props);
    }


    handleAddToCart(){
        addCartItem( this.props.book.id, 1);
    }

    render() {
        const book = this.props.book;
        return (
            <div>
                <Card
                    cover={
                        <img
                            alt="Img not found"
                            src={book.image}
                        />
                    }
                    actions={[
                        <Button type="primary" icon={<ShoppingCartOutlined />} style={{backgroundColor:'#ff6700',borderColor:'#ff6700'}} onClick={()=>this.handleAddToCart()}>
                            Add cart
                        </Button>,
                        <Link to={`/bookDetail/${book.id}`}>
                            <Button icon={<EllipsisOutlined />}>
                                Details
                            </Button>
                        </Link>,
                    ]}
                >
                    <Meta
                        title={book.name}
                        /*description="This is the description"*/
                    />
                </Card>
            </div>
        );
    }
}
