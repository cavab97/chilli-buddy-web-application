import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/users/actions';
import { SelectOption as Option, Select, Input, Modal, Popconfirm, notification } from 'marslab-library-react/components/atoms';
import { LayoutWrapper, Box, ContentHolder } from 'marslab-library-react/components/molecules';
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
import Firebase from 'marslab-library-react/utils/helper/firebase';

class users extends Component {


  componentDidMount() {
    this.props.loadDeletedUserFromFireStore();
  }


  handleRecord = async (actionName, user) => {
    const email = user.email;
    const password = user.password;
    if (user.key && actionName !== 'delete')
    {
      actionName = 'update';
    } 
    if (!user.key && actionName === 'insert') 
    {
      let data;
      if (!(email && password)) {
        notification('error', 'Please fill in email and password');
        return;
      }
      data = await Firebase.signup(Firebase.EMAIL, {
        email,
        password,
      });
      const newUser = data && data.user ? data.user : false;
      const message =
        newUser === false && data && data.message
          ? data.message
          : 'Sorry Some error occurs';
      if (newUser) {
        //const token = await newshop.getIdToken();
        user.adminID = data.user.uid;
        user.key = data.user.uid;
      } else {
        notification('error', message);
        return;
      }
    }
    user = {...user, address:{country:user.country?user.country:'',
                                      line1:user.line1?user.line1:'',
                                      line2:user.line2?user.line2:'',
                                      postcode:user.postcode?user.postcode:'',
                                      states:user.states?user.states:'',
                                    }}
    delete user['country'];
    delete user['line1'];
    delete user['line2'];
    delete user['postcode'];
    delete user['states'];

    this.props.saveIntoFireStore(user, actionName);
  };

  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (user = null) => {
    this.props.toggleModal(user);
  };

  onRecordChange = (key, event) => {
    let { user } = clone(this.props);
    if (key) user[key] = event.target.value;
    this.props.update(user);
  };

  onSelectChange = (key, value) => {
    let { user } = clone(this.props);
    if (key) user[key] = value;
    this.props.update(user);
  };

  render() {
    const { modalActive, users } = this.props;
    const { user } = clone(this.props);
    const dataSource = [];

    const countriesList = require('assets/address/countries.json')
    const statesList = require('assets/address/Malaysia/states.json')
    
    Object.keys(users).map((user, index) => {
      return dataSource.push({
        ...users[user],
        dateJoined:users[user].dateJoined?users[user].dateJoined.toDate():'',
        country:users[user].address.country,
        line1:users[user].address.line1,
        line2:users[user].address.line2,
        postcode:users[user].address.postcode,
        states:users[user].address.states,
        key: user,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '200px',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
      },

      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '120x',
        sorter: (a, b) => {
          if (a.email < b.email) return -1;
          if (a.email > b.email) return 1;
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

              <Popconfirm
                title="Are you sure to restore this User？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'restore', row)}
              >
                <a className="restoreBtn" href="# ">
                  <i className="ion-android-happy" />
                </a>
              </Popconfirm>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <LayoutWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Deleted User</ComponentTitle>

              <ButtonHolders>
                {/*<ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                  </ActionBtn>

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new user
                </ActionBtn>*/}
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={user.key ? 'Update User' : 'Add New User'}
              okText={user.key ? 'Update User' : 'Add User'}
              onOk={this.handleRecord.bind(this, 'insert', user)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
              <Fieldset>
                  <Label>Name</Label>
                  <Input
                    label="name"
                    placeholder="Enter Name"
                    rows={1}
                    value={user.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>ID</Label>
                  <Input
                    label="id"
                    placeholder="Enter ID"
                    rows={1}
                    value={user.ID}
                    onChange={this.onRecordChange.bind(this, 'ID')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Email</Label>
                  <Input
                    label="email"
                    placeholder="Enter Email"
                    rows={1}
                    value={user.email}
                    onChange={this.onRecordChange.bind(this, 'email')}
                  />
                </Fieldset>
                {user.key ===null &&
                <Fieldset>
                  <Label>Password</Label>
                  <Input
                    label="password"
                    placeholder="Enter First Time Password"
                    value={user.password}
                    onChange={this.onRecordChange.bind(this, 'password')}
                  />
                </Fieldset>
                } 
                <Fieldset>
                  <Label>Gender</Label>
                  <Select
                    
                    defaultValue={user.gender}
                    placeholder="Gender"
                    value={user.gender}
                    onChange={this.onSelectChange.bind(this, 'gender')}
                  >
                    <Option key= "male" value="male">Male</Option>
                    <Option key= "female" value="female">Female</Option>
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Phone Number</Label>
                  <Input
                    label="phoneNumber"
                    rows={1}
                    placeholder="Enter Phone Number"
                    value={user.phoneNumber}
                    onChange={this.onRecordChange.bind(this, 'phoneNumber')}
                  />
                </Fieldset>

                <Label>Address </Label>
                <Fieldset>
                  <Label>Line 1: </Label>
                  <Input
                    label="line1"
                    placeholder="Enter user Address line 1"
                    value={user.line1}
                    onChange={this.onRecordChange.bind(this,'line1')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Line 2: </Label>
                  <Input
                    label="line2"
                    placeholder="Enter user Address line 2"
                    value={user.line2}
                    onChange={this.onRecordChange.bind(this, 'line2')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Postcode: </Label>
                  <Input
                    label="postcode"
                    placeholder="Enter user Postcode"
                    value={user.postcode}
                    onChange={this.onRecordChange.bind(this, 'postcode')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>States: </Label>
                  <Select
                    
                    defaultValue={user.states}
                    placeholder="Enter user Address, states"
                    value={user.states}
                    onChange={this.onSelectChange.bind(this, 'states')}
                  >
                    { 
                    statesList.map((state)=>{
                      return(
                        <Option key= {state} value={state}>{state}</Option>
                      )}
                    )
                    }
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Country: </Label>
                  <Select
                    defaultValue={user.country}
                    placeholder="Enter user Address, country"
                    value={user.country}
                    onChange={this.onSelectChange.bind(this, 'country')}
                    >
                    { 
                    countriesList.map((country)=>{
                      return(
                        <Option key= {country.country} value={country.country}>{country.country}</Option>
                      )}
                    )
                    }
                  </Select>
                </Fieldset>
                
                <Fieldset>
                  <Label>Role: </Label>
                  <Select
                    defaultValue={user.role}
                    placeholder="Enter user role"
                    value={user.role}
                    onChange={this.onSelectChange.bind(this, 'role')}
                    >
                    { 
                    Object.values(this.props.user_roles).map((role)=>{
                      return(
                        <Option key= {role.id} value={role.id}>{role.title}</Option>
                      )}
                    )
                    }
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
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutWrapper>
    );
  }
}

const mapStatetoprops = state => {

  const user_roles = state.UserRoles.roles;

  return {...state.Users, user_roles};
}

export default connect(
  mapStatetoprops,
  actions
)(users);
