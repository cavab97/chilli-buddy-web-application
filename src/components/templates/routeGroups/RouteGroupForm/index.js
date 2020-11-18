import React from "react";
import {
  AntdIcon,
} from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  SubtitleLabelStyle,
  ButtonFieldsetStyle,
  ButtonStyle,
  SelectStyle,
  InputStyle,
  UploadStyle,
  TextAreaStyle,
  errorStyle
} from "./styles";

const countriesList = require("assets/address/countries.json");
const statesList = require("assets/address/Malaysia/states.json");

export default ({
  loading,
  onSubmit,
  onSubmitLoading,
  onDelete,
  onDeleteLoading,
  dataSource,
  onRecordChange,
  onSelectChange,
  errorReturn,
  onLocationChange,
  onLocationCheckPress,
  onUploadFile,
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey
}) => {

  const malaysiaStates = statesList.map(state => {
    return { data: state, label: state };
  });

  const allCountry = countriesList.map(country => {
    return { data: country.country, label: country.country };
  });

  const formItem = [
    [
      {
        type: "text",
        label: "Title *: (maximum 30 character)",
        data: dataSource.title,
        placeholder: "Enter title",
        onChange: onRecordChange.bind(this, { key: "title" }),
        InputStyle: errorReturn.title && errorStyle.inputStyle,
        iconRigth: errorReturn.title && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.title && "* " + errorReturn.title,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.title ? false : true
      }
    ],
    /* [
      {
        type: "text",
        label: "Subtitle *:",
        data: dataSource.subtitle,
        placeholder: "Enter subtitle",
        onChange: onRecordChange.bind(this, { key: "subtitle" }),
        InputStyle: errorReturn.subtitle && errorStyle.inputStyle,
        iconRigth: errorReturn.subtitle && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.subtitle && "* " + errorReturn.subtitle,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.subtitle ? false : true
      }
    ], */
    /* [
      {
        type: "textArea",
        label: "Description :",
        data: dataSource.description,
        placeholder: "Enter description",
        onChange: onRecordChange.bind(this, { key: "description" }),
        TextAreaStyle: errorReturn.description && errorStyle.textareaStyle,
        iconRigth: errorReturn.description && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.description && "* " + errorReturn.description,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.description ? false : true
      }
    ], */
    /* [
      {
        type: "horizontalLine"
      }
    ],
    [
      {
        type: "label",
        label: "Location",
        LabelStyle: SubtitleLabelStyle,
      }
    ],
    [
      {
        type: "text",
        label: "Latitude *:",
        placeholder: "Enter Route Group Latitude",
        data: dataSource.l._lat,
        InputStyle: (errorReturn.l || errorReturn._lat) ? errorStyle.inputStyle : null,
        iconRigth: (errorReturn.l || errorReturn._lat) ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
        onChange: onLocationChange.bind(this, "latitude")
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.l ? errorReturn.l : errorReturn._lat ? "* " + errorReturn._lat : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: (errorReturn.l || errorReturn._lat) ? false : true
      }
    ],
    [
      {
        type: "text",
        label: "Longitude *:",
        placeholder: "Enter Route Group Longitude",
        data: dataSource.l._long,
        InputStyle: (errorReturn.l || errorReturn._long) ? errorStyle.inputStyle : null,
        iconRigth: (errorReturn.l || errorReturn._long) ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null,
        onChange: onLocationChange.bind(this, "longitude")
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.l ? errorReturn.l : errorReturn._long ? "* " + errorReturn._long : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: (errorReturn.l || errorReturn._long) ? false : true
      }
    ],
    [
      {
        type: "button",
        label: "Check Location",
        onClick: onLocationCheckPress.bind(
          this,
          dataSource.l._lat,
          dataSource.l._long
        ),
        buttonType: "primary",
        FieldsetStyle: ButtonFieldsetStyle,
      }
    ],
    [
      {
        type: "horizontalLine"
      }
    ],
    [
      {
        type: "label",
        label: "Address",
        LabelStyle: SubtitleLabelStyle,
      }
    ],
    [
      {
        type: "text",
        label: "Line 1:",
        placeholder: "Enter shop Address line 1",
        data: dataSource.address.line1,
        onChange: onRecordChange.bind(this, {
          key: "address",
          nestedKey: "line1"
        })
      }
    ],
    [
      {
        type: "text",
        label: "Line 2:",
        placeholder: "Enter shop Address line 2",
        data: dataSource.address.line2,
        onChange: onRecordChange.bind(this, {
          key: "address",
          nestedKey: "line2"
        })
      }
    ],
    [
      {
        type: "text",
        label: "Postcode:",
        placeholder: "Enter shop Postcode",
        data: dataSource.address.postcode,
        onChange: onRecordChange.bind(this, {
          key: "address",
          nestedKey: "postcode"
        }),
        InputStyle: errorReturn.postcode && errorStyle.inputStyle,
        iconRigth: errorReturn.postcode && <AntdIcon.CloseCircleFilled style={{ color: "red" }} />,
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.postcode ? "* " + errorReturn.postcode : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.postcode ? false : true
      }
    ],
    [
      {
        type: "select",
        label: "States:",
        placeholder: "Enter shop Address, states",
        data: dataSource.address.state ? dataSource.address.state : undefined,
        option: malaysiaStates,
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        onChange: onSelectChange.bind(this, {
          key: "address",
          nestedKey: "state"
        })
      }
    ],
    [
      {
        type: "select",
        label: "Country:",
        placeholder: "Enter shop Address, country",
        data: dataSource.address.country ? dataSource.address.country : undefined,
        option: allCountry,
        optionTitle: "label",
        optionValue: "data",
        showSearch: true,
        onChange: onSelectChange.bind(this, {
          key: "address",
          nestedKey: "country"
        })
      }
    ],
    [
      {
        type: dataSource.id && "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this,{
          key: "images",
          target: dataSource.id
        }),
        uploadLoading: uploadLoading,
        uploadProgress: uploadProgress,
        uploadResult: uploadResult,
        onChange: onSelectChange.bind(this,{ key: "images" }),
        defaultFileList: dataSource.images,
        maxFiles: 4,
        label: "Images",
        disabled: uploadKey && uploadKey !== "images",
        UploadStyle: UploadStyle
      }
    ], */
    [
      {
        type: dataSource.id && "confirmButton",
        title : "Are you sure to delete the Route?",
        okText: "Yes",
        onConfirm : onDelete,
        loading: onDeleteLoading,
        cancelText: "No",
        buttonText: "Delete",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle
      }
    ]
  ];

  return (
      <Form
        loading={loading}
        formItem={formItem}
        onSubmit={onSubmit}
        onSubmitLoading={onSubmitLoading}
        SelectStyle={SelectStyle}
        InputStyle={InputStyle}
        TextAreaStyle={TextAreaStyle}
        submitFieldStyle={ButtonFieldsetStyle}
        submitButtonStyle={ButtonStyle}
      />
  );
};
