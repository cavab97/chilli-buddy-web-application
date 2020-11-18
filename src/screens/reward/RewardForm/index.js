import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/reward/actions";
import Form from "../../../components/templates/reward/RewardForm";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";


class RewardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
      rewardQty: 1
    };
  }

  componentDidMount() {
    const { rewardID = null, routeID = null, eventID = null } = this.props.match.params;

    this.props.readSpecifiedRecord(rewardID);
    this.props.errorUpdate({});
    
    if(!rewardID && routeID) this.props.readNextRank("route", routeID);
    if(!rewardID && eventID) this.props.readNextRank("event", eventID);
  }

  componentWillReceiveProps(nextProps) {
    const { routeGroupID, routeID, eventID } = this.props.match.params;
    let { reward, submitResult } = nextProps;

    if(this.props.nextRank !== nextProps.nextRank && 
      !nextProps.reward.id && 
      nextProps.reward.rank !== null
    ){
      const reward = nextProps.reward;
      reward.rank = nextProps.nextRank;
      this.props.update(reward);
    }

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
      
      if(routeGroupID && routeID){
        if(submitResult.action === "Delete reward" || submitResult.ids.length > 1)
        {
          this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/reward`);
        }else{
          this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/reward/${reward.id}`);
        }
      }else if(eventID){
        if(submitResult.action === "Delete reward" || submitResult.ids.length > 1)
        {
          this.props.history.push(`/home/event/${eventID}/reward`);
        }else{
          this.props.history.push(`/home/event/${eventID}/reward/${reward.id}`);
        }
      }
    }
  }

  componentWillUnmount(){

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
      case "eventList":
      
      this.props.history.push(`/home/event`);
      break;
      case "event":

        this.props.history.push(`/home/event/${params.eventID}/reward`);
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
    let { reward } = clone(this.props);
    if (key && nestedKey) reward[key][nestedKey] = event.target.value;
    else if (key) reward[key] = event.target.value;
    
    this.props.update(reward);
    console.log(reward);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { reward } = clone(this.props);
    if (key && nestedKey) reward[key][nestedKey] = value;
    else if (key) reward[key] = value;
    this.props.update(reward);
    console.log(reward);
  };

  handleRecord = (actionName, record) => {
    const { routeID, eventID } = this.props.match.params;
    let { errorReturn } = this.props;

    const defaultValidate = {
      rank: { required: true, type: "number", min: 1 },
      title: { required: true, type: "stringLength", max: 30 },
      quantity: { required: true, type: "number", min: 1, max: 70}
    };

    record["quantity"] = this.state.rewardQty;

    errorReturn = validation(record, defaultValidate);
    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      if(routeID) this.props.submitToBackend(record, actionName, { routeID: routeID } );

      if(eventID) this.props.submitToBackend(record, actionName, { eventID: eventID } );
    }
    console.log(record);
  };

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, rewardId: target, file });
  }

  onQuantityChange(event){
    this.setState({rewardQty: event.target.value});
  }

  render() {
    const { url, params } = this.props.match;
    const {
      readLoading,
      readSpecifiedRecordLoading,
      errorReturn,
      submitLoading,
      uploadLoading,
      uploadProgress,
      uploadResult,
      uploadKey
    } = this.props;
    const urlID = params.routeID ? params.routeID : params.eventID;
    const optionUrl = this.urlCheck(urlID, url);

    const { reward } = clone(this.props);

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={urlID}
          optionControl={
            params.routeID ? 
            (params.rewardID ? "reward" : "route") 
            : 
            (params.rewardID ? "eventReward" : "event")
          }
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            params.routeID ? 
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>Route Group</BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "route")}>Route</BcrumbItem>
              { reward.id &&
                <BcrumbItem>Reward</BcrumbItem>
              }
            </Bcrumb>
            :
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "eventList")}>Events</BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "event")}>Event</BcrumbItem>
              { reward.id &&
                <BcrumbItem>Reward</BcrumbItem>
              }
            </Bcrumb>
          }
          onClick={reward.id && this.onClick.bind(this)}
        >
            <Form
              loading={readSpecifiedRecordLoading || readLoading}
              dataSource={reward}
              onRecordChange={this.onRecordChange.bind(this)}
              onSelectChange={this.onSelectChange.bind(this)}
              onUploadFile={this.onUploadFile.bind(this)}
              uploadLoading={uploadLoading}
              uploadProgress={uploadProgress}
              uploadResult={uploadResult}
              uploadKey={uploadKey}
              errorReturn={errorReturn}
              onSubmit={
                reward.id
                  ? this.handleRecord.bind(this, "update", reward)
                  : this.handleRecord.bind(this, "insert", reward)
              }
              onSubmitLoading={submitLoading}
              onClaim={this.handleRecord.bind(this, "claim", reward)}
              onClaimLoading={submitLoading}
              onDelete = {this.handleRecord.bind(this, "delete", reward)}
              onDeleteLoading = {submitLoading}
              rewardQuantity={this.state.rewardQty}
              onQuantityChange={this.onQuantityChange.bind(this)}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.Reward };
};

export default connect(mapStatetoprops, actions)(RewardForm);
