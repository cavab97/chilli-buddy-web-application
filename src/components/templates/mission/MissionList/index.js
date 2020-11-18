import React from "react";
import { Button } from "./node_modules/marslab-library-react/components/atoms";
import Table from "../../../../screens/antTable.style";
import ListCard from "./node_modules/marslab-library-react/components/organisms/ListCard";

import {
  RouteContent,
  ButtonHolders,
  TableStyle,
  ActionButtonStyle
} from "./styles";

export default ({
  columns,
  dataSource = [],
  readLoading = false,
  onRowClick,
  onAddRoute
}) => {
  const Tables = TableStyle(Table);
  const ActionBtn = ActionButtonStyle(Button);

  return (
    <RouteContent>
      {dataSource.length !== 0 && (
        <ListCard
          dataIndex="title"
          dataSource={dataSource}
          navigation="View Details"
          onClick={onRowClick}
          gutter="17"
          xs="1"
          sm="2"
          md="2"
          lg="3"
          xl="4"
          xxl="4"
        />
      )}

      <ButtonHolders>
        <ActionBtn type="primary" onClick={onAddRoute}>
          Add new mission
        </ActionBtn>
      </ButtonHolders>

      <Tables
        rowKey="id"
        //rowSelection={rowSelection}
        loading={readLoading}
        className="isoSimpleTable"
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        onRow={(record, rowIndex) => {
          return {
            onClick: onRowClick.bind(this, record)
          };
        }}
        pagination={{
          hideOnSinglePage: true,
          total: dataSource.length,
          showTotal: (total, range) => {
            return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
          }
        }}
      />
    </RouteContent>
  );
};
