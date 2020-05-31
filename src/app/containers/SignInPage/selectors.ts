import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.signInPage || initialState;

export const selectSignInPage = createSelector(
  [selectDomain],
  signInPageState => signInPageState,
);
