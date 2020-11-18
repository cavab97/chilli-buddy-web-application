import React, { Component } from "react";
import { connect } from "react-redux";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import MerchantList from "../../../components/templates/covid19/covid19MerchantList";
import actions from "../../../redux/covid19Shop/actions";


class Covid19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

    this.props.readFromDatabase();
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  handleModal = ({rowData = null}) => {
    this.props.modalControl(rowData);
  };

  render() {
    const {
      modalActive,
      readLoading,
      covid19Shop,
      covid19Shops
    } = this.props;

    return (
      <ScreenHolder>
        <ContentBox
          title={"Visitor Merchant List"}
        >
          <MerchantList 
            dataSource={covid19Shops}
            modalDataSource={covid19Shop}
            loading={readLoading}
            modalActive={modalActive}
            handleModal={this.handleModal.bind(this)}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const { 
    readLoading,
    readError,
    covid19Shops,
    covid19Shop,
    modalActive
  } = state.Covid19Shop;

  return {
    readLoading,
    readError,
    covid19Shops,
    covid19Shop,
    modalActive
  };
};

export default connect(mapStatetoprops, actions )(Covid19);
