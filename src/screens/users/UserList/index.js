import React, { Component } from "react";
import { connect } from "react-redux";
import userActions from "../../../redux/users/actions";
import merchantActions from "../../../redux/covid19Shop/actions";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { notification } from "marslab-library-react/components/organisms";
import UserList from "../../../components/templates/users/UserList";

import { 
  ActionBtn, 
  ButtonHolders,
} from "./styles";
import { validation } from "marslab-library-react/utils/validation";
import clone from "clone";

const readMerchant = merchantActions.readFromDatabase;

class users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
      photoView: false,
    };
  }

  componentDidMount() {
      this.props.readFromDatabase();
      this.props.readMerchant();
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

  urlCheck(params, url) {
      return url.substring(0, url.indexOf("/users"));
  }

  handleModal = (rowData) => {
    this.props.toggleModal(rowData);
  };

  handleSignupModal = (data = null) => {
    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
    this.props.signupToggle(data);
  };

  imageModal = () => {
    this.setState({ photoView: !this.state.photoView });
  };

  handleSignup = (loginDetails) => {
    let { errorReturn } = this.props;

    const recordCheck = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    const defaultValidate = {
      email: { required: true, type: "email" },
      password: { required: true, type: "stringLength", max: 6 },
    };

    errorReturn = validation(recordCheck, defaultValidate);
    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.signup(loginDetails);
    }
  };

  onLoginRecordChange = (key, event) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = event.target.value;
    this.props.updateLoginDetails(loginDetails);
  };

  render() {
    const { url, params } = this.props.match;
    const {
      readUserLoading,
      user,
      users,
      modalActive,
      covid19Shops,
      readMerchantLoading,
      loginDetails,
      errorReturn,
      signupModalActive,
      submitLoading
    } = this.props;
    const urlID = params.routeID;
    const optionUrl = this.urlCheck(urlID, url);

    const phoneUsers = [];
    users.forEach(data => {
      const merchantUser = covid19Shops.filter(merchant => merchant.id == data.id );

      if(merchantUser.length === 0)
        phoneUsers.push(data);
    });

    console.log(this.props);

    return (
      <ScreenHolder>
        {params.routeID && (
          <InnerSidebar
            url={optionUrl}
            urlID={urlID}
            optionControl={"route"}
            displayStatus={this.state.innerHide}
          />
        )}
        <ContentBox
          title="User List"
          onClick={this.onClick.bind(this)}
        >
          <ButtonHolders>
            <ActionBtn
              type="primary"
              onClick={this.handleSignupModal.bind(this, null)}
            >
              Add New User
            </ActionBtn>
          </ButtonHolders>
          <UserList
            loading={readUserLoading || readMerchantLoading}
            dataSource={users}
            singleDataSource={user}
            modalActive={modalActive}
            errorReturn={errorReturn}
            loginDetails={loginDetails}
            handleSignupModal={this.handleSignupModal.bind(this)}
            handleSignup={this.handleSignup.bind(this)}
            handleModal={this.handleModal.bind(this)}
            photoView={this.state.photoView}
            signupModalActive={signupModalActive}
            imageModal={this.imageModal.bind(this)}
            submitLoading={submitLoading}
            onLoginRecordChange={this.onLoginRecordChange.bind(this)}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  const { 
    user,
    users,
    modalActive 
  } = state.Users;

  const readUserLoading = state.Users.readLoading;

  const { covid19Shops } = state.Covid19Shop;
  const readMerchantLoading = state.Covid19Shop.readLoading;

  return { 
    ...state.Users,
    user, 
    users, 
    readUserLoading, 
    modalActive, 
    covid19Shops, 
    readMerchantLoading 
  };
}

export default connect(
  mapStatetoprops,
  { ...userActions, readMerchant }
)(users);
