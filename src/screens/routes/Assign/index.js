import React, { Component } from "react";
import { connect } from "react-redux";
import routeActions from "../../../redux/route/actions";
import rewardActions from "../../../redux/reward/actions";
import routeTicketActions from "../../../redux/routeTicket/actions";
import Assign from "../../../components/templates/routes/Assign";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";
import { notification } from "marslab-library-react/components/organisms";


const readSpecifiedRoute = routeActions.readSpecifiedRecord;
const submitRouteToBackend = routeActions.submitToBackend;
const listenRouteTickets = routeTicketActions.listenByObjectGroup;
const removeListenRouteTickets = routeTicketActions.removeListenByObjectGroup;
const updateRouteTicket = routeTicketActions.update;
const updateRouteTickets = routeTicketActions.updateArray;
const submitRouteTicketToBackend = routeTicketActions.submitToBackend;

class AssignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
      rewardCounter: 0,
      fullVerify: false,
      updateWaiting: false,
      mode1: false,
      mode2: true,

    };
  }

  componentDidMount() {
    const { routeID = null } = this.props.match.params;

    this.props.readSpecifiedRoute(routeID);
    this.props.readFromDatabase("route", routeID);
  }

  componentDidUpdate(prevProps, prevState) {
    let { route } = this.props;

    if (
      this.props.routeSubmitError.message !== prevProps.routeSubmitError.message &&
      this.props.routeSubmitError.message
    ) {
      notification("error", this.props.routeSubmitError.message);
    }

    if (
      this.props.routeSubmitResult.message !== prevProps.routeSubmitResult.message &&
      this.props.routeSubmitResult.message
    ) {
      notification("success", this.props.routeSubmitResult.message);
    }

    if (
      this.props.submitError.message !== prevProps.submitError.message &&
      this.props.submitError.message
    ) {
      notification("error", this.props.submitError.message);
      this.setState({updateWaiting: false});
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

      this.setState({updateWaiting: false});
    }

    if(
      (
        this.props.routeTickets !== prevProps.routeTickets ||
        this.props.rewards !== prevProps.rewards
      ) &&
      this.props.routeTickets.length > 0 &&
      this.props.rewards.length > 0
    ){
        let countVerify = this.props.routeTickets.filter((routeTicket) => {
          return routeTicket.verify === true;
        });
  
        if(countVerify.length >= this.props.rewards.length){
          this.setState({fullVerify: true});
        }else{
          this.setState({fullVerify: false});
        }
    }

    if (
      (
        this.props.route.id !== prevProps.route.id || 
        this.props.routeTickets.length === 0
      )
      && !this.state.noTicket
      && this.props.route.id !== null
    ) {
      this.props.listenRouteTickets({
        groupId: this.props.route.id
      });
    }

    if(this.props.rewards !== prevProps.rewards){
      if(this.props.rewards.length > 0){
        this.setState({noReward: false})
      }else{
        this.setState({noReward: true})
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
    this.props.removeListenRouteTickets();
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
      return  a.rank - b.rank;
    });


    if (rewardsPending.length !== rewardCounter) {
      this.setState({ rewardCounter: rewardCounter + 1 });
      const reward = rewardsPending[rewardCounter];
      this.props.update(reward);
    } else {
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
    const { reward, route } = this.props;

    const data = {
        id: reward.id,
        userIds: [rowRecord.user.id],
        routeIds: [route.id],
        routeTicketIds: [rowRecord.id],
    };

    this.setState({updateWaiting: true});
    this.props.submitToBackend(data, "assign", {});
  };

  onTransactionView = (routeTicketId) => {
    const { params } = this.props.match;

    console.log(routeTicketId);

    /*this.props.history.push(`/home/routegroup/${params.routeGroupID}/route/${params.routeID}/transaction/${routeTicketId}`);*/
    let url = `/home/routegroup/${params.routeGroupID}/route/${params.routeID}/transaction/${routeTicketId}`;

    window.open(url,'_blank');
  }

  onRecordChange = (rowData, event) => {
    let { routeTicket } = clone(this.props);

    routeTicket = {
      ...rowData,
      verify: event.target.checked
    };

    this.props.updateRouteTicket(routeTicket);
    this.props.submitRouteTicketToBackend(routeTicket, "verify");
  };

  onAssignComplete = (route, actionName) => {

    this.props.submitRouteToBackend(route, actionName);
  }

  activateMode1() {
   if(this.state.mode1==false){
      return this.setState({ mode1: false, mode2: !this.state.mode2 })}
   else {
      return this.setState({ mode1: false, mode2: true})
   }
  }

  activateMode2() {
    if(this.state.mode2==true){
      return this.setState({ mode2: !this.state.mode2, mode1: !this.state.mode1 })}
    else{
      return this.setState({mode2: false, mode1: true});
    }
  }
  render() {
    const { url, params } = this.props.match;
    const {
      submitLoading,
      rewards,
      reward,
      route,
      assignCompleted,
      numberCompletedMissions,
      numberApprovedMission,
      verify,
      routeSubmitLoading,
      routeTickets,
      routeTicketSubmitLoading,
      routeTicketReadLoading,
      routeReadSpecifiedRecordLoading,
    } = this.props;
    const readRewardLoading = this.props.readLoading;

    const optionUrl = this.urlCheck(params.routeID, url);

    /**Sort from highest completed mission to lowest and according to earliest completion time, TOP 1000 */
    let validUser = [];
    let completedMissions = [];
    (routeTickets.filter((routeTicket)=> { completedMissions.push(routeTicket.numberCompletedMissions); }));

    if(this.state.mode1 == false) {
      validUser = routeTickets.filter((routeTicket) => {
        return routeTicket.completedMissions.length <= route.totalMissions && 
               routeTicket.routeIds[0] === route.id;
      });

      
      validUser = validUser.sort((a,b) => {
        return (b.numberCompletedMissions - a.numberCompletedMissions) || compareCompletedDate(a,b) ;
        
      })
  
      function compareCompletedDate(a,b){
        if (a.completedMissions[a.numberCompletedMissions - 1] === null) return b.completedMissions[b.numberCompletedMissions - 1].at - a.completedMissions[a.numberCompletedMissions - 1].at;
        if (b.completedMissions[b.numberCompletedMissions - 1] === null) return a.completedMissions[a.numberCompletedMissions - 1].at - b.completedMissions[b.numberCompletedMissions - 1].at;
        if(a.completedMissions[a.numberCompletedMissions - 1] && b.completedMissions[b.numberCompletedMissions - 1] !== null){
        if (a.completedMissions[a.numberCompletedMissions - 1].at < b.completedMissions[b.numberCompletedMissions - 1].at)
          return a.completedMissions[a.numberCompletedMissions - 1].at - b.completedMissions[b.numberCompletedMissions - 1].at;}
      }
    }
    else if (this.state.mode2 == false) {
      validUser = routeTickets.filter((routeTicket) => {
        return routeTicket.completedMissions.length <= route.totalMissions && routeTicket.verify === true &&
               routeTicket.routeIds[0] === route.id;
      });
      
  
      validUser = validUser.sort((a,b) => {
        return (b.numberApprovedMission - a.numberApprovedMission) || compareCompletedDate(a,b) ;
        
      })
    }
  
      function compareCompletedDate(a,b){
        if (a.completedMissions[a.numberCompletedMissions - 1] === null) return b.completedMissions[b.numberCompletedMissions - 1].at - a.completedMissions[a.numberCompletedMissions - 1].at;
        if (b.completedMissions[b.numberCompletedMissions - 1] === null) return a.completedMissions[a.numberCompletedMissions - 1].at - b.completedMissions[b.numberCompletedMissions - 1].at;
        if(a.completedMissions[a.numberCompletedMissions - 1] && b.completedMissions[b.numberCompletedMissions - 1] !== null){
        if (a.completedMissions[a.numberCompletedMissions - 1].at < b.completedMissions[b.numberCompletedMissions - 1].at)
          return a.completedMissions[a.numberCompletedMissions - 1].at - b.completedMissions[b.numberCompletedMissions - 1].at;}
      }
   
    


    validUser = validUser.slice(0, 1000);



    /**to here */
    
    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.routeID}
          optionControl="route"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
                <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
                <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>Route Group</BcrumbItem>
                <BcrumbItem>Route</BcrumbItem>
            </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <Assign
            loading={readRewardLoading}
            allRewards={rewards}
            dataSource={reward}
            noTicket={this.state.noTicket}
            noReward={this.state.noReward}
            fullVerify={this.state.fullVerify}
            onAssignLoading={submitLoading}
            assignCompleteLoading={routeSubmitLoading}
            assignCompleted={assignCompleted}
            onAssign={this.onAssign.bind(this)}
            onAssignComplete={this.onAssignComplete.bind(this, route, "assignComplete")}
            onRecordChange={this.onRecordChange.bind(this)}
            onTransactionView={this.onTransactionView.bind(this)}
            totalMissions={route.totalMissions}
            numberCompletedMissions={completedMissions} 
            activateMode1={this.activateMode1.bind(this)}  
            activateMode2={this.activateMode2.bind(this)}
            checkModeButton={this.state.mode1}
            updateWaiting={this.state.updateWaiting}
            routeTicketSubmitLoading={routeTicketSubmitLoading}
            tableData={validUser} /**change here */
            tableLoading={
              routeTicketReadLoading || routeReadSpecifiedRecordLoading
            }
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const route = state.Route.route;
  const routeSubmitLoading = state.Route.submitLoading;
  const routeSubmitResult = state.Route.submitResult;
  const routeSubmitError = state.Route.submitError;
  const assignCompleted = state.Route.route.assignCompleted;
  const assignedRewards = state.Route.route.assignedRewards;
  const routeTicket = state.RouteTicket.routeTicket;
  const routeTickets = state.RouteTicket.routeTickets;
  const routeTicketSubmitLoading = state.RouteTicket.submitLoading;
  const routeTicketReadLoading = state.RouteTicket.readLoading;
  const routeReadSpecifiedRecordLoading =
    state.Route.readSpecifiedRecordLoading;

  return {
    route,
    routeSubmitLoading,
    routeSubmitResult,
    routeSubmitError,
    assignCompleted,
    assignedRewards,
    ...state.Reward,
    routeTicket,
    routeTickets,
    routeTicketSubmitLoading,
    routeTicketReadLoading,
    routeReadSpecifiedRecordLoading,
  };
};

export default connect(mapStatetoprops, {
  readSpecifiedRoute,
  submitRouteToBackend,
  ...rewardActions,
  listenRouteTickets,
  removeListenRouteTickets,
  updateRouteTicket,
  updateRouteTickets,
  submitRouteTicketToBackend
})(AssignScreen);
