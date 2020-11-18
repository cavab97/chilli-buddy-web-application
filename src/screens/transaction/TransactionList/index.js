import React, { Component } from "react";
import { connect } from "react-redux";
import tranActions from "../../../redux/transaction/actions";
import rewardActions from "../../../redux/reward/actions";
import TransactionList from "../../../components/templates/transaction/TransactionList";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { notification } from "marslab-library-react/components/organisms";

const readSpecifyReward = rewardActions.readSpecifiedRecord;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
      photoView: false,
    };
  }

  componentDidMount() {
    const { routeTicketID } = this.props.match.params;

    if (routeTicketID) {
      this.props.readFromDatabase(routeTicketID);
    } else {
      this.props.readFromDatabase();
    }
  }

  componentWillReceiveProps(nextProps) {

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
    }


    if (
      this.props.reward.routeTicketIds[0] !==
        nextProps.reward.routeTicketIds[0] && 
        nextProps.reward.routeTicketIds[0]
    ) {
      this.props.readFromDatabase(nextProps.reward.routeTicketIds[0]);
    }
    if (
      this.props.reward.routeTicketIds[0] !==
        nextProps.reward.routeTicketIds[0] && 
        nextProps.reward.routeTicketIds[0] === null
    ) {
      this.props.readFromDatabase(null);
    }
  }

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  urlCheck(params, url) {
    /* const allRoute = url.split("/");
    const lastRoute = allRoute[allRoute.length - 3];

    if (params !== lastRoute) {
      const oldUrl = url.substring(0, url.lastIndexOf("/"));

      return oldUrl;
    } else { */
      return url.substring(0, url.indexOf("/transaction"));
  }

  jumpBack(key) {
    const { params } = this.props.match;
    switch (key) {
      case "routeGroupList":
        this.props.history.push(`/home/routegroup`);
        break;
      case "routeGroup":
        this.props.history.push(`/home/routegroup/${params.routeGroupID}`);
        break;
      case "route":
        this.props.history.push(
          `/home/routegroup/${params.routeGroupID}/route/${params.routeID}`
        );
        break;
    }
  }

  handleModal = (transaction) => {
    this.props.modalControl(transaction);
  };

  onCopyUrl = (url) => {
    const copyDom = document.getElementById(url);
    let range = document.createRange();

    window.getSelection().removeAllRanges();

    range.selectNode(copyDom);
    window.getSelection().addRange(range);

    const successful = document.execCommand("copy");

    if (successful) {
      notification("success", "URL are copy successfully");
    } else {
      notification("error", "URL are copy fail");
    }
  };

  onApproved = (transaction) => {
    const { routeTicketID } = this.props.match.params;
    //const { rewardID } = this.props.match.params;
  
    if (routeTicketID) {
      this.props.submitToBackend(
        transaction,
        "approve",
        routeTicketID
        //this.props.reward.routeTicketIds[0]
      );
    } else {
      this.props.submitToBackend(transaction, "approve");
    }
    this.props.modalControl(null);
    
  };

  onRejected = (transaction) => {
    //const { rewardID } = this.props.match.params;
    const { routeTicketID } = this.props.match.params;
    if (routeTicketID) {
      this.props.submitToBackend(
        transaction,
        "reject",
        //this.props.reward.routeTicketIds[0]
        routeTicketID
      );
    } else {
      this.props.submitToBackend(transaction, "reject");
    }

    this.props.modalControl(null);
  };


  imageModal = () => {
    this.setState({ photoView: !this.state.photoView });
  };

  render() {
    const { url, params } = this.props.match;
    const {
      readLoading,
      submitLoading,
      modalActive,
      transaction,
      transactions,
      readSpecifiedRecordLoading,
    } = this.props;
    const urlID = params.routeID;
    const optionUrl = this.urlCheck(urlID, url);
    
    return (
      <ScreenHolder>
        {params.routeID && (
          <InnerSidebar
            url={optionUrl}
            urlID={urlID}
            optionControl={"route"}
            displayStatus={this.state.innerHide}
          />
        )}
        <ContentBox
          title={
            params.routeID ? (
              <Bcrumb separator="/">
                <BcrumbItem
                  onClick={this.jumpBack.bind(this, "routeGroupList")}
                >
                  Route Groups
                </BcrumbItem>
                <BcrumbItem onClick={this.jumpBack.bind(this, "routeGroup")}>
                  Route Group
                </BcrumbItem>
                <BcrumbItem onClick={this.jumpBack.bind(this, "route")}>
                  Route
                </BcrumbItem>
              </Bcrumb>
            ) : (
              "Transaction List"
            )
          }
          onClick={this.onClick.bind(this)}
        >
          <TransactionList
            params={params}
            loading={readLoading || readSpecifiedRecordLoading}
            submitLoading={submitLoading}
            dataSource={transactions}
            transaction={transaction}
            modalActive={modalActive}
            photoView={this.state.photoView}
            imageModal={this.imageModal.bind(this)}
            handleModal={this.handleModal.bind(this)}
            onApproved={this.onApproved.bind(this)}
            onRejected={this.onRejected.bind(this)}
            onCopyUrl={this.onCopyUrl.bind(this)}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const {
    reward,
    readSpecifiedRecordLoading,
    readSpecifiedRecordError,
  } = state.Reward;

  return {
    ...state.Transaction,
    reward,
    readSpecifiedRecordLoading,
    readSpecifiedRecordError,
  };
};

export default connect(mapStatetoprops, { ...tranActions, readSpecifyReward })(
  Transactions
);
