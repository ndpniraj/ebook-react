import { Button } from "@nextui-org/react";
import { FC } from "react";

interface Props {
  title: string;
  submitBtnTitle: string;
  initialState?: unknown;
}

const BookForm: FC<Props> = ({ title, submitBtnTitle }) => {
  return (
    <form className="p-10 space-y-6">
      <h1 className="pb-6 font-semibold text-2xl w-full">{title}</h1>

      <Button className="w-full">{submitBtnTitle}</Button>
    </form>
  );
};

export default BookForm;
