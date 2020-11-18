import React from "react";
import { Divider, Popconfirm, ActionButton, Spin, Checkbox } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
    ActionContent,
    Content,
    Title,
    LabelStyle,
    LabelFieldsetStyle,
    TableStyle,
    ButtonHolders,
    ActiveStyle,
    DeactiveStyle,
    hide,
    ActiveButton,
    DeactiveButton
} from "./styles";
import moment from "moment";

export default ({
    loading,
    dataSource,
    totalMissions,
    numberCompletedMissions, /**NEW */
    checkModeButton,
    activateMode1,
    activateMode2,
    noReward,
    fullVerify,
    onAssignLoading,
    assignCompleteLoading,
    assignCompleted,
    onAssign,
    onRecordChange,
    onTransactionView,
    updateWaiting,
    routeTicketSubmitLoading,
    tableData,
    tableLoading,
    onAssignComplete
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
        [
            {
                type: "label",
                label: "Stage",
                LabelStyle: LabelStyle,
                FieldsetStyle: LabelFieldsetStyle
            }
            
        ]
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
        /**NEW */
        {
            title: "Completed Mission",
            dataIndex: ["numberCompletedMissions"],
            key: "numberOfCompletedMission",
            width: "120x",
            sorter: (a, b) => {
              if (a.numberCompletedMissions < b.numberCompletedMissions) return -1;
              if (a.numberCompletedMissions > b.numberCompletedMissions ) return 1;
              return 0;
            }
        },
        {
            title: "Approved Transaction",
            dataIndex: ["numberApprovedMission"],
            key: "numberOfApprovedMission",
            width: "100x",
            sorter: (a, b) => {
              if (a.numberApprovedMission < b.numberApprovedMission) return -1;
              if (a.numberApprovedMission > b.numberApprovedMission ) return 1;
              return 0;
            }
        },
        /** END NEW */
        {
            title: "Reward Obtain",
            dataIndex: ["reward", "title"],
            key: "rewardTitle",
            width: "120x",
            sorter: (a, b) => {
              if (a.reward.title < b.reward.title) return -1;
              if (a.reward.title > b.reward.title ) return 1;
              return 0;
            }
        },
        {
            title: "Date Complete",
            dataIndex: ["completedMissions"],
            key: "userDisplayName",
            width: "120x",
            render: data => {
                /**NEW */
                if(data[data.length -1]){
                    const format = "DD/MM/YYYY HH:mm:ss"; 
                    return moment(data[data.length -1].at.seconds * 1000).format(format);
                } else {
                    return null;
                }
            },
            sorter: (a, b) => {

                if (a.completedMissions[a.numberCompletedMissions - 1] === null) return 1;
                if (b.completedMissions[b.numberCompletedMissions - 1] === null) return -1;
                if(a.completedMissions[a.numberCompletedMissions - 1] && b.completedMissions[b.numberCompletedMissions - 1] !== null){
                if (a.completedMissions[a.numberCompletedMissions - 1].at < b.completedMissions[b.numberCompletedMissions - 1].at) return -1;
                if (a.completedMissions[a.numberCompletedMissions - 1].at > b.completedMissions[b.numberCompletedMissions - 1].at) return 1;
                return 0;}
                
                /**END NEW */
                /*if (a.completedMissions[totalMissions - 1].at < b.completedMissions[totalMissions - 1].at) return -1;
                if (a.completedMissions[totalMissions - 1].at > b.completedMissions[totalMissions - 1].at) return 1;
                return 0;*/
                
                /*if (a.completedMissions[numberCompletedMissions - 1] && b.completedMissions[totalMissions - 1]){ return 0;}
                else if (a.completedMissions[totalMissions - 1].at === null){ return 1;}
                else if (b.completedMissions[totalMissions - 1].at === null){ return -1;}
                else if (a.completedMissions[totalMissions - 1].at < b.completedMissions[totalMissions - 1].at){ return -1;}
                else if (a.completedMissions[totalMissions - 1].at > b.completedMissions[totalMissions - 1].at){ return 1;}
                else{
                    return 0;}*/
                
                /*return (a.completedMissions[totalMissions - 1].at===null)-(b.completedMissions[totalMissions - 1].at===null) || +(a.completedMissions[totalMissions -1].at>b.completedMissions[totalMissions - 1].at)||-(a.completedMissions[totalMissions - 1].at<b.completedMissions[totalMissions - 1].at);*/
            }
        },
        {
            title: "Actions",
            key: "action",
            width: "60px",
            className: "noWrapCell",
            render: (text, row) => {
                if (checkModeButton == false){ 
                    return (
                        <ActionContent>
                            <ActionButton
                                onClick={onTransactionView.bind(this, row.id)}
                                loading={onAssignLoading || updateWaiting}
                            >
                                Transaction
                        </ActionButton>
                        </ActionContent> );} 
              else{
                  return (
                    <ActionContent>  
                    <Popconfirm
                        title="Are you sure to assign reward to this user ? "
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                        onConfirm={onAssign.bind(this, row)}
                        disabled={row.reward.id ? true : assignCompleted ? true : false}
                    >
                        <ActionButton
                            loading={onAssignLoading || updateWaiting}
                            disabled={row.reward.id ? true : assignCompleted ? true : false}
                            style={row.reward.id ? DeactiveButton : assignCompleted ? DeactiveButton : ActiveButton}
                        >
                            Assign
                        </ActionButton>

                    </Popconfirm>
                </ActionContent>
              );}
            }     
        },
        {
            
            title: "Verify",
            key: "action",
            width: "60px",
            className: "noWrapCell",
            render: (rowData) => {
                return (
                    <Checkbox
                        onChange={onRecordChange.bind(this, rowData)}
                        checked={rowData.verify}
                        disabled={(fullVerify && !rowData.verify)}
                    >
                        {rowData.verify ? "Valid" : "Invalid" }
                    </Checkbox>
                );
                
            }
        },
    ];

    //if((dataSource.id === null || tableLoading) && !allAssigned){
    if(loading || tableLoading){
        return <Spin size="large" style={{width: "100%"}} />;
    }else{
        if(noReward){
            return (
                <Content>
                    <Title>No any reward</Title>
                </Content>
            );
        }else if(assignCompleted){
            return (
                <Content>
                    <Title>Assign completed</Title>
                </Content>
            );
        }else{
            return (
                <Content>
                    <Form 
                        formItem={formItem}
                    />

                    <ActionButton shape ="circle" style={checkModeButton === true ? ActiveStyle : DeactiveStyle} onClick={activateMode1}>1</ActionButton>
                    <hr style={{ borderBottomColor: 'black', borderBottomWidth: 1, width:'100px', display: 'inline-block', marginRight:'15px' }} />
                    <ActionButton shape="circle" style={checkModeButton === true ? DeactiveStyle : ActiveStyle} onClick={activateMode2}>2</ActionButton>
                    
                    <ButtonHolders>
                    <Popconfirm
                        title="Are you sure your would like to announce result ? (* this action cannot be undo, please ensure all rewards had been assign completed) "
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                        onConfirm={onAssignComplete}
                    >
                        <ActionButton
                            loading={assignCompleteLoading} style={checkModeButton === false ? hide : DeactiveStyle}
                        >
                            Announce Result
                        </ActionButton>
                    </Popconfirm>
                    </ButtonHolders>

                    <Divider />    

                    <Tables
                        rowKey="id"
                        columns={columns}
                        dataSource={tableData}
                        loading={tableLoading || routeTicketSubmitLoading}
                    />
                </Content>
            );
        }
    }
};
