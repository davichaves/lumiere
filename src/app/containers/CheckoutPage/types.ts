/* --- STATE --- */
import { Movie } from '../HomePage/types';

export interface CheckoutPageState {
  current_user: object;
  movie: Movie;
}

export type ContainerState = CheckoutPageState;
