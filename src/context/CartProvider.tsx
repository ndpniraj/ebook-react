import { createContext, FC, ReactNode, useState } from "react";
import {
  cartItem,
  getCartState,
  updateCartId,
  updateCartItems,
} from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import useAuth from "../hooks/useAuth";
import client from "../api/client";
import toast from "react-hot-toast";
import { parseError } from "../utils/helper";

interface Props {
  children: ReactNode;
}

export interface ICartContext {
  id?: string;
  items: cartItem[];
  pending: boolean;
  totalCount: number;
  updateCart(item: cartItem): void;
}

export const CartContext = createContext<ICartContext>({
  items: [],
  pending: false,
  totalCount: 0,
  updateCart() {},
});

const CartProvider: FC<Props> = ({ children }) => {
  const cart = useSelector(getCartState);
  const dispatch = useDispatch();
  const { profile } = useAuth();
  const [pending, setPending] = useState(false);

  const updateCart = (item: cartItem) => {
    // update the UI
    dispatch(updateCartItems(item));

    if (profile) {
      // update the server/database
      // if user is authenticated sending api request
      setPending(true);
      client
        .post("/cart", {
          items: [{ product: item.product.id, quantity: item.quantity }],
        })
        .then(({ data }) => {
          toast.success("Product added to cart.");
          dispatch(updateCartId(data.cart));
        })
        .catch(parseError)
        .finally(() => {
          setPending(false);
        });
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        totalCount: cart.totalCount,
        pending,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
