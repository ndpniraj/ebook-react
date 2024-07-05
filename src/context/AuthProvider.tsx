import { createContext, FC, ReactNode, useEffect } from "react";
import { AuthState, updateProfile } from "../store/auth";
import client from "../api/client";
import { useDispatch } from "react-redux";

interface Props {
  children: ReactNode;
}

interface IAuthContext {
  profile: AuthState["profile"];
  status: AuthState["status"];
}

const AuthContext = createContext<IAuthContext>({
  profile: null,
  status: "authenticated",
});

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    client.get("/auth/profile").then(({ data }) => {
      dispatch(updateProfile(data.profile));
    });
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
