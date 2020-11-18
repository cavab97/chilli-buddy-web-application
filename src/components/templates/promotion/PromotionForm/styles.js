import styled from 'styled-components';

const SubtitleLabelStyle = {
  fontSize: 20,
  fontWeight: 500,
}

const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
}

const ButtonStyle = {
  width: 100
}

const SelectStyle = {
  width: '100%',
  flex: 1,
}

const InputStyle = {
  borderRadius: 4,
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

  fieldsetStyle2: {
    marginTop: -80,
    marginLeft: -570,
  },
  
  labelStyle: {
    fontSize: 13,
    color: "red"
  },

  labelStyle2: {
    fontSize: 13,
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
  SubtitleLabelStyle,
  ButtonFieldsetStyle,
  ButtonStyle,
  SelectStyle,
  InputStyle,
  UploadStyle,
  TextAreaStyle,
  errorStyle
};