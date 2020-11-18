import styled from 'styled-components';
import { palette } from 'styled-theme';
import { BorderRightOutlined } from '@ant-design/icons';

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

const ButtonFieldsetStyle = {
    flex: 0,
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 15,
}

const LabelFieldsetStyle = {
    fontWeight: "bold",
    marginBottom: 15,
    /* backgroundColor: "#f2f2f2",
    border: '1px solid grey' */
}

const DescFieldsetStyle = {
    marginBottom: 15,
}

const UrlFieldsetStyle = {
    flex: 0.7,
    overflow: "hidden", 
    whiteSpace: "nowrap",
    marginBottom: 15,
}

const RowHolderStyle = {
    justifyContent: "flex-end"
}

const TableStyle = ComponentName => styled(ComponentName)`
  @media only screen and (min-width: 780px) and (max-width: 1680px) {
    width: calc(100vw - 400px);
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
`;

export {
    Content,
    ActionWrapper,
    ButtonFieldsetStyle,
    LabelFieldsetStyle,
    DescFieldsetStyle,
    UrlFieldsetStyle,
    RowHolderStyle,
    Image,
    TableStyle
};