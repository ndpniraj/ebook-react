import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { Avatar, Button } from "@nextui-org/react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";

interface Props {}

const Profile: FC<Props> = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  if (!profile) return <Navigate to="/sign-up" />;

  const { role, avatar } = profile;

  const isAuthor = role === "author";

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="flex min-w-96">
        <Avatar
          src={avatar}
          className="w-20 h-20"
          radius="sm"
          name={profile?.name}
        />

        <div className="flex-1 pl-4">
          <p className="text-xl font-semibold">{profile.name}</p>
          <p>{profile.email}</p>

          <div className="flex justify-between items-center">
            <p>
              Role:{" "}
              <span className="italic text-sm">
                {profile.role.toUpperCase()}
              </span>
            </p>

            {!isAuthor ? (
              <Link className="text-xs underline" to="/author-registration">
                Became an Author
              </Link>
            ) : null}
          </div>
        </div>

        <Button
          onClick={() => navigate("/update-profile")}
          className="ml-auto"
          variant="flat"
          isIconOnly
        >
          <BsPencilSquare size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
