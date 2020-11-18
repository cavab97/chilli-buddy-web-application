import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/promotion/actions";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import PromotionsList from "../../../components/templates/promotion/Promotions";
import clone from "clone";


class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const {params} = this.props.match;
    this.props.readFromDatabase(params.shopID);
  }

  onClick = () => {
    if(this.state.innerHide.display === "block"){
      this.setState({innerHide: {display: "none"}});
    }else{
      this.setState({innerHide: {display: "block"}});
    }
  }

  onButtonClick(){
    const { params } = this.props.match;
    this.props.history.push(`/home/shopList/${params.shopID}/addpromotion`);
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

  onRowClick(promotionData){
    const {params} = this.props.match;
    this.props.history.push(`/home/shopList/${params.shopID}/promotions/${promotionData.id}`);
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

  render() {
    const { url, params } = this.props.match;
    const {
      promotions,
      readLoading,
    } = this.props;
    const optionUrl = this.urlCheck(params.shopID, url);
    const { promotion } = clone(this.props);

    promotions.forEach((data) => {
      if(!data.started.boolean && !data.ended.boolean)
        data["status"] = "Await";
      else if(data.started.boolean && !data.ended.boolean)
        data["status"] = "Start";
      else
        data["status"] = "End";
    });

    console.log(promotions);

    return (
        <ScreenHolder>
            <InnerSidebar
                url={optionUrl}
                optionControl="shop"
                displayStatus={this.state.innerHide}
            />
            <ContentBox
                title={
                    <Bcrumb separator="/">
                        <BcrumbItem onClick={this.jumpBack.bind(this, "shopList")}>Shops</BcrumbItem>
                        <BcrumbItem onClick={this.jumpBack.bind(this, "shop")}>Shop</BcrumbItem>
                    </Bcrumb>
                }
                onClick={this.onClick.bind(this)}
            >
                <PromotionsList
                  onButtonClick = {this.onButtonClick.bind(this)}
                  onRowClick = {this.onRowClick.bind(this)}
                  readLoading = {readLoading}
                  promotion = {promotion}
                  dataSource = {promotions}
                />
            </ContentBox>
        </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
   //const shop_tags = state.ShopTags.tags;
   //const shop_categories = state.ShopCategories.categories;
   return { ...state.Promotion };
};

export default connect(mapStatetoprops, actions)(Promotions);
