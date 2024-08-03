import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../api/client";
import BookList, { Book } from "../components/BookList";
import DividerWithTitle from "../components/common/DividerWithTitle";

interface Props {}

const Search: FC<Props> = () => {
  const [result, setResult] = useState<Book[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [searchParam] = useSearchParams();

  const title = searchParam.get("title");

  useEffect(() => {
    client
      .get<{ results: Book[] }>("/search/books?title=" + title)
      .then(({ data }) => {
        if (!data.results.length) setNotFound(true);
        else setNotFound(false);
        setResult(data.results);
      });
  }, [title]);

  const heading = `Search Result For: ${title}`;

  if (notFound)
    return (
      <div className="px-4 py-10">
        <DividerWithTitle title={heading} />
        <p className="text-center p-5 text-2xl font-semibold opacity-50">
          No Results Found...
        </p>
      </div>
    );

  return (
    <div className="px-4 py-10">
      <BookList data={result} title={heading} />
    </div>
  );
};

export default Search;
