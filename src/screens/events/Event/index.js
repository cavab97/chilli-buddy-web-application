import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/event/actions";
import EventHome from "../../../components/templates/events/Event";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";


class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
  }

  componentDidMount() {
    const { eventID = null } = this.props.match.params;
    this.props.readSpecifiedRecord(eventID);
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

  render() {
    const { url, params } = this.props.match;
    const { 
      event,
      routeTickets
    } = this.props; 
    const optionUrl = this.urlCheck(params.eventID, url);


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
          urlID={params.eventID}
          optionControl="event"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
                <Bcrumb separator="/">
                    <BcrumbItem onClick={this.jumpBack.bind(this, "eventList")}>Events</BcrumbItem>
                    <BcrumbItem>Event</BcrumbItem>
                </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <EventHome
              dataSource={event}
              columns={columns}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  
  return { ...state.Events };
};

export default connect(mapStatetoprops, actions)(Event);