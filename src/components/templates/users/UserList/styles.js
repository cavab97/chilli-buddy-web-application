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

const ErrorInputStyle = {
  borderRadius: 4,
  borderColor: "red",
  width: "100%",
}

const ErrorMsgFieldsetStyle = {
  marginTop: -10,
  paddingLeft: 5,
}

const ErrorMsgLabelStyle = {
  fontSize: 13,
  color: "red",
}

const InputStyle = {
  borderRadius: 4,
};

const FieldsetStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 10,
};

const LabelStyle = {
  fontSize: 13,
  lineHeight: 1.5,
  fontWeight: 500,
  padding: 0,
};

const ButtonStyle = {
  width: 100,
};

export {
  Content,
  ActionWrapper,
  LabelFieldsetStyle,
  DescFieldsetStyle,
  RowHolderStyle,
  Image,
  ErrorInputStyle,
  ErrorMsgFieldsetStyle,
  ErrorMsgLabelStyle,
  InputStyle,
  FieldsetStyle,
  LabelStyle,
  ButtonStyle
};