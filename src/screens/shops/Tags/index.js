import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'redux/settings/shops/tags/actions';
import categoryAction from 'redux/settings/shops/categories/actions';
import { Input, Modal, Popconfirm } from 'marslab-library-react/components/atoms';
import { LayoutWrapper, Box, ContentHolder } from 'marslab-library-react/components/molecules';
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { notification } from "marslab-library-react/components/organisms";
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from './styles';
import clone from 'clone';

const readCategory = categoryAction.loadSpecifyFromFireStore;

class shopTags extends Component {
  state = { 
    innerHide: {display: "none"} ,
    deleteRequest: false,
  };

  componentDidMount() {
    this.props.loadFromFireStore();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.categories !== nextProps.categories &&
      nextProps.categories
    ) {
      if(this.state.deleteRequest){
        if(nextProps.categories.length > 0){
          notification("error", "cannot delete tag, tag are belong to category");
        } else {
          this.props.saveIntoFireStore(nextProps.tag, "delete");
        }
        this.setState({deleteRequest: false});
      }
    }
  }

  onClick = () => {
    if(this.state.innerHide.display === "block"){
      this.setState({innerHide: {display: "none"}});
    }else{
      this.setState({innerHide: {display: "block"}});
    }
  }

  urlChange(url){
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  handleRecord = async (actionName, tag) => {
    if (tag.id && actionName !== 'delete') 
    {
      actionName = 'update';
    }
    if (!tag.key && actionName == 'insert') 
    {
      tag.key = new Date().getTime().toString();
      tag.id = tag.key;
    }

    if(actionName === 'delete'){
      this.setState({deleteRequest: true});
      this.props.readCategory(tag.id);
      this.props.update(tag);
    } else {
      this.props.saveIntoFireStore(tag, actionName);
    }
  };

  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (tag = null) => {
    this.props.toggleModal(tag);
  };

  onRecordChange = (key, event) => {
    let { tag } = clone(this.props);
    if (key === "no") tag[key] = parseInt(event.target.value);
    else if(key) tag[key] = event.target.value;
    this.props.update(tag);
  };


  onSelectChange = (key, value) => {
    let { tag } = clone(this.props);
    if (key) tag[key] = value;
    this.props.update(tag);
  };

  render() {
    const { url } = this.props.match;
    const { modalActive, tags } = this.props;
    const { tag } = clone(this.props);
    const dataSource = [];
    const optionUrl = this.urlChange(url);

    Object.keys(tags).map((tag, index) => {
      return dataSource.push({
        ...tags[tag],
        key: tag,
      });
    });
    //console.log(dataSource)
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'Position Number',
        dataIndex: 'no',
        key: 'no',
        width: '150px',
        sorter: (a, b) => {
          if (a.no < b.no) return -1;
          if (a.no > b.no) return 1;
          return 0;
        },
      },

      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        //width: '200x',
        sorter: (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        },
      },

      
      
      {
        title: 'Actions',
        key: 'action',
        width: '60px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirm
                title="Are you sure to delete this tag？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirm>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <ScreenHolder>
          <InnerSidebar
            url={optionUrl}
            optionControl="shopList"
            displayStatus={this.state.innerHide}
          />
          <ContentBox
            title="Tags List"
            onClick={this.onClick.bind(this)}
          >
              <ButtonHolders>
                {/*<ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                  </ActionBtn>*/}

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new tag
                </ActionBtn>
              </ButtonHolders>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={tag.key ? 'Update Tag' : 'Add New Tag'}
              okText={tag.key ? 'Update Tag' : 'Add Tag'}
              onOk={this.handleRecord.bind(this, 'insert', tag)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Position Number: </Label>
                  <Input
                    type="number"
                    label="number"
                    placeholder="Enter Tag Position Number"
                    value={tag.no}
                    onChange={this.onRecordChange.bind(this, 'no')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Title: </Label>
                  <Input
                    label="title"
                    placeholder="Enter Tag Title"
                    rows={1}
                    value={tag.title}
                    onChange={this.onRecordChange.bind(this, 'title')}
                  />
                </Fieldset>

              </Form>
            </Modal>
            <TableWrapper
              rowKey="key"
              rowSelection={rowSelection}
              columns={columns}
              bordered={true}
              dataSource={dataSource}
              loading={this.props.isLoading || this.state.deleteRequest}
              className="isoSimpleTable"
              pagination={{
                // defaultPageSize: 1,
                hideOnSinglePage: true,
                total: dataSource.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
                },
              }}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  const categories = state.ShopCategories.categories;
  return { 
    ...state.ShopTags,
    categories
  };
};

export default connect(
  mapStatetoprops,
  { ...actions, readCategory}
)(shopTags);
