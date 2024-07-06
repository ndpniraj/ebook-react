import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { Avatar, Button } from "@nextui-org/react";
import { Navigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";

interface Props {}

const Profile: FC<Props> = () => {
  const { profile } = useAuth();

  if (!profile) return <Navigate to="/sign-up" />;

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="flex min-w-96">
        <Avatar
          src="https://ebook-public-data.s3.amazonaws.com/668680734542251a9f29e4a6-john-doe.png"
          className="w-20 h-20"
          radius="sm"
          name={profile?.name}
        />

        <div className="pl-4">
          <p className="text-xl font-semibold">{profile.name}</p>
          <p>{profile.email}</p>
          <p>
            Role:{" "}
            <span className="italic text-sm">{profile.role.toUpperCase()}</span>
          </p>
        </div>

        <Button className="ml-auto" variant="flat" isIconOnly>
          <BsPencilSquare size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
