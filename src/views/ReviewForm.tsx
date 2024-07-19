import { Button } from "@nextui-org/react";
import { FC, FormEventHandler, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import RichEditor from "../components/rich-editor";
import toast from "react-hot-toast";
import client from "../api/client";
import { parseError } from "../utils/helper";

interface Props {}

const ReviewForm: FC<Props> = () => {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { bookId } = useParams();

  const updateRatingChanges = (rating: number) => {
    const newRatings = Array<string>(rating).fill("selected");
    setSelectedRatings(newRatings);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!selectedRatings.length)
      return toast.error("Please select some rating!");

    try {
      setLoading(true);
      await client.post("/review", {
        bookId,
        rating: selectedRatings.length,
        content,
      });

      toast.success("Thanks for leaving a rating.");
    } catch (error) {
      parseError(error);
    } finally {
      setLoading(false);
    }
  };

  const ratings = Array(5).fill("");

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-6">
      {ratings.map((_, index) => {
        return (
          <Button
            isIconOnly
            color="warning"
            variant="light"
            radius="full"
            key={index}
            onClick={() => updateRatingChanges(index + 1)}
          >
            {selectedRatings[index] === "selected" ? (
              <FaStar size={24} />
            ) : (
              <FaRegStar size={24} />
            )}
          </Button>
        );
      })}

      <RichEditor
        value={content}
        onChange={setContent}
        placeholder="Write about book..."
        editable
      />

      <Button isLoading={loading} type="submit">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
