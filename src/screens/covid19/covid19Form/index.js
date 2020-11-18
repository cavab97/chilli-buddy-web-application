import React, { Component } from "react";
import { connect } from "react-redux";
import { notification } from "marslab-library-react/components/organisms";
import Form from "../../../components/templates/covid19/covid19Form";
import actions from "../../../redux/covid19NameList/actions";
import shopActions from "../../../redux/covid19Shop/actions";
import CovidFormStyleWrapper from "./styles";
import clone from "clone";
import { validation } from "marslab-library-react/utils/validation";

const readShop = shopActions.readSpecifiedRecord;

class Covid19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const { userID } = this.props.match.params;

    this.props.readShop(userID);
    this.props.readLocalStorage();
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
      this.props.modalPageControl();
    }
  }

  onRecordChange = ({ key, nestedKey }, event) => {
    let { covid19NameList } = clone(this.props);
    if (key && nestedKey) covid19NameList[key][nestedKey] = event.target.value;
    else if (key) covid19NameList[key] = event.target.value;

    this.props.update(covid19NameList);
  };

  handleRecord = async (actionName, record) => {
    const { userID } = this.props.match.params;
    let { errorReturn } = this.props;

    const defaultValidate = {
      name: { required: true },
      temperature: { required: true, type: "number", min: 35, max: 45 },
      //identityNumber: { required: true },
      phoneNumber: { required: true, type: "malaysiaSingaporePhone"},
    };

    errorReturn = validation(record, defaultValidate);

    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(record, actionName, { userID: userID });
    }
  };

  onBack = () => {
    this.props.modalPageControl();
  }

  render() {
    const {
      covid19NameList,
      errorReturn,
      submitLoading,
      modalSuccessPage,
      covid19Shop,
      readShopLoading
    } = this.props;

    const gogogainLogo = require("../../../assets/images/gogogain1.png")

    return (
      <CovidFormStyleWrapper>
          <Form
            loading={readShopLoading}
            covid19Shop={covid19Shop}
            submitLoading={submitLoading}
            logo={gogogainLogo}
            errorReturn={errorReturn}
            dataSource={covid19NameList}
            submitSuccessControl={modalSuccessPage}
            onRecordChange={this.onRecordChange.bind(this)}
            onSubmit={this.handleRecord.bind(this, "insert", covid19NameList)}
            onBack={this.onBack.bind(this)}
          />
      </CovidFormStyleWrapper>
    );
  }
}

const mapStatetoprops = (state) => {
  const {
    errorReturn,
    submitLoading,
    submitError,
    submitResult,
    modalSuccessPage,
    covid19NameList,
    readSpecifiedRecordLoading,
  } = state.Covid19NameList;

  const covid19Shop = state.Covid19Shop.covid19Shop;
  const readShopLoading = state.Covid19Shop.readSpecifiedRecordLoading;
  const readShopError = state.Covid19Shop.readError;

  return {
    errorReturn,
    submitLoading,
    submitError,
    submitResult,
    modalSuccessPage,
    covid19NameList,
    readSpecifiedRecordLoading,
    covid19Shop,
    readShopLoading,
    readShopError
  };
};

export default connect(mapStatetoprops, { ...actions, readShop })(
    Covid19
);
