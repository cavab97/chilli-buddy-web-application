import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/event/actions";
import Form from "../../../components/templates/events/EventForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";
import moment from "moment";


class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const { eventID = null } = this.props.match.params;

    console.log(this.props);
    this.props.readSpecifiedRecord(eventID);
    this.props.errorUpdate({});
  }

  componentWillReceiveProps(nextProps) {
    let { event, submitResult } = nextProps;
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
      console.log(this.props, nextProps);
      if(submitResult.action === "Delete event")
      {
        this.props.history.push(`/home/event`);
      }else{
        this.props.history.push(`/home/event/${event.id}`);
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
    
    switch(key){
      case "eventList": 

      this.props.history.push(`/home/event`);
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

  onRecordChange = ({ key, nestedKey }, value) => {
    let { event } = clone(this.props);
    if (key && nestedKey) event[key][nestedKey] = value.target.value;
    else if (key) event[key] = value.target.value;

    this.props.update(event);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { event } = clone(this.props);
    if (key && nestedKey) event[key][nestedKey] = value;
    else if (key) event[key] = value;
    this.props.update(event);
  };

  onDateChange({ key, secondKey }, date, dateString) {
    let { event } = clone(this.props);

    if (key && secondKey){ 
      event[key] = date[0];
      event[secondKey] = date[1];
    }


    this.props.update(event);
  }

  onUploadFile({ target = null }, { file = null }) {
    this.props.uploadFile({routeId: target, file });
  }
  /* onAddReward = () => {
    let { event } = clone(this.props);
    const totalReward = event.rewards.length;

    event.rewards[totalReward] = {rank: totalReward + 1};

    this.props.update(event);
  }

  onDeleteReward = ({type = null}) => {
    let { event } = clone(this.props);

    if(type === "deleteAll"){
      event.rewards = [];
    }else{
      event.rewards.pop();
    }   


    this.props.update(event);
  } */

  handleRecord = async (actionName, record) => {
    let { errorReturn } = this.props;

    if(!(actionName === "terminate" || actionName === "delete")) {
      const defaultValidate = {
        title: { required: true, type: "stringLength", max: 30 },
        //subtitle: { required: true },
        //description: { required: true },
        startTime: { required: true },
        endTime: { required: true },
      };

      if(record.published.at === null){
        defaultValidate["endTime"] = { required: true, type: "time", before: moment() };
      }

      errorReturn = validation(record, defaultValidate);

      this.props.errorUpdate(errorReturn);
    }

    if (errorReturn.errorNo === 0 || actionName === "terminate" || actionName === "delete") {
      this.props.submitToBackend(record, actionName);
    }
  };

  render() {
    const { url, params } = this.props.match;
    const {
      readSpecifiedRecordLoading,
      submitLoading,
      event,
      errorReturn,
      uploadLoading,
      uploadProgress,
      uploadResult,
      uploadKey
    } = this.props;
    const optionUrl = this.urlCheck(params.eventID, url);


    return (
      <ScreenHolder>
        
        { event.id &&
        <InnerSidebar
          url={optionUrl}
          urlID={params.eventID}
          optionControl="event"
          displayStatus={this.state.innerHide}
        />
        }
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "eventList")}>Events</BcrumbItem>
              { event.id &&
                <BcrumbItem>Event</BcrumbItem>
              }
            </Bcrumb>
          }
          onClick={event.id && this.onClick.bind(this)}
        >
            <Form
              loading={readSpecifiedRecordLoading}
              dataSource={event}
              onRecordChange={this.onRecordChange.bind(this)}
              onDateChange={this.onDateChange.bind(this)}
              errorReturn={errorReturn}
              onSubmit={
                event.id
                  ? this.handleRecord.bind(this, "update", event)
                  : this.handleRecord.bind(this, "insert", event)
              }
              onSubmitLoading={submitLoading}
              onDelete = {this.handleRecord.bind(this, "delete", event)}
              onDeleteLoading = {submitLoading}
              onSelectChange={this.onSelectChange.bind(this)}
              onUploadFile={this.onUploadFile.bind(this)}
              uploadLoading={uploadLoading}
              uploadProgress={uploadProgress}
              uploadResult={uploadResult}
              uploadKey={uploadKey}
              onPublish = {this.handleRecord.bind(this, "publish", event)}
              onPublishLoading = {submitLoading}
              onTerminate = {this.handleRecord.bind(this, "terminate", event)}
              onTerminateLoading = {submitLoading}
              //onAddReward={this.onAddReward.bind(this)}
              //onDeleteReward={this.onDeleteReward.bind(this)}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.Event };
};

export default connect(mapStatetoprops, actions)(EventForm);
