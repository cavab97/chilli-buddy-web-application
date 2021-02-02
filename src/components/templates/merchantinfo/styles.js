import styled from 'styled-components';
import { palette } from 'styled-theme';

const Content = styled.div`
  min-width: 200px;
`;

const Row = styled.div`
  display: inline-block;  
`;

const MerchantInfoContent = styled.div`

`;

const ActionContainer = styled.div`

`;



const QRContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    padding: 0;
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    @media (max-width: 550px){
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ButtonStyle = ComponentName => styled(ComponentName)`
    &.ant-btn {
        width: 120px;
        margin-left: 10px;
        border-color:${palette('primary', 5)};
        background-color:${palette('primary', 6)};
        color: ${palette('color', 15)};

        @media (max-width: 550px){
            margin-bottom: 10px;
        }

        &:hover {
            background-color:${palette('primary', 5)};
            border-color:${palette('primary', 6)};
            color: ${palette('color', 15)};
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

const Image = styled.img`

`;

const LabelFieldsetStyle = {
    fontWeight: "bold",
    marginBottom: 15,
    // width: 5%,
    // color:"red",
    //  backgroundColor: "#f2f2f2",
    // border: '1px solid grey' ,
    // height: 100
}

const DescFieldsetStyle = {
 
    marginBottom: 15,
}
const InputStyle = {
    width: "50%",
    flex: 0.92
}

const RowHolderStyle = {
    justifyContent: "flex-end"
}

const TextStyle = {
  fontSize: 16
}

const RowStyle = {
  paddingTop: 15
}

export {
  Content,
  ActionWrapper,
  LabelFieldsetStyle,
  DescFieldsetStyle,
  RowHolderStyle,
  MerchantInfoContent,
  Row,
  Image,
  QRContainer,
  ButtonStyle,
  ActionContainer,
  SubContainer,
  InputStyle,
  TextStyle,
  RowStyle
};