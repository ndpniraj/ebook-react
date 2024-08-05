import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  const location = useLocation();

  const readingMode = location.pathname.startsWith("/read/");

  if (readingMode) return children;

  return (
    <div className="min-h-screen max-w-5xl mx-auto flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col pb-20">{children}</div>

      <footer className="pb-10 px-4 text-center">
        <p>
          Made with love by{" "}
          <Link
            className="font-semibold hover:underline"
            target="_blank"
            to="https://fsniraj.dev"
          >
            Niraj Dhungana
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Container;
