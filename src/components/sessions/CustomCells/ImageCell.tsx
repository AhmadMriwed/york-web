import Image from "next/image";
import React from "react";
import { Table } from "rsuite";

const ImageCell = ({ rowData, dataKey, ...props }: any) => {
  return (
    <Table.Cell {...props} style={{ padding: 0 }}>
      <div
        style={{
          width: 40,
          height: 40,
          background: "#f5f5f5",
          borderRadius: 6,
          marginTop: 2,
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        {rowData.user.image && (
          <Image
            src={rowData.user.image}
            width={40}
            height={40}
            alt="User Image"
          />
        )}
      </div>
    </Table.Cell>
  );
};

export default ImageCell;
