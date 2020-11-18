import React, { Component } from "react";
import { connect } from "react-redux";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { notification } from "marslab-library-react/components/organisms";
import NameList from "../../../components/templates/covid19/covid19NameList";
import shopActions from "../../../redux/covid19Shop/actions";
import actions from "../../../redux/covid19NameList/actions";
import { firebaseConfig } from "marslab-library-react/settings/api";
import clone from "clone";
import { validation } from "marslab-library-react/utils/validation";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const readShop = shopActions.readSpecifiedRecord;
const submitShopToBackend = shopActions.submitToBackend;
const shopUpdate = shopActions.update;
const shopErrorUpdate = shopActions.errorUpdate;
const shopModalControl = shopActions.modalControl;

class Covid19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        startDate: null,
        endDate: null,
      }
    };
  }

  componentDidMount() {
    const { uid } = this.props;

    this.props.readFromDatabase(uid);
    this.props.readShop(uid);
  }

  componentDidUpdate(prevProps, prevState) {
    const groupId = this.props.uid;
    const filter = this.state.filter;

    if(
      this.state.filter.startDate != null &&
      this.state.filter.endDate != null &&
      this.state.filter != prevState.filter
    ){
      this.props.readByDate({ groupId, startDate: filter.startDate, endDate: filter.endDate });
    }

    if(
      this.state.filter.startDate == null &&
      this.state.filter.endDate == null &&
      this.state.filter != prevState.filter
    ){
      this.props.readFromDatabase(groupId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.submitShopError.message !== nextProps.submitShopError.message &&
      nextProps.submitShopError.message
    ) {
      notification("error", nextProps.submitShopError.message);
    }
    if (
      this.props.submitShopResult.message !== nextProps.submitShopResult.message &&
      nextProps.submitShopResult.message
    ) {
      notification("success", nextProps.submitShopResult.message);

    }
  }

  componentWillUnmount(){
    this.props.shopErrorUpdate({});
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

  getImage = (imageElement) => {
    return new Promise((resolve, reject) => {
      imageElement.onload = () => {
        resolve(imageElement.complete);
      }
    });
  }

  onQRCodeDownload = async () => {
    // get gogogain image
    const gogogainLogo = document.createElement("img");
    gogogainLogo.src = require("../../../assets/images/gogogain1.png");
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

    // orange background
    context.fillStyle = "#FEAC01";
    context.fillRect(0,0,600*ratio,710*ratio);

    // word
    context.fillStyle = "#FFFFFF";
    context.font = (48*ratio) + "px Arial";
    context.fillText("Power by gogogain", 145*ratio, 650*ratio);
    
    // QRcode & gogogainLogo
    context.drawImage(qrCodeElement,30*ratio,30*ratio,540*ratio,540*ratio);
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

  onFilterDate = (date) => {
    const startDate = date
    ? moment(date[0]).set("hour", 0).set("minute", 0).set("second", 0)
    : null;

    const endDate = date
    ? moment(date[1]).set("hour", 23).set("minute", 59).set("second", 59)
    : null;

    const filter = {
      startDate: startDate,
      endDate: endDate
    };


    this.setState({filter});
  };

  onShopRecordChange = ({ key, nestedKey }, event) => {
    let { covid19Shop } = clone(this.props);
    if (key && nestedKey) covid19Shop[key][nestedKey] = event.target.value;
    else if (key) covid19Shop[key] = event.target.value;

    this.props.shopUpdate(covid19Shop);
  };

  onShopSelectChange = ({ key, nestedKey }, value) => {
    let { covid19Shop } = clone(this.props);

    if (key && nestedKey) covid19Shop[key][nestedKey] = value;
    else if (key) covid19Shop[key] = value;
    this.props.shopUpdate(covid19Shop);
  };

  onExportPDF = (dataSource, subData) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Visitor List | "+subData.businessName+" | "+subData.ssmNumber;
    const headers = [["DATE", "TIME", "NAME", "PHONE NUMBER", "TEMPERATURE"]];

    const data = dataSource.map(data=> [
      moment(data.date).format("L"), 
      moment(data.date).format("hh:mm a"), 
      data.name,
      data.phoneNumber,
      data.temperature
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Visitor List.pdf")
  }

  handleModal = (key) => {
    if(key === "close"){
      const originCovid19Shop = this.props.originCovid19Shop;
      this.props.shopUpdate(originCovid19Shop);
    }

    this.props.shopModalControl(this.props.originCovid19Shop);
  };

  handleRecord = async (actionName, record) => {
    const userID = this.props.uid;
    let { errorReturn } = this.props;

    const defaultValidate = {
      businessName: { required: true },
      ssmNumber: { required: true },
    };

    const recordCheck = {
      businessName: record.businessName,
      ssmNumber: record.ssmNumber,
      postcode: record.address.postcode,
    }

    if(record.address.postcode){
      defaultValidate["postcode"] = { type: "postcode" }
    }

    errorReturn = validation(recordCheck, defaultValidate);

    this.props.shopErrorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.submitShopToBackend(record, actionName, { userID: userID });
    }
  };

  render() {
    const {
      uid,
      readLoading,
      covid19NameLists,
      readShopLoading,
      shopModalActive,
      covid19Shop,
      submitShopLoading,
      errorReturn
    } = this.props;

    return (
      <ScreenHolder>
        <ContentBox
          title={"Visitor List"}
        >
          <NameList 
            userId={uid}
            dataSource={covid19NameLists}
            loading={readLoading}
            onQRCodeDownload={this.onQRCodeDownload.bind(this)}
            url={firebaseConfig.authDomain}
            filterDate={this.state.filter}
            onFilterDate={this.onFilterDate.bind(this)}
            covid19Shop={covid19Shop}
            readShopLoading={readShopLoading}
            errorReturn={errorReturn}
            modalActive={shopModalActive}
            onExportPDF={this.onExportPDF.bind(this, covid19NameLists, covid19Shop)}
            onModalControl={this.handleModal.bind(this)}
            onShopChange={this.onShopRecordChange.bind(this)}
            onShopSelectChange={this.onShopSelectChange.bind(this)}
            onSubmitShop={(covid19Shop.id ? 
              this.handleRecord.bind(this, "update", covid19Shop) :
              this.handleRecord.bind(this, "insert", covid19Shop)
            )}
            submitShopLoading={submitShopLoading}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const {
    readLoading,
    readError,
    covid19NameLists,
  } = state.Covid19NameList;

  const readShopLoading = state.Covid19Shop.readSpecifiedRecordLoading;
  const readShopError = state.Covid19Shop.readSpecifiedRecordError;
  const covid19Shop = state.Covid19Shop.covid19Shop;
  const originCovid19Shop = state.Covid19Shop.originCovid19Shop;
  const submitShopLoading = state.Covid19Shop.submitLoading;
  const submitShopError = state.Covid19Shop.submitError;
  const submitShopResult = state.Covid19Shop.submitResult;
  const errorReturn = state.Covid19Shop.errorReturn;
  const shopModalActive = state.Covid19Shop.modalActive;
  const { uid } = state.Auth.user.user;

  return {
    uid,
    readLoading,
    readError,
    covid19NameLists,
    readShopLoading,
    readShopError,
    covid19Shop,
    originCovid19Shop,
    submitShopLoading,
    submitShopError,
    submitShopResult,
    errorReturn,
    shopModalActive
  };
};

export default connect(mapStatetoprops, 
  { ...actions, 
    readShop, 
    submitShopToBackend, 
    shopUpdate, 
    shopErrorUpdate,
    shopModalControl
  })(
    Covid19
);
