import React from 'react';
import {Table, Button, Image, InputNumber, notification} from 'antd';
import {EllipsisOutlined, ShoppingCartOutlined,CheckCircleOutlined,} from "@ant-design/icons";
import {BooksListSearch} from "../../BooksListSearch";
import {Link} from "react-router-dom";
import {getAllBooks} from "../../../services/bookService";
import {addCartItem} from "../../../services/cartService";

export class BooksListTable extends React.Component{
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
                width: '15%',
                inputType: 'text',
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                width: '8%',
                inputType: 'number',
            },
            {
                title: 'Number',
                dataIndex: 'number',
                width: '9%',
                inputType: 'number',
                render: (_, record) => {
                    return (
                        <span>
                            <InputNumber size="large" min={1} max={100} defaultValue={record.inputNumber} onChange={(value) => this.handleInputNumberChange(value,record.id)}/>
                        </span>
                    );
                },
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                width: '270px',
                render: (_, record) => {
                    return (
                        <span>
                            <Button style={{marginRight: 8,borderColor:'#ff6700',color:'#ff6700'}} icon={<ShoppingCartOutlined />} onClick={() => this.handleAddToCartClicked(record.id, record.inputNumber)}>Add to cart</Button>
                            <Link to={`/bookDetail/${record.id}`}><Button style={{marginRight: 8,}} icon={<EllipsisOutlined />} >Details</Button></Link>
                        </span>
                    );
                },
            },
        ];
        this.state={
            data: [],
            selectedRowKeys: [],
            fromBackend: false,
        }
        this.handleSearchDataChange =
            this.handleSearchDataChange.bind(this);
    }

    componentDidMount() {

        const callback =  (data) => {
            console.log("getAllBooks: ", data);
            // add properties: key(String), number
            let key = -1;
            const newData = data.map((book) => {++key; return {
                ...book,
                key: key.toString(),
                inputNumber: 1,
                cover: <Image width={150} src={book.image}/>,
            }});
            console.log("Add properties: ", newData);
            this.setState({data:newData, fromBackend: true});
        };

        getAllBooks(callback);

    }

    handleInputNumberChange = (value, id) => {
        console.log("value, id", value, id);
        const data = this.state.data;
        const newData = data.map((book) => {
            return (id === book.id) ? {
            ...book,
            inputNumber: value,
        } : book
        });
        this.setState({data:newData, fromBackend: false});
    }


    handleAddToCartClicked = (id, num) => {
        addCartItem(id, num);
    };


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    addSelectedBooksToCart = () => {
        let dataSource = [...this.state.data];
        const selectedRowKeys = this.state.selectedRowKeys
        dataSource.map(book => {
            if(selectedRowKeys.includes(book.key)){
                addCartItem(book.id, book.inputNumber);
            }
        })
        this.setState(() => ({
            selectedRowKeys: [],
            data: dataSource,
        }));
    };

    handleSearchDataChange(data){
        this.setState({ data: data, fromBackend: false});
    }

    render(){
        const { selectedRowKeys, data, fromBackend } = this.state;
        const columns = this.columns;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16, paddingTop: 15, float:"left" }}>
                    <Button disabled={!hasSelected} icon={<ShoppingCartOutlined />} type={"primary"} onClick={() => this.addSelectedBooksToCart()}>
                        Add selected to cart
                    </Button>
                    <span style={{ marginLeft: 10 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <BooksListSearch dataSource={data} fromBackend={fromBackend} onSearchDataChange={this.handleSearchDataChange}/>
                <Table bordered dataSource={data} columns={columns} rowKey={data.key} rowSelection={rowSelection}/>
            </div>

        );
    }
}
