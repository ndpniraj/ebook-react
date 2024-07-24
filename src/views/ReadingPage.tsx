import { FC, useEffect, useState } from "react";
import EpubReader, { Highlight } from "../components/reader";
import client from "../api/client";
import { useParams, useSearchParams } from "react-router-dom";
import { parseError } from "../utils/helper";

interface Props {}

interface BookAPIRes {
  settings: {
    highlights: Highlight[];
    lastLocation: string;
  };
  url: string;
}

const ReadingPage: FC<Props> = () => {
  const [url, setUrl] = useState("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const { slug } = useParams();
  const [searchParam] = useSearchParams();
  const title = searchParam.get("title");
  const bookId = searchParam.get("id");

  const handleOnHighlightSelection = (data: Highlight) => {
    try {
      setHighlights([...highlights, data]);
      client.post("/history", {
        bookId,
        highlights: [data],
        remove: false,
      });
    } catch (error) {
      parseError(error);
    }
  };

  const handleOnHighlightClear = (cfi: string) => {
    try {
      const newHighlights = highlights.filter((item) => item.selection !== cfi);

      setHighlights(newHighlights);
      client.post("/history", {
        bookId,
        highlights: [{ selection: cfi, fill: "" }],
        remove: true,
      });
    } catch (error) {
      parseError(error);
    }
  };

  useEffect(() => {
    if (!slug) return;

    const fetchBookUrl = async () => {
      try {
        const { data } = await client.get<BookAPIRes>(`/book/read/${slug}`);
        setUrl(data.url);
        setHighlights(data.settings.highlights);
      } catch (error) {
        parseError(error);
      }
    };

    fetchBookUrl();
  }, []);

  return (
    <div>
      <EpubReader
        url={url}
        title={title || ""}
        highlights={highlights}
        onHighlight={handleOnHighlightSelection}
        onHighlightClear={handleOnHighlightClear}
      />
    </div>
  );
};

export default ReadingPage;
