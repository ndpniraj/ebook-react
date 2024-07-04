import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Container from "./components/common/Container";
import Verify from "./views/Verify";
import NewUser from "./views/NewUser";

interface Props {}

const App: FC<Props> = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/new-user" element={<NewUser />} />
      </Routes>
    </Container>
  );
};

export default App;
