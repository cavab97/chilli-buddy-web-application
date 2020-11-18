import React, { Component } from "react";
import { connect } from "react-redux";
import missionActions from "../../../redux/mission/actions";
import shopActions from "../../../redux/shops/actions";
import routeActions from "../../../redux/route/actions";
import Form from "../../../components/templates/mission/MissionForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";


const readShops = shopActions.readFromDatabase;
const readRoute = routeActions.readSpecifiedRecord;

class MissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const { missionID = null, routeID } = this.props.match.params;
  
    this.props.readRoute(routeID);
    this.props.readShops();
    this.props.readSpecifiedRecord(missionID);
    this.props.errorUpdate({});
  }

  componentWillReceiveProps(nextProps) {
    const { routeGroupID, routeID } = this.props.match.params;

    let { mission, submitResult } = nextProps;
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
      if(submitResult.action === "Delete mission")
      {
        this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}`);
      }else{
        this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/mission/${mission.id}`);
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
      case "routeGroupList": 

      this.props.history.push(`/home/routegroup`);
      break;
      case "routeGroup":

      this.props.history.push(`/home/routegroup/${params.routeGroupID}`);
      break;
      case "route":
      
      this.props.history.push(`/home/routegroup/${params.routeGroupID}/route/${params.routeID}`);
      break;
      case "mission":

      this.props.history.push(`/home/routegroup/${params.routeGroupID}/route/${params.routeID}/mission/${params.missionID}`);
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
    let { mission } = clone(this.props);
    if (key && nestedKey) mission[key][nestedKey] = event.target.value;
    else if (key) mission[key] = event.target.value;

    this.props.update(mission);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { mission } = clone(this.props);
    if (key && nestedKey) mission[key][nestedKey] = value;
    else if (key) mission[key] = value;

    this.props.update(mission);
  };

  handleRecord = (actionName, record) => {
    const { routeID } = this.props.match.params;
    let { errorReturn } = this.props;

    const recordCheck = {
      title: record.title,
      shopIds: record.shopIds,
      minSpend: record.minSpend,
    }

    const validateAssign = {
      title: { required: true, type: "stringLength", max: 30 },
      shopIds: { required: true },
      minSpend: { required: true, type: "number", decimalPlace: 2 },
    };

    errorReturn = validation(recordCheck, validateAssign);
    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(record, actionName, routeID);
    }
  };

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, missionID: target, file });
  }

  render() {
    const { url, params } = this.props.match;
    const { routeGroupID, routeID } = params;

    const {
      errorReturn,
      submitLoading,
      uploadLoading,
      uploadProgress,
      uploadResult,
      uploadKey,
      readSpecifiedRecordLoading,
      routeReadLoading,
      shops,
      shopLoading, 
      routeCategory
    } = this.props;
    const optionUrl = this.urlCheck(params.missionID, url);

    const { mission } = clone(this.props);

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.missionID}
          optionControl={params.missionID ? "mission" : "route"}
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
                <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
                  <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>Route Group</BcrumbItem>
                  <BcrumbItem onClick={this.jumpBack.bind(this, "route")}>Route</BcrumbItem>
                { mission.id &&
                    <BcrumbItem>Mission</BcrumbItem>
                }
            </Bcrumb>
          }
          onClick={mission.id ? this.onClick.bind(this) : null}
        >
            <Form
              loading={readSpecifiedRecordLoading || routeReadLoading}
              dataSource={mission}
              onRecordChange={this.onRecordChange.bind(this)}
              onSelectChange={this.onSelectChange.bind(this)}
              onUploadFile={this.onUploadFile.bind(this)}
              shopList={shops}
              shopLoading = {shopLoading}
              uploadLoading={uploadLoading}
              uploadProgress={uploadProgress}
              uploadResult={uploadResult}
              uploadKey={uploadKey}
              errorReturn={errorReturn}
              onSubmit={
                mission.id
                  ? this.handleRecord.bind(this, "update", mission)
                  : this.handleRecord.bind(this, "insert", mission)
              }
              onSubmitLoading={submitLoading}
              onDelete = {this.handleRecord.bind(this, "delete", mission)}
              onDeleteLoading = {submitLoading}
              routeCategory = {routeCategory}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  const shops = state.Shops.shops
  const shopLoading = state.Shops.readLoading
  const routeCategory = state.Route.route.category
  const routeReadLoading = state.Route.readSpecifiedRecordLoading

  return { ...state.Mission, shops, shopLoading, routeCategory, routeReadLoading  };
};

export default connect(mapStatetoprops, {...missionActions, readShops, readRoute })(MissionForm);
