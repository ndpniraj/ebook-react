import { FC, useEffect, useState } from "react";
import EpubReader, { Highlight } from "../components/reader";
import client from "../api/client";
import { useParams, useSearchParams } from "react-router-dom";
import { parseError } from "../utils/helper";

interface Props {}

interface BookAPIRes {
  settings: {
    highlights: string[];
    lastLocation: string;
  };
  url: string;
}

const ReadingPage: FC<Props> = () => {
  const [url, setUrl] = useState("");
  const [highlights, setHighlights] = useState<Highlight[]>([
    { fill: "red", selection: "epubcfi(/6/6!/4/26,/1:250,/1:439)" },
    { fill: "blue", selection: "epubcfi(/6/6!/4/18,/1:1,/1:193)" },
  ]);
  const { slug } = useParams();
  const [searchParam] = useSearchParams();
  const title = searchParam.get("title");

  const handleOnHighlightSelection = (data: Highlight) => {
    setHighlights([...highlights, data]);
  };

  useEffect(() => {
    if (!slug) return;

    const fetchBookUrl = async () => {
      try {
        const { data } = await client.get<BookAPIRes>(`/book/read/${slug}`);
        setUrl(data.url);
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
      />
    </div>
  );
};

export default ReadingPage;
