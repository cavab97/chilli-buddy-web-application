import React, { Component } from "react";
import { connect } from "react-redux";
import userActions from "../../../redux/users/actions";
import merchantActions from "../../../redux/covid19Shop/actions";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { notification } from "marslab-library-react/components/organisms";
import UserList from "../../../components/templates/users/UserList";

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

  imageModal = () => {
    this.setState({ photoView: !this.state.photoView });
  };

  render() {
    const { url, params } = this.props.match;
    const {
      readUserLoading,
      user,
      users,
      modalActive,
      covid19Shops,
      readMerchantLoading
    } = this.props;
    const urlID = params.routeID;
    const optionUrl = this.urlCheck(urlID, url);

    const phoneUsers = [];
    users.forEach(data => {
      const merchantUser = covid19Shops.filter(merchant => merchant.id == data.id );

      if(merchantUser.length === 0)
        phoneUsers.push(data);
    });

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
          <UserList
            loading={readUserLoading || readMerchantLoading}
            dataSource={users}
            singleDataSource={user}
            modalActive={modalActive}
            handleModal={this.handleModal.bind(this)}
            photoView={this.state.photoView}
            imageModal={this.imageModal.bind(this)}
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

  return { user, users, readUserLoading, modalActive, covid19Shops, readMerchantLoading };
}

export default connect(
  mapStatetoprops,
  { ...userActions, readMerchant }
)(users);
