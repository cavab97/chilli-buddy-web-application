import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/shops/actions";
import Shop from "../../../components/templates/shops/Shop";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";

class ShopGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: {display: "none"},
    }
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
    // const { 
    //   shopGroups,
    // } = this.props; 
    const optionUrl = this.urlCheck(params.shopID, url);


    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.shopID}
          optionControl="shop"
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
                <Bcrumb separator="/">
                  <BcrumbItem onClick={this.jumpBack.bind(this, "shopList")}>Shops</BcrumbItem>
                  <BcrumbItem>Shop</BcrumbItem>
                </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <Shop
              
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  
  return { ...state.Shops };
};

export default connect(mapStatetoprops, actions)(ShopGroup);