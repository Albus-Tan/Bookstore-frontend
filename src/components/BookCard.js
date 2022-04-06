import {Card, Button} from 'antd';
import { EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from "react";

import imgBook from '../assets/book.png'

const { Meta } = Card;

export class BookCard extends React.Component {
    render() {
        return (
            <div>
                <Card
                    cover={
                        <img
                            alt="Img not found"
                            src={imgBook}
                        />
                    }
                    actions={[
                        <Link to="/cart">
                            <Button type="primary" icon={<ShoppingCartOutlined />} style={{backgroundColor:'#ff6700',borderColor:'#ff6700'}}>
                                Buy now
                            </Button>
                        </Link>,
                        <Link to="/bookDetail">
                            <Button icon={<EllipsisOutlined />}>
                                Details
                            </Button>
                        </Link>,
                    ]}
                >
                    <Meta
                        title="Book name"
                        /*description="This is the description"*/
                    />
                </Card>
            </div>
        );
    }
}
