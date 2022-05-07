import React from 'react';
import {Table, Input, InputNumber, Form, Typography, Button, Modal, Upload, Image} from 'antd';
import {DeleteOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {BooksListSearch} from "../../BooksListSearch";
import bookImg from '../../../assets/book.png'

let dataSource = [];

for (let i = 0; i < 100; i++) {
    dataSource.push({
        key: i.toString(),
        name: `Book ${i}`,
        author: 'Author name',
        ISBN: 'BK20ei30w0202',
        cover: <Image width={80} src={bookImg}/>,
        inventory: `${2*i+1}`,
    });
}

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
            data: dataSource,
            editingKey: '',
            selectedRowKeys: [],
            addModalVisible: false,
        }
        this.handleSearchDataChange =
            this.handleSearchDataChange.bind(this);
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

    handleSave = async (key) => {
        try {
            const row = await this.formRef.current.validateFields();
            const newData = [...this.state.data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                this.setState(() => ({ data: newData, editingKey: '', }));
            } else {
                newData.push(row);
                this.setState(() => ({ data: newData, editingKey: '', }));
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    handleDelete = (key: React.Key) => {
        const dataSource = [...this.state.data];
        this.setState({ data: dataSource.filter(item => item.key !== key) });
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    deleteSelectedBooks = () => {
        /*this.setState(() => ({ loading: true }));*/
        // ajax request after empty completing

        let dataSource = [...this.state.data];
        for(let i = 0; i < this.state.selectedRowKeys.length; i++){
            console.log(this.state.selectedRowKeys[i]);
            dataSource = dataSource.filter(item => item.key.toString() !== this.state.selectedRowKeys[i])
        }
        this.setState(() => ({
            selectedRowKeys: [],
            data: dataSource,
        }));
        /*setTimeout(() => {
            this.setState(() => ({
                selectedRowKeys: [],
                loading: false,
                data: dataSource,
            }));
        }, 500);*/
    };

    handleSearchDataChange(data){
        this.setState({ data: data, });
    }

    showAddModal(isVisible){
        this.setState({ addModalVisible: isVisible, });
    }

    handleAdd(){
        this.formAddRef.current.setFieldsValue({ name: '', inventory: '', author: '', });
        /*() => {
            form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    onCreate(values);
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
        }*/
        this.showAddModal(false);
    }

    handleCancelAdd(){
        this.showAddModal(false);
    }

    render(){
        const { selectedRowKeys, data } = this.state;
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
                inputType: 'image',
            },
            {
                title: 'ISBN',
                dataIndex: 'ISBN',
                width: '20%',
                editable: true,
                inputType: 'text',
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                width: '10%',
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
                                <Typography.Link onClick={() => this.handleSave(record.key)} style={{marginRight: 8,}}>Save</Typography.Link>
                                <Typography.Link onClick={() => this.handleCancel()} style={{marginRight: 8,}}>Cancel</Typography.Link>
                            </span>
                        );
                    } else {
                        return (
                            <span>
                                <Typography.Link disabled={this.state.editingKey !== ''} style={{marginRight: 8,}} onClick={() => this.handleEdit(record)}>Edit</Typography.Link>
                                <Typography.Link disabled={this.state.editingKey !== ''} style={{marginRight: 8,}} onClick={() => this.handleDelete(record.key)}>Delete</Typography.Link>
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
                        >
                            <Form.Item name={columns[0].title} label={columns[0].title} rules={[{required: true, message: 'Please input ' + columns[0].title ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={columns[1].title} label={columns[1].title} rules={[{required: true, message: 'Please input ' + columns[1].title ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={columns[3].title} label={columns[3].title} rules={[{required: true, message: 'Please input ' + columns[3].title ,},]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={columns[2].title} label={columns[2].title} rules={[{required: false, message: 'Please input ' + columns[2].title ,},]}>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Click to upload cover</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item name={columns[4].title} label={columns[4].title} style={{width:'100px'}} rules={[{required: true, message: 'Please input ' + columns[4].title ,},]}>
                                <Input type='number'/>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="danger" onClick={() => this.deleteSelectedBooks()} icon={<DeleteOutlined />} disabled={!hasSelected} /*loading={loading}*/ style={{marginLeft:10}}>
                        Delete
                    </Button>
                    <span style={{ marginLeft: 10 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <BooksListSearch dataSource={data} onSearchDataChange={this.handleSearchDataChange}/>
                <Form ref={this.formRef} component={false}>
                    <Table components={{ body: { cell: EditableCell},}} bordered dataSource={data} columns={mergedColumns} rowKey={data.key} rowSelection={rowSelection}/>
                </Form>
            </div>

        );
    }
}
