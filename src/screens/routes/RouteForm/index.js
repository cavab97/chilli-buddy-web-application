import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/route/actions";
import Form from "../../../components/templates/routes/RouteForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";
import moment from "moment";
import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";

class RouteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const { routeID = null } = this.props.match.params;

    this.props.readSpecifiedRecord(routeID);
    this.props.errorUpdate({});
  }

  componentWillReceiveProps(nextProps) {
    const { routeGroupID } = this.props.match.params;
    let { route, submitResult } = nextProps;
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
      if(submitResult.action === "Delete route")
      {
        
        this.props.history.push(`/home/routegroup/${routeGroupID}`);
      }else{
        
        this.props.history.push(`/home/routegroup/${routeGroupID}/route/${route.id}`);
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
    let { route } = clone(this.props);
    if (key && nestedKey) route[key][nestedKey] = event.target.value;
    else if (key) route[key] = event.target.value;

    this.props.update(route);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { route } = clone(this.props);
    console.log(route);
    if (key && nestedKey) route[key][nestedKey] = value;
    else if (key) route[key] = value;
    this.props.update(route);
  };

  onDateChange({ key, secondKey }, date, dateString) {
    let { route } = clone(this.props);

    if (key && secondKey){
      route[key] = date[0];
      route[secondKey] = date[1];
    }
    this.props.update(route);
  }

  handleRecord = async (actionName, record) => {
    const { routeGroupID } = this.props.match.params;
    let { errorReturn } = this.props;

    const defaultValidate = {
      type: { required: true },
      category: { required: true },
      title: { required: true, type: "stringLength", max: 30 },
      startTime: { required: true },
      endTime: { required: true },
      station: { required: true },
    };

    if(record.published.at === null){
      defaultValidate["endTime"] = { required: true, type: "time", before: moment() };
    }

    if(record.minimumUser){
      defaultValidate["minimumUser"] = { type: "number", min: 0, isDigit: true };
    }

    errorReturn = validation(record, defaultValidate);

    this.props.errorUpdate(errorReturn);
    
    if (errorReturn.errorNo === 0) {
      if(record.type === "Casual"){
        record.minimumUser = 0;
      }
        
      this.props.submitToBackend(record, actionName, routeGroupID);
    }
  };

  onUploadFile({ target = null }, { file = null }) {
    this.props.uploadFile({routeId: target, file });
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
    const optionUrl = this.urlCheck(params.routeID, url);

    const { route } = clone(this.props);
    
    const routeType = [
      {
        data: "Casual",
        label: "Casual"
      },
      {
        data: "Luxury",
        label: "Luxury"
      }
    ];

    const routeCategory = [
      {
        data: "Normal",
        label: "Normal"
      },
      {
        data: "CheckIn",
        label: "Check In"
      }
    ];

    const stationType = [
      {
        data: 9,
        label: "9 station"
      },
      {
        data: 15,
        label: "15 station"
      }
    ];

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.routeID}
          optionControl={params.routeID ? "route" : "routegroup"}
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>Route Group</BcrumbItem>
              { route.id &&
                <BcrumbItem>Route</BcrumbItem>
              }
            </Bcrumb>
          }
          onClick={route.id ? this.onClick.bind(this) : null}
        >
          <Form 
            loading={readSpecifiedRecordLoading}
            dataSource={route}
            routeType={routeType}
            routeCategory={routeCategory}
            stationType={stationType}
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
              route.id
                ? this.handleRecord.bind(this, "update", route)
                : this.handleRecord.bind(this, "insert", route)
            }
            onSubmitLoading={submitLoading}
            onDelete = {this.handleRecord.bind(this, "delete", route)}
            onDeleteLoading = {submitLoading}
            onPublish = {this.handleRecord.bind(this, "publish", route)}
            onPublishLoading = {submitLoading}
            onTerminate = {this.handleRecord.bind(this, "terminate", route)}
            onTerminateLoading = {submitLoading}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.Route };
};

export default connect(mapStatetoprops, actions)(RouteForm);
