import React from "react";

import { List } from 'antd';
import { BookCard } from "./BookCard";

const booksData = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
];
export class BookList extends React.Component {
    render() {
        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 5 }}
                    dataSource={booksData}
                    renderItem={item => (
                        <List.Item>
                            <BookCard />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}


