import styled from "styled-components";
import { palette } from "styled-theme";
import Table from "../../../screens/antTable.style";

const TableWrapper = styled(Table)`
  @media only screen and (min-width: 780px) and (max-width: 1680px) {
    width: 100%;
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 18px;
      color: ${palette("primary", 0)};

      &:hover {
        color: ${palette("primary", 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette("error", 0)};

        &:hover {
          color: ${palette("error", 2)};
        }
      }
    }
  }
`;

const TextAreaStyle = {
  flex: 0.975,
};

const Content = styled.div`
  min-width: 100%;
`;

const UploadStyle = {
  marginTop: 10,
  width: "100%",
};

const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
};

const ButtonStyle = {
  width: 100,
};

const FieldsetStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 10,
};

const DatePickerStyle = {
  width: "100%",
};

const ErrorInputStyle = {
  borderRadius: 4,
  borderColor: "red",
  width: "100%",
};

const ErrorMsgFieldsetStyle = {
  marginTop: -10,
  paddingLeft: 5,
};

const ErrorMsgLabelStyle = {
  fontSize: 13,
  color: "red",
};

const InputStyle = {
  borderRadius: 4,
};

const RowHolderStyle = {
  marginBottom: 0,
  flexDirection: "row",
  //overflow: "hidden",
};

const LabelStyle = {
  fontSize: 13,
  lineHeight: 1.5,
  fontWeight: 500,
  padding: 0,
};

const SelectStyle = {
  flex: 1,
  width: 470,
};

const errorStyle = {
  labelStyle: {
    color: "red",
  },

  inputStyle: {
    borderColor: "red",
  },

  datepickerStyle: {
    backgroundColor: "rgba(255, 0, 0, 1)",
  },

  textareaStyle: {
    borderColor: "red",
  },
};

export {
  TableWrapper,
  ActionWrapper,
  Content,
  UploadStyle,
  ButtonFieldsetStyle,
  ButtonStyle,
  TextAreaStyle,
  FieldsetStyle,
  DatePickerStyle,
  ErrorInputStyle,
  ErrorMsgLabelStyle,
  ErrorMsgFieldsetStyle,
  InputStyle,
  RowHolderStyle,
  LabelStyle,
  SelectStyle,
  errorStyle
};
