import styled from 'styled-components';
import { palette } from 'styled-theme';

const ActionContent = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: -15px
`;

const Content = styled.div`

`;

const ButtonHolders = styled.div `
  display: flex;
  justify-Content: flex-end;
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

const ActiveStyle = {
    backgroundColor: "#ced1d8",
    marginLeft: "0px",
    marginRight: "15px",
    borderColor: "#ced1d8"
}

const DeactiveStyle = {
    backgroundColor: "#f28e14",
    marginLeft: 0,
    marginRight: "15px",
    borderColor: "#f28e14"
}
const ActiveButton = {
  backgroundColor: "#f28e14",
  borderColor: "#f28e14"
}

const DeactiveButton = {
  backgroundColor: "#ced1d8",
  borderColor: "#ced1d8"
}

const hide = {
  display: "none"
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
  ActionContent,
  Content,
  Title,
  ButtonFieldsetStyle,
  ButtonStyle,
  LabelStyle,
  LabelFieldsetStyle,
  TableStyle,
  ButtonHolders,
  ActiveStyle,
  DeactiveStyle,
  hide,
  ActiveButton,
  DeactiveButton,
};