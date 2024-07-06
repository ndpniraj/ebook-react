import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
} from "@nextui-org/react";
import { FC } from "react";
import { genres, languages } from "../utils/data";
import PosterSelector from "./PosterSelector";

interface Props {
  title: string;
  submitBtnTitle: string;
  initialState?: unknown;
}

const BookForm: FC<Props> = ({ title, submitBtnTitle }) => {
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
        />
      </label>

      <PosterSelector
        isInvalid
        fileName="This is the very long long file name.png"
        errorMessage="This is the very long long file name.png"
      />

      <Input
        type="text"
        name="title"
        isRequired
        label="Book Title"
        placeholder="Think & Grow Rich"
      />

      {/* About For Book */}

      <Input
        name="publicationName"
        type="text"
        label="Publication Name"
        isRequired
        placeholder="Penguin Book"
      />

      <DatePicker label="Publish Date" showMonthAndYearPickers isRequired />

      <Autocomplete
        label="Language"
        placeholder="Select a Language"
        items={languages}
      >
        {(item) => {
          return (
            <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
          );
        }}
      </Autocomplete>

      <Autocomplete label="Genre" placeholder="Select a Genre" items={genres}>
        {(item) => {
          return (
            <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
          );
        }}
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
