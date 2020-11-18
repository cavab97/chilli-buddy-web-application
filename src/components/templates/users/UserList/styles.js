import styled from 'styled-components';
import { palette } from 'styled-theme';

const Content = styled.div`
  min-width: 200px;
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

const Image = styled.img`

`;

const LabelFieldsetStyle = {
    fontWeight: "bold",
    marginBottom: 15,
    /* backgroundColor: "#f2f2f2",
    border: '1px solid grey' */
}

const DescFieldsetStyle = {
    marginBottom: 15,
}

const RowHolderStyle = {
    justifyContent: "flex-end"
}

export {
  Content,
  ActionWrapper,
  LabelFieldsetStyle,
  DescFieldsetStyle,
  RowHolderStyle,
  Image,
};