import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/advertisements/actions";
import actionsShop from "../../../redux/shops/actions";
import {
  Form as FormSet,
  Button,
  Input,
  Textarea,
  Modal,
  Popconfirm,
  AntdIcon,
} from "marslab-library-react/components/atoms";
import { notification } from "marslab-library-react/components/organisms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { SearchOutlined } from "@ant-design/icons";
import { Form as ModalForm } from "marslab-library-react/components/organisms/Form";

import {
  ActionBtn,
  Fieldset,
  FieldsetStyle,
  Form,
  Label,
  ButtonHolders,
  ActionWrapper,
  TableWrapper,
  errorStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  ErrorInputStyle,
  UploadStyle,
  ButtonStyle,
  InputStyle,
  DatePickerStyle,
  RowHolderStyle,
  LabelStyle,
  SelectStyle,
} from "./styles";
import { StepModal } from "marslab-library-react/components/organisms/StepModal";
import clone from "clone";
import firebase from "firebase";
import moment from "moment";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from "uuid/v4";
import { validation } from "marslab-library-react/utils/validation";

const FormItem = FormSet.Item;
const readFromDatabaseShops = actionsShop.readFromDatabase;

class advertisements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // image: null,
      // coverPic: null,
      // subImage: {},
      // logoProgress: 0,
      // coverProgress: 0,
      // subImageProgress: 0,
      innerHide: { display: "none" },
    };
  }

  componentDidMount() {
    this.props.loadFromFireStore();
    this.props.readFromDatabaseShops();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.submitError.message !== nextProps.submitError.message &&
      nextProps.submitError.message
    ) {
      notification("error", nextProps.submitError.message);
    }
    if (
      this.props.submitResult.message !== nextProps.submitResult.message &&
      nextProps.submitResult.message
    ) {
      notification("success", nextProps.submitResult.message);
    }
  }

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  handleRecord = async (actionName, advertisement) => {
    let { errorReturn } = this.props;
    const { advertisements } = this.props;
    //console.log(advertisements)
    if (advertisement.key && actionName !== "delete") {
      actionName = "update";
    }
    //const subImage = [advertisement.subImage0,advertisement.subImage1,advertisement.subImage2]
    // const createAtString = advertisement.createAt.format("YYYY-MM-DD")
    //const startDateString = moment(advertisement.startDate).format("YYYY-MM-DD")
    // const endDateString = advertisement.endDate.format("YYYY-MM-DD")
    // advertisement = {...advertisement, createAtString, endDateString} //, subImage}

    delete advertisement["createAtString"];
    delete advertisement["startDateString"];
    delete advertisement["endDateString"];
    delete advertisement["subImage0"];
    delete advertisement["subImage1"];
    delete advertisement["subImage3"];

    const recordCheck = {
      shopID: advertisement.shopID,
      title: advertisement.title,
      // merchantDesc: advertisement.merchantDesc,
      // description: advertisement.description,
      startDate: advertisement.startDate,
      endDate: advertisement.endDate,
    };

    const defaultValidate = {
      shopID: { required: true },
      title: { required: true, type: "stringLength", max: 80 },
      //merchantDesc: { required: true },
      //description: { required: true },
      startDate: { required: true, after: advertisement.endDate },
      endDate: { required: true, before: advertisement.startDate },
    };

    errorReturn = validation(recordCheck, defaultValidate);

    this.props.errorUpdate(errorReturn);
    console.log(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.saveIntoFireStore(advertisement, actionName);
    }
  };

  handleModal = ({ toggle = false, nextPage = 0, data = null }) => {
    // this.setState({
    //   image: null,
    //   coverPic: null,
    //   subImage: [],
    //   logoProgress: 0,
    //   coverProgress: 0,
    //   subImageProgress: 0
    // })
    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
    this.props.toggleModal({ toggle, nextPage, data });
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { advertisement } = clone(this.props);
    if (key && nestedKey) advertisement[key][nestedKey] = event.target.value;
    else if (key) advertisement[key] = event.target.value;
    this.props.update(advertisement);
  };

  onShopIDChange = ({ key, nestedKey }, event) => {
    let { advertisement } = clone(this.props);
    if (key && nestedKey) advertisement[key][nestedKey] = event;
    else if (key) advertisement[key] = event;
    this.props.update(advertisement);
  };

  onSelectChange = (key, value) => {
    let { advertisement } = clone(this.props);
    if (key) advertisement[key] = value;
    this.props.update(advertisement);
  };

  onDateChange({ key, nestedKey }, date, dateString) {
    let { advertisement } = clone(this.props);
    const newDate = date.toDate();
    if (key === "startDate") {
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
    } else {
      newDate.setHours(23);
      newDate.setMinutes(59);
      newDate.setSeconds(59);
      newDate.setMilliseconds(999);
    }
    if (key && nestedKey) advertisement[key][nestedKey] = moment(newDate.getTime());
    else if (key) advertisement[key] = moment(newDate.getTime());
    this.props.update(advertisement);
  }

  // onShopIDCheckPress = (id) => {
  //   if(!id){
  //     notification('error', 'Please fill in shop ID');
  //     return;
  //   }
  //   this.props.checkShopID(id)
  // };

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  onUploadFile({ key = null, target = null }, { file = null }) {
    //,{ sectionName = null} ){
    this.props.handleUploadLogo({ key, advertisementId: target, file });
  }

  getColumnSearchProps = (columnName, title) => ({
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const { advertisements } = this.props;
      const { advertisement } = clone(this.props);
      const advertisementArray = [];
      Object.keys(advertisements).map((advertisement, index) => {
        return advertisementArray.push({
          ...advertisements[advertisement],
          isPopUp: advertisements[advertisement].isPopUp === true ? "Yes" : "No",
          startDate: advertisements[advertisement].startDate
            ? advertisements[advertisement].startDate.toDate()
            : "",
          endDate: advertisements[advertisement].endDate
            ? advertisements[advertisement].endDate.toDate()
            : "",
          createAtString: advertisements[advertisement].createAt.format("YYYY-MM-DD"),
          startDateString: advertisements[advertisement].startDate.format("YYYY-MM-DD"),
          endDateString: advertisements[advertisement].endDate.format("YYYY-MM-DD"),
          key: advertisement,
        });
      });

      const searchFormItem = [
        // [{
        //     type: "input",
        //     placeholder: `Search ${columnName}`,
        //     data: selectedKeys[0],
        //     onChange: (e) => setSelectedKeys(e.target.value ? [e.target.value] : []),
        //     FieldsetStyle: { width: 180 },
        // }],
        [
          {
            type: "select",
            placeholder: `Search ${title}`,
            data: selectedKeys[0],
            option: advertisementArray,
            optionTitle: columnName,
            optionValue: columnName,
            showSearch: true,
            onChange: (value) => setSelectedKeys(value ? [value] : []),
            FieldsetStyle: { width: 180 },
          },
        ],
        [
          {
            type: "button",
            label: "Search",
            buttonType: "primary",
            onClick: () => confirm(),
            ButtonStyle: { width: 88 },
          },
          {
            type: "button",
            label: "Reset",
            buttonType: "default",
            onClick: () => {
              clearFilters();
              setSelectedKeys([]);
            },
            ButtonStyle: { width: 88 },
          },
        ],
      ];

      return <ModalForm formItem={searchFormItem} FormHolderStyle={{ padding: 10 }} />;
    },
    onFilter: (value, record) =>
      record[columnName]
        ? record[columnName].toString().toLowerCase().includes(value.toLowerCase())
        : "",
  });

  render() {
    const { url } = this.props.match;
    const {
      modalActive,
      advertisements,
      modalCurrentPage,
      submitLoading,
      isCheckingShop,
      isLoading,
      readSpecifiedRecordLoading,
      uploadKey,
      uploadLoading,
      uploadProgress,
      uploadResult,
      errorReturn,
      shop_shops,
    } = this.props;
    const { advertisement } = clone(this.props);
    const optionUrl = this.urlChange(url);
    const dataSource = [];

    const shopLists =
      shop_shops &&
      Object.values(shop_shops).map((shops) => {
        return { data: shops.id, label: shops.title };
      });

    Object.keys(advertisements).map((advertisement, index) => {
      return dataSource.push({
        ...advertisements[advertisement],
        keyString: advertisements[advertisement].key,
        startDate: advertisements[advertisement].startDate,
        isPopUp: advertisements[advertisement].isPopUp === true ? "Yes" : "No",
        endDate: advertisements[advertisement].endDate,
        createAtString: advertisements[advertisement].createAt.format("hh:mm a YYYY-MM-DD"),
        startDateString: advertisements[advertisement].startDate.format("YYYY-MM-DD"),
        endDateString: advertisements[advertisement].endDate.format("YYYY-MM-DD"),
        key: advertisement,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
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
        ...this.getColumnSearchProps("title", "title"),
      },
      {
        title: "Pop Up",
        dataIndex: "isPopUp",
        key: "isPopUp",
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
        onFilter: (value, record) => record.isPopUp.indexOf(value) === 0,
        sorter: (a, b) => {
          if (a.isPopUp < b.isPopUp) return -1;
          if (a.isPopUp > b.isPopUp) return 1;
          return 0;
        },

        //...this.getColumnSearchProps("isPopUp", "pop up"),
      },
      {
        title: "Key",
        dataIndex: "key",
        key: "key",
        width: "120px",
        sorter: (a, b) => {
          if (a.key < b.key) return -1;
          if (a.key > b.key) return 1;
          return 0;
        },
        ...this.getColumnSearchProps("key", "key"),
      },

      {
        title: "Create At",
        dataIndex: "createAtString",
        key: "createAtString",
        width: "120x",
        sorter: (a, b) => {
          if (a.createAt < b.createAt) return -1;
          if (a.createAt > b.createAt) return 1;
          return 0;
        },
        ...this.getColumnSearchProps("createAtString", "create at"),
      },
      {
        title: "Start Date",
        dataIndex: "startDateString",
        key: "startDateString",
        width: "120x",
        sorter: (a, b) => {
          if (a.startDate < b.startDate) return -1;
          if (a.startDate > b.startDate) return 1;
          return 0;
        },
        ...this.getColumnSearchProps("startDateString", "start date"),
      },
      {
        title: "End Date",
        dataIndex: "endDateString",
        key: "endDateString",
        width: "120x",
        sorter: (a, b) => {
          if (a.endDate < b.endDate) return -1;
          if (a.endDate > b.endDate) return 1;
          return 0;
        },
        ...this.getColumnSearchProps("endDateString", "end date"),
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
                onClick={this.handleModal.bind(this, {
                  toggle: true,
                  nextPage: 0,
                  data: row,
                })}
                href="# "
              >
                <i className="ion-android-create" />
              </a>

              <Popconfirm
                title="Are you sure to delete this advertisement?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, "delete", row)}
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
          placeholder: "Enter Shop ID",
          data: advertisement.shopID,
          onChange: this.onShopIDChange.bind(this, { key: "shopID" }),
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
          //label: "Title * (maximum 80 character)",
          placeholder: "Enter Title",
          data: advertisement.title,
          onChange: this.onRecordChange.bind(this, { key: "title" }),
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
      // [
      //   {
      //     type: "textArea",
      //     label: "Merchant Description *",
      //     placeholder: "Enter Merchant Description",
      //     data: advertisement.merchantDesc,
      //     autoSize: { minRows: 3, maxRows: 3 },
      //     onChange: this.onRecordChange.bind(this, { key: "merchantDesc" }),
      //     InputStyle: errorReturn.merchantDesc ? ErrorInputStyle : null,
      //     iconRigth: errorReturn.merchantDesc ? (
      //       <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
      //     ) : null,
      //   },
      // ],
      // [
      //   {
      //     type: "label",
      //     label: errorReturn.merchantDesc ? "*" + errorReturn.merchantDesc : "",
      //     FieldsetStyle: ErrorMsgFieldsetStyle,
      //     LabelStyle: ErrorMsgLabelStyle,
      //     hide: errorReturn.merchantDesc ? false : true,
      //   },
      // ],
      // [
      //   {
      //     type: "textArea",
      //     label: "Description *",
      //     placeholder: "Enter Description",
      //     data: advertisement.description,
      //     autoSize: { minRows: 3, maxRows: 3 },
      //     onChange: this.onRecordChange.bind(this, { key: "description" }),
      //     InputStyle: errorReturn.description ? ErrorInputStyle : null,
      //     iconRigth: errorReturn.description ? (
      //       <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
      //     ) : null,
      //   },
      // ],
      // [
      //   {
      //     type: "label",
      //     label: errorReturn.description ? "*" + errorReturn.description : "",
      //     FieldsetStyle: ErrorMsgFieldsetStyle,
      //     LabelStyle: ErrorMsgLabelStyle,
      //     hide: errorReturn.description ? false : true,
      //   },
      // ],
      // [
      //   {
      //     type: "textArea",
      //     label: "Terms & Conditions",
      //     placeholder: "Enter Terms & Conditions",
      //     data: advertisement.termAndCon,
      //     autoSize: { minRows: 3, maxRows: 3 },
      //     onChange: this.onRecordChange.bind(this, { key: "termAndCon" }),
      //   },
      // ],
      [
        {
          type: "label",
          label: "Start Date *",
        },
      ],
      [
        {
          type: "datePicker",
          // data: advertisement.startDate === null ? advertisement.startDate : moment(advertisement.startDate),
          data: advertisement.startDate,
          placeholder: "Select Start Date",
          onChange: this.onDateChange.bind(this, {
            key: "startDate",
          }),
          DatePickerStyle: (errorReturn.startTime || errorReturn.endTime) && errorStyle.inputStyle,
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
          label: "End Date *",
        },
      ],
      [
        {
          type: "datePicker",
          // data: advertisement.endDate === null ? advertisement.endDate : moment(advertisement.endDate),
          data: advertisement.endDate,
          placeholder: "Select End Date",
          onChange: this.onDateChange.bind(this, {
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
    ];
    //dataSource&&console.log(dataSource[0].key)
    // advertisement.startDateString = moment.unix(advertisement.startDate.seconds).format("YYYY-MM-DD");
    // advertisement.endDateString = moment.unix(advertisement.endDate.seconds).format("YYYY-MM-DD");
    const formShop = [
      [
        {
          type: "upload",
          uploadType: "pictureWall",
          onUploadFile: this.onUploadFile.bind(this, {
            key: "coverPic",
            target: advertisement.key,
          }),
          uploadLoading: uploadLoading,
          uploadProgress: uploadProgress,
          uploadResult: uploadResult,
          onChange: this.onSelectChange.bind(this, "coverPic"),
          defaultFileList: advertisement.coverPic,
          maxFiles: 1,
          label: "Header Image (800 x 600) (Support png, jpeg, jpg format)",
          disabled: uploadKey && uploadKey !== "coverPic",
          UploadStyle: UploadStyle,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.coverPic ? "*" + errorReturn.coverPic : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.coverPic ? false : true,
        },
      ],
      [
        {
          type: "upload",
          uploadType: "pictureWall",
          onUploadFile: this.onUploadFile.bind(this, {
            key: "popUpImage",
            target: advertisement.key,
          }),
          uploadLoading: uploadLoading,
          uploadProgress: uploadProgress,
          uploadResult: uploadResult,
          onChange: this.onSelectChange.bind(this, "popUpImage"),
          defaultFileList: advertisement.popUpImage,
          maxFiles: 1,
          label: "Pop Up Advertisement Image/Video (800 x 1407.41) (Support mp4 format)",
          disabled: uploadKey && uploadKey !== "popUpImage",
          UploadStyle: UploadStyle,
        },
      ],
      [
        {
          type: "label",
          label: "Image/Video url (Copy to view)",
          data: advertisement.popUpImage,
        },
      ],
      [
        {
          type: "label",
          label: advertisement.popUpImage,
        },
      ],
    ];
    const stepDetails = [
      {
        title: "Information",
        description: "",
        okText: "Next",
        onOk: advertisement.key
          ? this.handleRecord.bind(this, "update", advertisement)
          : this.handleRecord.bind(this, "insert", advertisement),
        cancelText: "Close",
        onCancel: this.handleModal.bind(this, {
          toggle: true,
          nextPage: 0,
          data: null,
        }),
        confirmLoading: submitLoading || readSpecifiedRecordLoading, //false x loading, true is loading
      },
      {
        title: "Photo",
        description: "",
        okText: "Finish",
        onOk: this.handleRecord.bind(this, "update", advertisement),
        cancelText: "Back",
        onCancel: this.handleModal.bind(this, {
          toggle: false,
          nextPage: modalCurrentPage - 1,
          data: null,
        }),
        confirmLoading: submitLoading,
      },
    ];

    const modalContent = [
      {
        content: (
          <ModalForm
            formItem={formItem}
            RowHolderStyle={RowHolderStyle}
            FieldsetStyle={FieldsetStyle}
            LabelStyle={LabelStyle}
            SelectStyle={SelectStyle}
            ButtonStyle={ButtonStyle}
            DatePickerStyle={DatePickerStyle}
            InputStyle={InputStyle}
          />
        ),
      },
      {
        content: submitLoading === false && (
          <ModalForm
            formItem={formShop}
            FieldsetStyle={FieldsetStyle}
            LabelStyle={LabelStyle}
            SelectStyle={SelectStyle}
            ButtonStyle={ButtonStyle}
            DatePickerStyle={DatePickerStyle}
            InputStyle={InputStyle}
          />
        ),
      },
    ];

    return (
      <ScreenHolder>
        <InnerSidebar url={optionUrl} optionControl="news" displayStatus={this.state.innerHide} />
        <ContentBox title="Advertisement List" onClick={this.onClick.bind(this)}>
          <ButtonHolders>
            {/*<ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                  </ActionBtn>*/}

            <ActionBtn
              type="primary"
              onClick={this.handleModal.bind(this, {
                toggle: true,
                nextPage: 0,
                data: null,
              })}
            >
              Add new advertisement
            </ActionBtn>
          </ButtonHolders>

          <StepModal
            currentPage={modalCurrentPage}
            visible={modalActive}
            title={advertisement.key ? "Update Advertisement" : "Add New Advertisement"}
            stepDetails={stepDetails}
            modalContent={modalContent}
            closable={true}
            maskClosable={false}
            keyboard={false}
          />

          <TableWrapper
            rowKey="key"
            rowSelection={rowSelection}
            columns={columns}
            bordered={true}
            dataSource={dataSource}
            loading={this.props.isLoading}
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
        </ContentBox>
      </ScreenHolder>
    );
  }
}

// export default connect(
//   (state) => ({
//     ...state.Advertisements,
//   }),
//   actions
// )(advertisements);

const mapStatetoprops = (state) => {
  const { shop, readSpecifiedRecordLoading, readSpecifiedRecordError } = state.Shops;
  const shop_shops = state.Shops.shops;

  return {
    ...state.Advertisements,
    shop,
    readSpecifiedRecordLoading,
    readSpecifiedRecordError,
    shop_shops,
  };
};

export default connect(mapStatetoprops, { ...actions, readFromDatabaseShops })(advertisements);
