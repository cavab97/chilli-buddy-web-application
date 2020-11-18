import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/shops/actions";
import { Popconfirm, AntdIcon } from "marslab-library-react/components/atoms";
import { notification } from "marslab-library-react/components/organisms";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { SearchOutlined } from "@ant-design/icons";

import {
  SearchContainer,
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  RowHolderStyle,
  FieldsetStyle,
  LabelStyle,
  SelectStyle,
  multipleSelectStyle,
  ButtonStyle,
  InputStyle,
  DatePickerStyle,
  OperatingFieldsetStyle,
  ButtonFieldsetStyle,
  UploadStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  ErrorInputStyle,
} from "./styles";
import "react-datepicker/dist/react-datepicker.css";

import clone from "clone";

import { Form } from "marslab-library-react/components/organisms/Form";
import { StepModal } from "marslab-library-react/components/organisms/StepModal";
import { validation } from "marslab-library-react/utils/validation/index";
import { geohashEncode } from "marslab-library-react/utils/common/geohash";
import moment from "moment";

const countriesList = require("assets/address/countries.json");
const statesList = require("assets/address/Malaysia/states.json");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
    };
  }

  componentDidMount() {
    this.props.readFromDatabase();
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

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  handleRecord = async (actionName, shop) => {
    let { errorReturn } = this.props;

    if (shop.key && actionName !== "delete") {
      actionName = "update";
    }
    if (shop.dateJoined === null) {
      shop.dateJoined = moment();
    }

    const recordCheck = {
      l: shop.l,
      _lat: shop.l._lat,
      _long: shop.l._long,
      title: shop.title,
      displayTitle: shop.displayTitle,
      email: shop.email,
      phoneNumber: shop.phoneNumber,
      categories: shop.categories,
      dateJoined: shop.dateJoined,
      country: shop.address.country,
      state: shop.address.state,
      postcode: shop.address.postcode,
      line2: shop.address.line2,
      line1: shop.address.line1,
    };

    const defaultValidate = {
      l: { type: "geopoint" },
      _lat: { required: true, type: "latitude" },
      _long: { required: true, type: "longitude" },
      title: { required: true, type: "stringLength", max: 30 },
      displayTitle: { required: true },
      email: { required: true, type: "email" },
      phoneNumber: { required: true, type: "phone" },
      categories: { required: true },
      dateJoined: { required: true },
      country: { required: true },
      state: { required: true },
      postcode: { required: true, type: "postcode" },
      line2: { required: true },
      line1: { required: true },
    };

    if (shop.whatsapp) {
      recordCheck["whatsapp"] = shop.whatsapp;
      defaultValidate["whatsapp"] = { type: "phone" };
    }

    errorReturn = validation(recordCheck, defaultValidate);

    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(shop, actionName);
    }
  };

  handleModal = ({ toggle = false, nextPage = 0, data = null }) => {
    this.props.errorUpdate({});
    this.props.modalControl({ toggle, nextPage, data });
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { shop } = clone(this.props);
    if (key && nestedKey) shop[key][nestedKey] = event.target.value;
    else if (key) shop[key] = event.target.value;
    this.props.update(shop);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { shop } = clone(this.props);

    if (key === "categories") {
      shop["tags"] = [];
    }

    if (key && nestedKey) shop[key][nestedKey] = value;
    else if (key) shop[key] = value;
    this.props.update(shop);
  };

  onDateChange({ key, nestedKey }, date, dateString) {
    let { shop } = clone(this.props);

    if (key && nestedKey) shop[key][nestedKey] = date;
    else if (key) shop[key] = date;

    this.props.update(shop);
  }

  onLocationCheckPress = (latitude, longitude) => {
    const location = {
      l: {
        _lat: latitude,
        _long: longitude,
      },
    };

    const errorReturn = validation(location, { l: "geopoint" });

    if (errorReturn.errorNo > 0) {
      notification("error", errorReturn.l);
      return;
    }

    window.open(`http://www.google.com/maps/place/${latitude},${longitude}`, "_blank");
  };

  onLocationChange(key, event) {
    let { shop } = clone(this.props);
    const value = event.target.value.trim();

    if (!isNaN(value)) {
      if (key === "latitude") {
        shop.l._lat = value;
        shop.g = geohashEncode(Number(shop.l._lat), Number(shop.l._long));
      }

      if (key === "longitude") {
        shop.l._long = value;
        shop.g = geohashEncode(Number(shop.l._lat), Number(shop.l._long));
      }
    }

    this.props.update(shop);
  }

  onOperatingClick(day) {
    let { shop } = clone(this.props);

    shop.operatingHour[day].operate = !shop.operatingHour[day].operate;

    this.props.update(shop);
  }

  onOperatingChange(day, time, timeString) {
    let { shop } = clone(this.props);

    shop.operatingHour[day].open = timeString[0].replace(":", "");
    shop.operatingHour[day].close = timeString[1].replace(":", "");

    this.props.update(shop);
  }

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, shopId: target, file });
  }

  getColumnSearchProps = (columnName) => ({
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      console.log(selectedKeys);
      const { shops } = this.props;
      const { shop } = clone(this.props);
      const shopArray = [];
      Object.keys(shops).map((shop, index) => {
        return shopArray.push({
          ...shops[shop],
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
            placeholder: `Search ${columnName}`,
            data: selectedKeys[0],
            option: shopArray, //this.props.shops,
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

      return <Form formItem={searchFormItem} FormHolderStyle={{ padding: 10 }} />;
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
      shops,
      readLoading,
      submitLoading,
      modalCurrentPage,
      shop_categories,
      uploadKey,
      uploadLoading,
      uploadProgress,
      uploadResult,
      errorReturn,
    } = this.props;
    const { shop } = clone(this.props);
    const optionUrl = this.urlChange(url);
    const dataSource = [];

    Object.keys(shops).map((shop, index) => {
      return dataSource.push({
        ...shops[shop],
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: "Shop Name",
        dataIndex: "title",
        key: "title",
        width: "120x",
        sorter: (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        },
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Business Name",
        dataIndex: "displayTitle",
        key: "displayTitle",
        width: "120x",
        sorter: (a, b) => {
          if (a.displayTitle < b.displayTitle) return -1;
          if (a.displayTitle > b.displayTitle) return 1;
          return 0;
        },
        ...this.getColumnSearchProps("displayTitle"),
      },
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
        ...this.getColumnSearchProps("id"),
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
                title="Are you sure to delete this shop？"
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

    const shopCategories =
      shop_categories &&
      Object.values(shop_categories).map((categories) => {
        return { data: categories.id, label: categories.title };
      });

    let tagsOfShop = [];
    if (shop.categories.length !== 0) {
      tagsOfShop = Object.values(shop_categories[shop.categories].tags).map((tag) => {
        return { data: tag, label: this.props.shop_tags[tag].title };
      });
    }

    const malaysiaStates = statesList.map((state) => {
      return { data: state, label: state };
    });

    const allCountry = countriesList.map((country) => {
      return { data: country.country, label: country.country };
    });

    const formItem = [
      [
        {
          type: "text",
          label: "Title *: (maximum 30 character)",
          placeholder: "Enter The Name Display To Merchant",
          data: shop.title,
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
      /* [
        {
          type: "text",
          label: "Subtitle *:",
          placeholder: "Enter The Subtitle",
          data: shop.subtitle,
          onChange: this.onRecordChange.bind(this, { key: "subtitle" }),
          InputStyle: errorReturn.subtitle ? ErrorInputStyle : null,
          iconRigth: errorReturn.subtitle ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null
        }
      ], 
      [
        {
          type: "label",
          label: errorReturn.subtitle ? "*" + errorReturn.subtitle : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.subtitle ? false : true
        }
      ], */
      [
        {
          type: "text",
          label: "Business Name *:",
          placeholder: "Enter Business Name",
          data: shop.displayTitle,
          onChange: this.onRecordChange.bind(this, { key: "displayTitle" }),
          InputStyle: errorReturn.displayTitle ? ErrorInputStyle : null,
          iconRigth: errorReturn.displayTitle ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.displayTitle ? "*Business Name cannot be empty" : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.displayTitle ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Business Email *:",
          placeholder: "Enter Business Email",
          data: shop.email,
          onChange: this.onRecordChange.bind(this, { key: "email" }),
          InputStyle: errorReturn.email ? ErrorInputStyle : null,
          iconRigth: errorReturn.email ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.email ? "*" + errorReturn.email : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.email ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Business Phone No *:",
          placeholder: "Enter Business Phone",
          data: shop.phoneNumber,
          onChange: this.onRecordChange.bind(this, { key: "phoneNumber" }),
          InputStyle: errorReturn.phoneNumber ? ErrorInputStyle : null,
          iconRigth: errorReturn.phoneNumber ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.phoneNumber ? "*" + errorReturn.phoneNumber : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.phoneNumber ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Business Facebook:",
          placeholder: "Enter Business Facebook",
          data: shop.facebookUrl,
          onChange: this.onRecordChange.bind(this, { key: "facebookUrl" }),
        },
      ],
      [
        {
          type: "text",
          label: "Business Instagram(User Name):",
          placeholder: "Enter Business Instagram (User Name)",
          data: shop.instagramUrl,
          onChange: this.onRecordChange.bind(this, { key: "instagramUrl" }),
        },
      ],
      [
        {
          type: "text",
          label: "Business Whatsapp:",
          placeholder: "Enter Business Whatsapp (60123456789)",
          data: shop.whatsapp,
          onChange: this.onRecordChange.bind(this, { key: "whatsapp" }),
          InputStyle: errorReturn.whatsapp ? ErrorInputStyle : null,
          iconRigth: errorReturn.whatsapp ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.whatsapp ? "*" + errorReturn.whatsapp : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.whatsapp ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Business Website:",
          placeholder: "Enter Business Website",
          data: shop.websiteUrl,
          onChange: this.onRecordChange.bind(this, { key: "websiteUrl" }),
        },
      ],
      [
        {
          type: "select",
          label: "Categories *:",
          placeholder: "Select Categories",
          data: shop.categories,
          option: shopCategories,
          optionTitle: "label",
          optionValue: "data",
          onChange: (value) => {
            this.onSelectChange({ key: "categories" }, [value]);
          },
          SelectStyle: errorReturn.categories && ErrorInputStyle,
          iconRigth: errorReturn.categories ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.categories ? "*" + errorReturn.categories : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.categories ? false : true,
        },
      ],
      [
        {
          type: "select",
          label: "Tags:",
          placeholder: "Tags",
          data: shop.tags,
          mode: "multiple",
          option: tagsOfShop,
          optionTitle: "label",
          optionValue: "data",
          onChange: this.onSelectChange.bind(this, { key: "tags" }),
          SelectStyle: multipleSelectStyle,
        },
      ],
      [
        {
          type: "textArea",
          label: "Description :",
          placeholder: "Enter Shop Description",
          data: shop.description,
          autoSize: { minRows: 4, maxRows: 4 },
          onChange: this.onRecordChange.bind(this, { key: "description" }),
        },
      ],
      [
        {
          type: "label",
          label: "Location",
        },
      ],
      [
        {
          type: "text",
          label: "Latitude *:",
          placeholder: "Enter Shop Latitude",
          data: shop.l._lat,
          InputStyle: errorReturn.l || errorReturn._lat ? ErrorInputStyle : null,
          iconRigth:
            errorReturn.l || errorReturn._lat ? (
              <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            ) : null,
          onChange: this.onLocationChange.bind(this, "latitude"),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.l ? errorReturn.l : errorReturn._lat ? "*" + errorReturn._lat : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.l || errorReturn._lat ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Longitude *:",
          placeholder: "Enter Shop Longitude",
          data: shop.l._long,
          InputStyle: errorReturn.l || errorReturn._long ? ErrorInputStyle : null,
          iconRigth:
            errorReturn.l || errorReturn._long ? (
              <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
            ) : null,
          onChange: this.onLocationChange.bind(this, "longitude"),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.l ? errorReturn.l : errorReturn._long ? "*" + errorReturn._long : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.l || errorReturn._long ? false : true,
        },
      ],
      [
        {
          type: "button",
          label: "Check Location",
          onClick: this.onLocationCheckPress.bind(this, shop.l._lat, shop.l._long),
          buttonType: "primary",
        },
      ],
      [
        {
          type: "label",
          label: "Address",
        },
      ],
      [
        {
          type: "text",
          label: "Line 1 *:",
          placeholder: "Enter shop Address line 1",
          data: shop.address.line1,
          onChange: this.onRecordChange.bind(this, {
            key: "address",
            nestedKey: "line1",
          }),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.line1 ? "*" + errorReturn.line1 : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.line1 ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Line 2 *:",
          placeholder: "Enter shop Address line 2",
          data: shop.address.line2,
          onChange: this.onRecordChange.bind(this, {
            key: "address",
            nestedKey: "line2",
          }),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.line2 ? "*" + errorReturn.line2 : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.line2 ? false : true,
        },
      ],
      [
        {
          type: "text",
          label: "Postcode *:",
          placeholder: "Enter shop Postcode",
          data: shop.address.postcode,
          onChange: this.onRecordChange.bind(this, {
            key: "address",
            nestedKey: "postcode",
          }),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.postcode ? "*" + errorReturn.postcode : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.postcode ? false : true,
        },
      ],
      [
        {
          type: "select",
          label: "States *:",
          placeholder: "Enter shop Address, states",
          data: shop.address.state,
          option: malaysiaStates,
          optionTitle: "label",
          optionValue: "data",
          showSearch: true,
          onChange: this.onSelectChange.bind(this, {
            key: "address",
            nestedKey: "state",
          }),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.state ? "*" + errorReturn.state : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.state ? false : true,
        },
      ],
      [
        {
          type: "select",
          label: "Country *:",
          placeholder: "Enter shop Address, country",
          data: shop.address.country,
          option: allCountry,
          optionTitle: "label",
          optionValue: "data",
          showSearch: true,
          onChange: this.onSelectChange.bind(this, {
            key: "address",
            nestedKey: "country",
          }),
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.country ? "*" + errorReturn.country : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.country ? false : true,
        },
      ],
      [
        {
          type: "label",
          label: "Date Joined:",
        },
      ],
      [
        {
          type: "datePicker",
          data: shop.dateJoined !== null ? shop.dateJoined : moment(),
          placeholder: "Join date",
          defaultValue: moment(),
          onChange: this.onDateChange.bind(this, {
            key: "dateJoined",
          }),
        },
      ],
      [
        {
          type: "label",
          label: "Operating Hour",
        },
      ],
      ...days.map((day, index) => {
        return [
          {
            type: "timeRange",
            label: day,
            format: "HH:mm",
            data: [
              moment(shop.operatingHour[index].open, "HHmm"),
              moment(shop.operatingHour[index].close, "HHmm"),
            ],
            onChange: this.onOperatingChange.bind(this, index),
            allowClear: false,
            disabled: !shop.operatingHour[index].operate,
            FieldsetStyle: OperatingFieldsetStyle,
          },
          {
            type: "button",
            label: shop.operatingHour[index].operate ? "close" : "open",
            buttonType: shop.operatingHour[index].operate ? "default" : "primary",
            onClick: this.onOperatingClick.bind(this, index),
            FieldsetStyle: ButtonFieldsetStyle,
          },
        ];
      }),
    ];

    const formShop = [
      [
        {
          type: "upload",
          uploadType: "pictureWall",
          onUploadFile: this.onUploadFile.bind(this, { key: "logo", target: shop.id }),
          uploadLoading: uploadLoading,
          uploadProgress: uploadProgress,
          uploadResult: uploadResult,
          onChange: this.onSelectChange.bind(this, { key: "logo" }),
          defaultFileList: shop.logo,
          maxFiles: 1,
          label: "Logo (800 x 600)",
          disabled: uploadKey && uploadKey !== "logo",
          UploadStyle: UploadStyle,
        },
      ],
      [
        {
          type: "upload",
          uploadType: "pictureWall",
          onUploadFile: this.onUploadFile.bind(this, { key: "images", target: shop.id }),
          uploadLoading: uploadLoading,
          uploadProgress: uploadProgress,
          uploadResult: uploadResult,
          onChange: this.onSelectChange.bind(this, { key: "images" }),
          defaultFileList: shop.images,
          maxFiles: 1,
          label: "Images (800 x 600)",
          disabled: uploadKey && uploadKey !== "images",
          UploadStyle: UploadStyle,
        },
      ],
    ];
    const stepDetails = [
      {
        title: "Information",
        description: "",
        okText: "Next",
        onOk: shop.id
          ? this.handleRecord.bind(this, "update", shop)
          : this.handleRecord.bind(this, "insert", shop),
        cancelText: "Close",
        onCancel: this.handleModal.bind(this, {
          toggle: true,
          nextPage: 0,
          data: null,
        }),
        confirmLoading: submitLoading,
      },
      {
        title: "Photo",
        description: "",
        okText: "Finish",
        onOk: this.handleRecord.bind(this, "update", shop),
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
          <Form
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
        content: (
          <Form
            formItem={formShop}
            FieldsetStyle={FieldsetStyle}
            LabelStyle={LabelStyle}
            SelectStyle={SelectStyle}
            ButtonStyle={ButtonStyle}
            DatePickerStyle={DatePickerStyle}
          />
        ),
      },
    ];

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          optionControl="shopList"
          displayStatus={this.state.innerHide}
        />
        <ContentBox title="Shop Management" onClick={this.onClick.bind(this)}>
          <ButtonHolders>
            <ActionBtn
              type="primary"
              onClick={this.handleModal.bind(this, {
                toggle: true,
                nextPage: 0,
                data: null,
              })}
            >
              Add new shop
            </ActionBtn>
          </ButtonHolders>

          <StepModal
            currentPage={modalCurrentPage}
            visible={modalActive}
            title="Add New Shop"
            stepDetails={stepDetails}
            modalContent={modalContent}
            closable={false}
          />

          <TableWrapper
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            bordered={true}
            dataSource={dataSource}
            loading={readLoading || submitLoading}
            className="isoSimpleTable"
            pagination={{
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

const mapStatetoprops = (state) => {
  const shop_tags = state.ShopTags.tags;
  const shop_categories = state.ShopCategories.categories;
  return { ...state.Shops, shop_tags, shop_categories, openKeys: state.App.openKeys };
};

export default connect(mapStatetoprops, actions)(Shops);
