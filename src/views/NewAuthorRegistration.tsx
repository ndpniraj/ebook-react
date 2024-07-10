import { FC } from "react";
import AuthorForm, { AuthorInfo } from "../components/common/AuthorForm";
import client from "../api/client";

interface Props {}

const NewAuthorRegistration: FC<Props> = () => {
  const handleSubmit = async (data: AuthorInfo) => {
    const res = await client.post("/author/register", data);
    console.log(res.data);
  };

  return <AuthorForm onSubmit={handleSubmit} btnTitle="Became an Author" />;
};

export default NewAuthorRegistration;
