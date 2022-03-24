import { FC } from "react";
import { moduleConfig } from "../../config/moduleConfig";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableDataCell } from "./TableDataCell";
import { RosDebugState } from "../../types/RosTopicStats";
import { getContent } from "../../Utils/getContent";
interface ITableProps {
  tableHeaders: string[];
  topicStats: RosDebugState;
}
export const TableComponent: FC<ITableProps> = ({
  tableHeaders,
  topicStats,
}) => {
  return (
    <Table columns={tableHeaders.length}>
      <TableHeader headers={tableHeaders} />
      <TableBody>
        {moduleConfig.debugItems.map((debugItem, idx) => {
          const currentContent = getContent(debugItem.name, topicStats);
          return (
            <TableRow key={idx}>
              <TableDataCell content={debugItem.name} />
              <TableDataCell
                content={currentContent[0].toString()}
                type={currentContent[1]}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
