import { FC, useEffect } from "react";
import client from "../api/client";
import { parseError } from "../utils/helper";

interface Props {}

const Orders: FC<Props> = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await client.get("/order");
        console.log(data);
      } catch (error) {
        parseError(error);
      }
    };
    fetchOrders();
  }, []);

  return <div></div>;
};

export default Orders;
