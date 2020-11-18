import styled from 'styled-components';
import { palette } from 'styled-theme';
import { DatePicker } from "marslab-library-react/components/atoms";

const Content = styled.div`
  min-width: 200px;
`;

const ActionContainer = styled.div`

`;

const QRContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 20px;
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

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

const Label = styled.label`
    margin-right: 10px;
`;

const DateRangePicker = styled(DatePicker.RangePicker)`
    display: flex;
    border-radius: 4px;
`;

const InputStyle = {
    width: "92%",
    flex: 0.92
}

const submitFieldStyle = {
    marginTop: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end"
}

const submitButtonStyle = {
    width: 150,
    fontWeight: "bold",
    borderRadius: 10,
}

const errorStyle = {
    fieldsetStyle: {
      marginTop: -5,
      width: "100%",
    },
    
    labelStyle: {
      fontSize: 13,
    },
    
    inputStyle: {
      borderColor: "red",
    },
}

export {
    Content,
    ActionContainer,
    QRContainer,
    SubContainer,
    FilterContainer,
    ButtonStyle,
    InputStyle,
    Label,
    DateRangePicker,
    submitFieldStyle,
    submitButtonStyle,
    errorStyle
};