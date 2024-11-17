import { getLocalISODate } from "@/utils/dateFuncs";
import React from "react";
import { Table } from "rsuite";

const TimeCell = ({ rowData, dataKey, ...props }: any) => {
  return (
    <Table.Cell {...props}>
      {rowData[dataKey] && getLocalISODate(rowData[dataKey])}
    </Table.Cell>
  );
};

export default TimeCell;
