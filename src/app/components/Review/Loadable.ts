/**
 *
 * Asynchronously loads the component for Review
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Review = lazyLoad(
  () => import('./index'),
  module => module.Review,
);
