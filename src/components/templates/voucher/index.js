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
  DatePickerStyle,
  RowHolderStyle,
  LabelStyle,
  SelectStyle,
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
  voucher,
  shopLists,
  errorReturn,
  modalActive,
  submitLoading,
  onDateChange
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "120x",
      sorter: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      },
      ...getColumnSearchProps("id", "id"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "120x",
      sorter: (a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      },
      ...getColumnSearchProps("title", "title"),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
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
      render: (data) => {
        return data ? moment(data).format("DD-MM-YYYY") : null;
      },
      sorter: (a, b) => {
        if (a.startDate < b.startDate) return -1;
        if (a.startDate > b.startDate) return 1;
        return 0;
      },

      //...this.getColumnSearchProps("isPopUp", "pop up"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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
      render: (data) => {
        return data ? moment(data).format("DD-MM-YYYY") : null;
      },
      sorter: (a, b) => {
        if (a.endDate < b.endDate) return -1;
        if (a.endDate > b.endDate) return 1;
        return 0;
      },

      //...this.getColumnSearchProps("isPopUp", "pop up"),
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
      },
      ...getColumnSearchProps("status", "status"),
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
            <Popconfirm
                title="Are you sure to delete this voucher?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
            </Popconfirm>
          </ActionWrapper>
        );
      },
    },
  ];

  const formItem = [
    [
      {
        type: "label",
        label: "Shop *",
      },
    ],
    [
      {
        type: "select",
        //label: "Shop ID *",
        placeholder: "Select Shop",
        data: voucher.shopIds,
        onChange: (value)=> onSelectChange({ key: "shopIds" },[value]),
        option: shopLists,
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        styles: SelectStyle,
        optionFilterProp: "children",
        filterOption: (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        InputStyle: errorReturn.title ? ErrorInputStyle : null,
        iconRigth: errorReturn.title ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.shopID ? "*" + errorReturn.shopID : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.shopID ? false : true,
      },
    ],
    [
      {
        type: "label",
        label: "Title * (maximum 80 character)",
      },
    ],
    [
      {
        type: "text",
        placeholder: "Enter Title",
        data: voucher.title,
        onChange: onRecordChange.bind(this, { key: "title" }),
        InputStyle: errorReturn.title ? ErrorInputStyle : null,
        iconRigth: errorReturn.title ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.title ? "*" + errorReturn.title : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.title ? false : true,
      },
    ],
    [
      {
        type: "label",
        label: "Start Date",
      },
    ],
    [
      {
        type: "datePicker",
        // data: advertisement.startDate === null ? advertisement.startDate : moment(advertisement.startDate),
        data: voucher.startDate,
        placeholder: "Select Start Date",
        onChange: onDateChange.bind(this, {
          key: "startDate",
        }),
        DatePickerStyle: (errorReturn.startDate || errorReturn.endDate) && errorStyle.inputStyle,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.startDate ? "*" + errorReturn.startDate : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.startDate ? false : true,
      },
    ],
    [
      {
        type: "label",
        label: "End Date",
      },
    ],
    [
      {
        type: "datePicker",
        // data: advertisement.endDate === null ? advertisement.endDate : moment(advertisement.endDate),
        data: voucher.endDate,
        placeholder: "Select End Date",
        onChange: onDateChange.bind(this, {
          key: "endDate",
        }),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.endDate ? "*" + errorReturn.endDate : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.endDate ? false : true,
      },
    ],
    
    [
      {
        type: "text",
        label: "Voucher Amount *",
        placeholder: "Enter Voucher Amount",
        data: voucher.amount,
        onChange: onRecordChange.bind(this, { key: "amount" }),
        InputStyle: errorReturn.amount ? ErrorInputStyle : null,
        iconRigth: errorReturn.amount ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.amount ? "*" + errorReturn.amount : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.amount ? false : true,
      },
    ],
    [
      {
        type: "textArea",
        label: "Description *",
        placeholder: "Enter Description",
        data: voucher.description,
        autoSize: { minRows: 3, maxRows: 3 },
        onChange: onRecordChange.bind(this, { key: "description" }),
        InputStyle: errorReturn.description ? ErrorInputStyle : null,
        iconRigth: errorReturn.description ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.description ? "*" + errorReturn.description : "",
        FieldsetStyle: ErrorMsgFieldsetStyle,
        LabelStyle: ErrorMsgLabelStyle,
        hide: errorReturn.description ? false : true,
      },
    ],
    [
      {
        type: "textArea",
        label: "Terms & Conditions",
        placeholder: "Enter Terms & Conditions",
        data: voucher.tnc,
        autoSize: { minRows: 3, maxRows: 3 },
        onChange: onRecordChange.bind(this, { key: "tnc" }),
      },
    ],
  ];

  return (
    <Content>
      <Modal
        title={voucher.id ? "Update Voucher" : "Add New Voucher"}
        visible={modalActive}
        onCancel={handleModal.bind(this, null)}
        okText="Submit"
        onOk={
          voucher.id
            ? handleRecord.bind(this, "update", voucher)
            : handleRecord.bind(this, "create", voucher)
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
          DatePickerStyle={DatePickerStyle}
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
