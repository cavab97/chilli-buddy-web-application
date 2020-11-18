import { Button } from 'marslab-library-react/components/atoms';
import Table from '../../antTable.style';

const SearchContainer = styled.div`

`;

const TableWrapper = styled(Table)`
@media only screen and (min-width: 780px) and (max-width: 1680px) {
    width: calc(100vw - 400px);
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

const ButtonHolders = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px;
`;

export {
    ActionBtn,
    ButtonHolders,
    TableWrapper,
    SearchContainer
  };