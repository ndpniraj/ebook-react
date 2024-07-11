import { Button } from "@nextui-org/react";
import { FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Slider from "react-slick";

interface Props {}

const books = [
  {
    title: "Murder on the Orient Express",
    slogan: "Unravel the mystery, ride the Orient Express!",
    subtitle: "A thrilling journey through intrigue and deception.",
    cover:
      "https://ebook-public-data.s3.amazonaws.com/668f9ee73d175a420fa4de9a_Murder%20on%20the%20Orient%20Express.png",
    slug: "murder-on-the-orient-express-668f9ee73d175a420fa4de9a",
  },
  {
    title: "To Kill a Mockingbird",
    slogan: "Discover courage in a small town.",
    subtitle: "A timeless tale of justice and compassion.",
    cover:
      "https://ebook-public-data.s3.amazonaws.com/668f9ee73d175a420fa4de9d_To%20Kill%20a%20Mockingbird.png",
    slug: "to-kill-a-mockingbird-668f9ee73d175a420fa4de9d",
  },
  {
    title: "The Girl with the Dragon Tattoo",
    slogan: "Uncover secrets with the girl and her tattoo.",
    subtitle: "A gripping thriller of mystery and revenge.",
    cover:
      "https://ebook-public-data.s3.amazonaws.com/668f9ee73d175a420fa4debb_The%20Girl%20with%20the%20Dragon%20Tattoo.png",
    slug: "the-girl-with-the-dragon-tattoo-668f9ee73d175a420fa4debb",
  },
  {
    title: "The Hunger Games",
    slogan: "Survive the games, ignite the rebellion.",
    subtitle: "An epic adventure of survival and resilience.",
    cover:
      "https://ebook-public-data.s3.amazonaws.com/668f9ee73d175a420fa4debe_The Hunger Games.png",
    slug: "the-hunger-games-668f9ee73d175a420fa4debe",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const HeroSection: FC<Props> = () => {
  return (
    <div className="md:h-96 rounded-medium p-5 bg-[#faf7f2] dark:bg-[#231e1a]">
      <Slider {...settings}>
        {books.map((item) => {
          return (
            <div key={item.slug}>
              <div className="md:flex justify-between">
                <div className="flex-1 flex flex-col justify-center p-5">
                  <h1 className="lg:text-6xl text-3xl">{item.slogan}</h1>
                  <p className="md:text-lg mt-3 italic">{item.subtitle}</p>
                  <div className="mt-3">
                    <Button
                      radius="sm"
                      color="danger"
                      variant="bordered"
                      endContent={<FaArrowRightLong />}
                      as={Link}
                      to={`/book/${item.slug}`}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex items-center justify-center">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="md:w-48 md:h-80 w-32 rounded-md object-cover shadow-lg rotate-12"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeroSection;
