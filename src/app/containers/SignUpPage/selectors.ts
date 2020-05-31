import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.signUpPage || initialState;

export const selectSignUpPage = createSelector(
  [selectDomain],
  signUpPageState => signUpPageState,
);
