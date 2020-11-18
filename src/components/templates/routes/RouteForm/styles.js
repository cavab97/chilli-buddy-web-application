
const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
}

const ButtonStyle = {
  width: 100
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
    marginTop: -5,
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
  InputStyle,
  UploadStyle,
  TextAreaStyle,
  errorStyle
};