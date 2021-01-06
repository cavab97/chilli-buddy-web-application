import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/shops/actions";
import Shops from "../../../components/templates/shops/Shops";
import { notification } from "marslab-library-react/components/organisms";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import clone from "clone";
import { validation } from "marslab-library-react/utils/validation/index";
import { geohashEncode } from "marslab-library-react/utils/common/geohash";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { Form } from "marslab-library-react/components/organisms/Form";

class ShopsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
    };
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

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  urlChange(url) {
    const oldUrl = url.substring(0, url.lastIndexOf("/"));

    return oldUrl;
  }

  onRowClick(shopData) {
    this.props.history.push(`/home/shopList/${shopData.id}`);
  }

  onButtonClick() {
    this.props.history.push(`/home/addshop`);
  }

  // handleModal = ({ toggle = false, nextPage = 0, data = null }) => {
  //   this.props.errorUpdate({});
  //   this.props.modalControl({ toggle, nextPage, data });
  // };

  getColumnSearchProps = (columnName) => ({
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const searchFormItem = [
        // [{
        //     type: "input",
        //     placeholder: `Search ${columnName}`,
        //     data: selectedKeys[0],
        //     onChange: (e) => setSelectedKeys(e.target.value ? [e.target.value] : []),
        //     FieldsetStyle: { width: 180 },
        // }],
        [
          {
            type: "select",
            placeholder: `Search ${columnName}`,
            data: selectedKeys[0],
            option: this.props.shops,
            optionTitle: columnName,
            optionValue: columnName,
            showSearch: true,
            onChange: (value) => setSelectedKeys(value ? [value] : []),
            FieldsetStyle: { width: 180 },
          },
        ],
        [
          {
            type: "button",
            label: "Search",
            buttonType: "primary",
            onClick: () => confirm(),
            ButtonStyle: { width: 88 },
          },
          {
            type: "button",
            label: "Reset",
            buttonType: "default",
            onClick: () => {
              clearFilters();
              setSelectedKeys([]);
            },
            ButtonStyle: { width: 88 },
          },
        ],
      ];
      return <Form formItem={searchFormItem} FormHolderStyle={{ padding: 10 }} />;
    },
    onFilter: (value, record) =>
      console.log(record) + record[columnName]
        ? record[columnName].toString().toLowerCase().includes(value.toLowerCase())
        : "",
  });
  render() {
    const { url } = this.props.match;
    const {
      shops,
      readLoading,
      //modalCurrentPage,
      shop_categories,
    } = this.props;
    const { shop } = clone(this.props);
    const optionUrl = this.urlChange(url);
    const dataSource = [];
    //const categorylabel = [];  //display shop category in shop list
    const shopCategories =
      shop_categories &&
      Object.values(shop_categories).map((categories) => {
        return { data: categories.id, label: categories.title };
      });
    //console.log(shopCategories);  //display shop category in shop list

    Object.keys(shops).map((shop, index) => {
      const categoriesArray = shops[shop].categories; //display shop category in shop list
      const categoryId = categoriesArray.toString();

      function getCategoryLabel() {
        switch (categoryId) {
          case "1607328160755":
            return "CHINESE | 中餐";

          case "1607328179507":
            return "WESTERN | 西餐";

          case "1607328192328":
            return "CAFE | 咖啡馆";

          case "1607328203811":
            return "CHINA | 中国餐";

          case "1607328215133":
            return "JAPANESE | 日本餐";

          case "1607328226309":
            return "KOREAN | 韩国餐";

          case "1607328240049":
            return "THAI | 泰国餐";

          case "1607328262228":
            return "BISTRO | 小酒馆";

          case "1607328271931":
            return "STEAMBOAT | 火锅";

          case "1607328282884":
            return "LOCAL CUISINE | 本地美食";

          case "1607328292779":
            return "BEVERAGE | 饮料店";

          case "1607328302362":
            return "FOOD TRUCK | 餐车";

          case "1607328353437":
            return "SPECIAL CUISINE | 特色美食";
          default:
            return "OTHER CATEGORY";
        }
      }

      return dataSource.push({
        ...shops[shop],
        categories: getCategoryLabel(categoryId), //display shop category in shop list
        // isPromote: shops[shop].isPromote ? "Active" :  "Inactive"
      });
    });
    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          optionControl="shopList"
          displayStatus={this.state.innerHide}
        />
        <ContentBox title="Shop Management" onClick={this.onClick.bind(this)}>
          <Shops
            //modalActive = {modalActive}
            readLoading={readLoading}
            //modalCurrentPage = {modalCurrentPage}}
            shop={shop}
            dataSource={dataSource}
            onRowClick={this.onRowClick.bind(this)}
            onButtonClick={this.onButtonClick.bind(this)}
            getColumnSearchProps={this.getColumnSearchProps.bind(this)}
            shopCategories={shopCategories}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const shop_tags = state.ShopTags.tags;
  const shop_categories = state.ShopCategories.categories;
  return { ...state.Shops, shop_tags, shop_categories, openKeys: state.App.openKeys };
};

export default connect(mapStatetoprops, actions)(ShopsScreen);
