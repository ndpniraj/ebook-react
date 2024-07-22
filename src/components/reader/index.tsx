import { FC, useEffect, useState } from "react";
import { Book, Rendition } from "epubjs";
import Navigator from "./Navigator";
import LoadingIndicator from "./LoadingIndicator";
import TableOfContent, { BookNavList } from "./TableOfContent";
import { Button } from "@nextui-org/react";
import { IoMenu } from "react-icons/io5";
import ThemeOptions from "./ThemeOptions";
import FontOptions from "./FontOptions";
import { MdOutlineStickyNote2 } from "react-icons/md";

interface Props {
  url: string;
  title?: string;
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

const filterHref = (spineHrefList: string[], href: string) => {
  const foundItem = spineHrefList.find((spineHref) => {
    const regex = new RegExp("[^/]+/([^/]+.xhtml)");
    const list = regex.exec(spineHref);
    if (list) {
      if (href.startsWith(list[1])) {
        return true;
      }
    }
  });

  return foundItem || href;
};

const loadTableOfContent = async (book: Book) => {
  const [nav, spine] = await Promise.all([
    book.loaded.navigation,
    book.loaded.spine,
  ]);

  let spineHref: string[] = [];
  if (!Array.isArray(spine)) {
    const { spineByHref } = spine as { spineByHref: { [key: string]: number } };
    const entires = Object.entries(spineByHref);
    entires.sort((a, b) => a[1] - b[1]);
    spineHref = entires.map(([key]) => key);
  }

  const { toc } = nav;

  const navLabels: BookNavList[] = [];
  toc.forEach((item) => {
    if (item.subitems?.length) {
      navLabels.push({
        label: { title: item.label, href: filterHref(spineHref, item.href) },
        subItems: item.subitems.map(({ href, label }) => {
          return {
            href: filterHref(spineHref, href),
            title: label,
          };
        }),
      });
    } else {
      navLabels.push({
        label: { title: item.label, href: filterHref(spineHref, item.href) },
        subItems: [],
      });
    }
  });

  return navLabels;
};

const EpubReader: FC<Props> = ({ url, title }) => {
  const [loading, setLoading] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [tableOfContent, setTableOfContent] = useState<BookNavList[]>([]);
  const [rendition, setRendition] = useState<Rendition>();

  const handleNavigation = (href: string) => {
    rendition?.display(href);
  };

  const toggleToc = () => {
    setShowToc(!showToc);
  };

  const hideToc = () => {
    setShowToc(false);
  };

  useEffect(() => {
    if (!url) return;

    const book = new Book(url);
    const { height, width } = getElementSize(wrapper);
    const rendition = book.renderTo(container, {
      width,
      height,
    });
    rendition.display();

    // Let's fire the on click if we click inside the book
    rendition.on("click", () => {
      hideToc();
    });

    loadTableOfContent(book)
      .then(setTableOfContent)
      .finally(() => {
        setLoading(false);
      });

    setRendition(rendition);

    return () => {
      if (book) book.destroy();
    };
  }, [url]);

  return (
    <div className="h-screen flex flex-col group">
      <LoadingIndicator visible={loading} />

      <div className="flex items-center h-14 shadow-md opacity-0 group-hover:opacity-100 transition">
        <div className="max-w-3xl md:mx-auto md:pl-0 pl-5">
          <h1 className="line-clamp-1 font-semibold text-large">{title}</h1>
        </div>

        <div>
          <div className="flex items-center justify-center space-x-3">
            {/* Theme Options */}
            <ThemeOptions />
            {/* Font Options */}
            <FontOptions />
            {/* Display Notes */}
            <Button variant="light" isIconOnly>
              <MdOutlineStickyNote2 size={30} />
            </Button>

            <Button onClick={toggleToc} variant="light" isIconOnly>
              <IoMenu size={30} />
            </Button>
          </div>
        </div>
      </div>

      <div id={wrapper} className="h-full relative">
        <div id={container} />

        <Navigator
          side="left"
          onClick={() => {
            rendition?.prev();
            hideToc();
          }}
          className="opacity-0 group-hover:opacity-100"
        />
        <Navigator
          side="right"
          onClick={() => {
            rendition?.next();
            hideToc();
          }}
          className="opacity-0 group-hover:opacity-100"
        />
      </div>

      <TableOfContent
        visible={showToc}
        data={tableOfContent}
        onClick={handleNavigation}
      />
    </div>
  );
};

export default EpubReader;
