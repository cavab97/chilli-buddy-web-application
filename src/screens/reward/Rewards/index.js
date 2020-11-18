import React, { Component } from "react";
import { connect } from "react-redux";
import rewardActions from "../../../redux/reward/actions";
import routeActions from "../../../redux/route/actions";
import routeTicketActions from "../../../redux/routeTicket/actions";
import RewardHome from "../../../components/templates/reward/Rewards";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";

const readSpecifyRoute = routeActions.readSpecifiedRecord;
const readRouteTicket = routeTicketActions.readFromDatabase;

class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
  }

  componentDidMount() {
    const { routeID, eventID } = this.props.match.params;

    if(routeID) this.props.readFromDatabase( "route" ,routeID );
    if(eventID) this.props.readFromDatabase( "event" , eventID );

    if(routeID) this.props.readSpecifyRoute(routeID);
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.route !== nextProps.route){

      this.props.readRouteTicket({startTime: nextProps.route.startTime, endTime: nextProps.route.endTime});
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

  onRowClick(rewardData){
    const { routeGroupID, routeID, eventID } = this.props.match.params;

    if(routeGroupID && routeID)
      this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/reward/${rewardData.id}`);

    if(eventID)
      this.props.history.push(`/home/event/${eventID}/reward/${rewardData.id}`);
  }

  onClaim = () => {

  }

  onAddClick(){
    const { routeGroupID, routeID, eventID } = this.props.match.params;

    if(routeGroupID && routeID){
      this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/addreward`);
    }
    
    if(eventID){
      this.props.history.push(`/home/event/${eventID}/addreward`);
    }
  }

  render() {
    const { url, params } = this.props.match;
    const {
      readLoading,
      routeTickets,
      rewards,
    } = this.props; 
    const urlID = params.routeID ? params.routeID : params.eventID;
    const optionUrl = this.urlCheck(urlID, url);


    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={urlID}
          optionControl={params.routeID ? "route" : "event"}
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
                params.routeID ? 
                <Bcrumb separator="/">
                  <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
                  <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>Route Group</BcrumbItem>
                  <BcrumbItem>Route</BcrumbItem>
                </Bcrumb>
                :
                <Bcrumb separator="/">
                  <BcrumbItem onClick={this.jumpBack.bind(this, "eventList")}>Events</BcrumbItem>
                  <BcrumbItem>Event</BcrumbItem>
                </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <RewardHome 
            dataSource={rewards}
            readLoading={readLoading}
            routeTickets={routeTickets}
            onRowClick={this.onRowClick.bind(this)}
            onAddRoute={this.onAddClick.bind(this)}
            onClaim={this.onClaim.bind(this)}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  const route = state.Route.route;
  const routeTickets = state.RouteTicket.routeTickets;

  return { ...state.Reward, routeTickets, route };
};

export default connect(mapStatetoprops, { ...rewardActions, readSpecifyRoute, readRouteTicket})(Reward);