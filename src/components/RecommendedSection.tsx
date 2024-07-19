import { FC, useEffect, useState } from "react";
import client from "../api/client";
import { parseError } from "../utils/helper";
import Skeletons from "./skeletons";
import BookList from "./skeletons/BookList";

interface Props {
  id?: string;
}

const RecommendedSection: FC<Props> = ({ id }) => {
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBooks = async () => {
      try {
        const { data } = await client.get("/book/recommended/" + id);
        console.log(data);
      } catch (error) {
        parseError(error);
      } finally {
        setFetching(false);
      }
    };

    fetchBooks();
  }, [id]);

  if (!id) return null;

  if (fetching) return <Skeletons.BookList />;

  return <div></div>;
};

export default RecommendedSection;
