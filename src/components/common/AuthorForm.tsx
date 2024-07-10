import { FC, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RichEditor from "../rich-editor";
import { Button, Input } from "@nextui-org/react";
import { MdClose, MdOutlineAdd } from "react-icons/md";

interface Props {
  btnTitle?: string;
}

const AuthorForm: FC<Props> = ({ btnTitle }) => {
  const [socialLinks, setSocialLinks] = useState([""]);
  const { profile } = useAuth();

  const addLinkFields = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeLinkField = (index: number) => {
    const oldList = [...socialLinks];
    oldList.splice(index, 1);

    setSocialLinks(oldList);
  };

  return (
    <div className="p-4 space-y-6">
      <p>
        Name: <span className="font-semibold text-lg">{profile?.name}</span>
      </p>

      <RichEditor editable placeholder="Say who you are to your readers..." />

      <div className="space-y-4">
        <p className="text-sm font-semibold">Social Links:</p>
        {socialLinks.map((_, index) => {
          return (
            <div className="flex items-center space-x-4">
              <Input placeholder="https://x.com/@something" key={index} />
              {socialLinks.length > 1 && (
                <Button
                  size="sm"
                  onClick={() => removeLinkField(index)}
                  isIconOnly
                >
                  <MdClose />
                </Button>
              )}
            </div>
          );
        })}

        <div className="flex justify-end">
          <Button size="sm" onClick={addLinkFields} isIconOnly>
            <MdOutlineAdd />
          </Button>
        </div>
      </div>

      <Button>{btnTitle}</Button>
    </div>
  );
};

export default AuthorForm;
