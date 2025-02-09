import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the SignInPage container
export const initialState: ContainerState = {
  current_user: {},
};

const signInPageSlice = createSlice({
  name: 'signInPage',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<object>) {
      // Here we update the current user
      // Type-safe: It will expect `object` when firing the action. ✅
      state.current_user = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = signInPageSlice;
