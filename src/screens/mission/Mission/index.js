import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/routeGroup/actions";
import Missions from "../../../components/templates/mission/Mission";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";

class RouteGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
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

  render() {
    const { url, params } = this.props.match;
    const { 
      routeGroups,
    } = this.props; 
    const optionUrl = this.urlCheck(params.missionID, url);

    let routeGroup;

    routeGroups.map(route => {
      if(route.id === this.props.match.params.id)
        routeGroup = route;
      }
    );

    const columns = [
        {
          title: "Route Group Name",
          dataIndex: "title",
          key: "title",
          width: "120x",
          sorter: (a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          }
        },
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: "120x",
          sorter: (a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          }
        }
    ];

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.missionID}
          optionControl="mission"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
                <Bcrumb separator="/">
                  <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroupList")}>Route Groups</BcrumbItem>
                  <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>Route Group</BcrumbItem>
                  <BcrumbItem onClick={this.jumpBack.bind(this, "route")}>Route</BcrumbItem>
                  <BcrumbItem>Mission</BcrumbItem>
                </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <Missions
              dataSource={routeGroup}
              columns={columns}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  
  return { ...state.RouteGroup, openKeys: state.App.openKeys };
};

export default connect(mapStatetoprops, actions)(RouteGroup);