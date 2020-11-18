import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/promotion/actions";
import Form from "../../../components/templates/promotion/PromotionForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";
import moment from "moment";
import { notification } from "marslab-library-react/components/organisms";

import uuid from 'react-uuid';
import { validation } from "marslab-library-react/utils/validation";

class PromotionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
      pre_id: null,
    };
  }

  componentDidMount() {
    const { promotionID = null } = this.props.match.params;
    this.props.readSpecifiedRecord(promotionID);
    
    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
  }

  componentWillReceiveProps(nextProps) {
    let { promotion, submitResult } = nextProps;
    const { params } = this.props.match;
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
      if(submitResult.action === "Delete promotion")
      {
        this.props.history.push(`/home/shopList/${params.shopID}/promotions`);
      }else if(submitResult.action === "Create promotion"){

        this.props.history.push(`/home/shopList/${params.shopID}/promotions/${promotion.id}/setting`);
      }
    }
  }

  urlCheck(params, url){
    const allRoute = url.split('/');
    const lastRoute = allRoute[allRoute.length - 1];

    if(params !== lastRoute){
      const oldUrl = url.substring(0, url.lastIndexOf("/"));

      return oldUrl;
    }else{
      return url;
    }
  }

  jumpBack(key){
    const { params } = this.props.match;

    switch(key){
        case "shopList": 

            this.props.history.push(`/home/shopList`);
        break;
        case "shop":
        
            this.props.history.push(`/home/shopList/${params.shopID}`);
        break;

    }
  }

  onClick = () => {
    if(this.state.innerHide.display === "block"){
      this.setState({innerHide: {display: "none"}});
    }else{
      this.setState({innerHide: {display: "block"}});
    }
  }

  onRecordChange = ({ key, nestedKey }, event) => {
    let { promotion } = clone(this.props);
    if (key && nestedKey) promotion[key][nestedKey] = event.target.value;
    else if (key) promotion[key] = event.target.value;

    this.props.update(promotion);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { promotion } = clone(this.props);
    if (key && nestedKey) promotion[key][nestedKey] = value;
    else if (key) promotion[key] = value;
    this.props.update(promotion);
  };

  onDateChange({ key, secondKey }, date, dateString) {
    let { promotion } = clone(this.props);

    if (key && secondKey){
      promotion[key] = date[0];
      promotion[secondKey] = date[1];
    }
    this.props.update(promotion);
  }

  handleRecord = async (actionName, record) => {
    const { shopID } = this.props.match.params;
    let { errorReturn } = this.props;

    const defaultValidate = {
      title: { required: true, type: "stringLength", max: 80 },
      startTime: { required: true },
      endTime: { required: true, type: "time", before: moment() },
      coverPhotos: { required: true },
      images: { required: true }
    };
    
    errorReturn = validation(record, defaultValidate);

    this.props.errorUpdate(errorReturn);
    
    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(record, actionName, shopID);
    }
  };

  onUploadFile({ target = null }, { file = null }) {
    if(target === null){
      target = uuid();
      this.onSelectChange({key: "id"}, target);
    }
    
    this.props.uploadFile({promotionId: target, file });
  }

  render() {
    const { url, params } = this.props.match;
    const {
      readSpecifiedRecordLoading,
      errorReturn,
      submitLoading,
      uploadLoading,
      uploadProgress,
      uploadResult,
      uploadKey
    } = this.props;
    const optionUrl = this.urlCheck(params.promotionID, url);

    const { promotion } = clone(this.props);
 
    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.promotionID ? "promotion" : "shop"}
          optionControl={params.promotionID ? "promotion" : "shop"}
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "shopList")}>Shops</BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "shop")}>Shop</BcrumbItem>
              { params.promotionID &&
                <BcrumbItem>Promotion</BcrumbItem>
              }
            </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <Form 
            loading={readSpecifiedRecordLoading}
            dataSource={promotion}
            onRecordChange={this.onRecordChange.bind(this)}
            onSelectChange={this.onSelectChange.bind(this)}
            onDateChange={this.onDateChange.bind(this)}
            onUploadFile={this.onUploadFile.bind(this)}
            uploadLoading={uploadLoading}
            uploadProgress={uploadProgress}
            uploadResult={uploadResult}
            uploadKey={uploadKey}
            errorReturn={errorReturn}
            onSubmit={
              params.promotionID ? 
                this.handleRecord.bind(this, "update", promotion) : 
                this.handleRecord.bind(this, "insert", promotion)
            }
            onSubmitLoading={submitLoading}
            onDelete = {this.handleRecord.bind(this, "delete", promotion)}
            onDeleteLoading = {submitLoading}
            onPublish = {this.handleRecord.bind(this, "publish", promotion)}
            onPublishLoading = {submitLoading}
            onTerminate = {this.handleRecord.bind(this, "terminate", promotion)}
            onTerminateLoading = {submitLoading}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.Promotion };
};

export default connect(mapStatetoprops, actions)(PromotionForm);