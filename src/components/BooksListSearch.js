import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';

export class BooksListSearch extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            searchKey: 'name',  // 搜索'name'一栏
            data: this.props.dataSource,
            originData: this.props.dataSource,
            searchText: '',
            search: false,
        };
    }


    toggleSearch = () => {
        this.setState({
            search: true,
        });
        this.props.onSearchDataChange(this.state.data);
    };

    handleSearchInput = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.state.originData, searchText:''});
            return;
        }
        const newSearchText = e.target.value;
        const searchKey = this.state.searchKey;
        let searchData = this.state.originData.filter(function (row) {
            return row[searchKey].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({
            searchText: newSearchText,
            data: searchData,
        });
    };

    handleReset = () => {
        /*clearFilters();*/
        const data = this.state.originData;
        this.setState({ searchText: '', search: false, data: data });
        this.props.onSearchDataChange(this.state.originData);
    };

    render(){
        return(
            <div style={{paddingTop:20, float:"right"}}>
                <Space>
                    <Input
                        ref={node => {
                            this.searchInput = node;
                        }}
                        placeholder={`Input Book Name ...`}
                        onChange={(e)=>this.handleSearchInput(e)}
                        value={this.state.searchText}
                        onPressEnter={(e)=>this.handleSearchInput(e)}
                        style={{ display: 'block', float:"left" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.toggleSearch()}
                        icon={<SearchOutlined />}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset()} icon={<ReloadOutlined />}>
                        Reset
                    </Button>
                    {/*<Button
                        icon={<FilterOutlined />}
                    >
                        Filter
                    </Button>*/}
                </Space>
            </div>
        );
    }
}



