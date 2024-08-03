import clsx from "clsx";
import { FC } from "react";

interface Props {
  visible: boolean;
  onClose(): void;
}

const MobileNav: FC<Props> = ({ visible, onClose }) => {
  return (
    <div>
      <div
        className={clsx(
          visible ? "left-0" : "-left-full",
          "transition-all fixed bottom-0 top-0 w-3/4 z-[100] bg-white dark:bg-black"
        )}
      ></div>
      <div
        onClick={onClose}
        className={clsx(
          visible ? "fixed" : "hidden",
          "inset-0 z-50 dark:bg-white dark:bg-opacity-50 bg-black bg-opacity-50 backdrop-blur"
        )}
      />
    </div>
  );
};

export default MobileNav;
