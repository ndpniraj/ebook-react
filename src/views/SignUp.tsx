import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import Book from "../svg/Book";

interface Props {}

const SignUp: FC<Props> = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-96 border-2 p-5 rounded-md">
        <Book className="w-44 h-44" />
        <h1 className="text-center text-xl font-semibold">
          Books are the keys to countless doors. Sign up and unlock your
          potential.
        </h1>

        <form className="w-full space-y-6 mt-6">
          <Input
            type="email"
            label="Email"
            placeholder="john@email.com"
            variant="bordered"
          />
          <Button type="submit" className="w-full">
            Send Me The Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
