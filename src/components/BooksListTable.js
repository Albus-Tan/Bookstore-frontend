import React from 'react';
import {Table, Button, Image, InputNumber, notification} from 'antd';
import {EllipsisOutlined, ShoppingCartOutlined,CheckCircleOutlined,} from "@ant-design/icons";
import {BooksListSearch} from "./BooksListSearch";
import bookImg from '../assets/book.png'
import {Link} from "react-router-dom";

let dataSource = [];

for (let i = 0; i < 100; i++) {
    dataSource.push({
        key: i.toString(),
        name: `Book ${i}`,
        author: 'Author name',
        ISBN: 'BK20ei30w0202',
        cover: <Image width={150} src={bookImg}/>,
        inventory: `${2*i+1}`,
        number: <InputNumber size="large" min={1} max={100} defaultValue={1} />,
    });
}


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
                dataIndex: 'ISBN',
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
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                width: '270px',
                render: (_, record) => {
                    return (
                        <span>
                            <Button style={{marginRight: 8,borderColor:'#ff6700',color:'#ff6700'}} icon={<ShoppingCartOutlined />} onClick={() => this.handleAddToCartClicked(record.key)}>Add to cart</Button>
                            <Link to={'/bookDetail'}><Button style={{marginRight: 8,}} icon={<EllipsisOutlined />} onClick={() => this.handleDetailsClicked(record.key)}>Details</Button></Link>
                        </span>
                    );
                },
            },
        ];
        this.state={
            data: dataSource,
            selectedRowKeys: [],
        }
        this.handleSearchDataChange =
            this.handleSearchDataChange.bind(this);
    }

    openAddSuccessNotification = (num) => {
        notification.open({
            message: 'Successfully add to cart !',
            description: num+' added, check for other favours',
            icon: <CheckCircleOutlined style={{ color: '#ff8f00' }} />,
            duration: 2,
        });
    };

    handleAddToCartClicked = (key) => {


        this.openAddSuccessNotification(1);
    };

    handleDetailsClicked = (key: React.Key) => {

    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    addSelectedBooksToCart = () => {
        // ajax request after empty completing

        let dataSource = [...this.state.data];
        const num = this.state.selectedRowKeys.length;
        for(let i = 0; i < num; i++){
            console.log(this.state.selectedRowKeys[i]);
            /*dataSource = dataSource.filter(item => item.key.toString() !== this.state.selectedRowKeys[i])*/
        }
        this.setState(() => ({
            selectedRowKeys: [],
            data: dataSource,
        }));

        this.openAddSuccessNotification(num);

    };

    handleSearchDataChange(data){
        this.setState({ data: data, });
    }

    render(){
        const { selectedRowKeys, data } = this.state;
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
                <BooksListSearch dataSource={data} onSearchDataChange={this.handleSearchDataChange}/>
                <Table bordered dataSource={data} columns={columns} rowKey={data.key} rowSelection={rowSelection}/>
            </div>

        );
    }
}
