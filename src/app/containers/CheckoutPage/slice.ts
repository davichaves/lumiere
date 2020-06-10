import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Movie } from '../HomePage/types';
import { emptyMovie } from '../HomePage/slice';

// The initial state of the CheckoutPage container
export const initialState: ContainerState = {
  movie: emptyMovie,
  current_user: {},
};

const checkoutPageSlice = createSlice({
  name: 'checkoutPage',
  initialState,
  reducers: {
    setMovie(state, action: PayloadAction<Movie>) {
      state.movie = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<object>) {
      state.current_user = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = checkoutPageSlice;
