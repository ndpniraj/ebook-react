import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Container from "./components/common/Container";

interface Props {}

const App: FC<Props> = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Container>
  );
};

export default App;
