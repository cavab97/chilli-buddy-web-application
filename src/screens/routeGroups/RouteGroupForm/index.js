import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/routeGroup/actions";
import mainActions from 'marslab-library-react/redux/theme/actions';
import Form from "../../../components/templates/routeGroups/RouteGroupForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";
import { geohashEncode } from "marslab-library-react/utils/common/geohash";


class RouteGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const { routeGroupID = null } = this.props.match.params;
    this.props.readSpecifiedRecord(routeGroupID);

    
    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
  }

  componentWillReceiveProps(nextProps) {
    let { routeGroup, submitResult } = nextProps;
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
      if(submitResult.action === "Delete routeGroup")
      {
        this.props.history.push(`/home/routegroup`);
      }else{

        this.props.history.push(`/home/routegroup/${routeGroup.id}`);
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
    let { routeGroup } = clone(this.props);
    if (key && nestedKey) routeGroup[key][nestedKey] = event.target.value;
    else if (key) routeGroup[key] = event.target.value;

    this.props.update(routeGroup);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { routeGroup } = clone(this.props);
    if (key && nestedKey) routeGroup[key][nestedKey] = value;
    else if (key) routeGroup[key] = value;
    this.props.update(routeGroup);
  };

  onLocationChange(key, event) {
    let { routeGroup } = clone(this.props);
    const value = event.target.value.trim();

    if (!isNaN(value)) {
      if (key === "latitude") {
        routeGroup.l._lat = value;
        routeGroup.g = geohashEncode(
          Number(routeGroup.l._lat),
          Number(routeGroup.l._long)
        );
      }

      if (key === "longitude") {
        routeGroup.l._long = value;
        routeGroup.g = geohashEncode(
          Number(routeGroup.l._lat),
          Number(routeGroup.l._long)
        );
      }
    }

    this.props.update(routeGroup);
  }

  onLocationCheckPress = (latitude, longitude) => {
    const location = {
      l: {
        _lat: latitude,
        _long: longitude
      }
    };

    const errorReturn = validation(location, { l: "geopoint" });

    if (errorReturn.errorNo > 0) {
      notification("error", errorReturn.l);
      return;
    }

    window.open(
      `http://www.google.com/maps/place/${latitude},${longitude}`,
      "_blank"
    );
  };

  handleRecord = async (actionName, record) => {
    let { errorReturn } = this.props;
    
    const recordCheck = {
      title: record.title,
    }

    const defaultValidate = {
      title: { required: true, type: "stringLength", max: 30 },
    };

    /* if(record.address.postcode){
      recordCheck["postcode"] = record.address.postcode;
      defaultValidate["postcode"] = { type: "postcode" };
    } */

    errorReturn = validation(recordCheck, defaultValidate);

    this.props.errorUpdate(errorReturn);


    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(record, actionName);
    }
  };

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, routeGroupId: target, file });
  }

  render() {
    const { url, params } = this.props.match;
    const {
      readSpecifiedRecordLoading,
      submitLoading,
      uploadLoading,
      uploadProgress,
      uploadResult,
      uploadKey,
      errorReturn
    } = this.props;
    const optionUrl = this.urlCheck(params.routeGroupID, url);

    const { routeGroup } = clone(this.props);

    return (
      <ScreenHolder>
        
        { routeGroup.id &&
        <InnerSidebar
          url={optionUrl}
          urlID={params.routeGroupID}
          optionControl="routegroup"
          displayStatus={this.state.innerHide}
        />
        }
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
              { routeGroup.id &&
                <BcrumbItem>Route Group</BcrumbItem>
              }
            </Bcrumb>
          }
          onClick={routeGroup.id && this.onClick.bind(this)}
        >
            <Form
              loading={readSpecifiedRecordLoading}
              dataSource={routeGroup}
              onRecordChange={this.onRecordChange.bind(this)}
              onSelectChange={this.onSelectChange.bind(this)}
              onLocationChange={this.onLocationChange.bind(this)}
              onLocationCheckPress={this.onLocationCheckPress.bind(this)}
              onUploadFile={this.onUploadFile.bind(this)}
              uploadLoading={uploadLoading}
              uploadProgress={uploadProgress}
              uploadResult={uploadResult}
              uploadKey={uploadKey}
              errorReturn={errorReturn}
              onSubmit={
                routeGroup.id
                  ? this.handleRecord.bind(this, "update", routeGroup)
                  : this.handleRecord.bind(this, "insert", routeGroup)
              }
              onSubmitLoading={submitLoading}
              onDelete = {this.handleRecord.bind(this, "delete", routeGroup)}
              onDeleteLoading = {submitLoading}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.RouteGroup };
};

export default connect(mapStatetoprops, actions)(RouteGroupForm);
