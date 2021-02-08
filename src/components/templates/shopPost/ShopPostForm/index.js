import React from "react";
import {
  AntdIcon,
} from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  ButtonFieldsetStyle,
  ButtonStyle,
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
  // uploadKey,
  // uploadLoading,
  // uploadProgress,
  // uploadResult,
}) => {

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
