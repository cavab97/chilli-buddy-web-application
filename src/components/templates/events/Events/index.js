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
  dataSource = [],
  readLoading = false,
  onRowClick,
  onAddRoute
}) => {
  const Tables = TableStyle(Table);
  const ActionBtn = ActionButtonStyle(Button);

  dataSource.map((data) => {
    data["status"] = data.terminated.by ? "Terminated" 
                    : (data.published.by ? "Published" 
                    : "Pending" );
  });

  const columns = [
    {
      title: "Event Name",
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
      title: "Start Date",
      dataIndex: "startTime",
      key: "startTime",
      width: "120x",
      render: (data) => {
        return moment(data).format("DD MMM YYYY");
      },
      sorter: (a, b) => {
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
      }
    },
    {
      title: "End Date",
      dataIndex: "endTime",
      key: "endTime",
      width: "120x",
      render: (data) => {
        return moment(data).format("DD MMM YYYY");
      },
      sorter: (a, b) => {
        if (a.endTime < b.endTime) return -1;
        if (a.endTime > b.endTime) return 1;
        return 0;
      }
    },
    {
      title: "Assigned Reward",
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
      title: "Total Reward",
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
        <ActionBtn type="primary" onClick={onAddRoute}>
          Add new event
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
    </Content>
  );
};
