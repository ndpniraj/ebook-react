import { Button } from "@nextui-org/react";
import { FC } from "react";

interface Props {}

const App: FC<Props> = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-red-600">
        Hello React Developers
      </h1>
      <Button>Next UI</Button>
    </div>
  );
};

export default App;
