import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../redux/merchant/actions";
import actionsUser from "../../redux/users/actions";
import { notification } from "marslab-library-react/components/organisms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { SearchOutlined } from "@ant-design/icons";
import { Form as ModalForm } from "marslab-library-react/components/organisms/Form";
import Merchant from "../../components/templates/merchant";
import { ActionBtn, ButtonHolders } from "./styles";
import clone from "clone";
import "react-datepicker/dist/react-datepicker.css";
import { validation } from "marslab-library-react/utils/validation";
import moment from "moment";

const readFromDatabaseUsers = actionsUser.readFromDatabase;

class merchant extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.readFromDatabase();
    this.props.readFromDatabaseUsers();
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
      this.props.readFromDatabaseUsers();
      notification("success", nextProps.submitResult.message);
      this.props.readFromDatabase();
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
      businessName: { required: true },
      businessRegistrationNumber: { required: true },
      superadmin: { required: true },
    };
    
    errorReturn = validation(record, defaultValidate);

    this.props.errorUpdate(errorReturn);
    
    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(record, actionName);
    }
  };

  handleModal = (merchant = null) => {
    const errorReturn = {};

    this.props.errorUpdate(errorReturn);
    this.props.modalControl(merchant);
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { merchant } = clone(this.props);
    if (key && nestedKey) merchant[key][nestedKey] = event.target.value;
    else if (key) merchant[key] = event.target.value;
    this.props.update(merchant);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { merchant } = clone(this.props);
    if (key && nestedKey) merchant[key][nestedKey] = value;
    else if (key) merchant[key] = value;
    this.props.update(merchant);
  };

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, merchantId: target, file });
  }

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
      merchants,
      merchant,
      modalActive,
      submitLoading,
      uploadLoading,
      uploadProgress,
      uploadResult,
      readLoading,
      uploadKey,
      readSpecifiedRecordLoading,
      errorReturn,
      users,
      error,
    } = this.props;

    const optionUrl = this.urlChange(url);

    const userLists =
      users &&
      Object.values(users).map((user) => {
        return { data: user.id, label: user.email };
      });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    return (
      <ScreenHolder>
        <ContentBox title="Merchant List" onClick={this.onClick.bind(this)}>
          <ButtonHolders>
            <ActionBtn
              type="primary"
              onClick={this.handleModal.bind(this, null)}
            >
              Add New Merchant
            </ActionBtn>
          </ButtonHolders>

          <Merchant
            dataSource={merchants}
            loading={readLoading}
            rowSelection={rowSelection}
            getColumnSearchProps={this.getColumnSearchProps.bind(this)}
            handleModal={this.handleModal.bind(this)}
            handleRecord={this.handleRecord.bind(this)}
            onSelectChange={this.onSelectChange.bind(this)}
            onRecordChange={this.onRecordChange.bind(this)}
            onUploadFile={this.onUploadFile.bind(this)}
            merchant={merchant}
            userLists={userLists}
            errorReturn={errorReturn}
            modalActive={modalActive}
            submitLoading={submitLoading}
            uploadLoading={uploadLoading}
            uploadProgress={uploadProgress}
            uploadResult={uploadResult}
            uploadKey={uploadKey}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {

  const users = state.Users.users

  return {
    ...state.Merchants,
    users
  };
};

export default connect(mapStatetoprops, {
  ...actions,
  readFromDatabaseUsers,
})(merchant);
