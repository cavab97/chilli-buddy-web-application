import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Input ,Button } from "marslab-library-react/components/atoms";
import IntlMessages from "marslab-library-react/components/organisms/utility/intlMessages";
import { notification } from "marslab-library-react/components/organisms"
import authAction from "marslab-library-react/redux/auth/actions";
import mainAction from "marslab-library-react/redux/theme/actions";
import SignInStyleWrapper from "./styles";

import { siteConfig } from "settings"

import clone from "clone";


const { login, updateLoginDetails } = authAction;
const { clearMenu } = mainAction;
const { siteName } = siteConfig;

class SignIn extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error && nextProps.error) 
    {
      notification('error', nextProps.error.message);
    }
  }

  onRecordChange = (key, event) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = event.target.value;
    this.props.updateLoginDetails(loginDetails);
  };

  handleLogin = loginDetails => {
    const { login } = this.props;
    login(loginDetails);
  };

  

  render() {
    const { loginDetails, isLoggedIn, clearMenu, loading } = this.props;

    const from = { pathname: "/home" };
    if (isLoggedIn) {
      clearMenu();
      return <Redirect to={from} />;
    }


    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginBackground"></div>
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/home">
                  {siteName}
              </Link>
            </div>

            <div className="isoSignInForm">
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
 
              <div className="isoInputWrapper isoOtherLogin">
                <Button
                  id='sign-in-button'
                  className= "btnAccountKit"
                  type="primary"
                  onClick={this.handleLogin.bind(this, loginDetails)}
                  loading = {loading}
                >
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>


              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup" >
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { isLoggedIn, loginDetails, loading, error } = Auth;

  return { isLoggedIn, loginDetails, loading, error };
};

export default connect(mapStateToProps, {
  updateLoginDetails,
  login,
  clearMenu
})(SignIn);
