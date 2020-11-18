import styled from 'styled-components';
import { palette } from 'styled-theme';

const TextAreaStyle = {
  flex: 0.975,
}

const Content = styled.div`
  min-width: 200px;
`;

const UploadStyle = {
  marginTop: 10,
  width: "100%",
}

const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
}

const ButtonStyle = {
  width: 100
}

export {
    Content,
    UploadStyle,
    ButtonFieldsetStyle,
    ButtonStyle,
    TextAreaStyle
};