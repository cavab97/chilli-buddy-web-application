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
  routeTickets = [],
  onRowClick,
  onAddRoute,
  onClaim
}) => {
  const Tables = TableStyle(Table);
  const ActionBtn = ActionButtonStyle(Button);


  dataSource.map(data => {
    if(data.user.phoneNumber){
      data["status"] = "Assigned";
    }else{
      data["status"] = "Not Assigned";
    }

    routeTickets.map(ticket => {

      if(data.routeTicketIds){
        if(ticket.id === data.routeTicketIds[0] && true){
          if(ticket.numberCompletedMissions === ticket.numberApprovedMission){
            data["transactionApprove"] = "Valid";
          }else{
            data["transactionApprove"] = "Invalid";
          }
        }
      }else{
        data["transactionApprove"] = "-";
      }      
    });
  });

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: "120x",
      sorter: (a, b) => {
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;
        return 0;
      }
    },
    {
      title: "Reward Title",
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
      title: "Obtainer ID",
      dataIndex: ["user", "id"],
      key: "userId",
      width: "120x",
      sorter: (a, b) => {
        if (a.user.id < b.user.id) return -1;
        if (a.user.id > b.user.id) return 1;
        return 0;
      }
    },
    {
      title: "Obtainer Name",
      dataIndex: ["user", "displayName"],
      key: "userDisplayName",
      width: "120x",
      sorter: (a, b) => {
        if (a.user.displayName < b.user.displayName) return -1;
        if (a.user.displayName > b.user.displayName) return 1;
        return 0;
      }
    },
    {
      title: "Obtainer Phone",
      dataIndex: ["user", "phoneNumber"],
      key: "userPhoneNumber",
      width: "120x",
      sorter: (a, b) => {
        if (a.user.phoneNumber < b.user.phoneNumber) return -1;
        if (a.user.phoneNumber > b.user.phoneNumber) return 1;
        return 0;
      }
    },
    {
      title: "Obtainer Email",
      dataIndex: ["user", "email"],
      key: "userEmail",
      width: "120x",
      sorter: (a, b) => {
        if (a.user.email < b.user.email) return -1;
        if (a.user.email > b.user.email) return 1;
        return 0;
      }
    },
    {
      title: "Reward Status",
      dataIndex: "status",
      key: "status",
      width: "120x",
      sorter: (a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      }
    },
    {
      title: "Transaction Approve",
      dataIndex: "transactionApprove",
      key: "transactionApprove",
      width: "120x",
      sorter: (a, b) => {
        if (a.transactionApprove < b.transactionApprove) return -1;
        if (a.transactionApprove > b.transactionApprove) return 1;
        return 0;
      }
    },
    {
      title: 'Claim status',
      dataIndex: ["claimed", "at"],
      key: 'claimedStatus',
      width: '30px',
      render: (data) => {
        if(data){
          return "Claim";
        }else{
          return "No Claim";
        } 
      },
      sorter: (a, b) => {
        if (a.claimed.at < b.claimed.at) return -1;
        if (a.claimed.at > b.claimed.at) return 1;
        return 0;
      }
    }
  ];

  const listCardDataSource = [];

  for(let i = 0; i < dataSource.length && i < 6; i++){
    listCardDataSource.push(dataSource[i]);
  }

  return (
    <RouteContent>
      {dataSource.length !== 0 && (
        <ListCard
          dataIndex="title"
          dataSource={listCardDataSource}
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
          Add new Reward
        </ActionBtn>
      </ButtonHolders>

      <Tables
        rowKey="id"
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
