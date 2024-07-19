import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";
import BookDetail, { Book } from "../components/BookDetail";
import Skeletons from "../components/skeletons";
import ReviewSection from "../components/ReviewSection";

interface Props {}

const fetchBookReviews = async (id: string) => {
  const { data } = await client.get("/review/list/" + id);
  return data.reviews;
};

const SingleBook: FC<Props> = () => {
  const [bookDetails, setBookDetails] = useState<Book>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const { data } = await client.get("/book/details/" + slug);
        setBookDetails(data.book);
        const reviews = await fetchBookReviews(data.book.id);
        console.log(reviews);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetail();
  }, [slug]);

  if (busy)
    return (
      <div className="p-5 lg:p-0">
        <Skeletons.BookDetails />
      </div>
    );

  return (
    <div className="p-5 lg:p-0 space-y-6">
      <BookDetail book={bookDetails} />

      {/* Review Section */}
      <ReviewSection title={`${bookDetails?.title} Reviews`} />
    </div>
  );
};

export default SingleBook;
