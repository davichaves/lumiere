/**
 *
 * Asynchronously loads the component for AddressForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddressForm = lazyLoad(
  () => import('./index'),
  module => module.AddressForm,
);
