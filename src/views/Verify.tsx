import { Spinner } from "@nextui-org/react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { updateProfile } from "../store/auth";

interface Props {}

const Verify: FC<Props> = () => {
  const [searchPrams] = useSearchParams();
  const profileInfoString = searchPrams.get("profile");
  const dispatch = useDispatch();

  if (profileInfoString) {
    try {
      const profile = JSON.parse(profileInfoString);
      if (!profile.signedUp) return <Navigate to="/new-user" />;

      dispatch(updateProfile(profile));

      return <Navigate to="/" />;
    } catch (error) {
      return <Navigate to="/not-found" />;
    }
  }

  return (
    <div className="flex items-center justify-center p-10">
      <Spinner label="Verifying..." color="warning" />
    </div>
  );
};

export default Verify;
