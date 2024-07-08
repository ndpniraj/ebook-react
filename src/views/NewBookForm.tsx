import { FC } from "react";
import BookForm from "../components/BookForm";
import client from "../api/client";

interface Props {}

const NewBookForm: FC<Props> = () => {
  const handleSubmit = async (data: FormData) => {
    const res = await client.post("/book/create", data);
    console.log(res.data);
  };

  return (
    <BookForm
      onSubmit={handleSubmit}
      title="Publish New Book"
      submitBtnTitle="Publish New Book"
    />
  );
};

export default NewBookForm;
