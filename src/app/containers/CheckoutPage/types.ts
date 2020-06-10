/* --- STATE --- */
import { Movie, User } from '../HomePage/types';

export interface CheckoutPageState {
  current_user: User;
  movie: Movie;
  ticket: object;
  client_secret: string;
}

export type ContainerState = CheckoutPageState;
