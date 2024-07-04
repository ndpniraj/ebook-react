import { Avatar, Button, Input } from "@nextui-org/react";
import { FC } from "react";

interface Props {}

const NewUser: FC<Props> = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-96 border-2 p-5 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-center text-xl font-semibold">
          You are almost there, Please fill out the form below.
        </h1>
        <form className="w-full space-y-6 mt-6">
          <label
            className="cursor-pointer flex justify-center items-center"
            htmlFor="avatar"
          >
            <Avatar isBordered radius="sm" name="John" />
            <input
              accept="image/*"
              hidden
              type="file"
              name="avatar"
              id="avatar"
            />
          </label>

          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            variant="bordered"
          />

          <Button type="submit" className="w-full">
            Sign Me Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
