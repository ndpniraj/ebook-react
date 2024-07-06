import { FC } from "react";
import BookForm from "../components/BookForm";

interface Props {}

const NewBookForm: FC<Props> = () => {
  return (
    <BookForm title="Publish New Book" submitBtnTitle="Publish New Book" />
  );
};

export default NewBookForm;
