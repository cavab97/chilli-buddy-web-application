import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/merchants/actions';
import { Form as FormSet, SelectOption as Option, Select, Button, Input, Textarea, Modal, Popconfirm, notification } from 'marslab-library-react/components/atoms';
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import clone from 'clone';
import firebase from 'firebase';

const FormItem = FormSet.Item;

class Merchants extends Component {
  constructor(props) {
    super(props);
    this.state = {
        logo:"",
        image: null,
        logoProgress: 0
    };
  }
  componentDidMount() {
    this.props.loadFromFireStore();
  }

  handleRecord = async (actionName, merchant) => {
    
    if (merchant.key && actionName !== 'delete')
    {
      actionName = 'update';
    } 

    merchant = {...merchant, address:{country:merchant.country?merchant.country:'',
                                      line1:merchant.line1?merchant.line1:'',
                                      line2:merchant.line2?merchant.line2:'',
                                      postcode:merchant.postcode?merchant.postcode:'',
                                      states:merchant.states?merchant.states:'',
                                    }}
    delete merchant['country'];
    delete merchant['line1'];
    delete merchant['line2'];
    delete merchant['postcode'];
    delete merchant['states'];
 
    this.props.saveIntoFireStore(merchant, actionName);
  };

  handleModal = (merchant = null) => {
    this.setState({
      image: null,
      logoProgress: 0
    })
    this.props.toggleModal(merchant);
  };



  handleChangeLogo = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];

      this.setState(() => ({ image}));
    }
  };

  handleUploadLogo = (key) => {
    const { image } = this.state;
    const date = new Date().getTime()
    if(!image) 
    {
      notification('error', 'Please Select Logo');
      return
    }

    var storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`merchants/${key}/${image.name}${date}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const logoProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ logoProgress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storageRef
          .child(`merchants/${key}/${image.name}${date}`)
          .getDownloadURL()
          .then(logo => {
            this.setState({ logo });
            this.onSelectChange("logo",logo)
          });
      }
    );
  };

  onRecordChange = (key, event) => {
    let { merchant } = clone(this.props);
    if (key) merchant[key] = event.target.value;
    this.props.update(merchant);
  };

  onSelectChange = (key, value) => {
 
    let { merchant } = clone(this.props);
    if (key) merchant[key] = value;
    this.props.update(merchant);
  };

  onUserIDCheckPress = (id) => {
    if(!id){
      notification('error', 'Please fill in super admin ID');
      return;
    }
    this.props.checkUserID(id)
  };

  render() {
    const { modalActive, merchants } = this.props;
    const { merchant } = clone(this.props);
    const dataSource = [];

    const countriesList = require('assets/address/countries.json')
    const statesList = require('assets/address/Malaysia/states.json')
    
    Object.keys(merchants).map((merchant, index) => {
      return dataSource.push({
        ...merchants[merchant],
        dateJoined:merchants[merchant].dateJoined?merchants[merchant].dateJoined.toDate():'',
        country:merchants[merchant].address.country,
        line1:merchants[merchant].address.line1,
        line2:merchants[merchant].address.line2,
        postcode:merchants[merchant].address.postcode,
        states:merchants[merchant].address.states,
        key: merchant,
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
        width: '120x',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
      },
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        width: '120x',
        sorter: (a, b) => {
          if (a.key < b.key) return -1;
          if (a.key > b.key) return 1;
          return 0;
        },
      },
      {
        title: 'Super Admin',
        dataIndex: 'superAdminName',
        width: '170px',
        key: 'superAdminName',
        sorter: (a, b) => {
          if (a.superAdminName < b.superAdminName) return -1;
          if (a.superAdminName > b.superAdminName) return 1;
          return 0;
        },
      },
      // {
      //   title: 'Super Admin ID',
      //   dataIndex: 'superAdminID',
      //   width: '170px',
      //   key: 'superAdminID',
      //   sorter: (a, b) => {
      //     if (a.superAdminID < b.superAdminID) return -1;
      //     if (a.superAdminID > b.superAdminID) return 1;
      //     return 0;
      //   },
      // },
 

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
                title="Are you sure to delete this merchant？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
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
              <ComponentTitle>Merchant Management</ComponentTitle>

              <ButtonHolders>
                {/*<ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                  </ActionBtn>*/}

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new merchant
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={merchant.key ? 'Update Merchant' : 'Add New Merchant'}
              okText={merchant.key ? 'Update Merchant' : 'Add Merchant'}
              onOk={this.handleRecord.bind(this, 'insert', merchant)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>

                <Fieldset>
                  <Label>Business Registration Name: </Label>
                  <Input
                    label="Business Registration Name"
                    placeholder="Enter Business Registration Name"
                    rows={1}
                    value={merchant.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Business Registration No: </Label>
                  <Input
                    label="businessRegNo"
                    placeholder="Enter Business Registration No"
                    value={merchant.businessRegNo}
                    onChange={this.onRecordChange.bind(this, 'businessRegNo')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Super Admin Name: </Label>
                  <Input
                    label="superAdminName"
                    placeholder="Enter Super Admin Name"
                    value={merchant.superAdminName}
                    onChange={this.onRecordChange.bind(this, 'superAdminName')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Super Admin IC: </Label>
                  <Input
                    label="superAdminIC"
                    placeholder="Enter Super Admin IC"
                    value={merchant.superAdminIC}
                    onChange={this.onRecordChange.bind(this, 'superAdminIC')}
                  />
                </Fieldset>
                
                <Fieldset>
                  <Label>Super Admin ID: </Label>
                  <FormItem
                    hasFeedback
                    help={this.props.checkingUserError?this.props.checkingUserError:this.props.checkingUserResult.name}>
                      <Input
                          label="superAdminID"
                          placeholder="Enter Super Admin User ID"
                          value={merchant.superAdminID}
                          onChange={this.onRecordChange.bind(this, 'superAdminID')}
                          disabled = {merchant.key? true :false} 
                        />
                  </FormItem>
                  <Button type="primary" loading = {this.props.isCheckingUser}  onClick={this.onUserIDCheckPress.bind(this, merchant.superAdminID)}>
                      Validate ID
                  </Button>
                </Fieldset>

                <Fieldset>
                  <Label>Business Email: </Label>
                  <Input
                    label="email"
                    placeholder="Enter Business Email"
                    value={merchant.email}
                    onChange={this.onRecordChange.bind(this, 'email')}
                  />
                </Fieldset>

                <Fieldset>
                    <Label>Business Phone No: </Label>
                    <Input
                      label="phone"
                      placeholder="Enter Business Phone"
                      value={merchant.phone}
                      onChange={this.onRecordChange.bind(this, 'phone')}
                    />
                  </Fieldset>
                <Label>Address </Label>
                <Fieldset>
                  <Label>Line 1: </Label>
                  <Input
                    label="line1"
                    placeholder="Enter Merchant Address line 1"
                    value={merchant.line1}
                    onChange={this.onRecordChange.bind(this,'line1')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Line 2: </Label>
                  <Input
                    label="line2"
                    placeholder="Enter Merchant Address line 2"
                    value={merchant.line2}
                    onChange={this.onRecordChange.bind(this, 'line2')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Postcode: </Label>
                  <Input
                    label="postcode"
                    placeholder="Enter Merchant Postcode"
                    value={merchant.postcode}
                    onChange={this.onRecordChange.bind(this, 'postcode')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>States: </Label>
                  <Select
                    defaultValue={merchant.states}
                    placeholder="Enter Merchant Address, states"
                    value={merchant.states}
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
                    defaultValue={merchant.country}
                    placeholder="Enter Merchant Address, country"
                    value={merchant.country}
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
                  <Label>Date Joined: </Label>
                  <DatePicker
                    selected={merchant.dateJoined}
                    onChange={this.onSelectChange.bind(this, 'dateJoined')}
                    placeholderText="Don't edit manually"
                  />
                </Fieldset>

                {merchant.key !== null &&
                <Fieldset>
                  <Label>Logo</Label>
                  
                  <img
                      src={merchant.logo?  merchant.logo:"https://via.placeholder.com/250x250"}
                      alt="Uploaded Images"
                      height="250"
                      width="250"
                    />
                  <div className="row">
                    <progress value={this.state.logoProgress} max="100" className="progress" />
                  </div>
                  <div className="file-field input-field">
                    <div className="btn">
                    <input 
                      type="file"
                      accept = "image/png,image/jpeg"
                      defaultValue=""
                      onChange={this.handleChangeLogo} 
                      />
                    </div>
                  </div>
                  <button
                      onClick={this.handleUploadLogo.bind(this,merchant.key)}
                      className="waves-effect waves-light btn"
                    >
                      Upload
                    </button>
                </Fieldset>}


                
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

export default connect(
  state => ({
    ...state.Merchants,
  }),
  actions
)(Merchants);
