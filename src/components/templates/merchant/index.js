import React from "react";
import { Form, Modal, Popconfirm, AntdIcon } from "marslab-library-react/components/atoms";
import { Form as ModalForm } from "marslab-library-react/components/organisms/Form";
import {
  Content,
  ActionWrapper,
  TableWrapper,
  FieldsetStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  ErrorInputStyle,
  ButtonStyle,
  InputStyle,
  RowHolderStyle,
  LabelStyle,
  SelectStyle,
  UploadStyle,
  errorStyle
} from "./styles";
import moment from "moment";

export default ({
  dataSource,
  rowSelection,
  loading,
  getColumnSearchProps,
  handleModal,
  handleRecord,
  onSelectChange,
  onRecordChange,
  merchant,
  userLists,
  errorReturn,
  modalActive,
  submitLoading,
  onUploadFile,
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey
}) => {

  const columns = [
    /* {
      title: "logo ",
      dataIndex: "logo",
      key: "logo",
      width: "120x",
      sorter: (a, b) => {
        if (a.logo < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      }, 
    }, */
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      width: "120x",
      sorter: (a, b) => {
        if (a.businessName < b.businessName) return -1;
        if (a.businessName > b.businessName) return 1;
        return 0;
      },
      ...getColumnSearchProps("businessName", "businessName"),
    },
    ,
    {
      title: "Business Registration Number",
      dataIndex: "businessRegistrationNumber",
      key: "businessRegistrationNumber",
      width: "120x",
      sorter: (a, b) => {
        if (a.businessRegistrationNumber < b.businessRegistrationNumber) return -1;
        if (a.businessRegistrationNumber > b.businessRegistrationNumber) return 1;
        return 0;
      },
      ...getColumnSearchProps("businessRegistrationNumber", "businessRegistrationNumber"),
    },
    {
      title: "User ID",
      dataIndex: "superadmin",
      key: "superadmin",
      width: "120x",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      sorter: (a, b) => {
        if (a.superadmin < b.superadmin) return -1;
        if (a.superadmin > b.superadmin) return 1;
        return 0;
      },
      ...getColumnSearchProps("superadmin", "superadmin"),
    },
    {
      title: "Actions",
      key: "action",
      width: "60px",
      className: "noWrapCell",
      render: (text, row) => {
        return (
          <ActionWrapper>
            <a
              onClick={handleModal.bind(this, row)}
              href="# "
            >
              <i className="ion-android-create" />
            </a>
            {/* <Popconfirm
                title="Are you sure to delete this merchant?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
            </Popconfirm>  */}
          </ActionWrapper>
        );
      },
    },
  ];

  const formItem = [
    [
      {
        type: "label",
        label: "Business Name *",
      },
    ],
    [
      {
        type: "text",
        placeholder: "Enter Business Name",
        data: merchant.businessName,
        onChange: onRecordChange.bind(this, { key: "businessName" }),
        InputStyle: errorReturn.businessName ? ErrorInputStyle : null,
        iconRigth: errorReturn.businessName ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.businessName ? "*" + errorReturn.businessName : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.businessName ? false : true,
      },
    ],
    [
      {
        type: "label",
        label: "Business Registration Number",
      },
    ],
    [
      {
        type: "text",
        placeholder: "Enter Business Registration Number",
        data: merchant.businessRegistrationNumber,
        onChange: onRecordChange.bind(this, { key: "businessRegistrationNumber" }),
        InputStyle: errorReturn.businessRegistrationNumber ? ErrorInputStyle : null,
        iconRigth: errorReturn.businessRegistrationNumber ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.businessRegistrationNumber ? "*" + errorReturn.businessRegistrationNumber : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.businessRegistrationNumber ? false : true,
      },
    ],
    [
      {
        type: "label",
        label: "User *",
      },
    ],
    [
      {
        type: "select",
        //label: "Shop ID *",
        placeholder: "Select User",
        data: merchant.superadmin ? merchant.superadmin : null,
        onChange: (value)=> onSelectChange({ key: "superadmin" },[value]),
        option: userLists,
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        styles: SelectStyle,
        optionFilterProp: "children",
        filterOption: (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        SelectStyle: errorReturn.superadmin ? ErrorInputStyle : null,
        /* iconRigth: errorReturn.superadmin ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null, */
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.superadmin ? "*" + errorReturn.superadmin : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.superadmin ? false : true,
      },
    ],
    [
      {
        type: merchant.id && "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, { key: "logo", target: merchant.id }),
        uploadLoading: uploadLoading,
        uploadProgress: uploadProgress,
        uploadResult: uploadResult,
        onChange: onSelectChange.bind(this, { key: "logo" }),
        defaultFileList: merchant.logo,
        maxFiles: 1,
        label: "Logo (800 x 600)",
        disabled: uploadKey && uploadKey !== "logo",
        UploadStyle: UploadStyle,
      },
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.logo ? "*" + errorReturn.logo : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.logo ? false : true
      }
    ],
  ];

  return (
    <Content>
      <Modal
        title={merchant.id ? "Update Merchant" : "Add New Merchant"}
        visible={modalActive}
        onCancel={handleModal.bind(this, null)}
        okText="Submit"
        onOk={
          merchant.id
            ? handleRecord.bind(this, "update", merchant)
            : handleRecord.bind(this, "create", merchant)
        }
        confirmLoading={submitLoading}
        closable={true}
        maskClosable={false}
        keyboard={false}
      >
        <ModalForm
          formItem={formItem}
          InputStyle={InputStyle}
          RowHolderStyle={RowHolderStyle}
          FieldsetStyle={FieldsetStyle}
          LabelStyle={LabelStyle}
          SelectStyle={SelectStyle}
          ButtonStyle={ButtonStyle}
          InputStyle={InputStyle}
        />
      </Modal>
      <TableWrapper
        rowKey="id"
        columns={columns}
        bordered={true}
        dataSource={dataSource}
        loading={loading}
        className="isoSimpleTable"
        pagination={{
          // defaultPageSize: 1,
          hideOnSinglePage: true,
          total: dataSource.length,
          showTotal: (total, range) => {
            return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
          },
        }}
      />
    </Content>
  );
};
