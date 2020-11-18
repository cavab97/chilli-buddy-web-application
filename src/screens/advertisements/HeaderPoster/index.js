import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/settings/Info/actions";
import PosterAdvertisement from "../../../components/templates/advertisements/HeaderPoster";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import { notification } from "marslab-library-react/components/organisms";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

class Poster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
      photoView: false,
    }
  }

  componentDidMount() {
    this.props.readFromDatabase();
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
  }

  handleModal = (settingInfo) => {
    this.props.modalControl(settingInfo);
  }

  handleRecord = async (actionName, record) => {
    this.props.submitToBackend(record, actionName);
  }

  onClick = () => {
    if(this.state.innerHide.display === "block"){
      this.setState({innerHide: {display: "none"}});
    }else{
      this.setState({innerHide: {display: "block"}});
    }
  }

  urlChange(url){
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  onRecordChange = ({ key, nestedKey }, event) => {
    let { settingInfo } = clone(this.props);
    if (key && nestedKey) settingInfo[key][nestedKey] = event.target.value;
    else if (key) settingInfo[key] = event.target.value;

    this.props.update(settingInfo);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { settingInfo } = clone(this.props);
    if (key && nestedKey) settingInfo[key][nestedKey] = value;
    else if (key) settingInfo[key] = value;
    this.props.update(settingInfo);
  };

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, id: target, file });
  }

  render() {
    const { url } = this.props.match;
    const { 
      readLoading,
      submitLoading,
      settingInfo,
      uploadLoading,
      uploadProgress,
      uploadResult,
      uploadKey,
    } = this.props;
    const optionUrl = this.urlChange(url);

    return (
      <ScreenHolder>
        <InnerSidebar
            url={optionUrl}
            optionControl="news"
            displayStatus={this.state.innerHide}
        />
        <ContentBox
          title="Advertisement Poster"
          onClick={this.onClick.bind(this)}
        >
          <PosterAdvertisement
            loading={readLoading}
            dataSource={settingInfo}
            onSubmit={this.handleRecord.bind(this, "update", settingInfo)}
            onSubmitLoading={submitLoading}
            onRecordChange={this.onRecordChange.bind(this)}
            onSelectChange={this.onSelectChange.bind(this)}
            onUploadFile={this.onUploadFile.bind(this)}
            uploadLoading={uploadLoading}
            uploadProgress={uploadProgress}
            uploadResult={uploadResult}
            uploadKey={uploadKey}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.Info };
};

export default connect(mapStatetoprops, actions)(Poster);
