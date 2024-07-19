import { FC } from "react";
import DividerWithTitle from "./common/DividerWithTitle";
import { User } from "@nextui-org/react";
import { FaStar } from "react-icons/fa6";
import RichEditor from "./rich-editor";

export interface Review {
  content: string;
  date: string;
  id: string;
  rating: number;
  user: {
    id: string;
    name: string;
    avatar?: {
      url: string;
    };
  };
}

interface Props {
  title?: string;
  reviews: Review[];
}

const ReviewSection: FC<Props> = ({ title, reviews }) => {
  return (
    <div className="pb-20">
      <DividerWithTitle title={title} />
      <div className="mt-6 space-y-6">
        {reviews.map((review) => {
          return (
            <div key={review.id}>
              <User
                name={review.user.name}
                avatarProps={{
                  src: review.user.avatar?.url,
                }}
                description={
                  <div className="flex items-center space-x-1">
                    <span>{review.rating}</span>
                    <FaStar />
                  </div>
                }
              />
              <div className="pl-10">
                <RichEditor value={review.content} className="regular" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;
