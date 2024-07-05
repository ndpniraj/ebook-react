import { createContext, FC, ReactNode, useEffect } from "react";
import {
  AuthState,
  getAuthState,
  updateAuthStatus,
  updateProfile,
} from "../store/auth";
import client from "../api/client";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  children: ReactNode;
}

export interface IAuthContext {
  profile: AuthState["profile"];
  status: AuthState["status"];
}

export const AuthContext = createContext<IAuthContext>({
  profile: null,
  status: "unauthenticated",
});

const AuthProvider: FC<Props> = ({ children }) => {
  const { profile, status } = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .get("/auth/profile")
      .then(({ data }) => {
        dispatch(updateProfile(data.profile));
        dispatch(updateAuthStatus("authenticated"));
      })
      .catch(() => {
        dispatch(updateProfile(null));
        dispatch(updateAuthStatus("unauthenticated"));
      });
  }, []);

  return (
    <AuthContext.Provider value={{ profile, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
