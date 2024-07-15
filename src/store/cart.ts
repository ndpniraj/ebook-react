import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../components/BookDetail";

export type cartItem = {
  product: Book;
  quantity: number;
};

export interface CartState {
  id?: string;
  items: cartItem[];
}

const initialState: CartState = {
  items: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default slice.reducer;
