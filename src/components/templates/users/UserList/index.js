import React from "react";
import { Popconfirm, Modal, Descriptions } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import { Form } from "marslab-library-react/components/organisms/Form";
import moment from "moment";

import {
  Content,
  ActionWrapper,
  LabelFieldsetStyle,
  DescFieldsetStyle,
  RowHolderStyle,
  Image,
} from "./styles";


export default ({
    loading,
    dataSource,
    singleDataSource,
    modalActive,
    handleModal,
    imageModal,
    photoView
}) => {

    const formItem = [
        [
            {
                type: "label",
                label: "User Photo",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: singleDataSource.photoURL && "image",
                src: singleDataSource.photoURL,
                width: 100,
                height: 100,
                onClick: imageModal.bind(this)
            }
        ],
        [
            {
                type: "label",
                label: "User ID",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.id,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "User Phone",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.phoneNumber,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "User Name",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.displayName,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Email",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.email,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "IC",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.identityNumber,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        [
            {
                type: "label",
                label: "Gender",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.gender,
                FieldsetStyle: DescFieldsetStyle
            }
        ],
        // [
        //     {
        //         type: "label",
        //         label: "Address",
        //         FieldsetStyle: LabelFieldsetStyle
        //     },
        //     {
        //         type: "label",
        //         label:  singleDataSource.address.line1 + ", " +
        //                 singleDataSource.address.line2 + ", " +
        //                 singleDataSource.address.postcode + ", " +
        //                 singleDataSource.address.state + ", " +
        //                 singleDataSource.address.country,
        //         FieldsetStyle: DescFieldsetStyle
        //     }
        // ],
        [
            {
                type: "label",
                label: "Join At",
                FieldsetStyle: LabelFieldsetStyle
            },
            {
                type: "label",
                label: singleDataSource.id && moment(singleDataSource.created.at).format("L"),
                FieldsetStyle: DescFieldsetStyle
            }
        ],
    ];

    const columns = [
        {
            title: "User Phone",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "120px",
            sorter: (a, b) => {
              if (a.phoneNumber < b.phoneNumber) return -1;
              if (a.phoneNumber > b.phoneNumber) return 1;
              return 0;
            }
        },
        {
            title: "User Name",
            dataIndex: "displayName",
            key: "displayName",
            width: "120px",
            sorter: (a, b) => {
                if (b.displayName === null) return -1;
                if (a.displayName === null) return 1;
                if (a.displayName < b.displayName) return -1;
                if (a.displayName > b.displayName) return 1;
              return 0;
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "120px",
            sorter: (a, b) => {
                if (b.email === null) return -1;
                if (a.email === null) return 1;
                if (a.email < b.email) return -1;
                if (a.email > b.email) return 1;
              return 0;
            }
        },
        {
            title: 'Actions',
            key: 'action',
            width: '30px',
            className: 'noWrapCell',
            render: (text, row) => {
              return (
                <ActionWrapper>
                  <a onClick={handleModal.bind(this, row)}>
                    <i className="ion-android-create" />
                  </a>
                </ActionWrapper>
              );
            },
        },
    ];

    return (
        <Content>
            {<Table
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
            />}
            
            <Modal
                visible={modalActive}
                title={"User"}
                onCancel={handleModal.bind(this, null)}
                footer={null}
            >
                <Form
                    formItem={formItem}
                    RowHolderStyle={RowHolderStyle}
                />

                <Modal
                    visible={photoView}
                    onCancel={imageModal.bind(this)}
                    footer={null}
                >
                    <Image
                        style={{ width: 450, height: 450 }}
                        src={singleDataSource.photoURL}
                    />
                </Modal>
            </Modal>
        </Content>
    );
};
