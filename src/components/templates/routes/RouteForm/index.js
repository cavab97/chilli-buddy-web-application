import React from "react";
import { AntdIcon } from "marslab-library-react/components/atoms";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  ButtonFieldsetStyle,
  ButtonStyle,
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
  onPublish,
  onPublishLoading,
  onTerminate,
  onTerminateLoading,
  dataSource,
  routeType,
  routeCategory,
  stationType,
  onRecordChange,
  onSelectChange,
  onDateChange,
  errorReturn,
  onUploadFile,
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey
}) => {

  const formItem = [
    [
        {
          type: "select",
          label: "Type *:",
          placeholder: "Enter type",
          data: dataSource.type ? dataSource.type : undefined,
          option: routeType,
          optionTitle: "label",
          optionValue: "data",
          disabled: dataSource.id,
          onChange: onSelectChange.bind(this, { key: "type" }),
          SelectStyle: errorReturn.type && errorStyle.inputStyle,
          iconRigth: errorReturn.type && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
        }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.type && "* " + errorReturn.type,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.type ? false : true
      }
    ],
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
    /* [
      {
        type: "text",
        label: "Subtitle *:",
        placeholder: "Enter subtitle",
        data: dataSource.subtitle,
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
        label: "Description: ",
        placeholder: "Enter description",
        data: dataSource.description,
        onChange: onRecordChange.bind(this, { key: "description" }),
        TextAreaStyle: errorReturn.description && errorStyle.textareaStyle,
        iconRigth: errorReturn.description && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ], */
    [
        {
          type: "textArea",
          label: "Rules:",
          placeholder: "Enter rules",
          data: dataSource.rules,
          TextAreaStyle: { flex: 0.975 },
          onChange: onRecordChange.bind(this, { key: "rules" })
        }
    ],
    [
        {
          type: "textArea",
          label: "Terms:",
          placeholder: "Enter terms",
          data: dataSource.terms,
          TextAreaStyle: { flex: 0.975 },
          onChange: onRecordChange.bind(this, { key: "terms" })
        }
    ],
    [
      {
        type: "select",
        label: "Category *:",
        placeholder: "Enter category",
        data: dataSource.category ? dataSource.category : undefined,
        option: routeCategory,
        optionTitle: "label",
        optionValue: "data",
        disabled: dataSource.id,
        onChange: onSelectChange.bind(this, { key: "category" }),
        //SelectStyle: errorReturn.category && errorStyle.inputStyle,
        //iconRigth: errorReturn.category && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
    {
      type: "errorlabel",
      label: errorReturn.category && "* " + errorReturn.category,
      FieldsetStyle: errorStyle.fieldsetStyle,
      LabelStyle: errorStyle.labelStyle,
      hide: errorReturn.category ? false : true
    }
    ],
    [
      {
        type: "select",
        label: "Station type *:",
        placeholder: "Enter station type",
        option: stationType,
        optionTitle: "label",
        optionValue: "data",
        data: dataSource.station,
        disabled: dataSource.id,
        onChange: onSelectChange.bind(this, { key: "station" })
      }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.station && "* " + errorReturn.station,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.station ? false : true
      }
    ],
    [
        {
          type: "label",
          label: "Event Period *:",
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
          disabled: dataSource.published.at,
          FieldsetStyle: { flex: 0.985 },
          DatePickerStyle: (errorReturn.startTime || errorReturn.endTime) && errorStyle.inputStyle,
          iconRigth: (errorReturn.startTime || errorReturn.endTime) && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
        }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.startTime ? "* event period cannot be empty" : errorReturn.endTime && "* end time must after current time",
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.startTime ? false : errorReturn.endTime ? false : true
      }
    ],
    [
        {
          type: "text",
          label: "Minimum User:",
          data: dataSource.type === "Luxury" ? dataSource.minimumUser : 0,
          inputType : "number",
          disabled: (dataSource.type === "Casual" || dataSource.id),
          onChange: onRecordChange.bind(this, { key: "minimumUser" }),
          InputStyle: errorReturn.minimumUser && errorStyle.inputStyle,
          iconRigth: errorReturn.minimumUser && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
        }
    ],
    [
      {
        type: "errorlabel",
        label: errorReturn.minimumUser && "* "+ errorReturn.minimumUser,
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.minimumUser ? false : true
      }
    ],
    [
      {
        type: dataSource.id && "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this,{ target: dataSource.id
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
        title : "Are you sure to delete the Route?",
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
        type: dataSource.id && !dataSource.published.by && "confirmButton",
        title : "Are you sure to publish the Route?",
        okText: "Yes",
        onConfirm : onPublish,
        loading: onPublishLoading,
        cancelText: "No",
        buttonText: "Publish",
        FieldsetStyle: ButtonFieldsetStyle,
        ButtonStyle: ButtonStyle
      }
    ],
    [
      {
        type: dataSource.id && dataSource.published.by && !dataSource.terminated.by && "confirmButton",
        title : "Are you sure to terminate the Route?",
        okText: "Yes",
        onConfirm : onTerminate,
        loading: onTerminateLoading,
        cancelText: "No",
        buttonText: "Terminate",
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
        InputStyle={InputStyle}
        TextAreaStyle={TextAreaStyle}
        submitFieldStyle={ButtonFieldsetStyle}
        submitButtonStyle={ButtonStyle}
      />
  );
};
