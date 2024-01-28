import { JokeFlags } from "./JokeFlags";

export interface JokeResponse {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  flags: JokeFlags;
  id: number;
  safe: boolean;
  lang: string;
}