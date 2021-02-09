import React from "react";
import {
  AntdIcon,
} from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  ButtonFieldsetStyle,
  ButtonStyle,
  UploadStyle,
  TextAreaStyle,
  errorStyle
} from "./styles";

export default ({
  loading,
  dataSource,
  errorReturn,
  onRecordChange,
  onTextEditorChange,
  // onUploadFile,
  onSubmit,
  onSubmitLoading,
  onDelete,
  onDeleteLoading,
  onUploadFile,
  onSelectChange,
  onDateChange,
  uploadKey,
  uploadLoading,
  uploadProgress,
  uploadResult,
}) => {

  if (dataSource.coverPhoto === undefined) {
    dataSource.coverPhoto = []
  }

  const formItem = [
    [
      {
        type: "text",
        label: "Title *: (maximum 30 character)",
        placeholder: "Enter title",
        data: dataSource.title,
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
   /*  [
      {
        type: "textArea",
        label: "Description *: ",
        placeholder: "Enter description",
        data: dataSource.description,
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
    ],
    [
      {
        type: dataSource.id && "confirmButton",
        title : "Are you sure to delete this Post ?",
        okText: "Yes",
        onConfirm : onDelete,
        loading: onDeleteLoading,
        cancelText: "No",
        buttonText: "Delete",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle
      }
    ], */
    [
      {
        type: "textEditor",
        label: "Description *: ",
        placeholder: "Enter description",
        data: dataSource.description,
        onChange: onTextEditorChange.bind(this, { key: "description" }),
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
    ],
    [
      {
        type: "label",
        label: "Post Period *:",
        FieldsetStyle: { flex: 0.5, marginTop: 50 }
      },
      {
        type: "dateRange",
        data: [dataSource.startTime, dataSource.endTime],
        placeholder: ["Start Date", "End Date"],
        showTime: false,
        onChange: onDateChange.bind(this, {
          key: "startTime",
          secondKey: "endTime"
        }),
        //disabled: dataSource.started.at && dataSource.started.at,
        FieldsetStyle: { flex: 0.985, marginTop: 50 },
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
        type: dataSource.id && "horizontalLine",
      },
    ],
    [
      {
        type: dataSource.id && "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, { key: "coverPhoto", target: dataSource.id }),
        uploadLoading: uploadLoading,
        uploadProgress: uploadProgress,
        uploadResult: uploadResult,
        onChange: onSelectChange.bind(this, { key: "coverPhoto" }),
        defaultFileList: dataSource.coverPhoto,
        maxFiles: 1,
        label: "Cover Photo (800 x 600)",
        disabled: uploadKey && uploadKey !== "coverPhoto",
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
        maxFiles: 20,
        label: "Images (800 x 600)",
        disabled: uploadKey && uploadKey !== "images",
        UploadStyle: UploadStyle,
      },
    ],
    [
      {
        type: dataSource.id && "confirmButton",
        title : "Are you sure to delete this Post ?",
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
        TextAreaStyle={TextAreaStyle}
      />
  );
};
