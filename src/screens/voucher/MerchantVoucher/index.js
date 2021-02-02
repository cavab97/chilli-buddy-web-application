import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/vouchers/actions";
import actionsMerchant from "../../../redux/merchant/actions";
import { notification } from "marslab-library-react/components/organisms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { SearchOutlined } from "@ant-design/icons";
import { Form as ModalForm } from "marslab-library-react/components/organisms/Form";
import Voucher from "../../../components/templates/voucherInfo";
import { ActionBtn, ButtonHolders } from "./styles";
import clone from "clone";
import "react-datepicker/dist/react-datepicker.css";
import { validation } from "marslab-library-react/utils/validation";
import moment from "moment";

class voucher extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.loadFromFireStore();
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
      this.props.readFromDatabase();
      this.props.readFromDatabaseMerchants();
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

  handleRecord = async (actionName, record) => {
    let { errorReturn } = this.props;


    const defaultValidate = {
      title: { required: true, type: "stringLength", max: 80 },
      startDate: record.endDate ? { type: "time", required: true } : { type: "time" },
      endDate: record.startDate ? { type: "time", required: true }: { type: "time" },
      merchantIds: { required: true },
      amount: record.amount ? { type: "number", decimalPlace: 2 } : {},
      quantity: { required: true, type: "number" }
    };
    
    errorReturn = validation(record, defaultValidate);

    this.props.errorUpdate(errorReturn);
    
    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(record, actionName);
    }
  };

  handleModal = (voucher = null) => {
    const errorReturn = {};

    this.props.errorUpdate(errorReturn);
    this.props.modalControl(voucher);
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { voucher } = clone(this.props);
    if (key && nestedKey) voucher[key][nestedKey] = event.target.value;
    else if (key) voucher[key] = event.target.value;
    this.props.update(voucher);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { voucher } = clone(this.props);
    if (key && nestedKey) voucher[key][nestedKey] = value;
    else if (key) voucher[key] = value;
    this.props.update(voucher);
  };

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  onDateChange({ key, nestedKey }, date, dateString) {
    let { voucher } = clone(this.props);

    if (key && nestedKey) voucher[key][nestedKey] = date;
    else if (key) voucher[key] = date;
    this.props.update(voucher);
  }

  getColumnSearchProps = (columnName, title) => ({
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const { vouchers } = this.props;
      const { voucher } = clone(this.props);
      const voucherArray = [];

      Object.keys(vouchers).map((voucher, index) => {
        return voucherArray.push({
          ...vouchers[voucher],
        });
      });

      const searchFormItem = [
        [
          {
            type: "select",
            placeholder: `Search ${title}`,
            data: selectedKeys[0],
            option: voucherArray,
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
      vouchers,
      voucher,
      modalActive,
      modalCurrentPage,
      submitLoading,
      readLoading,
      readSpecifiedRecordLoading,
      errorReturn,
      merchants,
      merchant,
      error,
    } = this.props;

    const optionUrl = this.urlChange(url);

    const uid = this.props.uid

    let count = 0;

    let voucherList = [];

    const merchantLists =
    merchants &&
      Object.values(merchants).map((merchant) => {
        return { data: merchant.id, label: merchant.businessName };
      });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    vouchers.forEach((voucher) => {
      voucher["status"] = voucher.active ? 'Active' : 'Inactive'
      voucher["used"] = voucher.claimed ? 'Used' : "Not Used"
      if (voucher.merchant && voucher.merchant[0] && voucher.merchant[0].superadmin && voucher.merchant[0].superadmin[0]) {
        if (voucher.merchant[0].superadmin[0] === uid) {
          voucherList.push(voucher)
        }
      }
    }); 

    return (
      <ScreenHolder>
        <ContentBox title="Voucher List" onClick={this.onClick.bind(this)}>

          <Voucher
            dataSource={voucherList}
            loading={readLoading}
            rowSelection={rowSelection}
            getColumnSearchProps={this.getColumnSearchProps.bind(this)}
            handleModal={this.handleModal.bind(this)}
            handleRecord={this.handleRecord.bind(this)}
            onSelectChange={this.onSelectChange.bind(this)}
            onRecordChange={this.onRecordChange.bind(this)}
            voucher={voucher}
            shopLists={merchantLists}
            errorReturn={errorReturn}
            modalActive={modalActive}
            submitLoading={submitLoading}
            onDateChange={this.onDateChange.bind(this)}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const { merchant, readSpecifiedRecordLoading, readSpecifiedRecordError } = state.Merchants;
  const merchants = state.Merchants.merchants;
  const { user } = state.MerchantAuth.user;
  const uid = state.Auth.user.idTokenResult.claims.user_id

  return {
    ...state.Vouchers,
    merchant,
    readSpecifiedRecordLoading,
    readSpecifiedRecordError,
    merchants,
    user,
    uid
  };
};

export default connect(mapStatetoprops, {
  ...actions,
})(voucher);
