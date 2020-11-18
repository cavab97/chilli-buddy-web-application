import React, { Component } from "react";
import { connect } from "react-redux";
import eventActions from "../../../redux/event/actions";
import rewardActions from "../../../redux/reward/actions";
import routeTicketActions from "../../../redux/routeTicket/actions";
import Assign from "../../../components/templates/events/Assign";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";
import { notification } from "marslab-library-react/components/organisms";

const readSpecifiedEvent = eventActions.readSpecifiedRecord;
const readRouteTickets = routeTicketActions.readFromDatabase;
const updateRouteTickets = routeTicketActions.updateArray;

class AssignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
      rewardCounter: 0,
      noReward: false,
      noTicket: false,
      allAssigned: false,
    };
  }

  componentDidMount() {
    const { eventID = null } = this.props.match.params;

    this.props.readSpecifiedEvent(eventID);
    this.props.readFromDatabase("event", eventID);
  }

  componentDidUpdate(prevProps, prevState) {
    let { event } = this.props;

    if (
      this.props.submitError.message !== prevProps.submitError.message &&
      this.props.submitError.message
    ) {
      notification("error", this.props.submitError.message);
    }

    if (
      this.props.submitResult.message !== prevProps.submitResult.message &&
      this.props.submitResult.message
    ) {
      this.setNextRank();
      notification("success", this.props.submitResult.message);
    }

    if(this.props.routeTickets !== prevProps.routeTickets){
      if(this.props.routeTickets.length === 0){
        this.setState({noTicket: true});
      }else{
        this.setState({noTicket: false});
      }
    }

    if (
      (
        this.props.event.id !== prevProps.event.id || 
        this.props.routeTickets.length === 0
      )
      && !this.state.noTicket
      && this.props.event.id !== null
    ) {
      this.props.readRouteTickets({
        startTime: event.startTime,
        endTime: event.endTime,
      });
    }

    if(this.props.rewards !== prevProps.rewards){
      if(this.props.rewards.length > 0){
        this.setState({noReward: false, allAssigned: false})
      }else{
        this.setState({noReward: true, allAssigned: false})
      }
    }

    if (
      this.props.readLoading !== prevProps.readLoading &&
      !this.props.readLoading &&
      this.props.rewards.length > 0
    ) {
      this.setNextRank();
    }
  }
  
  componentWillUnmount(){
    this.props.updateRouteTickets([]);
  }

  setNextRank = () => {
    const { rewards } = clone(this.props);
    const { rewardCounter } = this.state;

    const rewardsPending = [];

    rewards.forEach((reward) => {
      if (!reward.obtained.by) rewardsPending.push(reward);
    });

    rewardsPending.sort((a, b) => {
      return  b.rank - a.rank;
    });


    if (rewardsPending.length !== rewardCounter) {
      this.setState({ rewardCounter: rewardCounter + 1 });
      const reward = rewardsPending[rewardCounter];
      this.props.update(reward);
    } else {
      this.setState({allAssigned: true});
      this.props.update(null);
    }
  };

  urlCheck(params, url) {
    const allRoute = url.split("/");
    const lastRoute = allRoute[allRoute.length - 1];

    if (params !== lastRoute) {
      const oldUrl = url.substring(0, url.lastIndexOf("/"));

      return oldUrl;
    } else {
      return url;
    }
  }

  jumpBack(key) {
    const { params } = this.props.match;
    switch (key) {
      case "eventList":
        this.props.history.push(`/home/event`);
        break;
      case "event":
        this.props.history.push(`/home/event/${params.eventID}/reward`);
        break;
    }
  }

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  onAssign = (rowRecord) => {
    const { reward, event } = this.props;

    if(event.published.at){
      const data = {
        id: reward.id,
        userIds: [rowRecord.user.id],
        eventIds: [event.id],
      };
  
      this.props.submitToBackend(data, "assign", {});
    }else{
      notification("error", "Can't assign reward before event published.");
    }
  };

  render() {
    const { url, params } = this.props.match;
    const {
      submitLoading,
      reward,
      routeTickets,
      routeTicketReadLoading,
      eventReadSpecifiedRecordLoading,
    } = this.props;
    const urlID = params.routeID ? params.routeID : params.eventID;
    const optionUrl = this.urlCheck(urlID, url);
    const { event } = clone(this.props);

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={urlID}
          optionControl="event"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "eventList")}>
                Events
              </BcrumbItem>
              <BcrumbItem onClick={this.jumpBack.bind(this, "event")}>
                Event
              </BcrumbItem>
            </Bcrumb>
          }
          onClick={event.id ? this.onClick.bind(this) : null}
        >
          <Assign
            dataSource={reward}
            noTicket={this.state.noTicket}
            noReward={this.state.noReward}
            allAssigned={this.state.allAssigned}
            onAssignLoading={submitLoading}
            onAssign={this.onAssign.bind(this)}
            tableData={routeTickets}
            tableLoading={
              routeTicketReadLoading || eventReadSpecifiedRecordLoading
            }
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const event = state.Event.event;
  const assignedRewards = state.Event.event.assignedRewards;
  const routeTickets = state.RouteTicket.routeTickets;
  const routeTicketReadLoading = state.RouteTicket.readLoading;
  const eventReadSpecifiedRecordLoading =
    state.Event.readSpecifiedRecordLoading;

  return {
    event,
    assignedRewards,
    ...state.Reward,
    routeTickets,
    routeTicketReadLoading,
    eventReadSpecifiedRecordLoading,
  };
};

export default connect(mapStatetoprops, {
  readSpecifiedEvent,
  ...rewardActions,
  readRouteTickets,
  updateRouteTickets
})(AssignScreen);
