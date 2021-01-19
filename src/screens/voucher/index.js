import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../redux/vouchers/actions";
import actionsMerchant from "../../redux/merchant/actions";
import { notification } from "marslab-library-react/components/organisms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { SearchOutlined } from "@ant-design/icons";
import { Form as ModalForm } from "marslab-library-react/components/organisms/Form";
import Voucher from "../../components/templates/voucher";
import { ActionBtn, ButtonHolders } from "./styles";
import clone from "clone";
import "react-datepicker/dist/react-datepicker.css";
import { validation } from "marslab-library-react/utils/validation";
import moment from "moment";

const readFromDatabaseMerchants = actionsMerchant.readFromDatabase;

class voucher extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.loadFromFireStore();
    this.props.readFromDatabase();
    this.props.readFromDatabaseMerchants();
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

    console.log(record)

    const defaultValidate = {
      title: { required: true, type: "stringLength", max: 80 },
      description: { required: true, type: "stringLength", min: 1 },
      startTime: { type: "time" },
      endTime: { type: "time", before: moment() },
      merchantIds: { required: true },
      amount: { required: true, type: "number", decimalPlace: 2 },
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

    const merchantLists =
    merchants &&
      Object.values(merchants).map((merchant) => {
        return { data: merchant.id, label: merchant.businessName };
      });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    vouchers.forEach((voucher) => {
      if (voucher.startDate && voucher.endDate)
        if (voucher.endDate <= moment().endOf('day'))
          voucher["status"] = "Expired";
        else if (voucher.startDate <= moment().endOf('day') 
        && voucher.endDate >= moment().endOf('day'))
          voucher["status"] = "Active";
        else 
          voucher["status"] = "Awaiting";
      else 
        voucher["status"] = "Active";
    });

    return (
      <ScreenHolder>
        <ContentBox title="Voucher List" onClick={this.onClick.bind(this)}>
          <ButtonHolders>
            <ActionBtn
              type="primary"
              onClick={this.handleModal.bind(this, null)}
            >
              Add New Voucher
            </ActionBtn>
          </ButtonHolders>

          <Voucher
            dataSource={vouchers}
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

  return {
    ...state.Vouchers,
    merchant,
    readSpecifiedRecordLoading,
    readSpecifiedRecordError,
    merchants,
    user,
  };
};

export default connect(mapStatetoprops, {
  ...actions,
  readFromDatabaseMerchants
})(voucher);
