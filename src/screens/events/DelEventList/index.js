import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/ShowEventManagement/actions';
import Input, {
  Textarea,
} from 'isomorphic-shared/components/uielements/input';
import Select, {
  SelectOption as Option,
} from 'isomorphic-shared/components/uielements/select';
// import Checkbox from 'isomorphic-shared/components/uielements?';
// import Modal from './node_modules/isomorphic-shared/components/Feedback/Modal';
import Modal from 'isomorphic-shared/components/Feedback/Modal';
import LayoutContentWrapper from 'isomorphic-shared/components/utility/layoutWrapper.js';
import Box from 'isomorphic-shared/components/utility/box';
import ContentHolder from 'isomorphic-shared/components/utility/contentHolder';
// import Popconfirms from './node_modules/isomorphic-shared/components/Feedback/Popconfirm';
import Popconfirms from 'isomorphic-shared/components/Feedback/Popconfirm';
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
} from './styles';
import clone from 'clone';
import Firebase from '../../../../authentication/firebase';
// import { notification } from './node_modules/isomorphic-shared/components';
import { notification } from 'isomorphic-shared/components';

class EventForm extends Component {


  componentDidMount() {
    this.props.loadDeletedUserFromFireStore();
  }


  handleRecord = async (actionName, eventL) => {
    const email = eventL.email;
    const password = eventL.ic;

    if (eventL.key && actionName !== 'delete' && actionName !== 'restore') 
    {
      actionName = 'update';
    } 
    
    if (!eventL.key && actionName == 'insert') 
    {
      let data;
      if (!(email && password)) {
        notification('error', 'Please fill in email and ic number');
        return;
      }  
      data = await Firebase.signup(Firebase.EMAIL, {
        email,
        password,
      });
      const newEvent = data && data.eventL ? data.eventL : false;
      const message =
        newEvent === false && data && data.message
          ? data.message
          : 'Sorry Some error occurs';
      if (newEvent) {
        //const token = await newEvent.getIdToken();
        eventL.uid = data.eventL.uid;
        eventL.key = data.eventL.uid;
      } else {
        notification('error', message);
        return;
      }
    }
    this.props.saveIntoFireStore(eventL, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (eventL = null) => {
    this.props.toggleModal(eventL);
  };

  onRecordChange = (key, event) => {
    let { eventL } = clone(this.props);
    if (key) eventL[key] = event.target.value;
    this.props.update(eventL);
  };

  onSelectChange = (key, value) => {
    let { eventL } = clone(this.props);
    if (key) eventL[key] = value;
    this.props.update(eventL);
  };

  render() {
    const { modalActive, events } = this.props;
    const { eventL } = clone(this.props);
    const dataSource = [];
    Object.keys(events).map((eventL, index) => {
      return dataSource.push({
        ...events[eventL],
        key: eventL,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'Shop Name',
        dataIndex: 'shopName',
        key: 'shopName',
        width: '150px',
        sorter: (a, b) => {
          if (a.shopName < b.shopName) return -1;
          if (a.shopName > b.shopName) return 1;
          return 0;
        },
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        //width: '200x',
        sorter: (a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        },
      },
      {
        title: 'Create At',
        dataIndex: 'createAt',
        key: 'createAt',
        width: '60x',
        sorter: (a, b) => {
          if (a.createAt < b.createAt) return -1;
          if (a.createAt > b.createAt) return 1;
          return 0;
        },
      },
      {
        title: 'Start Time',
        dataIndex: 'startDate',
        key: 'startDate',
        width: '60x',
        sorter: (a, b) => {
          if (a.startDate < b.startDate) return -1;
          if (a.startDate > b.startDate) return 1;
          return 0;
        },
      },
      {
        title: 'End Time',
        dataIndex: 'endDate',
        key: 'endDate',
        width: '60x',
        sorter: (a, b) => {
          if (a.endDate < b.endDate) return -1;
          if (a.endDate > b.endDate) return 1;
          return 0;
        },
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '60x',
        sorter: (a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        },
      },

      {
        title: 'Actions',
        key: 'action',
        width: '60px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to restore this event?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'restore', row)}
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
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Deleted event</ComponentTitle>

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
              title={eventL.key ? 'Update Event' : 'Add New Event'}
              okText={eventL.key ? 'Update Event' : 'Add Event'}
              onOk={this.handleRecord.bind(this, 'insert', eventL)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Full Name: </Label>
                  <Input
                    label="shopName"
                    placeholder="Enter Shop Name"
                    value={eventL.shopName}
                    onChange={this.onRecordChange.bind(this, 'shopName')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>ID</Label>
                  <Input
                    label="ic"
                    placeholder="Enter IC Number Ex:900101015151"
                    rows={1}
                    value={eventL.id}
                    onChange={this.onRecordChange.bind(this, 'id')}
                    disabled = {eventL.key? "disabled" : ""}
                  />
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
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
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
  state => ({
    ...state.ShowEvents,
  }),
  actions
)(EventForm);
