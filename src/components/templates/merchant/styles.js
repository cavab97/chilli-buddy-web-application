import styled from "styled-components";
import { palette } from "styled-theme";
import Table from "../../../screens/antTable.style";

const TableWrapper = styled(Table)`
  @media only screen and (min-width: 780px) and (max-width: 1680px) {
    width: 100%;
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
      color: ${palette("primary", 0)};

      &:hover {
        color: ${palette("primary", 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette("error", 0)};

        &:hover {
          color: ${palette("error", 2)};
        }
      }
    }
  }
`;

const TextAreaStyle = {
  flex: 0.975,
};

const Content = styled.div`
  min-width: 100%;
`;

const UploadStyle = {
  marginTop: 10,
  width: "100%",
};

const ButtonFieldsetStyle = {
  justifyContent: "flex-end",
};

const ButtonStyle = {
  width: 100,
};

export {
  TableWrapper,
  ActionWrapper,
  Content,
  UploadStyle,
  ButtonFieldsetStyle,
  ButtonStyle,
  TextAreaStyle,
};
