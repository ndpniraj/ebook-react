import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Profile {}

export interface AuthState {
  profile: Profile | null;
  status: "busy" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = {
  status: "unauthenticated",
  profile: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile(state, { payload }: PayloadAction<Profile | null>) {
      state.profile = payload;
    },
  },
});

export const { updateProfile } = slice.actions;

export default slice.reducer;
