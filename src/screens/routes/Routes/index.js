import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/route/actions";
import RouteLists from "../../../components/templates/routes/Routes";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from 'clone';

class RouteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
  }

  componentDidMount() {
    const { routeGroupID } = this.props.match.params;
    
    this.props.readFromDatabase(routeGroupID);

    //this.props.readSpecifiedRecord(routeGroupID);
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

  onRowClick(routeData){
    const routeGroupID = this.props.match.params.routeGroupID;

    this.props.history.push(`/home/routegroup/${routeGroupID}/route/${routeData.id}`);
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
  
  onAddRoute(){
    const routeGroupID = this.props.match.params.routeGroupID;

    this.props.history.push(`/home/routegroup/${routeGroupID}/addroute`);
  }

  render() {
    const { url, params } = this.props.match;
    const { 
      routes,
      readLoading,
      routeGroup
    } = this.props;

    const optionUrl = this.urlCheck(params.routeGroupID, url);
    

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.routeGroupID}
          optionControl="routegroup"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
              <BcrumbItem>Route Group</BcrumbItem>
            </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
            <RouteLists
              dataSource={routes}
              readLoading = {readLoading}
              onRowClick={this.onRowClick.bind(this)}
              onAddRoute={this.onAddRoute.bind(this)}
            />
          </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {

  const {routeGroup} = state.RouteGroup

  return { ...state.Route, routeGroup };
};

export default connect(mapStatetoprops, actions)(RouteList);
