import { FC } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

interface Props {
  visible?: boolean;
}

const AuthorPublicationTable: FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Table shadow="none">
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos, eum?
          </TableCell>
          <TableCell>Published</TableCell>
          <TableCell>
            <div className="flex space-x-3">
              <Button isIconOnly size="sm">
                <FaRegTrashCan />
              </Button>
              <Button isIconOnly size="sm">
                <FaEdit />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AuthorPublicationTable;
