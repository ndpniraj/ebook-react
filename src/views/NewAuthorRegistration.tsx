import { FC } from "react";
import AuthorForm from "../components/common/AuthorForm";

interface Props {}

const NewAuthorRegistration: FC<Props> = () => {
  return <AuthorForm btnTitle="Became an Author" />;
};

export default NewAuthorRegistration;
