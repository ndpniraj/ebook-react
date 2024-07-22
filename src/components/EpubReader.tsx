import { FC, useEffect } from "react";
import { Book } from "epubjs";

interface Props {
  url: string;
}

const container = "epub_container";
const EpubReader: FC<Props> = ({ url }) => {
  useEffect(() => {
    if (!url) return;

    const book = new Book(url);
    const rendition = book.renderTo(container, {
      width: 500,
      height: 500,
    });
    rendition.display();
    // rendition.moveTo(2);
  }, [url]);

  return (
    <div>
      <div id={container} />
    </div>
  );
};

export default EpubReader;
