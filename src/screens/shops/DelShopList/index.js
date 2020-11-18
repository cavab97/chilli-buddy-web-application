// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import actions from '../../../redux/shops/actions';
// import {  SelectOption as Option, Select, Button, Input, Textarea, Modal, Popconfirm, notification } from 'marslab-library-react/components/atoms';
// import { LayoutWrapper, Box, ContentHolder } from 'marslab-library-react/components/molecules';
// import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
// import { ScreenHolder } from 'marslab-library-react/components/molecules';
// import ContentBox from "marslab-library-react/components/organisms/ContentBox";
// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label,
//   TitleWrapper,
//   ButtonHolders,
//   ActionWrapper,
//   ComponentTitle,
//   TableWrapper,
//   StatusTag,
// } from './styles';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Geohash from 'latlon-geohash';

// import clone from 'clone';
// import firebase from 'firebase';

// class Shops extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         innerHide: {display: "none"},
//         logo:"",
//         image: null,
//         logoProgress: 0,
//         coverPic:"",
//         image1: null,
//         lcoverPicProgress: 0,
//     };
//   }
//   componentDidMount() {
//     this.props.loadDeletedUserFromFireStore();
//   }

//   onClick = () => {
//     if(this.state.innerHide.display === "block"){
//       this.setState({innerHide: {display: "none"}});
//     }else{
//       this.setState({innerHide: {display: "block"}});
//     }
//   }

//   urlChange(url){
//     const oldUrl = url.substring(0, url.lastIndexOf("/"));

//     return oldUrl;
//   }

//   handleRecord = async (actionName, shop) => {
//     if (shop.key && actionName !== 'delete')
//     {
//       actionName = 'update';
//     } 
//     let geohash =''

//     if(shop.latitude && shop.longitude)
//     geohash = Geohash.encode(shop.longitude, shop.longitude, 10);

//     shop = {...shop, address:{country:shop.country?shop.country:'',
//                                       line1:shop.line1?shop.line1:'',
//                                       line2:shop.line2?shop.line2:'',
//                                       postcode:shop.postcode?shop.postcode:'',
//                                       states:shop.states?shop.states:'',
//                                     }
//                   , coordinates:new firebase.firestore.GeoPoint(parseFloat(shop.latitude), parseFloat(shop.longitude))
//                 ,g:geohash
//                 ,categories:[shop.categories]}

    

//     delete shop['country'];
//     delete shop['line1'];
//     delete shop['line2'];
//     delete shop['postcode'];
//     delete shop['states'];
//     delete shop['latitude'];
//     delete shop['longitude'];
 
//     this.props.saveIntoFireStore(shop, actionName);
//   };

//   handleModal = (shop = null) => {
//     this.setState({
//       image: null,
//       logoProgress: 0,
//       image1:null,
//       coverPicProgress: 0
//     })
//     this.props.toggleModal(shop);
//   };



//   handleChangeLogo = (event) => {
//     if (event.target.files[0]) {
//       const image = event.target.files[0];

//       this.setState(() => ({ image}));
//     }
//   };

//   handleUploadLogo = (key) => {
//     const { image } = this.state;
//     const date = new Date().getTime()
//     if(!image) 
//     {
//       notification('error', 'Please Select Logo');
//       return
//     }

    
//     var storageRef = firebase.storage().ref();
//     const uploadTask = storageRef.child(`shops/${key}/${image.name}${date}`).put(image);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         // progress function ...
//         const logoProgress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         this.setState({ logoProgress });
//       },
//       error => {
//         // Error function ...
//         console.log(error);
//       },
//       () => {
//         // complete function ...
//         storageRef
//           .child(`shops/${key}/${image.name}${date}`)
//           .getDownloadURL()
//           .then(logo => {
//             this.setState({ logo });
//             this.onSelectChange("logo",logo)
//           });
//       }
//     );
//   };

//   handleChangeCoverPic = (event) => {
//     if (event.target.files[0]) {
//       const image1 = event.target.files[0];

//       this.setState(() => ({image1}));
//     }
//   };

//   handleUploadCoverPic = (key) => {
//     const { image1 } = this.state;
//     const date = new Date().getTime()
//     if(!image1) 
//     {
//       notification('error', 'Please Select Cover Picture');
//       return
//     }

    
//     var storageRef = firebase.storage().ref();
//     const uploadTask = storageRef.child(`shops/${key}/${image1.name}${date}`).put(image1);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         // progress function ...
//         const coverPicProgress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         this.setState({ coverPicProgress });
//       },
//       error => {
//         // Error function ...
//         console.log(error);
//       },
//       () => {
//         // complete function ...
//         storageRef
//           .child(`shops/${key}/${image1.name}${date}`)
//           .getDownloadURL()
//           .then(coverPic => {
//             this.setState({ coverPic });
//             this.onSelectChange("coverPic",coverPic)
//           });
//       }
//     );
//   };

//   onRecordChange = (key, event) => {
//     let { shop } = clone(this.props);
//     if (key) shop[key] = event.target.value;
//     this.props.update(shop);
//   };

//   onSelectChange = (key, value) => {
 
//     let { shop } = clone(this.props);
//     if (key) shop[key] = value;
//     this.props.update(shop);
//   };

//   render() {
//     const { url } = this.props.match;
//     const { modalActive, shops } = this.props;
//     const { shop } = clone(this.props);
//     const dataSource = [];
//     const optionUrl = this.urlChange(url);

//     const countriesList = require('assets/address/countries.json')
//     const statesList = require('assets/address/Malaysia/states.json')
    
    

//     Object.keys(shops).map((shop, index) => {
//       return dataSource.push({
//         ...shops[shop],
//         dateJoined:shops[shop].dateJoined?shops[shop].dateJoined.toDate():'',
//         country:shops[shop].address.country,
//         line1:shops[shop].address.line1,
//         line2:shops[shop].address.line2,
//         postcode:shops[shop].address.postcode,
//         states:shops[shop].address.states,
//         latitude:shops[shop].coordinates._lat,
//         longitude:shops[shop].coordinates._long,
//         categories:shops[shop].categories[0],
//         key: shop,
//       });
//     });

//     const rowSelection = {
//       onChange: (selectedRowKeys, selectedRows) => {},
//     };

//     const columns = [
//       {
//         title: 'Shop Name',
//         dataIndex: 'name',
//         key: 'name',
//         width: '120x',
//         sorter: (a, b) => {
//           if (a.name < b.name) return -1;
//           if (a.name > b.name) return 1;
//           return 0;
//         },
//       },
//       {
//         title: 'ID',
//         dataIndex: 'key',
//         key: 'key',
//         width: '120x',
//         sorter: (a, b) => {
//           if (a.key < b.key) return -1;
//           if (a.key > b.key) return 1;
//           return 0;
//         },
//       },
//       {
//         title: 'Merchant Name',
//         dataIndex: 'merchantName',
//         width: '170px',
//         key: 'merchantName',
//         sorter: (a, b) => {
//           if (a.merchantName < b.merchantName) return -1;
//           if (a.merchantName > b.merchantName) return 1;
//           return 0;
//         },
//       },
//       {
//         title: 'Admin Name',
//         dataIndex: 'adminName',
//         width: '170px',
//         key: 'adminName',
//         sorter: (a, b) => {
//           if (a.adminName < b.adminName) return -1;
//           if (a.adminName > b.adminName) return 1;
//           return 0;
//         },
//       },
//       {
//         title: 'Admin ID',
//         dataIndex: 'adminID',
//         width: '170px',
//         key: 'adminID',
//         sorter: (a, b) => {
//           if (a.adminID < b.adminID) return -1;
//           if (a.adminID > b.adminID) return 1;
//           return 0;
//         },
//       },
 

//       {
//         title: 'Actions',
//         key: 'action',
//         width: '60px',
//         className: 'noWrapCell',
//         render: (text, row) => {
//           return (
//             <ActionWrapper>
//               <a onClick={this.handleModal.bind(this, row)} href="# ">
//                 <i className="ion-android-create" />
//               </a>

//               <Popconfirm
//                 title="Are you sure to restore this Merchant？"
//                 okText="Yes"
//                 cancelText="No"
//                 placement="topRight"
//                 onConfirm={this.handleRecord.bind(this, 'restore', row)}
//               >
//                 <a className="restoreBtn" href="# ">
//                   <i className="ion-android-happy" />
//                 </a>
//               </Popconfirm>
//             </ActionWrapper>
//           );
//         },
//       },
//     ];

//     return (
//       <ScreenHolder>
//           <InnerSidebar
//             url={optionUrl}
//             optionControl="shopList"
//             displayStatus={this.state.innerHide}
//           />
//           <ContentBox
//             title="Shop Management"
//             onClick={this.onClick.bind(this)}
//           >
//               <ButtonHolders>
//                 {/*<ActionBtn type="danger" onClick={this.resetRecords}>
//                   Reset record
//                   </ActionBtn>

//                 <ActionBtn
//                   type="primary"
//                   onClick={this.handleModal.bind(this, null)}
//                 >
//                   Add new shop
//                 </ActionBtn>*/}
//               </ButtonHolders>

//             <Modal
//               visible={modalActive}
//               onClose={this.props.toggleModal.bind(this, null)}
//               title={shop.key ? 'Update shop' : 'Add New shop'}
//               okText={shop.key ? 'Update shop' : 'Add shop'}
//               onOk={this.handleRecord.bind(this, 'insert', shop)}
//               onCancel={this.props.toggleModal.bind(this, null)}
//             >
//               <Form>
//                 <Fieldset>
//                   <Label>Name: </Label>
//                   <Input
//                     label="Name"
//                     placeholder="Enter The Name Display To Merchant"
//                     value={shop.name}
//                     onChange={this.onRecordChange.bind(this, 'name')}
//                   />
//                 </Fieldset>
//                   {console.log(shop.coordinates[0])}
//                   {console.log(shop.coordinates)}
//                 <Fieldset>
//                   <Label>Display Name: </Label>
//                   <Input
//                     label="displayName"
//                     placeholder="Enter The Name Display To User"
//                     value={shop.displayName}
//                     onChange={this.onRecordChange.bind(this, 'displayName')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Admin Name: </Label>
//                   <Input
//                     label="adminName"
//                     placeholder="Enter Admin Name"
//                     value={shop.adminName}
//                     onChange={this.onRecordChange.bind(this, 'adminName')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Admin IC: </Label>
//                   <Input
//                     label="adminIC"
//                     placeholder="Enter Admin IC"
//                     value={shop.adminIC}
//                     onChange={this.onRecordChange.bind(this, 'adminIC')}
//                   />
//                 </Fieldset>
 
//                 <Fieldset>
//                   <Label>Admin ID: </Label>
//                   <Input
//                     label="adminID"
//                     placeholder="Enter Admin User ID"
//                     value={shop.adminID}
//                     onChange={this.onRecordChange.bind(this, 'adminID')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Merchant ID: </Label>
//                   <Input
//                     label="merchantId"
//                     placeholder="Enter Merchant ID"
//                     value={shop.merchantId}
//                     onChange={this.onRecordChange.bind(this, 'merchantId')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Business Email: </Label>
//                   <Input
//                     label="email"
//                     placeholder="Enter Business Email"
//                     value={shop.email}
//                     onChange={this.onRecordChange.bind(this, 'email')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                     <Label>Business Phone No: </Label>
//                     <Input
//                       label="phone"
//                       placeholder="Enter Business Phone"
//                       value={shop.phone}
//                       onChange={this.onRecordChange.bind(this, 'phone')}
//                     />
//                   </Fieldset>

//                 <Fieldset>
//                     <Label>Business Facebook: </Label>
//                     <Input
//                       label="facebook"
//                       placeholder="Enter Business Facebook"
//                       value={shop.facebook}
//                       onChange={this.onRecordChange.bind(this, 'facebook')}
//                     />
//                   </Fieldset>
                
//                 <Fieldset>
//                     <Label>Business Instagram: </Label>
//                     <Input
//                       label="instagram"
//                       placeholder="Enter Business Instagram"
//                       value={shop.instagram}
//                       onChange={this.onRecordChange.bind(this, 'instagram')}
//                     />
//                   </Fieldset>

//                   <Fieldset>
//                     <Label>Business Whatsapp: </Label>
//                     <Input
//                       label="whatsapp"
//                       placeholder="Enter Business Whatsapp"
//                       value={shop.whatsapp}
//                       onChange={this.onRecordChange.bind(this, 'whatsapp')}
//                     />
//                   </Fieldset>

//                   <Fieldset>
//                     <Label>Categories: </Label>
//                     <Select
//                       placeholder="Select Categories"
//                       value={shop.categories}
//                       onChange={this.onSelectChange.bind(this,'categories')}
//                     >
//                     { 
//                       Object.values(this.props.shop_categories).map((categories)=>{
//                         return(
//                           <Option key= {categories.key} value={categories.key}>{categories.title}</Option>
//                         )}
//                       )
//                     }
//                   </Select>
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Tags: </Label>
//                   <Select
//                     mode="tags"
//                     style={{ width: '100%' }}
//                     placeholder="Tags"
//                     value={shop.tags}
//                     onChange={this.onSelectChange.bind(this,'tags')}
//                   >
          
//                   { shop.categories!=='' &&
//                     Object.values(this.props.shop_categories[shop.categories].tags).map((tag)=>{
                      
//                       return(
//                         <Option key= {tag} value={tag}>{this.props.shop_tags[tag].title}</Option>
//                       )}
//                     )
//                   }
//                 </Select>
//                 </Fieldset>

                
//                 <Label>Address </Label>
                
//                 <Fieldset>
//                   <Label>Latitude: </Label>
//                   <Input
//                     label="latitude"
//                     placeholder="Enter Shop Latitude"
//                     value={shop.latitude}
//                     onChange={this.onRecordChange.bind(this,'latitude')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Longitude: </Label>
//                   <Input
//                     label="longitude"
//                     placeholder="Enter Shop Longitude"
//                     value={shop.longitude}
//                     onChange={this.onRecordChange.bind(this,'longitude')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Line 1: </Label>
//                   <Input
//                     label="line1"
//                     placeholder="Enter shop Address line 1"
//                     value={shop.line1}
//                     onChange={this.onRecordChange.bind(this,'line1')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Line 2: </Label>
//                   <Input
//                     label="line2"
//                     placeholder="Enter shop Address line 2"
//                     value={shop.line2}
//                     onChange={this.onRecordChange.bind(this, 'line2')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Postcode: </Label>
//                   <Input
//                     label="postcode"
//                     placeholder="Enter shop Postcode"
//                     value={shop.postcode}
//                     onChange={this.onRecordChange.bind(this, 'postcode')}
//                   />
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>States: </Label>
//                   <Select
                    
//                     defaultValue={shop.states}
//                     placeholder="Enter shop Address, states"
//                     value={shop.states}
//                     onChange={this.onSelectChange.bind(this, 'states')}
//                   >
//                     { 
//                     statesList.map((state)=>{
//                       return(
//                         <Option key= {state} value={state}>{state}</Option>
//                       )}
//                     )
//                     }
//                   </Select>
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Country: </Label>
//                   <Select
//                     defaultValue={shop.country}
//                     placeholder="Enter shop Address, country"
//                     value={shop.country}
//                     onChange={this.onSelectChange.bind(this, 'country')}
//                     >
//                     { 
//                     countriesList.map((country)=>{
//                       return(
//                         <Option key= {country.country} value={country.country}>{country.country}</Option>
//                       )}
//                     )
//                     }
//                   </Select>
//                 </Fieldset>

//                 <Fieldset>
//                   <Label>Date Joined: </Label>
//                   <DatePicker
//                     selected={shop.dateJoined}
//                     onChange={this.onSelectChange.bind(this, 'dateJoined')}
//                     placeholderText="Don't edit manually"
//                   />
//                 </Fieldset>

//                 {shop.key !==null &&
//                 <Fieldset>
//                   <Label>Logo</Label>
                  
//                   <img
//                       src={shop.logo?  shop.logo:"https://via.placeholder.com/250x250"}
//                       alt="Uploaded Images"
//                       height="250"
//                       width="250"
//                     />
//                   <div className="row">
//                     <progress value={this.state.logoProgress} max="100" className="progress" />
//                   </div>
//                   <div className="file-field input-field">
//                     <div className="btn">
//                     <input 
//                       type="file" 
//                       accept = "image/png,image/jpeg"
//                       defaultValue=""
//                       onChange={this.handleChangeLogo} 
//                       />
//                     </div>
//                   </div>
//                   <button
//                       onClick={this.handleUploadLogo.bind(this,shop.key)}
//                       className="waves-effect waves-light btn"
//                     >
//                       Upload
//                     </button>
//                 </Fieldset>}

//                 {shop.key !==null &&
//                 <Fieldset>
//                   <Label>Cover Picture</Label>
                  
//                   <img
//                       src={shop.coverPic?  shop.coverPic:"https://via.placeholder.com/640x360"}
//                       alt="Uploaded Images"
//                       height="180"
//                       width="320"
//                     />
//                   <div className="row">
//                     <progress value={this.state.coverPicProgress} max="100" className="progress" />
//                   </div>
//                   <div className="file-field input-field">
//                     <div className="btn">
//                     <input 
//                       type="file" 
//                       accept = "image/png,image/jpeg"
//                       defaultValue=""
//                       onChange={this.handleChangeCoverPic} 
//                       />
//                     </div>
//                   </div>
//                   <button
//                       onClick={this.handleUploadCoverPic.bind(this,shop.key)}
//                       className="waves-effect waves-light btn"
//                     >
//                       Upload
//                     </button>
//                 </Fieldset>}

//               </Form>
//             </Modal>
//             <TableWrapper
//               rowKey="key"
//               rowSelection={rowSelection}
//               columns={columns}
//               bordered={true}
//               dataSource={dataSource}
//               loading={this.props.isLoading}
//               className="isoSimpleTable"
//               pagination={{
//                 // defaultPageSize: 1,
//                 hideOnSinglePage: true,
//                 total: dataSource.length,
//                 showTotal: (total, range) => {
//                   return `Showing ${range[0]}-${range[1]} of ${
//                     dataSource.length
//                   } Results`;
//                 },
//               }}
//             />
//           </ContentBox>
//       </ScreenHolder>
//     );
//   }
// }

// const mapStatetoprops = state => {
//   const shop_tags = state.ShopTags.tags;
//   const shop_categories = state.ShopCategories.categories;

//   return {...state.Shops, shop_tags,shop_categories};
// }

// export default connect(
//   mapStatetoprops,
//   actions
// )(Shops);
