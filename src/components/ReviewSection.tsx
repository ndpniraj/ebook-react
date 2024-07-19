import { FC } from "react";
import DividerWithTitle from "./common/DividerWithTitle";

interface Props {
  title?: string;
}

const ReviewSection: FC<Props> = ({ title }) => {
  return (
    <div>
      <DividerWithTitle title={title} />
    </div>
  );
};

export default ReviewSection;
