import styled from 'styled-components';

const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
}

const ButtonStyle = {
  width: 100
}

const SelectStyle = {
  width: '101%',
  flex: 1.01,
}

const DatePickerFieldSetStyle = {
  width: '200%',
  flex: 2,
}

const OperatingButtonStyle = {
  width: '20%',
  flex: 0.2,
  justifyContent: "flex-end",
}

const UploadStyle = {
  marginTop: 10,
  width: "100%",
}

const TextAreaStyle = {
  flex: 0.975,
}

const errorStyle = {
  fieldsetStyle: {
    marginTop: 0,
    paddingLeft: 5,
  },
  
  labelStyle: {
    fontSize: 13,
    color: "red"
  },
  
  inputStyle: {
    borderRadius: 4,
    borderColor: "red",
  },

  textareaStyle: {
    flex: 0.975,
    width: "97.5%",
    borderRadius: 4,
    borderColor: "red",
  }
}

export {
  ButtonFieldsetStyle,
  ButtonStyle,
  UploadStyle,
  SelectStyle,
  TextAreaStyle,
  OperatingButtonStyle,
  DatePickerFieldSetStyle,
  errorStyle,
};