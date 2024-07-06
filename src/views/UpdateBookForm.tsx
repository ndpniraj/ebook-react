import { FC } from "react";
import BookForm from "../components/BookForm";

interface Props {}

const UpdateBookForm: FC<Props> = () => {
  return <BookForm title="Update Book" submitBtnTitle="Update Book" />;
};

export default UpdateBookForm;
