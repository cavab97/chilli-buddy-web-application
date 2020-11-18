import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'redux/event/actions';
import EventList from "../../../components/templates/events/Events";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";

import clone from 'clone';
import moment from "moment";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
  }

  componentDidMount() {
    this.props.readFromDatabase();
  }

  componentWillReceiveProps(nextProps) {}

  onRowClick(eventData){

    this.props.history.push(`/home/event/${eventData.id}`);
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
    this.props.history.push(`/home/addevent`);
  }

  render() {
    const {
      events,
      readLoading
    } = this.props;

    return (
      <ScreenHolder>
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem>Events</BcrumbItem>
            </Bcrumb>
          }
        >
          <EventList
            dataSource={events}
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

  return {...state.Event};
}

export default connect(
  mapStatetoprops,
  actions
)(Events);
