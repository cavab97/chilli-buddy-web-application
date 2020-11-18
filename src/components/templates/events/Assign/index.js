import React from "react";
import { Divider, Popconfirm, ActionButton, Spin } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
    Content,
    Title,
    ButtonFieldsetStyle,
    ButtonStyle,
    LabelStyle,
    LabelFieldsetStyle,
    TableStyle
} from "./styles";
import moment from "moment";

export default ({
    dataSource,
    noTicket,
    noReward,
    allAssigned,
    onSubmit,
    onAssignLoading,
    onAssign,
    tableData,
    tableLoading
}) => {
    const Tables = TableStyle(Table);

    tableData.map((data, index) => {
        data["index"] = index + 1;
    });

    const formItem = [
        [
            {
                type: "label",
                label: "Rank :",
                LabelStyle: LabelStyle,
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: dataSource ? dataSource.rank : null
            }
        ],
        [
            {
                type: "label",
                label: "Reward Title :",
                LabelStyle: LabelStyle,
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: dataSource ? dataSource.title : null
            }
        ],
        [
            {
                type: "label",
                label: "Reward Image",
                LabelStyle: LabelStyle,
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: dataSource && ( dataSource.images[0] ? "image" : null),
                src: dataSource ? dataSource.images[0] : null,
                height: 100,
                width: 100,
            }
        ],
    ];


    const columns = [
        {
            title: "No",
            dataIndex: "index",
            key: "index",
            width: "120x",
            sorter: (a, b) => {
              if (a.index < b.index) return -1;
              if (a.index > b.index) return 1;
              return 0;
            }
          },
        {
          title: "User Name",
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
            title: "User Phone Number",
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
            title: "Route Name",
            dataIndex: ["route", "title"],
            key: "routeTitle",
            width: "120x",
            sorter: (a, b) => {
              if (a.route.title < b.route.title) return -1;
              if (a.route.title > b.route.title ) return 1;
              return 0;
            }
        },
        {
            title: "Join Date",
            dataIndex: ["created", "at"],
            key: "userDisplayName",
            width: "120x",
            render: data => {
                return moment(data).format("L");
            },
            sorter: (a, b) => {
              if (a.created.at < b.created.at) return -1;
              if (a.created.at > b.created.at) return 1;
              return 0;
            }
        },
        {
            title: "Actions",
            key: "action",
            width: "60px",
            className: "noWrapCell",
            render: (text, row) => {
              return (
                <Popconfirm
                    title="Are you sure to assign reward to this user ? "
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                    onConfirm={onAssign.bind(this, row)}
                >
                    <ActionButton
                        loading={onAssignLoading}
                    >
                        Assign
                    </ActionButton>
                </Popconfirm>
              );
            }
        }
    ];

    //if((dataSource.id === null || tableLoading) && !allAssigned){
    if(tableLoading){
        return <Spin size="large" style={{width: "100%"}} />;
    }else{
        if(noReward){
            return (
                <Content>
                    <Title>No any reward</Title>
                </Content>
            );
        }else if(allAssigned){
            return (
                <Content>
                    <Title>All rewards are assigned</Title>
                </Content>
            );
        }else{
            return (
                <Content>
                    <Form 
                        formItem={formItem}
                    />

                    <Divider />

                    <Tables
                        rowKey="id"
                        columns={columns}
                        dataSource={tableData}
                        loading={tableLoading}
                    />
                </Content>
            );
        }
    }
};
