import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";
import { User } from "@nextui-org/react";
import RichEditor from "../components/rich-editor";

interface Props {}

interface AuthorInfo {
  id: string;
  name: string;
  about: string;
  socialLinks: string[];
}

const AuthorPage: FC<Props> = () => {
  const [fetching, setFetching] = useState(true);
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchAuthorInfo = async () => {
      try {
        const { data } = await client.get(`/author/${id}`);
        setAuthorInfo(data);
      } catch (error) {
        parseError(error);
      } finally {
        setFetching(false);
      }
    };

    fetchAuthorInfo();
  }, []);

  if (fetching)
    return (
      <div className="text-center pt-10, animate-pulse">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="p-5 lg:p-0">
      <User name={authorInfo?.name} />
      <div className="pl-10 mt-3">
        <RichEditor value={authorInfo?.about} className="regular" />
      </div>
    </div>
  );
};

export default AuthorPage;
