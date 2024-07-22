import { FC, useEffect } from "react";
import { Book } from "epubjs";
import Navigator from "./Navigator";

interface Props {
  url: string;
}

const container = "epub_container";
const wrapper = "epub_wrapper";

const getElementSize = (id: string) => {
  const elm = document.getElementById(id);
  let width = 0;
  let height = 0;

  if (elm) {
    const result = elm.getBoundingClientRect();
    width = result.width;
    height = result.height;
  }

  return { width, height };
};

const EpubReader: FC<Props> = ({ url }) => {
  const handleNavigation = () => {};

  useEffect(() => {
    if (!url) return;

    const book = new Book(url);
    const { height, width } = getElementSize(wrapper);
    const rendition = book.renderTo(container, {
      width,
      height,
    });
    rendition.display();

    rendition.on("rendered", () => {
      rendition.next();
    });

    return () => {
      if (book) book.destroy();
    };
  }, [url]);

  return (
    <div className="h-screen">
      <div id={wrapper} className="h-full relative group">
        <div id={container} />

        <Navigator
          side="left"
          onClick={handleNavigation}
          className="opacity-0 group-hover:opacity-100"
        />
        <Navigator
          side="right"
          onClick={handleNavigation}
          className="opacity-0 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default EpubReader;
