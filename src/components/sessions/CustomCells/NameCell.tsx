import React from "react";
import { Table } from "rsuite";

const NameCell = ({ rowData, dataKey, ...props }: any) => {
  return (
    <Table.Cell {...props}>
      {`${rowData.user.first_name} ${rowData.user.last_name}`}
    </Table.Cell>
  );
};

export default NameCell;
