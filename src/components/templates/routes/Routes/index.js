import React from "react";
import { Button } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import ListCard from "marslab-library-react/components/organisms/ListCard";
import moment from "moment";
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

  dataSource.map((data) => {
    data["status"] = data.terminated.by ? "Terminated"
                    : data.ended.boolean ? "End"
                    : (data.published.by ? "Published" 
                    : "Pending" );
  });

  const columns = [
    {
      title: "Route Name",
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
      title: "Category",
      dataIndex: "category",
      key: "title",
      width: "120x",
      sorter: (a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return 0;
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "120x",
      sorter: (a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      }
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      width: "120x",
      render: (data) => {
        return moment(data).format("hh:mm a   L");
      },
      sorter: (a, b) => {
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
      }
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      width: "120x",
      render: (data) => {
        return moment(data).format("hh:mm a   L");
      },
      sorter: (a, b) => {
        if (a.endTime < b.endTime) return -1;
        if (a.endTime > b.endTime) return 1;
        return 0;
      }
    },
    {
      title: "Minimum User",
      dataIndex: "minimumUser",
      key: "minimumUser",
      width: "120x",
      sorter: (a, b) => {
        if (a.minimumUser < b.minimumUser) return -1;
        if (a.minimumUser > b.minimumUser) return 1;
        return 0;
      }
    },
    {
      title: "Current User",
      dataIndex: "currentUser",
      key: "currentUser",
      width: "120x",
      sorter: (a, b) => {
        if (a.currentUser < b.currentUser) return -1;
        if (a.currentUser > b.currentUser) return 1;
        return 0;
      }
    },
    {
      title: "Assigned Rewards",
      dataIndex: "assignedRewards",
      key: "assignedRewards",
      width: "120x",
      sorter: (a, b) => {
        if (a.assignedRewards < b.assignedRewards) return -1;
        if (a.assignedRewards > b.assignedRewards) return 1;
        return 0;
      }
    },
    {
      title: "Total Rewards",
      dataIndex: "totalRewards",
      key: "totalRewards",
      width: "120x",
      sorter: (a, b) => {
        if (a.totalRewards < b.totalRewards) return -1;
        if (a.totalRewards > b.totalRewards) return 1;
        return 0;
      }
    },
    {
      title: "Total Missions",
      dataIndex: "totalMissions",
      key: "totalMissions",
      width: "120x",
      sorter: (a, b) => {
        if (a.totalMissions < b.totalMissions) return -1;
        if (a.totalMissions > b.totalMissions) return 1;
        return 0;
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "120x",
      sorter: (a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
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
          Add new route
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
