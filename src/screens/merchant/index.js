import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../redux/merchantAuth/actions";
import actionsShop from "../../redux/shops/actions";
import { QRCode } from "marslab-library-react/components/atoms";
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
import { SearchOutlined } from "@ant-design/icons";
import { Form as ModalForm } from "marslab-library-react/components/organisms/Form";
import Merchant from "../../components/templates/merchant";
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
  ButtonStyle,
  InputStyle,
  DatePickerStyle,
  RowHolderStyle,
  LabelStyle,
  SelectStyle,
  QRContainer,
} from "./styles";
import { StepModal } from "marslab-library-react/components/organisms/StepModal";
import clone from "clone";
import "react-datepicker/dist/react-datepicker.css";
import { validation } from "marslab-library-react/utils/validation";

const readFromDatabaseShops = actionsShop.readFromDatabase;

class merchants extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.loadFromFireStore();
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

  handleRecord = async (actionName, merchant) => {
    let { errorReturn } = this.props;
    const { user } = this.props;
    const createDetails = this.props.createDetails;
    //console.log(advertisements)
    if (merchant.key && actionName !== "delete") {
      actionName = "update";
    }

    const recordCheck = {
      email: createDetails.email,
      passcode: createDetails.password,
    };

    const defaultValidate = {
      email: { required: true, type: "email" },
      passcode: { required: true },
    };

    errorReturn = validation(recordCheck, defaultValidate);

    this.props.errorUpdate(errorReturn);
    console.log(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.saveIntoFireStore(merchant, actionName);
    }
  };

  handleSignup = (loginDetails) => {
    let { errorReturn } = this.props;

    const recordCheck = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    const defaultValidate = {
      email: { required: true, type: "email" },
      password: { required: true },
    };

    errorReturn = validation(recordCheck, defaultValidate);
    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.signup(loginDetails);
    }
  };

  handleModal = ({ toggle = false, nextPage = 0, data = null }) => {
    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
    this.props.toggleModal({ toggle, nextPage, data });
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { merchant } = clone(this.props);
    if (key && nestedKey) merchant[key][nestedKey] = event.target.value;
    else if (key) merchant[key] = event.target.value;
    this.props.update(merchant);
  };

  onLoginRecordChange = (key, event) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = event.target.value;
    this.props.updateLoginDetails(loginDetails);
  };

  onShopIDChange = ({ key, nestedKey }, event) => {
    let { merchant } = clone(this.props);
    if (key && nestedKey) merchant[key][nestedKey] = event;
    else if (key) merchant[key] = event;
    this.props.update(merchant);
  };

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  getColumnSearchProps = (columnName, title) => ({
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const { merchants } = this.props;
      const { merchant } = clone(this.props);
      const merchantArray = [];
      Object.keys(merchants).map((merchant, index) => {
        return merchantArray.push({
          ...merchants[merchant],
          isPopUp: merchants[merchant].isPopUp === true ? "Yes" : "No",
          startDate: merchants[merchant].startDate ? merchants[merchant].startDate.toDate() : "",
          endDate: merchants[merchant].endDate ? merchants[merchant].endDate.toDate() : "",
          createAtString: merchants[merchant].createAt.format("YYYY-MM-DD"),
          startDateString: merchants[merchant].startDate.format("YYYY-MM-DD"),
          endDateString: merchants[merchant].endDate.format("YYYY-MM-DD"),
          key: merchant,
        });
      });

      const searchFormItem = [
        [
          {
            type: "select",
            placeholder: `Search ${title}`,
            data: selectedKeys[0],
            option: merchantArray,
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
      merchants,
      modalCurrentPage,
      submitLoading,
      isLoading,
      readSpecifiedRecordLoading,
      errorReturn,
      shop_shops,
      user,
      loginDetails,
      createDetails,
      loading,
      error,
    } = this.props;

    const { merchant } = clone(this.props);
    const optionUrl = this.urlChange(url);
    const dataSource = [];

    const shopLists =
      shop_shops &&
      Object.values(shop_shops).map((shops) => {
        return { data: shops.id, label: shops.title };
      });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const formItem = [
      [
        {
          type: "label",
          label: "Merchant Email *",
        },
      ],
      [
        {
          type: "text",
          placeholder: "Enter Merchant Email",
          data: loginDetails.email,
          onChange: this.onLoginRecordChange.bind(this, "email"),
          InputStyle: errorReturn.loginDetails?.email ? ErrorInputStyle : null,
          iconRigth: errorReturn.loginDetails?.email ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.loginDetails ? "*" + errorReturn.loginDetails.email : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.loginDetails ? false : true,
        },
      ],
      [
        {
          type: "label",
          label: "Merchant Passcode *",
        },
      ],
      [
        {
          type: "text",
          placeholder: "Enter Merchant Passcode",
          data: loginDetails.password,
          onChange: this.onLoginRecordChange.bind(this, "password"),
          InputStyle: errorReturn.loginDetails?.password ? ErrorInputStyle : null,
          iconRigth: errorReturn.loginDetails?.password ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.loginDetails ? "*" + errorReturn.loginDetails.password : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.loginDetails?.password ? false : true,
        },
      ],
    ];

    const formMerchant = [
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
          data: user.shopIds[0],
          onChange: this.onShopIDChange.bind(this, { key: "shopIds" }),
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
          label: errorReturn.shopIds ? "*" + errorReturn.shopIds : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.shopIds ? false : true,
        },
      ],
      [
        {
          type: "label",
          label: "Merchant Name",
        },
      ],
      [
        {
          type: "text",
          placeholder: "Enter Merchant Name",
          data: user.displayName,
          onChange: this.onRecordChange.bind(this, { key: "displayName" }),
          InputStyle: errorReturn.displayName ? ErrorInputStyle : null,
          iconRigth: errorReturn.displayName ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        },
      ],
      [
        {
          type: "label",
          label: errorReturn.displayName ? "*" + errorReturn.displayName : "",
          FieldsetStyle: ErrorMsgFieldsetStyle,
          LabelStyle: ErrorMsgLabelStyle,
          hide: errorReturn.displayName ? false : true,
        },
      ],
    ];
    const stepDetails = [
      {
        title: "Merchant Login Details",
        description: "",
        okText: "Next",
        onOk: user.uid ? "" : this.handleSignup.bind(this, loginDetails),
        cancelText: "Close",
        onCancel: this.handleModal.bind(this, {
          toggle: true,
          nextPage: 0,
          data: null,
        }),
        confirmLoading: submitLoading || readSpecifiedRecordLoading, //false x loading, true is loading
      },
      {
        title: "Merchant Information",
        description: "",
        okText: "Finish",
        onOk: this.handleRecord.bind(this, "update", merchant),
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
            formItem={formMerchant}
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
        <ContentBox title="Merchant List" onClick={this.onClick.bind(this)}>
          <ButtonHolders>
            <ActionBtn
              type="primary"
              onClick={this.handleModal.bind(this, {
                toggle: true,
                nextPage: 0,
                data: null,
              })}
            >
              Add new merchant
            </ActionBtn>
          </ButtonHolders>

          <StepModal
            currentPage={modalCurrentPage}
            visible={modalActive}
            title={user.uid ? "Update Merchant" : "Add New Merchant"}
            stepDetails={stepDetails}
            modalContent={modalContent}
            closable={true}
            maskClosable={false}
            keyboard={false}
            url={createDetails}
          />
          <QRContainer>
            <QRCode
              id={"QRCodeCanvas"}
              value={`https://${createDetails.passcode}/${createDetails.email}`}
              size={120}
              includeMargin={true}
              style={{ borderRadius: 10 }}
            />
          </QRContainer>
          <Merchant
            dataSource={dataSource}
            loading={loading}
            rowSelection={rowSelection}
            //getColumnSearchProps={this.getColumnSearchProps.bind(this)}
            handleModal={this.handleModal.bind(this)}
            handleRecord={this.handleRecord.bind(this)}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const { shop, readSpecifiedRecordLoading, readSpecifiedRecordError } = state.Shops;
  const shop_shops = state.Shops.shops;
  const { user } = state.Merchant.user;
  const { createDetails, isLoading, loading, error } = state.Merchant;

  console.log(state)

  return {
    ...state.MerchantAuth,
    shop,
    readSpecifiedRecordLoading,
    readSpecifiedRecordError,
    shop_shops,
    user,
    createDetails,
    isLoading,
    loading,
    error,
  };
};

export default connect(mapStatetoprops, {
  ...actions,
  readFromDatabaseShops,
})(merchants);
