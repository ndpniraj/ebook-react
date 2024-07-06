import { FC, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import clsx from "clsx";
import Tools from "./Tools";

interface Props {
  value?: string;
  onChange?(html: string): void;
  editable?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      HTMLAttributes: {
        class: "tiptap-ul",
      },
    },

    orderedList: {
      keepMarks: true,
      HTMLAttributes: {
        class: "tiptap-ol",
      },
    },
  }),
];

const RichEditor: FC<Props> = ({
  editable,
  value,
  placeholder,
  isInvalid,
  errorMessage,
}) => {
  const editor = useEditor({
    extensions: [...extensions, Placeholder.configure({ placeholder })],
  });

  useEffect(() => {
    if (editor && !editable) {
      editor.setEditable(false);
    }

    if (editor && value) {
      editor.commands.setContent(value);
    }
  }, [editor, value, editable]);

  return (
    <div
      className={clsx(isInvalid && "ring-2 ring-red-400 p-2 rounded-medium")}
    >
      <Tools editor={editor} visible={editable} />
      <EditorContent editor={editor} />

      {errorMessage ? (
        <p className="text-xs text-red-400">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default RichEditor;
