/**
 *
 * Asynchronously loads the component for PaymentForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PaymentForm = lazyLoad(
  () => import('./index'),
  module => module.PaymentForm,
);
