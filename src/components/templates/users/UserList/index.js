import React from "react";
import { AntdIcon, Modal, Descriptions } from "marslab-library-react/components/atoms";
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
  ErrorInputStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  InputStyle,
  FieldsetStyle,
  LabelStyle,
  ButtonStyle
} from "./styles";
import { signupRequest } from "marslab-library-react/redux/auth/saga";


export default ({
    loading,
    dataSource,
    singleDataSource,
    modalActive,
    handleModal,
    imageModal,
    photoView,
    errorReturn,
    loginDetails,
    handleSignupModal,
    signupModalActive,
    submitLoading,
    onLoginRecordChange,
    handleSignup
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

    const signupFormItem = [
        [
          {
            type: "label",
            label: "User Email *",
          },
        ],
        [
          {
            type: "text",
            placeholder: "Enter User Email",
            data: loginDetails.email,
            onChange: onLoginRecordChange.bind(this, "email"),
            InputStyle: errorReturn?.loginDetails?.email ? ErrorInputStyle : null,
            iconRigth: errorReturn?.loginDetails?.email ? (
              <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            ) : null,
          },
        ],
        [
          {
            type: "label",
            label: errorReturn?.loginDetails ? "*" + errorReturn.loginDetails.email : "",
            FieldsetStyle: ErrorMsgFieldsetStyle,
            LabelStyle: ErrorMsgLabelStyle,
            hide: errorReturn?.loginDetails ? false : true,
          },
        ],
        [
          {
            type: "label",
            label: "User Password *",
          },
        ],
        [
          {
            type: "text",
            placeholder: "Enter User Password",
            data: loginDetails.password,
            onChange: onLoginRecordChange.bind(this, "password"),
            InputStyle: errorReturn?.loginDetails?.password ? ErrorInputStyle : null,
            iconRigth: errorReturn?.loginDetails?.password ? (
              <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            ) : null,
          },
        ],
        [
          {
            type: "label",
            label: errorReturn?.loginDetails ? "*" + errorReturn?.loginDetails.password : "",
            FieldsetStyle: ErrorMsgFieldsetStyle,
            LabelStyle: ErrorMsgLabelStyle,
            hide: errorReturn?.loginDetails?.password ? false : true,
          },
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

            <Modal
                title="Create New User Account"
                visible={signupModalActive}
                onCancel={handleSignupModal.bind(this, null)}
                okText="Create"
                onOk={handleSignup.bind(this, loginDetails)}
                confirmLoading={submitLoading}
                closable={true}
                maskClosable={false}
                keyboard={false}
            >
                <Form
                    formItem={signupFormItem}
                    InputStyle={InputStyle}
                    RowHolderStyle={RowHolderStyle}
                    FieldsetStyle={FieldsetStyle}
                    LabelStyle={LabelStyle}
                    ButtonStyle={ButtonStyle}
                    InputStyle={InputStyle}
                />
            </Modal>
        </Content>
    );
};
