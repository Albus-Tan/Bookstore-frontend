import React from 'react';
import {Table, Input, InputNumber, Form, Typography, Button, Modal, Upload, Image, message, Popconfirm} from 'antd';
import {DeleteOutlined, PlusOutlined, UploadOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {BooksListSearch} from "../../BooksListSearch";
import {addBook, getAllBooks, updateBookInfo, deleteBookById} from "../../../services/bookService";
import {FAIL, SUCCESS} from "../../../utils/constant";
import config from "../../../utils/config";

const { confirm } = Modal;

export class EditableCell extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        let inputNode = <Input />;
        if(inputType === 'number') inputNode = <InputNumber />;
        if(inputType === 'image') {
            inputNode =
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Click to change cover</Button>
                </Upload>;
        }
        return editing ? (
            <td {...restProps}>
                <Form.Item name={dataIndex} style={{margin: 0,}} rules={[{required: true, message: `Please Input ${title}!`,},]}>
                    {inputNode}
                </Form.Item>
            </td>
        ) : (
            <td {...restProps}>
                {children}
            </td>
        );
    }
}


export class BooksManagementEditableTable extends React.Component{
    formRef = React.createRef();
    formAddRef = React.createRef();
    constructor(props) {
        super(props);
        this.state={
            loading: false,

            data: [],
            editingKey: '',
            selectedRowKeys: [],
            addModalVisible: false,

            deleteConfirmModalVisible: false,

            fromBackend: false,  // record if data get back from backend just now
        }
        this.handleSearchDataChange =
            this.handleSearchDataChange.bind(this);
    }

    componentDidMount() {
        this.updateBookData();
    }

    updateBookData(){
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

    isEditing = (record) => {
        return (record.key === this.state.editingKey);
    };

    handleEdit = (record) => {
        this.formRef.current.setFieldsValue({ name: '', inventory: '', author: '', ...record,});
        this.setState(() => ({ editingKey: record.key, }));
    };

    handleCancel = () => {
        console.log("cancel clicked"+this.state.editingKey);
        this.setState(() => ({ editingKey: '',}));
    };

    handleSave = async (record) => {
        try {
            const row = await this.formRef.current.validateFields();
            console.log("row info: ", row);
            const newData = [...this.state.data];
            const index = newData.findIndex((item) => record.key === item.key);

            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, { ...item, ...row });
            //     this.setState(() => ({ editingKey: '', data: newData}));
            // } else {
            //     newData.push(row);
            //     this.setState(() => ({ editingKey: '', data: newData}));
            // }

            const item = newData[index];
            console.log("All row info: ", { ...item, ...row });

            const callback = (res) => {
                if(res === SUCCESS){
                    message.success("Successfully update book info");
                } else {
                    message.error("Update book info FAILED, try again later !");
                }
                this.updateBookData();
                this.setState(() => ({ editingKey: '', }));
            }

            updateBookInfo({ ...item, ...row } ,callback);

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    handleDelete = (record) => {

        const id = record.id;

        const callback = (res) => {
            if(res === SUCCESS){
                message.success("Successfully delete book, id " + id);
            } else {
                message.error("Delete book FAILED, try again later !");
            }
            this.updateBookData();
        }

        deleteBookById(id, callback);
        // const dataSource = [...this.state.data];
        // this.setState({ data: dataSource.filter(item => item.key !== record.key) });
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    deleteSelectedBooks = () => {
        this.showDeleteConfirmModal(false);
        this.setState(() => ({ loading: true }));

        let dataSource = [...this.state.data];
        for(let i = 0; i < this.state.selectedRowKeys.length; i++){
            console.log(this.state.selectedRowKeys[i]);
            dataSource.map((item) => {
                if(item.key.toString() === this.state.selectedRowKeys[i]) this.handleDelete(item);
            })
        }
        this.setState(() => ({
            selectedRowKeys: [],
            loading: false,
        }));

    };

    handleSearchDataChange(data){
        this.setState({ data: data, fromBackend: false});
    }

    showAddModal(isVisible){
        this.setState({ addModalVisible: isVisible, });
    }

    showDeleteConfirmModal(isVisible){
        this.setState({ deleteConfirmModalVisible: isVisible, });
    }

    handleAdd(){
        this.formAddRef.current.validateFields()
            .then((values) => {
                console.log('Validated:', values);

                const addBookCallback = (data) => {
                    if(data !== FAIL) {
                        message.success("Successfully add book, id " + data);
                        this.updateBookData();
                    }
                    else message.error("Add book FAILED, try again later !");
                }

                const data = {
                    ...values,
                    image: "",
                }

                console.log('Validated processed data:', data);

                addBook(data, addBookCallback);

                this.formAddRef.current.resetFields();
                this.showAddModal(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    handleCancelAdd(){
        this.showAddModal(false);
    }

    render(){
        const { selectedRowKeys, data, fromBackend, loading } = this.state;
        let columns =  [
            {
                title: 'Book Name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
                inputType: 'text',
            },
            {
                title: 'Author',
                dataIndex: 'author',
                width: '15%',
                editable: true,
                inputType: 'text',
            },
            {
                title: 'Cover',
                dataIndex: 'cover',
                width: '10%',
                editable: true,
                inputType: 'text',
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                width: '10%',
                editable: true,
                inputType: 'text',
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                width: '8%',
                editable: true,
                inputType: 'number',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                width: '8%',
                editable: true,
                inputType: 'number',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (_, record) => {
                    if(this.isEditing(record)){
                        return (
                            <span>
                                <Typography.Link onClick={() => this.handleSave(record)} style={{marginRight: 8,}}>Save</Typography.Link>
                                <Typography.Link onClick={() => this.handleCancel()} style={{marginRight: 8,}}>Cancel</Typography.Link>
                            </span>
                        );
                    } else {
                        return (
                            <span>
                                <Typography.Link disabled={this.state.editingKey !== ''} style={{marginRight: 8,}} onClick={() => this.handleEdit(record)}>Edit</Typography.Link>
                                <Typography.Link disabled={this.state.editingKey !== ''} style={{marginRight: 8,}} >
                                    <Popconfirm
                                        title="Are you sure to delete this book ?"
                                        onConfirm={() => this.handleDelete(record)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                    Delete
                                    </Popconfirm>
                                </Typography.Link>
                            </span>
                        );
                    }
                },
            },
        ];
        const mergedColumns = columns.map((col) => {
            if (!col.editable) {return col;}
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16, paddingTop: 20, float:"left" }}>
                    <Button disabled={hasSelected} icon={<PlusOutlined />} onClick={() => this.showAddModal(true)}>
                        Add
                    </Button>
                    <Modal
                        title="Add new book"
                        centered
                        visible={this.state.addModalVisible}
                        okText="Add"
                        onOk={() => this.handleAdd()}
                        onCancel={() => this.handleCancelAdd()}
                        maskClosable={false}
                    >
                        <Form
                            ref={this.formAddRef}
                            layout="vertical"
                            name="form_in_modal"
                            preserve={false}
                        >
                            <Form.Item name="name" label={columns[0].title} rules={[{required: true, message: 'Please input ' + columns[0].title ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="author" label={columns[1].title} rules={[{required: true, message: 'Please input ' + columns[1].title ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="isbn" label={columns[3].title} rules={[{required: true, message: 'Please input ' + columns[3].title ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={columns[2].title} label={columns[2].title} rules={[{required: false, message: 'Please input ' + columns[2].title + ' url' ,},]}>
                                <Input />
                                {/*<Upload*/}
                                {/*    action={config.imageUploadUrl}*/}
                                {/*    listType="picture"*/}
                                {/*    maxCount={1}*/}
                                {/*>*/}
                                {/*    <Button icon={<UploadOutlined />}>Click to upload cover</Button>*/}
                                {/*</Upload>*/}
                            </Form.Item>
                            <Form.Item name="inventory" label={columns[4].title} style={{width:'100px'}} rules={[{required: true, message: 'Please input ' + columns[4].title ,},]}>
                                <Input type='number'/>
                            </Form.Item>
                            <Form.Item name="price" label="Price" style={{width:'100px'}} rules={[{required: true, message: 'Please input price',},]}>
                                <Input type='number'/>
                            </Form.Item>
                            <Form.Item name="description" label="Description" rules={[{required: false, message: 'Please input description' ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="type" label="Type" rules={[{required: false, message: 'Please input type' ,},]}>
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="danger" onClick={()=>this.showDeleteConfirmModal(true)} icon={<DeleteOutlined />} disabled={!hasSelected}  loading={loading} style={{marginLeft:10}}>
                        Delete
                    </Button>
                    <Modal
                        visible={this.state.deleteConfirmModalVisible}
                        title='Are you sure delete all books selected ?'
                        okText='Yes'
                        okType='danger'
                        cancelText='No'
                        onOk={() => this.deleteSelectedBooks()}
                        onCancel={() => this.showDeleteConfirmModal(false)}
                        maskClosable={false}
                    >
                        This operation can not be undo !
                    </Modal>
                    <span style={{ marginLeft: 10 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <BooksListSearch dataSource={data} fromBackend={fromBackend} onSearchDataChange={this.handleSearchDataChange}/>
                <Form ref={this.formRef} component={false}>
                    <Table components={{ body: { cell: EditableCell},}} bordered dataSource={data} columns={mergedColumns} rowKey={data.key} rowSelection={rowSelection}/>
                </Form>
            </div>

        );
    }
}
