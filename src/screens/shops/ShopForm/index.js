import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/shops/actions";
import Form from "../../../components/templates/shops/ShopForm";
import { Bcrumb, BcrumbItem } from "marslab-library-react/components/atoms";
import { ScreenHolder } from "marslab-library-react/components/molecules";
import ContentBox from "marslab-library-react/components/organisms/ContentBox";
import InnerSidebar from "marslab-library-react/components/organisms/InnerSideBar";
import clone from "clone";
import moment from "moment";

import { notification } from "marslab-library-react/components/organisms";

import { validation } from "marslab-library-react/utils/validation";
import { geohashEncode } from "marslab-library-react/utils/common/geohash";

const countriesList = require("assets/address/countries.json");
const statesList = require("assets/address/Malaysia/states.json");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class ShopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHide: { display: "none" },
    };
  }

  componentDidMount() {
    const { shopID = null } = this.props.match.params;
    this.props.readSpecifiedRecord(shopID);

    const errorReturn = {};
    this.props.errorUpdate(errorReturn);
  }

  componentWillReceiveProps(nextProps) {
    let { shop, submitResult } = nextProps;
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
      if (submitResult.action === "Delete shop") {
        this.props.history.push(`/home/shopList`);
      } else if (submitResult.action === "Create shop") {
        this.props.history.push(`/home/shopList/${shop.id}/setting`);
      }
    }
  }

  urlCheck(params, url) {
    const allRoute = url.split("/");
    const lastRoute = allRoute[allRoute.length - 1];

    if (params !== lastRoute) {
      const oldUrl = url.substring(0, url.lastIndexOf("/"));

      return oldUrl;
    } else {
      return url;
    }
  }

  jumpBack(key) {
    const { params } = this.props.match;

    switch (key) {
      case "shopList":
        this.props.history.push(`/home/shopList`);
        break;
      case "shop":
        this.props.history.push(`/home/shopList/${params.shopID}`);
        break;
    }
  }

  onClick = () => {
    if (this.state.innerHide.display === "block") {
      this.setState({ innerHide: { display: "none" } });
    } else {
      this.setState({ innerHide: { display: "block" } });
    }
  };

  handleRecord = async (actionName, shop) => {
    let { errorReturn } = this.props;

    if (shop.key && actionName !== "delete") {
      actionName = "update";
    }

    if (shop.dateJoined === null) {
      shop.dateJoined = moment();
    }

    const recordCheck = {
      l: shop.l,
      _lat: shop.l._lat,
      _long: shop.l._long,
      title: shop.title,
      displayTitle: shop.displayTitle,
      email: shop.email,
      phoneNumber: shop.phoneNumber,
      categories: shop.categories,
      dateJoined: shop.dateJoined,
      country: shop.address.country,
      state: shop.address.state,
      postcode: shop.address.postcode,
      line2: shop.address.line2,
      line1: shop.address.line1,
    };

    const defaultValidate = {
      l: { type: "geopoint" },
      _lat: { required: true, type: "latitude" },
      _long: { required: true, type: "longitude" },
      title: { required: true, type: "stringLength", max: 50 },
      displayTitle: { required: true },
      //email: { required: true, type: "email" },
      //phoneNumber: { required: true, type: "phone" },
      categories: { required: true },
      dateJoined: { required: true },
      country: { required: true },
      state: { required: true },
      postcode: { required: true, type: "postcode" },
      line2: { required: true },
      line1: { required: true },
    };

    if (shop.whatsapp) {
      recordCheck["whatsapp"] = shop.whatsapp;
      defaultValidate["whatsapp"] = { type: "phone" };
    }

    errorReturn = validation(recordCheck, defaultValidate);

    this.props.errorUpdate(errorReturn);

    if (errorReturn.errorNo === 0) {
      this.props.submitToBackend(shop, actionName);
    }
  };

  onRecordChange = ({ key, nestedKey }, event) => {
    let { shop } = clone(this.props);
    if (key && nestedKey) shop[key][nestedKey] = event.target.value;
    else if (key) shop[key] = event.target.value;

    this.props.update(shop);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { shop } = clone(this.props);
    // if (key === "categories") {
    //   shop["tags"] = [];
    // }
    if (key && nestedKey) shop[key][nestedKey] = value;
    else if (key) shop[key] = value;
    this.props.update(shop);
  };

  onDateChange({ key, nestedKey }, date, dateString) {
    let { shop } = clone(this.props);

    if (key && nestedKey) shop[key][nestedKey] = date;
    else if (key) shop[key] = date;

    this.props.update(shop);
  }

  onLocationCheckPress = (latitude, longitude) => {
    const location = {
      l: {
        _lat: latitude,
        _long: longitude,
      },
    };

    const errorReturn = validation(location, { l: "geopoint" });

    if (errorReturn.errorNo > 0) {
      notification("error", errorReturn.l);
      return;
    }

    window.open(`http://www.google.com/maps/place/${latitude},${longitude}`, "_blank");
  };

  onLocationChange(key, event) {
    let { shop } = clone(this.props);
    const value = event.target.value.trim();

    if (!isNaN(value)) {
      if (key === "latitude") {
        shop.l._lat = value;
        shop.g = geohashEncode(Number(shop.l._lat), Number(shop.l._long));
      }

      if (key === "longitude") {
        shop.l._long = value;
        shop.g = geohashEncode(Number(shop.l._lat), Number(shop.l._long));
      }
    }

    this.props.update(shop);
  }

  onOperatingClick(day) {
    let { shop } = clone(this.props);

    shop.operatingHour[day].operate = !shop.operatingHour[day].operate;

    this.props.update(shop);
  }

  // onOperatingChange(day, time, timeString) {
  //   let { shop } = clone(this.props);
  //   console.log(timeString)
  //   console.log(time)
  //  console.log(shop)
  //   shop.operatingHour[day].open = timeString[0].replace(":", "");
  //   shop.operatingHour[day].close = timeString[1].replace(":", "");

  //   this.props.update(shop);
  // }

  onTimeChange({ key, array, nestedKey }, time) {
    let { shop } = clone(this.props);
    if (key && nestedKey) {
      shop[key][array][nestedKey] = moment(time).format("HHmm");
    } else if (key) shop[key] = moment(time).format("HHmm");
    this.props.update(shop);
  }

  onUploadFile({ key = null, target = null }, { file = null }) {
    this.props.uploadFile({ key, shopId: target, file });
  }

  render() {
    const { url, params } = this.props.match;
    const {
      readSpecifiedRecordLoading,
      submitLoading,
      shop_categories,
      shop_tags,
      uploadKey,
      uploadLoading,
      uploadProgress,
      uploadResult,
      errorReturn,
    } = this.props;
    const optionUrl = this.urlCheck(params.shopID, url);

    const { shop } = clone(this.props);

    const malaysiaStates = statesList.map((state) => {
      return { data: state, label: state };
    });

    const allCountry = countriesList.map((country) => {
      return { data: country.country, label: country.country };
    });

    const shopCategories =
      shop_categories &&
      Object.values(shop_categories).map((categories) => {
        return { data: categories.id, label: categories.title };
      });

    function compare(a, b) {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    }

    shopCategories.sort(compare);

    let tagsOfShop = [];
    if (shop.categories.length !== 0) {
      shop.categories.forEach((category) => {
        let categoryName = shopCategories.find((cat) => cat.data === category).label;
        Object.values(shop_categories[category].tags).map((tag) => {
          tagsOfShop.push({ data: tag, label: shop_tags[tag].title + " (" + categoryName + ") " });
        });
      });
    }
    //console.log("shoptags: " + JSON.stringify(shop.tags));
    return (
      <ScreenHolder>
        <InnerSidebar
          url={optionUrl}
          urlID={params.shopID ? "shop" : "shopList"}
          optionControl={params.shopID ? "shop" : "shopList"}
          displayStatus={this.state.innerHide}
        />
        <ContentBox
          title={
            <Bcrumb separator="/">
              <BcrumbItem onClick={this.jumpBack.bind(this, "shopList")}>Shops</BcrumbItem>
              {params.shopID && <BcrumbItem>Shop</BcrumbItem>}
            </Bcrumb>
          }
          onClick={this.onClick.bind(this)}
        >
          <Form
            loading={readSpecifiedRecordLoading}
            dataSource={shop}
            errorReturn={errorReturn}
            onRecordChange={this.onRecordChange.bind(this)}
            onSelectChange={this.onSelectChange.bind(this)}
            onDateChange={this.onDateChange.bind(this)}
            onLocationChange={this.onLocationChange.bind(this)}
            //onOperatingChange={this.onOperatingChange.bind(this)}
            onTimeChange={this.onTimeChange.bind(this)}
            onLocationCheckPress={this.onLocationCheckPress.bind(this)}
            onOperatingClick={this.onOperatingClick.bind(this)}
            onUploadFile={this.onUploadFile.bind(this)}
            onSubmit={
              shop.id
                ? this.handleRecord.bind(this, "update", shop)
                : this.handleRecord.bind(this, "insert", shop)
            }
            onSubmitLoading={submitLoading}
            onDelete={this.handleRecord.bind(this, "delete", shop)}
            onDeleteLoading={submitLoading}
            uploadKey={uploadKey}
            uploadLoading={uploadLoading}
            uploadProgress={uploadProgress}
            uploadResult={uploadResult}
            malaysiaStates={malaysiaStates}
            allCountry={allCountry}
            days={days}
            shopCategories={shopCategories}
            tagsOfShop={tagsOfShop}
          />
        </ContentBox>
      </ScreenHolder>
    );
  }
}

const mapStatetoprops = (state) => {
  const shop_tags = state.ShopTags.tags;
  const shop_categories = state.ShopCategories.categories;

  return {
    ...state.Shops,
    shop_tags,
    shop_categories,
  };
};

export default connect(mapStatetoprops, actions)(ShopForm);
