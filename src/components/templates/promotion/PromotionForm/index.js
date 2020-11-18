import React from "react";
import {
  AntdIcon,
} from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  ButtonFieldsetStyle,
  ButtonStyle,
  UploadStyle,
  errorStyle
} from "./styles";

export default ({
  loading,
  dataSource,
  errorReturn,
  onRecordChange,
  onSelectChange,
  onDateChange,
  onUploadFile,
  onSubmit,
  onSubmitLoading,
  onDelete,
  onDeleteLoading,
  uploadKey,
  uploadLoading,
  uploadProgress,
  uploadResult,
}) => {

  const formItem = [
    [
      {
        type: "text",
        label: "Title *: (maximum 30 character)",
        placeholder: "Enter The Promotion Name",
        data: dataSource.title,
        onChange: onRecordChange.bind(this, { key: "title" }),
        InputStyle: errorReturn.title ? errorStyle.inputStyle : null,
        iconRigth: errorReturn.title ? (
          <AntdIcon.CloseCircleFilled style={{ color: "red" }} />
        ) : null
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.title ? "*" + errorReturn.title : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.title ? false : true
      }
    ],
    [
        {
          type: "label",
          label: "Promotion Period *:",
          FieldsetStyle: { flex: 0.5 }
        },
        {
          type: "dateRange",
          data: [dataSource.startTime, dataSource.endTime],
          placeholder: ["Start Time", "End Time"],
          showTime: true,
          onChange: onDateChange.bind(this, {
            key: "startTime",
            secondKey: "endTime"
          }),
          disabled: dataSource.started.at,
          FieldsetStyle: { flex: 0.985 },
          DatePickerStyle: (errorReturn.startTime || errorReturn.endTime) && errorStyle.inputStyle,
          iconRigth: (errorReturn.startTime || errorReturn.endTime) && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
        }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.startTime ? "* promotion period cannot be empty" : errorReturn.endTime && "* end time must after current time",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.startTime ? false : true
      }
    ],
    [
      {
        type: "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, { key: "coverPhotos", target: dataSource.id }),
        uploadLoading : uploadLoading,
        uploadProgress : uploadProgress,
        uploadResult: uploadResult,
        onChange : onSelectChange.bind(this,{ key: "coverPhotos" }),
        defaultFileList : dataSource.coverPhotos,
        maxFiles: 1,
        label: "Cover Photos (800 x 600)",
        disabled: uploadKey && uploadKey !== "coverPhotos",
        UploadStyle: UploadStyle
      }
    ], 
    [
      {
        type: "errorlabel",
        label: errorReturn.coverPhotos ? "*" + errorReturn.coverPhotos : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.coverPhotos ? false : true
      }
    ],
    [
      {
        type: "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, { key: "images", target: dataSource.id }),
        uploadLoading : uploadLoading,
        uploadProgress : uploadProgress,
        uploadResult: uploadResult,
        onChange : onSelectChange.bind(this,{ key: "images" }),
        defaultFileList : dataSource.images,
        maxFiles: 10,
        label: "Images (1080 x 1900)",
        disabled: uploadKey && uploadKey !== "images" ,
        UploadStyle: UploadStyle
      }
    ],
    [
      {
        type: "errorlabel",
        label: "*Content must be centered",
        FieldsetStyle: errorStyle.fieldsetStyle2,
        LabelStyle: errorStyle.labelStyle2
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.images ? "*" + errorReturn.images : "",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.images ? false : errorReturn.images ? false : true
      }
    ],
    [
      {
        type: dataSource.id && "confirmButton",
        title : "Are you sure to delete the Promotion?",
        okText: "Yes",
        onConfirm : onDelete,
        loading: onDeleteLoading,
        cancelText: "No",
        buttonText: "Delete",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle
      }
    ],
  ];

  return (
      <Form
        loading={loading}
        formItem={formItem}
        onSubmit={onSubmit}
        onSubmitLoading={onSubmitLoading}
        submitFieldStyle={ButtonFieldsetStyle}
        submitButtonStyle={ButtonStyle}
      />
  );
};
