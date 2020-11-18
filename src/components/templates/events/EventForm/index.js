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
  onRecordChange,
  onDateChange,
  onSelectChange,
  onUploadFile,
  errorReturn,  
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey,
  onPublish,
  onPublishLoading,
  onTerminate,
  onTerminateLoading,
}) => {


  const formItem = [
    [
      {
        type: "text",
        label: "Title *: (maximum 30 character)",
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
    ], */
    [
      {
          type: "label",
          label: "Lucky Draw Date *:",
          FieldsetStyle: {flex: 0.5}
      },
      {   
        type: "dateRange",
        data: [dataSource.startTime, dataSource.endTime],
        placeholder: ["Start Time", "End Time"],
        onChange: onDateChange.bind(this, { key: "startTime", secondKey: "endTime" }),
        FieldsetStyle: { flex: 0.985 },
        disabled: dataSource.published.at,
        DatePickerStyle: (errorReturn.startTime || errorReturn.endTime) && errorStyle.inputStyle,
        iconRigth: (errorReturn.startTime || errorReturn.endTime) && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [ 
      {
        type: "errorlabel",
        label: errorReturn.startTime ? "* event period cannot be empty" : (errorReturn.endTime && "* end time must after current time"),
        FieldsetStyle: errorStyle.fieldsetStyle,
        LabelStyle: errorStyle.labelStyle,
        hide: errorReturn.startTime ? false : errorReturn.endTime ? false : true
      }
    ],
    [
      {
        type: "textArea",
        label: "Description: ",
        data: dataSource.description,
        onChange: onRecordChange.bind(this, { key: "description" }),
        TextAreaStyle: errorReturn.description && errorStyle.textareaStyle,
        iconRigth: errorReturn.description && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    /* [
      {
        type: "textArea",
        label: "Rules :",
        data: dataSource.rules,
        onChange: onRecordChange.bind(this, { key: "rules" }),
        TextAreaStyle: errorReturn.rules && errorStyle.inputStyle,
        iconRigth: errorReturn.rules && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ],
    [
      {
        type: "textArea",
        label: "Terms :",
        data: dataSource.terms,
        onChange: onRecordChange.bind(this, { key: "terms" }),
        TextAreaStyle: errorReturn.terms && errorStyle.inputStyle,
        iconRigth: errorReturn.terms && <AntdIcon.CloseCircleFilled style={{ color: "red" }}/>
      }
    ], */
    /* [
      {
        type: "horizontalLine"
      }
    ],
    [
        {
          type: "button",
          label: "Add New Reward",
          onClick: onAddReward.bind(this),
        },
        {
          type: dataSource.rewards[0] && "button",
          label: "Delete Last Reward",
          onClick: onDeleteReward.bind(this),
        },
        {
          type: dataSource.rewards[0] && "confirmButton",
          buttonText: "Delete All Reward",
          onConfirm: onDeleteReward.bind(this, {type: "deleteAll"}),
          title : "Are you sure to delete all Reward ?",
          okText: "Yes",
          cancelText: "No",
        },
    ],
    ...dataSource.rewards.map((data, index) => {
      return [
        {
          type: "label",
          label: "Rank : " + (index + 1),
          FieldsetStyle: {flex: 0.2}
        },
        {
          type: "text",
          label: "Reward :",
          data: data.rewardId,
          FieldsetStyle: {flex: 0.4, marginRight: 10}
        },
        {
          type: "text",
          label: "User :",
          data: data.userId,
          FieldsetStyle: {flex: 0.4, marginBottom: 10}
        },
        {

        }
      ];
    }),
    [
      {
        type: "horizontalLine"
      }
    ], */
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
        title : "Are you sure to publish the Event?",
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
        title : "Are you sure to terminate the Event?",
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
        SelectStyle={SelectStyle}
        TextAreaStyle={TextAreaStyle}
        InputStyle={InputStyle}
        submitFieldStyle={ButtonFieldsetStyle}
        submitButtonStyle={ButtonStyle}
      />
  );
};
