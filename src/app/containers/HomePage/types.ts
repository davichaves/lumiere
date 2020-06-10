/* --- STATE --- */
export interface Movie {
  id: number;
  title: string;
  blob: string;
  director: string;
  cast: string;
  description: string;
  duration: number;
  language: string;
  country: string;
  release_date: string;
  poster_url: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface HomePageState {
  current_user: User;
  featured_movie: Movie;
  movies: Movie[];
}

export type ContainerState = HomePageState;
