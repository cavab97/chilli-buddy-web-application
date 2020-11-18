import React, { Component } from "react";
import { Link } from "react-router-dom";

import {Input,Button} from "marslab-library-react/components/atoms";
import { notification } from "marslab-library-react/components/organisms";
import IntlMessages from "marslab-library-react/components/organisms/utility/intlMessages";
import ForgotPasswordStyleWrapper from "./styles";
import clone from "clone";

import { siteConfig } from "settings"

import { connect } from "react-redux";
import authAction from "marslab-library-react/redux/auth/actions";

const { forgotPasswordRequest, updateLoginDetails } = authAction;
const { siteName } = siteConfig;

class ForgotPassword extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.forgotPasswordMessage !== nextProps.forgotPasswordMessage &&
      nextProps.forgotPasswordMessage
    ) {
      notification("info", nextProps.forgotPasswordMessage);
    }
    if (
      this.props.forgotPasswordError !== nextProps.forgotPasswordError &&
      nextProps.forgotPasswordError
    ) {
      notification("error", nextProps.forgotPasswordError.message);
    }
  }

  onRecordChange = (key, event) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = event.target.value;
    this.props.updateLoginDetails(loginDetails);
  };

  handleResetPasswordRequest = loginDetails => {
    const { forgotPasswordRequest } = this.props;
    forgotPasswordRequest(loginDetails);
  };

  render() {
    
    const { loginDetails, forgotPasswordLoading } = this.props;

    return (
      <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/home">
              {siteName}
              </Link>
            </div>

            <div className="isoFormHeadText">
              <h3>
                <IntlMessages id="page.forgetPassSubTitle" />
              </h3>
              <p>
                <IntlMessages id="page.forgetPassDescription" />
              </p>
            </div>

            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input size="large"
                 placeholder="Email"
                 value={loginDetails.email}
                 onChange={this.onRecordChange.bind(this, "email")}
                 />
              </div>

              <div className="isoInputWrapper">
                <Button
                  onClick={this.handleResetPasswordRequest.bind(this, loginDetails)}
                  loading={forgotPasswordLoading}
                  type="primary"
                >
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const {
    loginDetails,
    forgotPasswordLoading,
    forgotPasswordMessage,
    forgotPasswordError
  } = Auth;

  return {
    loginDetails,
    forgotPasswordLoading,
    forgotPasswordMessage,
    forgotPasswordError
  };
};

export default connect(mapStateToProps, {
  forgotPasswordRequest,
  updateLoginDetails
})(ForgotPassword);
