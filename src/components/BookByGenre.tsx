import { FC, useEffect, useState } from "react";
import client from "../api/client";
import { parseError } from "../utils/helper";
import { Divider } from "@nextui-org/react";
import DividerWithTitle from "./common/DividerWithTitle";

interface Props {
  genre: string;
}

interface Book {
  id: string;
  title: string;
  genre: string;
  slug: string;
  cover?: string;
  rating?: string;
  price: {
    mrp: string;
    sale: string;
  };
}

const BookByGenre: FC<Props> = ({ genre }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const fetchBooks = async (genre: string) => {
      try {
        const { data } = await client.get("/book/by-genre/" + genre);
        setBooks(data.books);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBooks(genre);
  }, [genre]);

  return (
    <div>
      <DividerWithTitle title={genre} />
    </div>
  );
};

export default BookByGenre;
