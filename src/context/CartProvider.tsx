import { createContext, FC, ReactNode, useEffect, useState } from "react";
import {
  cartItem,
  CartItemAPI,
  getCartState,
  updateCartId,
  updateCartItems,
  updateCartState,
} from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import client from "../api/client";
import toast from "react-hot-toast";
import { parseError } from "../utils/helper";

interface CartApiResponse {
  cart: {
    id: string;
    items: CartItemAPI[];
  };
}

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

  useEffect(() => {
    const fetchCartInfo = async () => {
      const { data } = await client.get<CartApiResponse>("/cart");
      dispatch(updateCartState({ id: data.cart.id, items: data.cart.items }));
    };

    fetchCartInfo();
  }, []);

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
