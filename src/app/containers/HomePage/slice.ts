import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Movie, User } from './types';

export const emptyMovie = {
  id: 0,
  title: '',
  blob: '',
  director: '',
  cast: '',
  description: '',
  duration: 0,
  language: '',
  country: '',
  release_date: '',
  poster_url: '',
  price: 0,
  created_at: '',
  updated_at: '',
};

export const emptyUser = {
  id: 0,
  name: '',
  email: '',
};

// The initial state of the HomePage container
export const initialState: ContainerState = {
  current_user: emptyUser,
  featured_movie: emptyMovie,
  movies: [],
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      // Here we update the current user
      // Type-safe: It will expect `object` when firing the action. ✅
      state.current_user = action.payload;
    },
    setFeaturedMovie(state, action: PayloadAction<Movie>) {
      state.featured_movie = action.payload;
    },
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
