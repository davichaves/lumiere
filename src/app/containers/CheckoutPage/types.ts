/* --- STATE --- */
import { Movie, User, Ticket } from '../HomePage/types';

export interface CheckoutPageState {
  current_user: User;
  movie: Movie;
  ticket: Ticket;
  client_secret: string;
}

export type ContainerState = CheckoutPageState;
