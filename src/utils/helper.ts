import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ApiError {
  error?: string;
  errors?: { [key: string]: string }[];
}

export const parseError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError;
    if (data.errors) {
      // it means this is an array of objects with error
      const messages = data.errors.map((err) => Object.values(err)).flat();
      return messages.map((msg) => {
        toast(msg, { position: "top-right" });
      });
    }

    if (data.error) {
      // it means this is an error message: string
      return toast(data.error, { position: "top-right" });
    }
  }

  if (error instanceof Error) {
    return toast(error.message, { position: "top-right" });
  }

  toast("Something went wrong, please try after sometime!", {
    position: "top-right",
  });
};
