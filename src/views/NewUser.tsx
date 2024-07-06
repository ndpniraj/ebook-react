import { FC } from "react";
import client from "../api/client";
import NewUserForm from "../components/profile/NewUserForm";

interface Props {}

const NewUser: FC<Props> = () => {
  const handleSubmit = async (formData: FormData) => {
    await client.put("/auth/profile", formData);
  };

  return (
    <NewUserForm
      onSubmit={handleSubmit}
      title="You are almost there, Please fill out the form below."
      btnTitle="Sign Me Up"
    />
  );
};

export default NewUser;
