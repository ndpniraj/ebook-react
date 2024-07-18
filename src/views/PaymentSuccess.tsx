import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";

interface Props {}

const PaymentSuccess: FC<Props> = () => {
  const [busy, setBusy] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrderDetail = async () => {
      try {
        const { data } = await client.post("/order/success", { sessionId });
        console.log(data);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchOrderDetail();
  }, [sessionId]);

  return <div></div>;
};

export default PaymentSuccess;
