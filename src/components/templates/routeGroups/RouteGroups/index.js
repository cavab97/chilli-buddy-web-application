import React from "react";
import { Button } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import ListCard from "marslab-library-react/components/organisms/ListCard";

import {
  RouteContent,
  ButtonHolders,
  TableStyle,
  ActionButtonStyle
} from "./styles";

export default ({
  dataSource = [],
  readLoading = false,
  onRowClick,
  onAddRoute
}) => {
  const Tables = TableStyle(Table);
  const ActionBtn = ActionButtonStyle(Button);

  const columns = [
    {
      title: "Route Group Name",
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
      title: "Total Routes",
      dataIndex: "totalRoutes",
      key: "totalRoutes",
      width: "120x",
      sorter: (a, b) => {
        if (a.totalRoutes < b.totalRoutes) return -1;
        if (a.totalRoutes > b.totalRoutes) return 1;
        return 0;
      }
    },
    {
      title: "Pending Routes",
      dataIndex: "pendingRoutes",
      key: "pendingRoutes",
      width: "120x",
      sorter: (a, b) => {
        if (a.pendingRoutes < b.pendingRoutes) return -1;
        if (a.pendingRoutes > b.pendingRoutes) return 1;
        return 0;
      }
    },
    {
      title: "Ongoing Routes",
      dataIndex: "ongoingRoutes",
      key: "ongoingRoutes",
      width: "120x",
      sorter: (a, b) => {
        if (a.ongoingRoutes < b.ongoingRoutes) return -1;
        if (a.ongoingRoutes > b.ongoingRoutes) return 1;
        return 0;
      }
    },
    {
      title: "End Routes",
      dataIndex: "endRoutes",
      key: "endRoutes",
      width: "120x",
      sorter: (a, b) => {
        if (a.endRoutes < b.endRoutes) return -1;
        if (a.endRoutes > b.endRoutes) return 1;
        return 0;
      }
    }
];

  return (
    <RouteContent>
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
        <ActionBtn type="primary" onClick={onAddRoute}>
          Add new route group
        </ActionBtn>
      </ButtonHolders>

      <Tables
        rowKey="id"
        //rowSelection={rowSelection}
        loading={readLoading}
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
    </RouteContent>
  );
};
