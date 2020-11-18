import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/shopPost/actions";
import Form from "../../../components/templates/shopPost/ShopPostForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";

class ShopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const { shopPostID = null } = this.props.match.params;
    this.props.readSpecifiedRecord(shopPostID);
    
    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
  }

  componentWillReceiveProps(nextProps) {
    const { shopID } = this.props.match.params;
    let { post, submitResult } = nextProps;    

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
      const submitResultMessage = nextProps.submitResult.message;
      const replaceSubmitResultMessage = submitResultMessage.replace("shopPost", "post");
      notification("success", replaceSubmitResultMessage);
      if(submitResult.action === "Delete shopPost")
      {
        this.props.history.push(`/home/shopList/${shopID}/posts`);
      }else if(submitResult.action === "Create shopPost"){

        this.props.history.push(`/home/shopList/${shopID}/posts/${post.id}`);
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

  handleRecord = async (actionName, post) => {
    const { shopID } = this.props.match.params;
    let { errorReturn } = this.props;
    const defaultValidate = {
      title: { required: true, type: "stringLength", max: 50 },
      description: { required: true },
    };

    errorReturn = validation(post, defaultValidate);
    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(post, actionName, shopID);
    }
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { post } = clone(this.props);
    if (key && nestedKey) post[key][nestedKey] = event.target.value;
    else if (key) post[key] = event.target.value;

    this.props.update(post);
  };

  // onUploadFile({ key = null, target = null },{ file = null} ){
  //   this.props.uploadFile({ key, shopId: target, file });
  // }

  render() {
    const { url, params } = this.props.match;
    const {
        readSpecifiedRecordLoading,
        submitLoading,
        errorReturn,
    } = this.props;
    const optionUrl = this.urlCheck(params.shopPostID, url);

    const { post } = clone(this.props);

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.shopPostID ? "shopPost" : "shop"}
          optionControl={params.shopPostID ? "shopPost" : "shop"}
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "shopList")}>Shops</BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "shop")}>Shop</BcrumbItem>
              { params.shopPostID &&
                <BcrumbItem>Post</BcrumbItem>
              }
            </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
            <Form
              loading={readSpecifiedRecordLoading}
              dataSource={post}
              errorReturn={errorReturn}
              onRecordChange={this.onRecordChange.bind(this)}
              // onUploadFile={this.onUploadFile.bind(this)}
              onSubmit={
                post.id ? 
                  this.handleRecord.bind(this, "update", post) : 
                  this.handleRecord.bind(this, "insert", post)
              }
              onSubmitLoading={submitLoading}
              onDelete={this.handleRecord.bind(this, "delete", post)}
              onDeleteLoading={submitLoading}
              // uploadKey={uploadKey}
              // uploadLoading={uploadLoading}
              // uploadProgress={uploadProgress}
              // uploadResult={uploadResult}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {

    return { 
      ...state.ShopPost
    };
};

export default connect(mapStatetoprops, actions)(ShopForm);
