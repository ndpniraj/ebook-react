import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";

interface Props {}

interface BookDetail {
  id: string;
  title: string;
  genre: string;
  language: string;
  slug: string;
  description: string;
  publicationName: string;
  fileInfo: {
    id: string;
    size: string;
  };
  publishedAt: string;
  cover?: string;
  rating?: string;
  price: {
    mrp: string;
    sale: string;
  };
  author: {
    id: string;
    name: string;
    slug: string;
  };
}

const SingleBook: FC<Props> = () => {
  const [bookDetails, setBookDetails] = useState<BookDetail>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const { data } = await client.get("/book/details/" + slug);
        setBookDetails(data.book);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetail();
  }, [slug]);

  return <div>{JSON.stringify(bookDetails)}</div>;
};

export default SingleBook;
