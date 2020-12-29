import React from "react";
import { ActionButton } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";
import { Popconfirm } from "marslab-library-react/components/atoms";
import { Content, ActionWrapper, TableWrapper } from "./styles";
export default ({
  dataSource,
  rowSelection,
  loading,
  getColumnSearchProps,
  handleModal,
  handleRecord,
}) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "120x",
      sorter: (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      },
      ...getColumnSearchProps("title", "title"),
    },
    {
      title: "Pop Up",
      dataIndex: "isPopUp",
      key: "isPopUp",
      width: "120x",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      onFilter: (value, record) => record.isPopUp.indexOf(value) === 0,
      sorter: (a, b) => {
        if (a.isPopUp < b.isPopUp) return -1;
        if (a.isPopUp > b.isPopUp) return 1;
        return 0;
      },

      //...this.getColumnSearchProps("isPopUp", "pop up"),
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      width: "120px",
      sorter: (a, b) => {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
      },
      ...getColumnSearchProps("key", "key"),
    },

    {
      title: "Create At",
      dataIndex: "createAtString",
      key: "createAtString",
      width: "120x",
      sorter: (a, b) => {
        if (a.createAt < b.createAt) return -1;
        if (a.createAt > b.createAt) return 1;
        return 0;
      },
      ...getColumnSearchProps("createAtString", "create at"),
    },

    {
      title: "Actions",
      key: "action",
      width: "60px",
      className: "noWrapCell",
      render: (text, row) => {
        return (
          <ActionWrapper>
            <a
              onClick={handleModal.bind(this, {
                toggle: true,
                nextPage: 0,
                data: row,
              })}
              href="# "
            >
              <i className="ion-android-create" />
            </a>
          </ActionWrapper>
        );
      },
    },
  ];

  return (
    <Content>
      <TableWrapper
        rowKey="key"
        rowSelection={rowSelection}
        columns={columns}
        bordered={true}
        dataSource={dataSource}
        loading={loading}
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
    </Content>
  );
};
