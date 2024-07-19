import { FC } from "react";
import { useParams } from "react-router-dom";

interface Props {}

const ReviewForm: FC<Props> = () => {
  const { bookId } = useParams();

  return (
    <form>
      {/* Rating Bar */}

      {/* Editor (Rich Editor) */}

      {/* Submit Button */}
    </form>
  );
};

export default ReviewForm;
