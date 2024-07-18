import { FC, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";

interface Props {}

const PaymentSuccess: FC<Props> = () => {
  const [pending, setPending] = useState(true);
  const [searchParam] = useSearchParams();
  const sessionId = searchParam.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrderDetails = async () => {
      try {
        const { data } = await client.post("/order/success", { sessionId });
        console.log(data);
      } catch (error) {
        parseError(error);
      } finally {
        setPending(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (!sessionId) return <Navigate to="/not-found" />;

  return <div></div>;
};

export default PaymentSuccess;
