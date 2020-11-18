import React from "react";
import { ActionButton } from "marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import { Form } from "marslab-library-react/components/organisms/Form";

import {
  Content,
  UploadStyle,
  ButtonFieldsetStyle,
  ButtonStyle,
  TextAreaStyle
} from "./styles";

export default ({
  dataSource,
  loading,
  onSubmit,
  onSubmitLoading,
  onRecordChange,
  onSelectChange,
  onUploadFile,
  uploadLoading,
  uploadProgress,
  uploadResult,
  uploadKey,
}) => {
  const formItem = [
    /* [
            {
                type: "text",
                label: "Title",
                data: dataSource.title,
                onChange: onRecordChange.bind(this, { key: "title" }),
            }
        ],
        [
            {
                type: "text",
                label: "Subtitle",
                data: dataSource.subtitle,
                onChange: onRecordChange.bind(this, { key: "subtitle" }),
            }
        ],
        [
            {
                type: "text",
                label: "Description",
                data: dataSource.description,
                onChange: onRecordChange.bind(this, { key: "description" }),
            }
        ], */
    [
      {
        type: "upload",
        uploadType: "pictureWall",
        onUploadFile: onUploadFile.bind(this, {
          key: "headerImages",
          target: "info",
        }),
        uploadLoading: uploadLoading,
        uploadProgress: uploadProgress,
        uploadResult: uploadResult,
        onChange: onSelectChange.bind(this, { key: "headerImages" }),
        defaultFileList: dataSource.headerImages,
        maxFiles: 10,
        label: "Header Images (800 x 600)",
        disabled: uploadKey && uploadKey !== "images",
        UploadStyle: UploadStyle,
      },
    ],
    [
      {
        type: "label",
        label: "Share Options",
      },
    ],
    [
      {
        type: "text",
        label: "Title *:",
        data: dataSource.share.title,
        onChange: onRecordChange.bind(this, {
          key: "share",
          nestedKey: "title",
        }),
      },
    ],
    [
      {
        type: "textArea",
        label: "Message *:",
        data: dataSource.share.message,
        onChange: onRecordChange.bind(this, {
          key: "share",
          nestedKey: "message",
        }),
      },
    ],
    [
      {
        type: "text",
        label: "Facebook post *:",
        data: dataSource.share.fbPost,
        onChange: onRecordChange.bind(this, {
          key: "share",
          nestedKey: "fbPost",
        }),
      },
    ],
  ];

  return (
    <Content>
      <Form
        loading={loading}
        formItem={formItem}
        onSubmit={onSubmit}
        onSubmitLoading={onSubmitLoading}
        submitFieldStyle={ButtonFieldsetStyle}
        submitButtonStyle={ButtonStyle}
        TextAreaStyle={TextAreaStyle}
      />
    </Content>
  );
};
