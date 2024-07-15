import { FC } from "react";
import useCart from "../hooks/useCart";

interface Props {}

const Cart: FC<Props> = () => {
  const { items } = useCart();
  return <div>{JSON.stringify(items)}</div>;
};

export default Cart;
