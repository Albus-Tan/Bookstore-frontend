import React from "react";

import {Image, InputNumber, List} from 'antd';
import { BookCard } from "./BookCard";
import {getAllBooks} from "../../services/bookService";

export class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            booksData:[],
        }
    }

    async componentWillMount() {
        const callback = (data) => {
            console.log("getAllBooks: ", data);
            this.setState({booksData: data});
        };

        await getAllBooks(callback);
    }

    render() {
        const {booksData} = this.state;
        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 5 }}
                    dataSource={booksData}
                    renderItem={item => (
                        <List.Item>
                            <BookCard book={item} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}


