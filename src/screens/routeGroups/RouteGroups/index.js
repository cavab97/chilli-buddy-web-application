import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/routeGroup/actions";
import RouteGroupLists from "../../../components/templates/routeGroups/RouteGroups";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";


class RouteGroups extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.readFromDatabase();
  }

  componentWillReceiveProps(nextProps) {}

  onRowClick(routeData){

    this.props.history.push(`/home/routegroup/${routeData.id}`);
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
    this.props.history.push(`/home/addroutegroup`);
  }

  render() {
    const { 
      routeGroups,
      readLoading,
    } = this.props;

    

    return (
      <ScreenHolder>
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem>Route Groups</BcrumbItem>
            </Bcrumb>
          }
        >
          <RouteGroupLists
              dataSource={routeGroups}
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
  return { ...state.RouteGroup };
};

export default connect(mapStatetoprops, actions)(RouteGroups);
