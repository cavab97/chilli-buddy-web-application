import React from "react";
import {
  AntdIcon,
} from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  ButtonFieldsetStyle,
  ButtonStyle,
  SelectStyle,
  InputStyle,
  UploadStyle,
  TextAreaStyle,
  errorStyle
} from "./styles";

export default ({
  loading,
  onSubmit,
  onSubmitLoading,
  onDelete,
  onDeleteLoading,
  dataSource,
  route,
  onRecordChange,
  onSelectChange,
  shopList,
  shopLoading,
  errorReturn,
  onUploadFile,
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey,
  routeCategory
}) => {

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
    ],
    [
      {
        type: "textArea",
        label: "Description : ",
        data: dataSource.description,
        placeholder: "Enter description",
        onChange: onRecordChange.bind(this, { key: "description" }),
        TextAreaStyle: errorReturn.description && errorStyle.textareaStyle,
        iconRigth: errorReturn.description && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ], */
    [
      {
        type: "select",
        label: "Shop *:",
        option: shopList,
        showSearch: true,
        placeholder: "Enter shop",
        data: dataSource.shopIds[0],
        loading: shopLoading,
        optionTitle: "title",
        optionValue: "id",
        disabled: dataSource.id,
        onChange: (value)=> onSelectChange({ key: "shopIds" },[value]),
        InputStyle: errorReturn.shopIds && errorStyle.inputStyle,
        iconRigth: errorReturn.shopIds && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.shopIds && "* " + errorReturn.shopIds,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.shopIds ? false : true
      }
    ],
    [   
        {
          type: "text",
          label: "Minimum Spend (RM) *:",
          data: dataSource.minSpend,
          placeholder: "Enter Minimum Spend",
          onChange: onRecordChange.bind(this, { key: "minSpend" }),
          InputStyle: errorReturn.minSpend && errorStyle.inputStyle,
          iconRigth: errorReturn.minSpend && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>,
          hide: routeCategory=="CheckIn"? true : false
        }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.minSpend && "* " + errorReturn.minSpend,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.minSpend ? false : true
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
        label: "Images (800 x 600)",
        disabled: uploadKey && uploadKey !== "images",
        UploadStyle: UploadStyle
      }
    ],
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
