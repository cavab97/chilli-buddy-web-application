import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Checkbox, Button } from "marslab-library-react/components/atoms";
import authAction from "marslab-library-react/redux/auth/actions";
import mainAction from "marslab-library-react/redux/theme/actions";
import IntlMessages from "marslab-library-react/components/organisms/utility/intlMessages";
import { notification } from "marslab-library-react/components/organisms"
import SignUpStyleWrapper from "./styles";
import clone from "clone";

import { siteConfig } from "settings"
import privacyPolicyPDF from 'assets/privacy/privacyPolicy_CustomerVisitRecordPortal.pdf';


const { signup, updateLoginDetails } = authAction;
const { clearMenu } = mainAction;
const { siteName } = siteConfig;


class SignUp extends Component {
  state = {
    redirectToReferrer: false,
    agreeTermAndCondition: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error && nextProps.error) {
      notification("error", nextProps.error.message);
    }
  }

  onRecordChange = (key, event) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = event.target.value;
    this.props.updateLoginDetails(loginDetails);
  };

  handleSignup = loginDetails => {
    const agreeTermAndCondition = this.state.agreeTermAndCondition;
    const { signup } = this.props;
    const { password, confirmPassword } = loginDetails

    if( password === confirmPassword && agreeTermAndCondition)
    {
      signup(loginDetails);
    }else{
      notification("error", "Password not match.");
    }
  };

  onAgreeTermAndCondition = () => {
    this.setState({agreeTermAndCondition: !this.state.agreeTermAndCondition});
  }

  render() {
    const { loginDetails, isLoggedIn, clearMenu, loading } = this.props;

    const from = { pathname: "/home" };
    if (isLoggedIn) {
      clearMenu();
      return <Redirect to={from} />;
    }

    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoLoginBackground"></div>
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/home">
                  {siteName}
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Email"
                  value={loginDetails.email}
                  onChange={this.onRecordChange.bind(this, "email")}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  value={loginDetails.password}
                  onChange={this.onRecordChange.bind(this, "password")}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                  value={loginDetails.confirmPassword}
                  onChange={this.onRecordChange.bind(this, "confirmPassword")}
                />
              </div>

              <div className="isoInputWrapper" style={{ marginBottom: "50px" }}>
                <Checkbox checked={this.state.agreeTermAndCondition} onClick={this.onAgreeTermAndCondition.bind(this)}>
                  <a href = {privacyPolicyPDF} target = "_blank"><IntlMessages id="page.signUpTermsConditions" /></a>
                </Checkbox>
              </div>

              <div className="isoInputWrapper isoOtherLogin">
                <Button 
                  className= "btnAccountKit"
                  type="primary"
                  disabled={!this.state.agreeTermAndCondition}
                  onClick={this.handleSignup.bind(this, loginDetails)}
                  loading = {loading}
                >
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/login">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { isLoggedIn, loginDetails, loading, error } = Auth;

  return { isLoggedIn, loginDetails, loading, error };
};

export default connect(mapStateToProps, {
  updateLoginDetails,
  signup,
  clearMenu
})(SignUp);
