import React from "react";
import { AntdIcon } from "marslab-library-react/components/atoms";
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
  dataSource,
  onSubmit,
  onSubmitLoading,
  onClaim,
  onClaimLoading,
  onDelete,
  onDeleteLoading,
  onRecordChange,
  onSelectChange,
  errorReturn,
  onUploadFile,
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey,
  rewardQuantity,
  onQuantityChange
}) => {

  const formItem = [
    [
      {
        type: "text",
        label: "Rank *:",
        data: dataSource.rank,
        placeholder: "Enter Rank",
        inputType : "number",
        disabled: dataSource.id ? true : false,
        onChange: onRecordChange.bind(this, { key: "rank" }),
        InputStyle: errorReturn.rank && errorStyle.inputStyle,
        iconRigth: errorReturn.rank && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.rank && "* " + errorReturn.rank,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.rank ? false : true
      }
    ],
    [
      {
        type: "text",
        label: "Title *: (maximum 30 character)",
        data: dataSource.title,
        placeholder: "Enter Title",
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
    [
      {
        type: !dataSource.id && "text",
        label: "Quantity (maximum 70):",
        data: rewardQuantity,
        inputType: "number",
        placeholder: "Enter Quantity",
        onChange: onQuantityChange.bind(this),
        InputStyle: errorReturn.quantity && errorStyle.inputStyle,
        iconRigth: errorReturn.quantity && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.quantity && "* " + errorReturn.quantity,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.quantity ? false : true
      }
    ],
    /* [
      {
        type: "text",
        label: "Subtitle *:",
        data: dataSource.subtitle,
        placeholder: "Enter Subtitle",
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
        label: "Description :",
        data: dataSource.description,
        placeholder: "Enter Description",
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
        maxFiles: 1,
        label: "Images (800 x 600)",
        disabled: uploadKey && uploadKey !== "images",
        UploadStyle: UploadStyle
      }
    ],
    [
      {
        type: dataSource.id && "confirmButton",
        title : "Are you sure to delete the Reward?",
        okText: "Yes",
        onConfirm : onDelete,
        loading: onDeleteLoading,
        cancelText: "No",
        buttonText: "Delete",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle
      }
    ],
    [
      {
        type: dataSource.obtained.at && "confirmButton",
        title : "Are you sure to claim this reward?",
        okText: "Yes",
        onConfirm : onClaim,
        loading: onClaimLoading,
        cancelText: "No",
        buttonText: "Claim",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle,
        hide: dataSource.claimed.at ? true : false,
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
