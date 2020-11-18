import styled from 'styled-components';
import { palette } from 'styled-theme';

const formHolderStyle = {
    backgroundColor: "white",
    width: 330,
    padding: 20,
    zIndex: 10,
    borderRadius: 10,
    boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.6)'
};

const inputStyle = {
    marginTop: -10,
    boxShadow: '0 0 3px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
}

const titleFieldsetStyle = {
    justifyContent: "center",
    alignItems: "center"
}

const labelStyle = {
    whiteSpace: "nowrap"
}

const descLabelStyle = {
    fontWeight: "bold",
}

const submitFieldStyle = {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
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
      ...inputStyle,
      borderColor: "red",
    },
}

const InfoContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Label = styled.label``;

const Link = styled.a``;

export {
    formHolderStyle,
    inputStyle,
    titleFieldsetStyle,
    labelStyle,
    descLabelStyle,
    submitFieldStyle,
    submitButtonStyle,
    errorStyle,
    InfoContainer,
    Label,
    Link
};