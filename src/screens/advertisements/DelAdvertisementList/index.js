import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/advertisements/actions";
import Input, { Textarea } from "isomorphic-shared/components/uielements/input";
import Select, { SelectOption as Option } from "isomorphic-shared/components/uielements/select";
// import Checkbox from 'isomorphic-shared/components/uielements?';
// import Modal from './node_modules/isomorphic-shared/components/Feedback/Modal';
import Modal from "isomorphic-shared/components/Feedback/Modal";
import LayoutContentWrapper from "isomorphic-shared/components/utility/layoutWrapper.js";
import Box from "isomorphic-shared/components/utility/box";
import ContentHolder from "isomorphic-shared/components/utility/contentHolder";
// import Popconfirms from './node_modules/isomorphic-shared/components/Feedback/Popconfirm';
import Popconfirms from "isomorphic-shared/components/Feedback/Popconfirm";
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from "./styles";
import clone from "clone";
import Firebase from "../../../../authentication/firebase";
// import { notification } from './node_modules/isomorphic-shared/components';
import { notification } from "isomorphic-shared/components";

class advertisements extends Component {
  componentDidMount() {
    this.props.loadDeletedUserFromFireStore();
  }

  handleRecord = async (actionName, advertisement) => {
    const email = advertisement.email;
    const password = advertisement.ic;

    if (advertisement.key && actionName !== "delete" && actionName !== "restore") {
      actionName = "update";
    }

    if (!advertisement.key && actionName == "insert") {
      let data;
      if (!(email && password)) {
        notification("error", "Please fill in email and ic number");
        return;
      }
      data = await Firebase.signup(Firebase.EMAIL, {
        email,
        password,
      });
      const newAdvertisement = data && data.advertisement ? data.advertisement : false;
      const message =
        newAdvertisement === false && data && data.message
          ? data.message
          : "Sorry Some error occurs";
      if (newAdvertisement) {
        //const token = await newAdvertisement.getIdToken();
        advertisement.uid = data.advertisement.uid;
        advertisement.key = data.advertisement.uid;
      } else {
        notification("error", message);
        return;
      }
    }
    this.props.saveIntoFireStore(advertisement, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (advertisement = null) => {
    this.props.toggleModal(advertisement);
  };

  onRecordChange = (key, event) => {
    let { advertisement } = clone(this.props);
    if (key) advertisement[key] = event.target.value;
    this.props.update(advertisement);
  };

  onSelectChange = (key, value) => {
    let { advertisement } = clone(this.props);
    if (key) advertisement[key] = value;
    this.props.update(advertisement);
  };

  render() {
    const { modalActive, advertisements } = this.props;
    const { advertisement } = clone(this.props);
    const dataSource = [];
    Object.keys(advertisements).map((advertisement, index) => {
      return dataSource.push({
        ...advertisements[advertisement],
        key: advertisement,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "150px",
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        //width: '200x',
        sorter: (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        },
      },
      {
        title: "Create At",
        dataIndex: "createAtString",
        key: "createAtString",
        width: "60x",
        sorter: (a, b) => {
          if (a.createAtString < b.createAtString) return -1;
          if (a.createAtString > b.createAtString) return 1;
          return 0;
        },
      },
      {
        title: "Start Date",
        dataIndex: "startDateString",
        key: "startDateString",
        width: "60x",
        sorter: (a, b) => {
          if (a.startDateString < b.startDateString) return -1;
          if (a.startDateString > b.startDateString) return 1;
          return 0;
        },
      },
      {
        title: "End Date",
        dataIndex: "endDateString",
        key: "endDateString",
        width: "60x",
        sorter: (a, b) => {
          if (a.endDateString < b.endDateString) return -1;
          if (a.endDateString > b.endDateString) return 1;
          return 0;
        },
      },
      {
        title: "Likes",
        dataIndex: "likes",
        key: "likes",
        width: "60x",
        sorter: (a, b) => {
          if (a.likes < b.likes) return -1;
          if (a.likes > b.likes) return 1;
          return 0;
        },
      },

      {
        title: "Actions",
        key: "action",
        width: "60px",
        className: "noWrapCell",
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to restore this advertisement?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, "restore", row)}
              >
                <a className="restoreBtn" href="# ">
                  <i className="ion-android-happy" />
                </a>
              </Popconfirms>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: "hidden" }}>
            <TitleWrapper>
              <ComponentTitle>Deleted Advertisement</ComponentTitle>

              <ButtonHolders>
                {/*<ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                  </ActionBtn>

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new post
                </ActionBtn>*/}
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={advertisement.key ? "Update Header & Pop Up" : "Add New Header & Pop Up"}
              okText={advertisement.key ? "Update Header & Pop Up" : "Add Header & Pop Up"}
              onOk={this.handleRecord.bind(this, "insert", advertisement)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Full Name: </Label>
                  <Input
                    label="name"
                    placeholder="Enter Name"
                    value={advertisement.name}
                    onChange={this.onRecordChange.bind(this, "name")}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>IC Number: </Label>
                  <Input
                    label="ic"
                    placeholder="Enter IC Number Ex:900101015151"
                    rows={1}
                    value={advertisement.ic}
                    onChange={this.onRecordChange.bind(this, "ic")}
                    disabled={advertisement.key ? "disabled" : ""}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Email: </Label>
                  <Input
                    label="email"
                    placeholder="Enter E-mail Address"
                    rows={1}
                    value={advertisement.email}
                    onChange={this.onRecordChange.bind(this, "email")}
                    disabled={advertisement.key ? "disabled" : ""}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Date Joined: </Label>
                  <Input
                    label="date"
                    rows={1}
                    placeholder="Enter Date Joined"
                    value={advertisement.date}
                    onChange={this.onRecordChange.bind(this, "date")}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>licence: </Label>
                  <Input
                    label="licence"
                    placeholder="Enter Licence"
                    value={advertisement.licence}
                    onChange={this.onRecordChange.bind(this, "licence")}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Certicated: </Label>
                  <Input
                    label="certicated"
                    placeholder="Enter Certicated"
                    value={advertisement.certicated}
                    onChange={this.onRecordChange.bind(this, "certicated")}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Phone No: </Label>
                  <Input
                    label="phone"
                    placeholder="Enter Phone"
                    value={advertisement.phone}
                    onChange={this.onRecordChange.bind(this, "phone")}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Home Address: </Label>
                  <Textarea
                    label="address"
                    rows={3}
                    placeholder="Enter Home Address"
                    value={advertisement.address}
                    onChange={this.onRecordChange.bind(this, "address")}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Role</Label>
                  <Select
                    defaultValue={advertisement.role}
                    placeholder="Enter Role"
                    onChange={this.onSelectChange.bind(this, "role")}
                    style={{ width: "170px" }}
                  >
                    <Option value="Nurse">Nurse</Option>
                    <Option value="Doctor">Doctor</Option>
                    <Option value="Driver">Driver</Option>
                    <Option value="Admin">Admin</Option>
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Second Role?</Label>
                  <Select
                    defaultValue={advertisement.role2}
                    placeholder="Enter Second Role"
                    onChange={this.onSelectChange.bind(this, "role2")}
                    style={{ width: "170px" }}
                  >
                    <Option value="">Only One Role.</Option>
                    <Option value="Nurse">Nurse</Option>
                    <Option value="Doctor">Doctor</Option>
                    <Option value="Driver">Driver</Option>
                    <Option value="Admin">Admin</Option>
                  </Select>
                </Fieldset>
              </Form>
            </Modal>
            <TableWrapper
              rowKey="key"
              rowSelection={rowSelection}
              columns={columns}
              bordered={true}
              dataSource={dataSource}
              loading={this.props.isLoading}
              className="isoSimpleTable"
              pagination={{
                // defaultPageSize: 1,
                hideOnSinglePage: true,
                total: dataSource.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  (state) => ({
    ...state.Advertisements,
  }),
  actions
)(advertisements);
