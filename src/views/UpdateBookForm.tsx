import { FC, useEffect, useState } from "react";
import BookForm, { InitialBookToUpdate } from "../components/BookForm";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface Props {}

const UpdateBookForm: FC<Props> = () => {
  const [bookInfo, setBookInfo] = useState<InitialBookToUpdate>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  console.log(bookInfo);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await client.get(`/book/details/${slug}`);
        setBookInfo(data.book);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetails();
  }, [slug]);

  if (busy) return <LoadingSpinner />;

  return <BookForm title="Update Book" submitBtnTitle="Update Book" />;
};

export default UpdateBookForm;
