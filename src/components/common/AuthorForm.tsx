import { FC, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RichEditor from "../rich-editor";
import { Button, Input } from "@nextui-org/react";
import { MdClose, MdOutlineAdd } from "react-icons/md";
import { z } from "zod";
import ErrorList from "./ErrorList";

interface Props {
  btnTitle?: string;
}

const newAuthorSchema = z.object({
  name: z
    .string({
      required_error: "Name is missing!",
      invalid_type_error: "Invalid name!",
    })
    .trim()
    .min(3, "Invalid name"),
  about: z
    .string({
      required_error: "About is missing!",
      invalid_type_error: "Invalid about!",
    })
    .trim()
    .min(100, "Please write at least 100 characters about yourself!"),
  socialLinks: z
    .array(z.string().url("Social links can only be list of  valid URLs!"))
    .optional(),
});

const AuthorForm: FC<Props> = ({ btnTitle }) => {
  const [socialLinks, setSocialLinks] = useState([""]);
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>();
  const { profile } = useAuth();

  const addLinkFields = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeLinkField = (index: number) => {
    const oldList = [...socialLinks];
    oldList.splice(index, 1);

    setSocialLinks(oldList);
  };

  const updateSocialLinks = (index: number, value: string) => {
    const oldList = [...socialLinks];
    oldList[index] = value;
    setSocialLinks(oldList);
  };

  const handleSubmit = () => {
    const links: string[] = [];

    socialLinks.forEach((link) => {
      if (link.trim()) links.push(link);
    });

    const data = {
      name: profile?.name,
      about,
      socialLinks: links,
    };

    const result = newAuthorSchema.safeParse(data);
    if (!result.success) {
      return setErrors(result.error.flatten().fieldErrors);
    }

    console.log(result.data);
  };

  return (
    <div className="p-4 space-y-6">
      <p>
        Name: <span className="font-semibold text-lg">{profile?.name}</span>
      </p>

      <RichEditor
        onChange={setAbout}
        editable
        placeholder="Say who you are to your readers..."
        isInvalid={errors?.about ? true : false}
        errorMessage={<ErrorList errors={errors?.about} />}
      />

      <div className="space-y-4">
        <p className="text-sm font-semibold">Social Links:</p>

        <ErrorList errors={errors?.socialLinks} />

        {socialLinks.map((_, index) => {
          return (
            <div className="flex items-center space-x-4">
              <Input
                onChange={({ target }) =>
                  updateSocialLinks(index, target.value)
                }
                placeholder="https://x.com/@something"
                key={index}
              />
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

      <Button onClick={handleSubmit}>{btnTitle}</Button>
    </div>
  );
};

export default AuthorForm;
