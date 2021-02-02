import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/settings/shops/categories/actions";
import { notification } from "marslab-library-react/components/organisms";
import {
  SelectOption as Option,
  Select,
  Button,
  Input,
  Textarea,
  Modal,
  Popconfirm,
} from "marslab-library-react/components/atoms";
import { LayoutWrapper, Box, ContentHolder } from "marslab-library-react/components/molecules";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
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
} from "./styles";
import clone from "clone";

class shopCategories extends Component {
  state = { innerHide: { display: "none" } };

  componentDidMount() {
    this.props.loadFromFireStore();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errorMessage !== nextProps.errorMessage && nextProps.errorMessage) {
      notification("error", nextProps.errorMessage);
    }
  }

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  handleRecord = async (actionName, category) => {
    if (category.id && actionName !== "delete") {
      actionName = "update";
    }
    if (!category.key && actionName == "insert") {
      category.key = new Date().getTime().toString();

      category.id = category.key;
    }

    this.props.saveIntoFireStore(category, actionName);
  };

  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (category = null) => {
    this.props.toggleModal(category);
  };

  onRecordChange = (key, event) => {
    let { category } = clone(this.props);
    if (key === "no") category[key] = parseInt(event.target.value);
    else if (key) category[key] = event.target.value;
    this.props.update(category);
  };

  onSelectChange = (key, value) => {
    let { category } = clone(this.props);
    if (key) category[key] = value;
    this.props.update(category);
  };

  render() {
    const { url } = this.props.match;
    const { modalActive, categories } = this.props;
    const { category } = clone(this.props);
    const dataSource = [];
    const optionUrl = this.urlChange(url);
    console.log(this.props.categories);
    Object.keys(categories).map((category, index) => {
      return dataSource.push({
        ...categories[category],
        key: category,
      });
    });
    //console.log(dataSource)
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: "Position Number",
        dataIndex: "no",
        key: "no",
        width: "150px",
        sorter: (a, b) => {
          if (a.no < b.no) return -1;
          if (a.no > b.no) return 1;
          return 0;
        },
      },

      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        //width: '200x',
        sorter: (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        },
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        render: (tags) => (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <StatusTag style={{ borderRadius: 5, marginHorizontal: 2 }} color={color} key={tag}>
                  {this.props.shop_tags[tag].title.toUpperCase()}
                </StatusTag>
              );
            })}
          </span>
        ),
      },
      {
        title: "Actions",
        key: "action",
        width: "60px",
        className: "noWrapCell",
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirm
                title="Are you sure to delete this category？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, "delete", row)}
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
        <ContentBox title="Categories List" onClick={this.onClick.bind(this)}>
          <ButtonHolders>
            {/*<ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                  </ActionBtn>*/}

            <ActionBtn type="primary" onClick={this.handleModal.bind(this, null)}>
              Add new category
            </ActionBtn>
          </ButtonHolders>

          <Modal
            visible={modalActive}
            onClose={this.props.toggleModal.bind(this, null)}
            title={category.key ? "Update Category" : "Add New Category"}
            okText={category.key ? "Update Category" : "Add Category"}
            onOk={this.handleRecord.bind(this, "insert", category)}
            onCancel={this.props.toggleModal.bind(this, null)}
          >
            <Form>
              <Fieldset>
                <Label>Position Number: </Label>
                <Input
                  type="number"
                  label="number"
                  placeholder="Enter category Position Number"
                  value={category.no}
                  onChange={this.onRecordChange.bind(this, "no")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Title: </Label>
                <Input
                  label="title"
                  placeholder="Enter category Title"
                  rows={1}
                  value={category.title}
                  onChange={this.onRecordChange.bind(this, "title")}
                />
              </Fieldset>

              <Fieldset>
                <Label>Tags: </Label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Tags"
                  value={category.tags}
                  onChange={this.onSelectChange.bind(this, "tags")}
                  optionFilterProp="children"
                >
                  {Object.values(this.props.shop_tags).map((tag) => {
                    return (
                      <Option key={tag.key} value={tag.key}>
                        {tag.title}
                      </Option>
                    );
                  })}
                </Select>
              </Fieldset>
            </Form>
          </Modal>
          <TableWrapper
            rowKey="key"
            rowSelection={rowSelection}
            columns={columns}
            bordered={true}
            dataSource={dataSource}
            loading={this.props.isLoading}
            className="isoSimpleTable"
            pagination={{
              // defaultPageSize: 1,
              hideOnSinglePage: true,
              total: dataSource.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
              },
            }}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const shop_tags = state.ShopTags.tags;

  return { ...state.ShopCategories, shop_tags };
};

export default connect(mapStatetoprops, actions)(shopCategories);
