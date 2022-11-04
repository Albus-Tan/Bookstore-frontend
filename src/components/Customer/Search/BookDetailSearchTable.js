import React from "react";
import {Button, Image, Input, Space, Table} from "antd";
import {EllipsisOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {getAllBooks, queryBooksByDescription} from "../../../services/bookService";
import {addCartItem} from "../../../services/cartService";
const { Search } = Input;

export class BookDetailSearchTable extends React.Component{
    constructor(props) {
        super(props);
        this.columns =  [
            {
                title: 'Cover',
                dataIndex: 'cover',
                width: '15%',
                inputType: 'image',
            },
            {
                title: 'Book Name',
                dataIndex: 'name',
                inputType: 'text',
            },
            {
                title: 'Author',
                dataIndex: 'author',
                width: '10%',
                inputType: 'text',
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                width: '10%',
                inputType: 'text',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                width: '40%',
                inputType: 'text',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                width: '120px',
                render: (_, record) => {
                    return (
                        <span>
                            <Link to={`/bookDetail/${record.id}`}><Button style={{marginRight: 8,}} icon={<EllipsisOutlined />} >Details</Button></Link>
                        </span>
                    );
                },
            },
        ];
        this.state={
            data: [],
        }
    }

    componentDidMount() {
        this.onSearchingKeyword("");
    }

    onSearchingKeyword = (value) => {

        const callback = (data) => {

            console.log("Detail Search result : ", data);
            // add properties: key(String), number
            let key = -1;
            const newData = data.map((book) => {++key; return {
                ...book,
                key: key.toString(),
                cover: <Image width={150} src={book.image}/>,
            }});
            console.log("Detail Search result processed : ", newData);
            this.setState({data: newData});
        }

        console.log("Detail Search : searching " + value);
        queryBooksByDescription(value, callback);
    }

    render(){
        const { data } = this.state;
        const columns = this.columns;
        return (
            <div>
                <Space direction="vertical">
                    <Search
                        placeholder="Input keyword..."
                        allowClear
                        size="large"
                        enterButton
                        onSearch={this.onSearchingKeyword}
                    />
                    <Table bordered dataSource={data} columns={columns} rowKey={data.key}/>
                </Space>
            </div>

        );
    }
}
