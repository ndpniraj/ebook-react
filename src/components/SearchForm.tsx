import { Input } from "@nextui-org/react";
import { FC, FormEventHandler, useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface Props {}

const SearchForm: FC<Props> = () => {
  const [query, setQuery] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        variant="bordered"
        placeholder="Search your book..."
        endContent={
          <button className="focus:outline-none" type="submit">
            <IoMdSearch size={24} />
          </button>
        }
        className="w-full"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
};

export default SearchForm;
