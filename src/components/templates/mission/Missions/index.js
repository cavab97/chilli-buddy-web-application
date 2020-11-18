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
  routeCategory,
  onRowClick,
  onAddRoute
}) => {
  const Tables = TableStyle(Table);
  const ActionBtn = ActionButtonStyle(Button);

  const columns = [
    {
      title: "Mission Name",
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
      title: "Minimum Spend (RM)",
      dataIndex: "minSpend",
      key: "minSpend",
      width: "120x",
      sorter: (a, b) => {
        if (a.minSpend < b.minSpend) return -1;
        if (a.minSpend > b.minSpend) return 1;
        return 0;
      }
    },
    {
      title: "Number Route Tickets",
      dataIndex: "numberRouteTickets",
      key: "numberRouteTickets",
      width: "120x",
      sorter: (a, b) => {
        if (a.numberRouteTickets < b.numberRouteTickets) return -1;
        if (a.numberRouteTickets > b.numberRouteTickets) return 1;
        return 0;
      }
    },
    {
      title: "Shop Name",
      dataIndex: ["shop", "title"],
      key: "shopTitle",
      width: "120x",
      sorter: (a, b) => {
        if (a.shop.title < b.shop.title) return -1;
        if (a.shop.title > b.shop.title) return 1;
        return 0;
      }
    },
  ];

  const columnsCheckIn = [
    {
      title: "Mission Name",
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
      title: "Number Route Tickets",
      dataIndex: "numberRouteTickets",
      key: "numberRouteTickets",
      width: "120x",
      sorter: (a, b) => {
        if (a.numberRouteTickets < b.numberRouteTickets) return -1;
        if (a.numberRouteTickets > b.numberRouteTickets) return 1;
        return 0;
      }
    },
    {
      title: "Shop Name",
      dataIndex: ["shop", "title"],
      key: "shopTitle",
      width: "120x",
      sorter: (a, b) => {
        if (a.shop.title < b.shop.title) return -1;
        if (a.shop.title > b.shop.title) return 1;
        return 0;
      }
    },
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
          Add new mission
        </ActionBtn>
      </ButtonHolders>

      <Tables
        rowKey="id"
        //rowSelection={rowSelection}
        loading={readLoading}
        className="isoSimpleTable"
        bordered={true}
        columns={routeCategory != "CheckIn" ? columns : columnsCheckIn}
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
