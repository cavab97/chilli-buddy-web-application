import React from "react";
import { AntdIcon } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";
import moment from "moment";

import {
  ButtonFieldsetStyle,
  ButtonStyle,
  UploadStyle,
  SelectStyle,
  TextAreaStyle,
  OperatingButtonStyle,
  DatePickerFieldSetStyle,
  errorStyle,
} from "./styles";

export default ({
  loading,
  dataSource,
  errorReturn,
  onRecordChange,
  onSelectChange,
  onDateChange,
  onLocationChange,
  //onOperatingChange,
  onTimeChange,
  onLocationCheckPress,
  onOperatingClick,
  onUploadFile,
  onSubmit,
  onSubmitLoading,
  onDelete,
  onDeleteLoading,
  uploadKey,
  uploadLoading,
  uploadProgress,
  uploadResult,
  malaysiaStates,
  allCountry,
  days,
  shopCategories,
  tagsOfShop,
}) => {
  const formItem = [
    [
      {
        type: "text",
        label: "Title *: (maximum 50 characters)",
        placeholder: "Enter The Name Display To Merchant",
        data: dataSource.title,
        onChange: onRecordChange.bind(this, { key: "title" }),
        InputStyle: errorReturn.title ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.title ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.title ? "*" + errorReturn.title : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.title ? false : true,
      },
    ],
    /* [
      {
        type: "text",
        label: "Subtitle *:",
        placeholder: "Enter The Subtitle",
        data: dataSource.subtitle,
        onChange: onRecordChange.bind(this, { key: "subtitle" }),
        InputStyle: errorReturn.subtitle ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.subtitle ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null
      }
    ], 
    [
      {
        type: "label",
        label: errorReturn.subtitle ? "*" + errorReturn.subtitle : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.subtitle ? false : true
      }
    ], */
    [
      {
        type: "text",
        label: "Business Name *:",
        placeholder: "Enter Business Name",
        data: dataSource.displayTitle,
        onChange: onRecordChange.bind(this, { key: "displayTitle" }),
        InputStyle: errorReturn.displayTitle ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.displayTitle ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.displayTitle ? "*Business Name cannot be empty" : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.displayTitle ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Business Email:",
        placeholder: "Enter Business Email",
        data: dataSource.email,
        onChange: onRecordChange.bind(this, { key: "email" }),
        InputStyle: errorReturn.email ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.email ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.email ? "*" + errorReturn.email : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.email ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Business Phone No:",
        placeholder: "Enter Business Phone",
        data: dataSource.phoneNumber,
        onChange: onRecordChange.bind(this, { key: "phoneNumber" }),
        InputStyle: errorReturn.phoneNumber ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.phoneNumber ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.phoneNumber ? "*" + errorReturn.phoneNumber : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.phoneNumber ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Business Facebook:",
        placeholder: "Enter Business Facebook",
        data: dataSource.facebookUrl,
        onChange: onRecordChange.bind(this, { key: "facebookUrl" }),
      },
    ],
    [
      {
        type: "text",
        label: "Business Instagram(User Name):",
        placeholder: "Enter Business Instagram (User Name)",
        data: dataSource.instagramUrl,
        onChange: onRecordChange.bind(this, { key: "instagramUrl" }),
      },
    ],
    [
      {
        type: "text",
        label: "Business Whatsapp:",
        placeholder: "Enter Business Whatsapp (60123456789)",
        data: dataSource.whatsapp,
        onChange: onRecordChange.bind(this, { key: "whatsapp" }),
        InputStyle: errorReturn.whatsapp ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.whatsapp ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.whatsapp ? "*" + errorReturn.whatsapp : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.whatsapp ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Business Website:",
        placeholder: "Enter Business Website",
        data: dataSource.websiteUrl,
        onChange: onRecordChange.bind(this, { key: "websiteUrl" }),
      },
    ],
    [
      {
        type: "select",
        label: "Categories *:",
        placeholder: "Select Categories",
        data: dataSource.categories,
        option: shopCategories,
        mode: "multiple",
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        onChange: (value) => {
          onSelectChange({ key: "categories" }, value);
        },
        SelectStyle: errorReturn.categories && errorStyle.inputStyle,
        iconRigth: errorReturn.categories ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.categories ? "*" + errorReturn.categories : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.categories ? false : true,
      },
    ],
    [
      {
        type: "select",
        label: "Tags:",
        placeholder: "Tags",
        data: dataSource.tags,
        mode: "multiple",
        option: tagsOfShop,
        optionTitle: "label",
        optionValue: "data",
        onChange: onSelectChange.bind(this, { key: "tags" }),
        //SelectStyle: multipleSelectStyle
      },
    ],
    [
      {
        type: "textArea",
        label: "Description :",
        placeholder: "Enter Shop Description",
        data: dataSource.description,
        autoSize: { minRows: 4, maxRows: 4 },
        onChange: onRecordChange.bind(this, { key: "description" }),
      },
    ],
    [
      {
        type: "horizontalLine",
      },
    ],
    [
      {
        type: "title",
        title: "Location",
      },
    ],
    [
      {
        type: "text",
        label: "Latitude *:",
        placeholder: "Enter Shop Latitude",
        data: dataSource.l._lat,
        InputStyle: errorReturn.l || errorReturn._lat ? errorStyle.inputStyle : null,
        iconRigth:
          errorReturn.l || errorReturn._lat ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        onChange: onLocationChange.bind(this, "latitude"),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.l ? errorReturn.l : errorReturn._lat ? "*" + errorReturn._lat : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.l || errorReturn._lat ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Longitude *:",
        placeholder: "Enter Shop Longitude",
        data: dataSource.l._long,
        InputStyle: errorReturn.l || errorReturn._long ? errorStyle.inputStyle : null,
        iconRigth:
          errorReturn.l || errorReturn._long ? (
            <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
          ) : null,
        onChange: onLocationChange.bind(this, "longitude"),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.l ? errorReturn.l : errorReturn._long ? "*" + errorReturn._long : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.l || errorReturn._long ? false : true,
      },
    ],
    [
      {
        type: "button",
        label: "Check Location",
        onClick: onLocationCheckPress.bind(this, dataSource.l._lat, dataSource.l._long),
        buttonType: "primary",
        FieldsetStyle: ButtonFieldsetStyle,
      },
    ],
    [
      {
        type: "horizontalLine",
      },
    ],
    [
      {
        type: "title",
        title: "Address",
      },
    ],
    [
      {
        type: "text",
        label: "Line 1 *:",
        placeholder: "Enter shop Address line 1",
        data: dataSource.address.line1,
        onChange: onRecordChange.bind(this, {
          key: "address",
          nestedKey: "line1",
        }),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.line1 ? "*" + errorReturn.line1 : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.line1 ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Line 2 *:",
        placeholder: "Enter shop Address line 2",
        data: dataSource.address.line2,
        onChange: onRecordChange.bind(this, {
          key: "address",
          nestedKey: "line2",
        }),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.line2 ? "*" + errorReturn.line2 : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.line2 ? false : true,
      },
    ],
    [
      {
        type: "text",
        label: "Postcode *:",
        placeholder: "Enter shop Postcode",
        data: dataSource.address.postcode,
        onChange: onRecordChange.bind(this, {
          key: "address",
          nestedKey: "postcode",
        }),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.postcode ? "*" + errorReturn.postcode : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.postcode ? false : true,
      },
    ],
    [
      {
        type: "select",
        label: "States *:",
        placeholder: "Enter shop Address, states",
        data: dataSource.address.state,
        option: malaysiaStates,
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        onChange: onSelectChange.bind(this, {
          key: "address",
          nestedKey: "state",
        }),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.state ? "*" + errorReturn.state : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.state ? false : true,
      },
    ],
    [
      {
        type: "select",
        label: "Country *:",
        placeholder: "Enter shop Address, country",
        data: dataSource.address.country,
        option: allCountry,
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        onChange: onSelectChange.bind(this, {
          key: "address",
          nestedKey: "country",
        }),
      },
    ],
    [
      {
        type: "label",
        label: errorReturn.country ? "*" + errorReturn.country : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.country ? false : true,
      },
    ],
    [
      {
        type: "label",
        label: "Date Joined:",
      },
      {
        type: "datePicker",
        data: dataSource.dateJoined !== null ? dataSource.dateJoined : moment(),
        placeholder: "Join date",
        defaultValue: moment(),
        FieldsetStyle: DatePickerFieldSetStyle,
        onChange: onDateChange.bind(this, {
          key: "dateJoined",
        }),
      },
    ],
    [
      {
        type: "horizontalLine",
      },
    ],
    [
      {
        type: "title",
        title: "Operating Hour",
      },
    ],
    ...days.map((day, index) => {
      return [
        // {
        //   type: "timeRange",
        //   label: day,
        //   format: "HH:mm",
        //   data: [
        //     moment(dataSource.operatingHour[index].open, "HHmm"),
        //     moment(dataSource.operatingHour[index].close, "HHmm")
        //   ],
        //   onChange: onOperatingChange.bind(this, index),
        //   allowClear: false,
        //   disabled: !dataSource.operatingHour[index].operate,
        // },
        {
          type: "timePicker",
          label: day,
          format: "HH:mm",
          data: moment(dataSource.operatingHour[index].open, "HHmm"),
          onSelect: onTimeChange.bind(this, {
            key: "operatingHour",
            array: index,
            nestedKey: "open",
          }),
          allowClear: false,
          showNow: false,
          disabled: !dataSource.operatingHour[index].operate,
        },
        {
          type: "timePicker2",
          format: "HH:mm",
          data: moment(dataSource.operatingHour[index].close, "HHmm"),
          onSelect: onTimeChange.bind(this, {
            key: "operatingHour",
            array: index,
            nestedKey: "close",
          }),
          allowClear: false,
          showNow: false,
          disabled: !dataSource.operatingHour[index].operate,
        },
        {
          type: "button",
          label: dataSource.operatingHour[index].operate ? "close" : "open",
          buttonType: dataSource.operatingHour[index].operate ? "default" : "primary",
          onClick: onOperatingClick.bind(this, index),
          FieldsetStyle: OperatingButtonStyle,
        },
      ];
    }),
    [
      {
        type: dataSource.id && "horizontalLine",
      },
    ],
    [
      {
        type: dataSource.id && "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, { key: "logo", target: dataSource.id }),
        uploadLoading: uploadLoading,
        uploadProgress: uploadProgress,
        uploadResult: uploadResult,
        onChange: onSelectChange.bind(this, { key: "logo" }),
        defaultFileList: dataSource.logo,
        maxFiles: 1,
        label: "Logo (800 x 600)",
        disabled: uploadKey && uploadKey !== "logo",
        UploadStyle: UploadStyle,
      },
    ],
    [
      {
        type: dataSource.id && "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, { key: "images", target: dataSource.id }),
        uploadLoading: uploadLoading,
        uploadProgress: uploadProgress,
        uploadResult: uploadResult,
        onChange: onSelectChange.bind(this, { key: "images" }),
        defaultFileList: dataSource.images,
        maxFiles: 7,
        label: "Images (800 x 600)",
        disabled: uploadKey && uploadKey !== "images",
        UploadStyle: UploadStyle,
      },
    ],
    [
      {
        type: "horizontalLine",
      },
    ],
    [
      {
        type: dataSource.id && "confirmButton",
        title: "Are you sure to delete this Shop?",
        okText: "Yes",
        onConfirm: onDelete,
        loading: onDeleteLoading,
        cancelText: "No",
        buttonText: "Delete",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle,
      },
    ],
  ];

  return (
    <Form
      loading={loading}
      formItem={formItem}
      onSubmit={onSubmit}
      onSubmitLoading={onSubmitLoading}
      SelectStyle={SelectStyle}
      TextAreaStyle={TextAreaStyle}
      submitFieldStyle={ButtonFieldsetStyle}
      submitButtonStyle={ButtonStyle}
    />
  );
};
