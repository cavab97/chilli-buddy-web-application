import styled from 'styled-components';
import { palette } from 'styled-theme';


const Content = styled.div`

`;

const Title = styled.span`
    font-size: 16px;
    font-weight: bold
`;

const ButtonFieldsetStyle = {
    justifyContent: "flex-end",
}

const LabelStyle = {
    fontSize: 15,
    fontWeight: 450
}

const LabelFieldsetStyle = {
    flex: 0.2,
    width: "20%"
}

const ButtonStyle = {
    width: 100
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

export {
  Content,
  Title,
  ButtonFieldsetStyle,
  ButtonStyle,
  LabelStyle,
  LabelFieldsetStyle,
  TableStyle
};