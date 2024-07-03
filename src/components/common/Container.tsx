import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen max-w-5xl mx-auto flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Container;
