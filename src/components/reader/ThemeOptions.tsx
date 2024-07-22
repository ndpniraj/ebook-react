import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { HiColorSwatch } from "react-icons/hi";

interface Props {
  onThemeSelect?(mode: "light" | "dark"): void;
}

const ThemeOptions: FC<Props> = ({ onThemeSelect }) => {
  return (
    <Popover showArrow offset={20}>
      <PopoverTrigger>
        <Button variant="light" isIconOnly>
          <HiColorSwatch size={30} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex items-center justify-center space-x-3 p-3">
          <button onClick={() => onThemeSelect && onThemeSelect("light")}>
            Light
          </button>
          <button onClick={() => onThemeSelect && onThemeSelect("dark")}>
            Dark
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeOptions;
