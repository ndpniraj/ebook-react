import { FC } from "react";
import HeroSection from "../components/HeroSection";
import BookByGenre from "../components/BookByGenre";

interface Props {}

const Home: FC<Props> = () => {
  return (
    <div>
      <HeroSection />
      <BookByGenre genre="Fiction" />
    </div>
  );
};

export default Home;
