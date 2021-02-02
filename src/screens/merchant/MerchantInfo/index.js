import React, { Component } from "react";
import { connect } from "react-redux";
import userActions from "../../../redux/users/actions";
import actions from "../../../redux/merchant/actions";
import { notification } from "marslab-library-react/components/organisms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import Merchantinfo from "../../../components/templates/merchantInfo/index";

import {

  QRContainer
} from "./styles";
import clone from "clone";
import "react-datepicker/dist/react-datepicker.css";
import { validation } from "marslab-library-react/utils/validation";

class merchantsInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const uid = this.props.uid
    this.props.readSpecifiedUserMerchant(uid); 
  }

  componentWillReceiveProps(nextProps) {
    // if (
    //   this.props.submitError.message !== nextProps.submitError.message &&
    //   nextProps.submitError.message
    // ) {
    //   notification("error", nextProps.submitError.message);
    // }
    // if (
    //   this.props.submitResult.message !== nextProps.submitResult.message &&
    //   nextProps.submitResult.message
    // ) {
    //   notification("success", nextProps.submitResult.message);
    // }
  }

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  handleRecord = async (actionName, advertisement) => {
    let { errorReturn } = this.props;
    const { user } = this.props;
    const loginDetails = this.props.loginDetails;
    //console.log(advertisements)
    if (advertisement.key && actionName !== "delete") {
      actionName = "update";
    }

    this.props.errorUpdate(errorReturn);
    console.log(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.saveIntoFireStore(advertisement, actionName);
    }
  };

  handleSignup = (loginDetails) => {
    let { errorReturn } = this.props;
    console.log("loginDetails: " + loginDetails.email + loginDetails.password);
    const recordCheck = {
      email: loginDetails.email,
      passcode: loginDetails.password,
    };


    // errorReturn = validation(recordCheck, defaultValidate);
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
    let { advertisement } = clone(this.props);
    if (key && nestedKey) advertisement[key][nestedKey] = event.target.value;
    else if (key) advertisement[key] = event.target.value;
    this.props.update(advertisement);
  };

  onLoginRecordChange = (key, event) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = event.target.value;
    this.props.updateLoginDetails(loginDetails);
  };

  onShopIDChange = ({ key, nestedKey }, event) => {
    let { advertisement } = clone(this.props);
    if (key && nestedKey) advertisement[key][nestedKey] = event;
    else if (key) advertisement[key] = event;
    this.props.update(advertisement);
  };

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }
  getImage = (imageElement) => {
    return new Promise((resolve, reject) => {
      imageElement.onload = () => {
        resolve(imageElement.complete);
      }
    });
  }
  getPixelRatio = (context) => {
    var backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
  }

  onQRCodeDownload = async () => {
    // get gogogain image
    const gogogainLogo = document.createElement("img");
    gogogainLogo.src = require("../../../assets/images/chilibuddyLogo.png");
    await this.getImage(gogogainLogo);

    // get source code
    const qrCodeElement = document.getElementById(`QRCodeCanvas`);

    // genarate canvas for qr
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ratio = this.getPixelRatio(context);
    
    // canvas setup
    canvas.style.width = '600px';
    canvas.style.height = '710px';
    canvas.width = 600 * ratio;
    canvas.height = 710 * ratio;

    // red background
    context.fillStyle = "#ff0000";
    context.fillRect(0,0,600*ratio,710*ratio);

    // word
    context.fillStyle = "#FFFFFF";
    context.font = (36*ratio) + "px Arial";
    context.fillText("Powered by ChilliBuddy", 145*ratio, 650*ratio);

    // white background
    context.fillStyle = "#ffffff";
    context.fillRect(30*ratio,30*ratio,540*ratio,540*ratio);
    
    // QRcode & gogogainLogo
    context.drawImage(qrCodeElement,60*ratio,60*ratio,480*ratio,480*ratio);
    context.drawImage(gogogainLogo,30*ratio,590*ratio,100*ratio,100*ratio);

    const qrCodeUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = qrCodeUrl;
    downloadLink.download = "image.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }




  render() {
    const { url } = this.props.match;
    const {
      modalActive,
      advertisements,
      modalCurrentPage,
      submitLoading,
      readLoading,
      readSpecifiedRecordLoading,
      errorReturn,
      shop_shops,
      user,
      loginDetails,
      loading,
      error,
      readShopLoading,
      merchants
    } = this.props;

    return (
      <ScreenHolder>
        <ContentBox title="Merchant Info " onClick={this.onClick.bind(this)}>
          <Merchantinfo
            singleDataSource={user}
            loading={merchants.readLoading}
            merchant={merchants.merchant}
            handleModal={this.handleModal.bind(this)}
            handleRecord={this.handleRecord.bind(this)}
            onQRCodeDownload={this.onQRCodeDownload.bind(this)}
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

  const uid = state.Auth.user.idTokenResult.claims.user_id

  const readUserLoading = state.Users.readLoading;

  const { covid19Shops } = state.Covid19Shop;
  const readMerchantLoading = state.Covid19Shop.readLoading;
  const readShopLoading = state.Covid19Shop.readSpecifiedRecordLoading;

  const merchants = state.Merchants;

  return { 
    user, 
    users, 
    readUserLoading, 
    modalActive, 
    covid19Shops, 
    readShopLoading,
    uid,
    merchants
  };
}

export default connect(
  mapStatetoprops,
  { ...actions }
)(merchantsInfo);