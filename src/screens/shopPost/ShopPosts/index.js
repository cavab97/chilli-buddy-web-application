import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/shopPost/actions";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { Bcrumb, BcrumbItem } from 'marslab-library-react/components/atoms';
import { ScreenHolder } from 'marslab-library-react/components/molecules';
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import ShopPostList from "../../../components/templates/shopPost/ShopPosts";

class ShopPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      innerHide: {display: "none"},
    };
  }

  componentDidMount() {
    const { shopID } = this.props.match.params;
    this.props.readFromDatabase(shopID);
  }

  onClick = () => {
    if(this.state.innerHide.display === "block"){
      this.setState({innerHide: {display: "none"}});
    }else{
      this.setState({innerHide: {display: "block"}});
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

  onRowClick = (rowData) => {
    const { params } = this.props.match;

    this.props.history.push(`/home/shopList/${params.shopID}/posts/${rowData.id}`);
  }

  onAddPost = () => {
    const { params } = this.props.match;

    this.props.history.push(`/home/shopList/${params.shopID}/addpost`);
  }

  render() {
    const { url, params } = this.props.match;
    const {
      posts,
      readLoading,
    } = this.props;
    const optionUrl = this.urlCheck(params.shopID, url);

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
                        <BcrumbItem>Shop</BcrumbItem>
                    </Bcrumb>
                }
                onClick={this.onClick.bind(this)}
            >
                <ShopPostList
                  loading={readLoading}
                  dataSource={posts}
                  onRowClick={this.onRowClick.bind(this)}
                  onAddPost={this.onAddPost.bind(this)}
                />
            </ContentBox>
        </ScreenHolder>
    );
  }
}

const mapStatetoprops = state => {
  return { ...state.ShopPost };
};

export default connect(mapStatetoprops, actions)(ShopPosts);
