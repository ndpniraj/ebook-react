import { FC, useEffect, useState } from "react";
import client from "../api/client";
import { parseError } from "../utils/helper";
import Skeletons from "../components/skeletons";

interface Props {}

interface OrderItem {
  id: string;
  title: string;
  slug: string;
  cover?: string;
  qty: number;
  price: string;
  totalPrice: string;
}

interface Orders {
  id: string;
  stripeCustomerId?: string;
  paymentId?: string;
  totalAmount: string;
  paymentStatus?: string;
  date: Date;
  orderItem: OrderItem[];
}

const Orders: FC<Props> = () => {
  const [pending, setPending] = useState(true);
  const [orders, setOrders] = useState<Orders[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await client.get("/order");
        setOrders(data.orders);
      } catch (error) {
        parseError(error);
      } finally {
        setPending(false);
      }
    };
    fetchOrders();
  }, []);

  if (pending) return <Skeletons.Orders />;

  return (
    <div className="p-5 lg:p-0">
      <h1 className="text-xl font-semibold mb-6">Your Orders</h1>
      {orders?.map((order) => {
        return <div key={order.id}>Order</div>;
      })}
    </div>
  );
};

export default Orders;
