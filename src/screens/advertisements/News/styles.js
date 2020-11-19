import styled from "styled-components";
import { palette } from "styled-theme";
import { Button } from "marslab-library-react/components/atoms";
import Table from "../../antTable.style";

const TableWrapper = styled(Table)`
  @media only screen and (min-width: 780px) and (max-width: 1680px) {
    width: calc(100vw - 400px);
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

const ButtonHolders = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
`;

const ActionBtn = styled(Button)`
  && {
    padding: 0 12px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
    border-color: ${palette("primary", 5)};
    background-color: ${palette("primary", 6)};

    i {
      font-size: 17px;
      color: ${palette("text", 1)};
    }

    &:hover {
      background-color: ${palette("primary", 5)};
      border-color: ${palette("primary", 6)};
      i {
        color: inherit;
      }
    }
  }
`;

const Fieldset = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldsetStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 10,
};

const Label = styled.label`
  font-size: 13px;
  color: ${palette("text", 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
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

const Form = styled.div``;

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

const ErrorMsgFieldsetStyle = {
  marginTop: -10,
  paddingLeft: 5,
};

const ErrorMsgLabelStyle = {
  fontSize: 13,
  color: "red",
};

const ErrorInputStyle = {
  borderRadius: 4,
  borderColor: "red",
  width: "100%",
};

const UploadStyle = {
  marginTop: 10,
  width: "100%",
};

const ButtonStyle = {
  width: "100%",
};

const InputStyle = {
  borderRadius: 4,
};

const DatePickerStyle = {
  width: "100%",
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

export {
  ActionBtn,
  Fieldset,
  FieldsetStyle,
  Form,
  Label,
  ButtonHolders,
  ActionWrapper,
  TableWrapper,
  errorStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  ErrorInputStyle,
  UploadStyle,
  ButtonStyle,
  InputStyle,
  DatePickerStyle,
  RowHolderStyle,
  LabelStyle,
  SelectStyle,
};
