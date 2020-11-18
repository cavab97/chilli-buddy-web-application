import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Button } from 'marslab-library-react/components/atoms';
//import Table from '../../antTable.style';
import Table from "../../../../screens/antTable.style";


const SearchContainer = styled.div`

`;

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

const Content = styled.div`

`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonHolders = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
`;

const ComponentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${palette('text', 0)};
  margin: 5px 0;
`;

const ActionBtn = styled(Button)`
  && {
    padding: 0 12px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
    border-color:${palette('primary', 5)};
    background-color:${palette('primary', 6)};

    i {
      font-size: 17px;
      color: ${palette('text', 1)};
    }

    &:hover {
      background-color:${palette('primary', 5)};
      border-color:${palette('primary', 6)};
      i {
        color: inherit;
      }
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
      color: ${palette('primary', 0)};

      &:hover {
        color: ${palette('primary', 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette('error', 0)};

        &:hover {
          color: ${palette('error', 2)};
        }
      }
    }
  }
`;

const RowHolderStyle = {
  marginBottom: 0,
  flexDirection: "row",
}

const FieldsetStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 10,
}

const LabelStyle = {
  fontSize: 13,
  lineHeight: 1.5,
  fontWeight: 500,
  padding: 0
}

const SelectStyle = {
  flex: 1,
  width: '100%',
}

const multipleSelectStyle = {
  flex: 1,
  display: "block",
  width: '100%',
}

const ButtonStyle = {
  width: '100%',
}

const InputStyle = {
  borderRadius: 4,
}

const DatePickerStyle = {
  width: '100%',
}

const UploadButtonStyle = {
  padding: 0,
  border: "none",
}

const OperatingFieldsetStyle = {
  flex: 1,
  flexDirection: "row",
}

const ButtonFieldsetStyle = {
  marginLeft: 10,
  flex: 0.2,
}

const UploadStyle = {
  marginTop: 10,
  width: "100%",
}

const ErrorMsgFieldsetStyle = {
  marginTop: -10,
  paddingLeft: 5,
}

const ErrorMsgLabelStyle = {
  fontSize: 13,
  color: "red"
}

const ErrorInputStyle = {
  borderRadius: 4,
  borderColor: "red",
  width: "100%"
}



export {
  SearchContainer,
  ActionBtn,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  RowHolderStyle,
  FieldsetStyle,
  LabelStyle,
  SelectStyle,
  multipleSelectStyle,
  ButtonStyle,
  InputStyle,
  DatePickerStyle,
  UploadButtonStyle,
  OperatingFieldsetStyle,
  ButtonFieldsetStyle,
  UploadStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  ErrorInputStyle,
  Content
};
