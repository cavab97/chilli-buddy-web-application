import styled from 'styled-components';
import { palette } from 'styled-theme';

const Content = styled.div`

`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const SubtitleLabelStyle ={
  fontSize: 15,
  fontWeight: 500
}

const SelectStyle = {
  flex: 1,
  borderRadius: 4
}

const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
  flex: 1,
}

const CancelButtonFieldsetStyle = {
  flex: 0, 
  marginLeft: 15
}

const InputStyle = {
  borderRadius: 4,
}

const TableStyle = ComponentName => styled(ComponentName)`
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
  Content,
  TitleWrapper,
  SelectStyle,
  ButtonFieldsetStyle,
  CancelButtonFieldsetStyle,
  InputStyle,
  SubtitleLabelStyle,
  TableStyle,
  ActionButtonStyle,
};