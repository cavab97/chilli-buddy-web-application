import React from "react";
import { Spin, Modal } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";
import Table from "../../../../screens/antTable.style";
import moment from "moment";

import {
  Content,
  ActionWrapper,
  LabelStyle
} from "./styles";

export default ({
    dataSource,
    modalDataSource,
    loading,
    modalActive,
    handleModal
}) => {

    const columns = [
        {
            title: "BusinessName",
            dataIndex: "businessName",
            key: "businessName",
            width: "120px",
            sorter: (a, b) => {
              if (a.businessName < b.businessName) return -1;
              if (a.businessName > b.businessName) return 1;
              return 0;
            }
        },
        {
            title: "SSM Number",
            dataIndex: "ssmNumber",
            key: "ssmNumber",
            width: "120px",
            sorter: (a, b) => {
                if (a.ssmNumber < b.ssmNumber) return -1;
                if (a.ssmNumber > b.ssmNumber) return 1;
                return 0;
            }
        },
        {
            title: "Date Joined",
            dataIndex: ["created", "at"],
            key: "dateJoined",
            width: "120px",
            render: (data) => {
                return moment(data).format("hh:mm a L");
            },
            sorter: (a, b) => {
              if (a.created.at < b.created.at) return -1;
              if (a.created.at > b.created.at) return 1;
              return 0;
            }
        },
        {
            title: "Owner Email",
            dataIndex: ["user", "email"],
            key: "ownerEmail",
            width: "120px",
            sorter: (a, b) => {
              if (a.user.email < b.user.email) return -1;
              if (a.user.email > b.user.email) return 1;
              return 0;
            }
        },
        {
            title: 'Actions',
            key: 'action',
            width: '30px',
            className: 'noWrapCell',
            render: (text, rowData) => {
              return (
                <ActionWrapper>
                  <a onClick={handleModal.bind(this, { rowData })}>
                    <i className="ion-android-create" />
                  </a>
                </ActionWrapper>
              );
            },
        },
    ];
    
    const formItem = modalDataSource && [
        [
            {
                type: "label",
                label: "Business Name :"
            },
            {
                type: "label",
                label: modalDataSource.businessName
            }
        ],
        [
            {
                type: "label",
                label: "SSM Number :"
            },
            {
                type: "label",
                label: modalDataSource.ssmNumber
            },
        ],
        [
            {
                type: "label",
                label: "Referral :"
            },
            {
                type: "label",
                label: modalDataSource.referral
            },
        ],
        [
            {
                type: "label",
                label: "Date Joined :"
            },
            {
                type: "label",
                label: moment(modalDataSource.created.at)
                            .format("hh:mm a L"),
            },
        ],
        [
            {
                type: "label",
                label: "Owner Email :"
            },
            {
                type: "label",
                label: modalDataSource.user.email
            },
        ],
        [
            {
                type: "label",
                label: "Address 1 :"
            },
            {
                type: "label",
                label: modalDataSource.address.line1
            },
        ],
        [
            {
                type: "label",
                label: "Address 2 :"
            },
            {
                type: "label",
                label: modalDataSource.address.line2
            },
        ],
        [
            {
                type: "label",
                label: "Postcode :"
            },
            {
                type: "label",
                label: modalDataSource.address.postcode
            },
        ],
        [
            {
                type: "label",
                label: "City :"
            },
            {
                type: "label",
                label: modalDataSource.address.city
            },
        ],
        [
            {
                type: "label",
                label: "State :"
            },
            {
                type: "label",
                label: modalDataSource.address.state
            },
        ],
        [
            {
                type: "label",
                label: "Country :"
            },
            {
                type: "label",
                label: modalDataSource.address.country
            },
        ],
    ];

    if(loading){
        return <Spin size="large" style={{width: "100%"}} />;
    }
    else{
        return (
            <Content>
                <Table
                    rowKey="id"
                    columns={columns}
                    bordered={true}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        defaultPageSize: 10,
                        hideOnSinglePage: true,
                        total: dataSource.length,
                        showTotal: (total, range) => {
                        return `Showing ${range[0]}-${range[1]} of ${
                            dataSource.length
                        } Results`;
                        },
                    }}
                />

                <Modal
                    title="Visitor Merchant Detail"
                    visible={modalActive}
                    onCancel={handleModal.bind(this, {})}
                    footer={null}
                >
                    { formItem &&
                        <Form
                            formItem={formItem}
                            LabelStyle={LabelStyle}
                        />
                    }
                </Modal>
            </Content>
        )
    }
};
