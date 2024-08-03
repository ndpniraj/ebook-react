import { FC, useEffect, useState } from "react";
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
import client from "../api/client";
import { Link } from "react-router-dom";

interface Props {
  visible?: boolean;
  authorId?: string;
}

interface PublishedBook {
  id: string;
  title: string;
  slug: string;
  status: string;
}

const AuthorPublicationTable: FC<Props> = ({ authorId, visible }) => {
  const [books, setBooks] = useState<PublishedBook[]>([]);

  useEffect(() => {
    if (authorId) {
      client.get("/author/books/" + authorId).then(({ data }) => {
        setBooks(data.books);
      });
    }
  }, [authorId]);

  if (!visible) return null;

  return (
    <Table shadow="none">
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {books.map((book) => {
          return (
            <TableRow key="1">
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.status}</TableCell>
              <TableCell>
                <div className="flex space-x-3">
                  <Button isIconOnly size="sm">
                    <FaRegTrashCan />
                  </Button>
                  <Button
                    to={"/update-book/" + book.slug}
                    as={Link}
                    isIconOnly
                    size="sm"
                  >
                    <FaEdit />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AuthorPublicationTable;
