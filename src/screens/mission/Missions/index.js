import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/mission/actions";
import routeActions from "../../../redux/route/actions";
import MissionLists from "../../../components/templates/mission/Missions";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from 'clone';

const readRoute = routeActions.readSpecifiedRecord;

class MissionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
  }

  componentDidMount() {
    const { routeID } = this.props.match.params;
    this.props.readFromDatabase( routeID );
    this.props.readRoute( routeID );
  }

  componentWillReceiveProps(nextProps) {}

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

  onRowClick(missionData){
    const { routeGroupID, routeID } = this.props.match.params;

    this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/mission/${missionData.id}`);
    /* return (
      <Route
        path={`${routeData.id}`}
        render={
            (<Redirect 
              to={{pathname: routeData.id}}
            />)
        }
      />
    ); */
  }
  
  onAddMission(){
    const { routeGroupID, routeID } = this.props.match.params;

    this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeID}/addmission`);
  }

  render() {
    const { url, params } = this.props.match;
    const { 
      missions,
      readLoading,
      routeCategory,
    } = this.props;
    const optionUrl = this.urlCheck(params.routeID, url);

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
            <MissionLists
              dataSource={missions}
              readLoading = {readLoading}
              routeCategory={routeCategory}
              onRowClick={this.onRowClick.bind(this)}
              onAddRoute={this.onAddMission.bind(this)}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {

  const routeCategory = state.Route.route.category;

  return { ...state.Mission, routeCategory };
};

export default connect(mapStatetoprops, {...actions, readRoute})(MissionList);
