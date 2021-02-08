import React from "react";
import { Button } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import ListCard from "marslab-library-react/components/organisms/ListCard";
import moment from "moment";

import {
  Content,
  ButtonHolders,
  TableStyle,
  ActionButtonStyle
} from "./styles";

export default ({
  loading = false,
  dataSource = [],
  onRowClick,
  onAddPost
}) => {
    const Tables = TableStyle(Table);
    const ActionBtn = ActionButtonStyle(Button);

  const columns = [
    // {
    //   title: "Post ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: "120x",
    //   sorter: (a, b) => {
    //     if (a.id < b.id) return -1;
    //     if (a.id > b.id) return 1;
    //     return 0;
    //   }
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "120x",
      sorter: (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "120x",
      render: (text, row) => {
        return (
          <p
            dangerouslySetInnerHTML={{ __html: row.description }}
          />
        );
      },
    },
    {
      title: "Created At",
      dataIndex: ["created", "at"],
      key: "createdAt",
      width: "120x",
      render: (data) => {
          return moment(data).format("L hh:mm a");
      },
      sorter: (a, b) => {
        if (a.created.at < b.created.at) return -1;
        if (a.created.at > b.created.at) return 1;
        return 0;
      }
  },
  ];

  return (
    <Content>
      {dataSource.length !== 0 && (
        <ListCard
          dataIndex="title"
          dataSource={dataSource}
          navigation="View Details"
          onClick={onRowClick}
          numberDisplay={6}
          gutter="17"
          xs="1"
          sm="2"
          md="2"
          lg="3"
          xl="4"
          xxl="4"
        />
      )}

      <ButtonHolders>
        <ActionBtn type="primary" onClick={onAddPost}>
          Add new post
        </ActionBtn>
      </ButtonHolders>

      <Tables
        rowKey="id"
        loading={loading}
        className="isoSimpleTable"
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        onRow={(record, rowIndex) => {
          return {
            onClick: onRowClick.bind(this, record)
          };
        }}
        pagination={{
          hideOnSinglePage: true,
          total: dataSource.length,
          showTotal: (total, range) => {
            return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
          }
        }}
      />
    </Content>
  );
};
