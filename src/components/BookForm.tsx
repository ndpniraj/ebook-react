import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
} from "@nextui-org/react";
import { ChangeEventHandler, FC, useState } from "react";
import { genres, languages } from "../utils/data";
import PosterSelector from "./PosterSelector";
import RichEditor from "./rich-editor";
import { parseDate } from "@internationalized/date";

interface Props {
  title: string;
  submitBtnTitle: string;
  initialState?: unknown;
}

interface DefaultForm {
  file?: File;
  cover?: File;
  title: string;
  description: string;
  publicationName: string;
  publishedAt?: string;
  genre: string;
  language: string;
  mrp: string;
  sale: string;
}

const defaultBookInfo = {
  title: "",
  description: "",
  language: "",
  genre: "",
  mrp: "",
  publicationName: "",
  sale: "",
};

const BookForm: FC<Props> = ({ title, submitBtnTitle }) => {
  const [bookInfo, setBookInfo] = useState<DefaultForm>(defaultBookInfo);
  const [cover, setCover] = useState("");

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value, name } = target;
    console.log(name, value);
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files, name } = target;

    if (!files) return;

    const file = files[0];

    if (name === "cover" && file?.size) {
      setCover(URL.createObjectURL(file));
    } else {
      setCover("");
    }

    setBookInfo({ ...bookInfo, [name]: file });
  };

  return (
    <form className="p-10 space-y-6">
      <h1 className="pb-6 font-semibold text-2xl w-full">{title}</h1>

      <label htmlFor="file">
        <span>Select File: </span>
        <input
          accept="application/epub+zip"
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
        />
      </label>

      <PosterSelector
        src={cover}
        name="cover"
        // isInvalid
        fileName={bookInfo.cover?.name}
        // errorMessage="This is the very long long file name.png"
        onChange={handleFileChange}
      />

      <Input
        type="text"
        name="title"
        isRequired
        label="Book Title"
        placeholder="Think & Grow Rich"
        value={bookInfo.title}
        onChange={handleTextChange}
      />

      <RichEditor
        placeholder="About Book..."
        // isInvalid
        // errorMessage="Something is wrong"
        value={bookInfo.description}
        editable
        onChange={(description) => setBookInfo({ ...bookInfo, description })}
      />

      <Input
        name="publicationName"
        type="text"
        label="Publication Name"
        isRequired
        placeholder="Penguin Book"
        value={bookInfo.publicationName}
        onChange={handleTextChange}
      />

      <DatePicker
        onChange={(date) => {
          setBookInfo({ ...bookInfo, publishedAt: date.toString() });
        }}
        value={bookInfo.publishedAt ? parseDate(bookInfo.publishedAt) : null}
        label="Publish Date"
        showMonthAndYearPickers
        isRequired
      />

      <Autocomplete
        label="Language"
        placeholder="Select a Language"
        defaultSelectedKey={bookInfo.language}
        onSelectionChange={(key = "") => {
          setBookInfo({ ...bookInfo, language: key as string });
        }}
      >
        {languages.map((item) => {
          return (
            <AutocompleteItem value={item.name} key={item.name}>
              {item.name}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>

      <Autocomplete
        selectedKey={bookInfo.genre}
        label="Genre"
        placeholder="Select a Genre"
        defaultSelectedKey={bookInfo.language}
        onSelectionChange={(key = "") => {
          setBookInfo({ ...bookInfo, language: key as string });
        }}
      >
        {genres.map((item) => {
          return (
            <AutocompleteItem value={item.name} key={item.name}>
              {item.name}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>

      <div className="bg-default-100 rounded-md py-2 px-3">
        <p className="text-xs pl-3">Price*</p>

        <div className="flex space-x-6 mt-2">
          <Input
            name="mrp"
            type="number"
            label="MRP"
            isRequired
            placeholder="0.00"
            value={bookInfo.mrp}
            onChange={handleTextChange}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <Input
            name="sale"
            type="number"
            label="Sale Price"
            isRequired
            placeholder="0.00"
            value={bookInfo.sale}
            onChange={handleTextChange}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
        </div>
      </div>

      <Button className="w-full">{submitBtnTitle}</Button>
    </form>
  );
};

export default BookForm;
