import { Spinner } from "@nextui-org/react";
import { FC } from "react";

interface Props {}

const LoadingSpinner: FC<Props> = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <Spinner label="Verifying..." color="warning" />
    </div>
  );
};

export default LoadingSpinner;
