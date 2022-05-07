import {Card, Button} from 'antd';
import { EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from "react";

import imgBook from '../../assets/book.png'
import {addCartItem} from "../../services/cartService";

const { Meta } = Card;

export class BookCard extends React.Component {

    constructor(props) {
        super(props);
    }

    navigateToBookDetailPage(){

    }

    handleAddToCart(){

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
                        <Link to="/cart">
                            <Button type="primary" icon={<ShoppingCartOutlined />} style={{backgroundColor:'#ff6700',borderColor:'#ff6700'}}>
                                Add cart
                            </Button>
                        </Link>,
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
