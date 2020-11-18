import styled from 'styled-components';
import { palette } from 'styled-theme';

const RouteContent = styled.div`
  min-width: 200px;
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
  margin-bottom: 25px;
`;

const TableFieldsetStyle = {
    width: "100%",
}

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
  width: '100%'
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

const TableStyle = ComponentName => styled(ComponentName)`
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

const BreadcrumbStyle = ComponentName => styled(ComponentName)`

`;

const BreadcrumbItemStyle  = ComponentName => styled(ComponentName)`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: ${palette('text', 0)};
  margin: 5px 0;
`;


const ActionButtonStyle = ComponentName => styled(ComponentName)`
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

export {
    RouteContent,
    TitleWrapper,
    ButtonHolders,
    TableFieldsetStyle,
    RowHolderStyle,
    FieldsetStyle,
    LabelStyle,
    SelectStyle,
    ButtonStyle,
    InputStyle,
    DatePickerStyle,
    TableStyle,
    BreadcrumbStyle,
    BreadcrumbItemStyle,
    ActionButtonStyle,
};