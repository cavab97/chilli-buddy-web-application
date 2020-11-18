import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/routeGroup/actions";
import SingleShopPost from "../../../components/templates/shopPost/ShopPost";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";

class ShopPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
  }

  componentDidMount() {
    const { shopPostID = null } = this.props.match.params;
    this.props.readSpecifiedRecord(shopPostID);
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
    const { params } = this.props.match;

    switch(key){
        case "shopList": 

            this.props.history.push(`/home/shopList`);
        break;
        case "shop":
        
            this.props.history.push(`/home/shopList/${params.shopID}`);
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
      shopPost,
    } = this.props; 
    const optionUrl = this.urlCheck(params.shopPostID, url);

    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.shopPostID}
          optionControl="shopPost"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
            <BcrumbItem onClick={this.jumpBack.bind(this, "shopList")}>Shops</BcrumbItem>
            <BcrumbItem onClick={this.jumpBack.bind(this, "shop")}>Shop</BcrumbItem>
            <BcrumbItem>Post</BcrumbItem>
          </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <SingleShopPost
          
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  
  return { ...state.ShopPost };
};

export default connect(mapStatetoprops, actions)(ShopPost);