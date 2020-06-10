import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Movie, User } from '../HomePage/types';
import { emptyMovie, emptyUser } from '../HomePage/slice';

// The initial state of the CheckoutPage container
export const initialState: ContainerState = {
  movie: emptyMovie,
  current_user: emptyUser,
  ticket: {},
  client_secret: '',
};

const checkoutPageSlice = createSlice({
  name: 'checkoutPage',
  initialState,
  reducers: {
    setMovie(state, action: PayloadAction<Movie>) {
      state.movie = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User>) {
      state.current_user = action.payload;
    },
    setTicket(state, action: PayloadAction<object>) {
      state.ticket = action.payload;
    },
    setClientSecret(state, action: PayloadAction<string>) {
      state.client_secret = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = checkoutPageSlice;
