import { FC } from "react";
import AuthorForm, { AuthorInfo } from "../components/common/AuthorForm";
import client from "../api/client";
import toast from "react-hot-toast";

interface Props {}

const NewAuthorRegistration: FC<Props> = () => {
  const handleSubmit = async (data: AuthorInfo) => {
    const res = await client.post("/author/register", data);
    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return <AuthorForm onSubmit={handleSubmit} btnTitle="Became an Author" />;
};

export default NewAuthorRegistration;
