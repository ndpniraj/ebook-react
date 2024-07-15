import { createContext, FC, ReactNode } from "react";
import { cartItem } from "../store/cart";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  children: ReactNode;
}

export interface ICartContext {
  id?: string;
  items: cartItem[];
}

export const CartContext = createContext<ICartContext>({
  items: [],
});

const CartProvider: FC<Props> = ({ children }) => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <CartContext.Provider value={{ items: cart.items }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
