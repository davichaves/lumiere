import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.checkoutPage || initialState;

export const selectCheckoutPage = createSelector(
  [selectDomain],
  checkoutPageState => checkoutPageState,
);
